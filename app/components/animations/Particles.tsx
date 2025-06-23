/* eslint-disable @typescript-eslint/no-unused-vars */
/* src/app/components/animations/Particles.tsx */
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

interface ParticlesProps {
  className?: string;
}

const ParticleSphere: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const [positions, setPositions] = useState<Float32Array | null>(null);
  const [opacities, setOpacities] = useState<Float32Array | null>(null);
  const [clearing, setClearing] = useState<number[]>([]); // Indices of particles being cleared

  // Predefined controls
  const particleCount = 2000; // Enough for a dense sphere, optimized for performance
  const sphereRadius = 5; // Size of the sphere
  const glowColor = "#ff6ac1"; // Homepage pink glow
  const clearRadius = 1.5; // Radius of clearing effect
  const clearDuration = 2000; // Duration particles stay cleared (ms)

  // Initialize particles
  useEffect(() => {
    const pos = new Float32Array(particleCount * 3);
    const opac = new Float32Array(particleCount);

    // Generate particles in a spherical distribution
    for (let i = 0; i < particleCount; i++) {
      // Random spherical coordinates
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = sphereRadius * Math.cbrt(Math.random()); // Cube root for uniform distribution

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      opac[i] = 1; // Initial opacity
    }

    setPositions(pos);
    setOpacities(opac);

    return () => {
      // Cleanup (no geometry to dispose, as buffer attributes are managed by Points)
    };
  }, []);

  // Interactivity (click and hover)
  const { raycaster, camera, gl } = useThree();

  const handleInteraction = useCallback(
    (event: MouseEvent, isHover: boolean) => {
      const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
      raycaster.setFromCamera(mouse, camera);

      if (pointsRef.current && positions && opacities) {
        const intersects = raycaster.intersectObject(pointsRef.current);
        if (intersects.length > 0) {
          const hitPoint = intersects[0].point;
          const newOpacities = new Float32Array(opacities);
          const clearedIndices: number[] = [];

          // Check particles within clearRadius
          for (let i = 0; i < particleCount; i++) {
            const particlePos = new THREE.Vector3(
              positions[i * 3],
              positions[i * 3 + 1],
              positions[i * 3 + 2]
            );
            const distance = particlePos.distanceTo(hitPoint);
            if (distance < clearRadius) {
              newOpacities[i] = 0; // Set opacity to 0 for clearing
              clearedIndices.push(i);
            }
          }

          setOpacities(newOpacities);
          setClearing((prev) => [...prev, ...clearedIndices]);

          // Restore opacities after clearDuration
          setTimeout(() => {
            const restoredOpacities = new Float32Array(opacities);
            clearedIndices.forEach((idx) => {
              restoredOpacities[idx] = 1;
            });
            setOpacities(restoredOpacities);
            setClearing((prev) => prev.filter((idx) => !clearedIndices.includes(idx)));
          }, clearDuration);
        }
      }
    },
    [raycaster, camera, pointsRef, positions, opacities, particleCount, clearRadius, clearDuration]
  );

  useEffect(() => {
    const handleClick = (event: MouseEvent) => handleInteraction(event, false);
    const handleMouseMove = (event: MouseEvent) => handleInteraction(event, true);

    gl.domElement.addEventListener("click", handleClick);
    gl.domElement.addEventListener("mousemove", handleMouseMove);
    return () => {
      gl.domElement.removeEventListener("click", handleClick);
      gl.domElement.removeEventListener("mousemove", handleMouseMove);
    };
  }, [gl, positions, opacities, handleInteraction]);

  return (
    <Points ref={pointsRef}>
      <PointMaterial
        size={0.05}
        color={glowColor}
        transparent
        vertexColors={false}
        sizeAttenuation={true}
      />
      {positions && opacities && (
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-opacity"
            args={[opacities, 1]}
          />
        </bufferGeometry>
      )}
    </Points>
  );
};

const Particles: React.FC<ParticlesProps> = ({ className = "" }) => {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }} gl={{ alpha: true }}>
        <fog attach="fog" args={["#1A1A1A", 10, 20]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <ParticleSphere />
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.8} intensity={1.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default Particles;