/* eslint-disable @typescript-eslint/no-unused-vars */
/* src/app/components/animations/AICore.tsx */
"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";
import * as THREE from "three";
import { Star } from "lucide-react";
import { useSpring, animated } from "@react-spring/three";

interface AICoreProps {
  className?: string;
}

const AICoreStructure: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const dataStreamsRef = useRef<THREE.Line[]>([]);
  const { raycaster, camera, gl, mouse } = useThree();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Animation parameters
  const animationSpeed = 0.3;

  // Spring animations
  const { emissiveIntensity } = useSpring({
    emissiveIntensity: hovered ? 2.0 : 0.8,
    config: { duration: 200 },
  });

  // Custom shader for core glass-like material
  const coreMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      glowColor: { value: new THREE.Color("#EC4899") }, // Changed to pink-500
    },
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 glowColor;
      varying vec3 vNormal;
      void main() {
        float edge = abs(dot(vNormal, normalize(vec3(0.0, 0.0, 1.0))));
        float glow = 0.5 + 0.5 * sin(time * 0.5 + edge * 10.0);
        gl_FragColor = vec4(mix(vec3(0.1), glowColor, glow * 0.8), 0.3);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
  });

  // Initialize geometry and data streams
  useEffect(() => {
    const streams: THREE.Line[] = [];
    for (let i = 0; i < 4; i++) {
      const points = [];
      for (let j = 0; j <= 20; j++) {
        points.push(
          new THREE.Vector3(
            Math.sin(j * 0.3 + i) * 1.5,
            -5 + j * 0.5,
            Math.cos(j * 0.3 + i) * 1.5
          )
        );
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ color: "#EC4899" }); // Changed to pink-500
      const line = new THREE.Line(geometry, material);
      streams.push(line);
      dataStreamsRef.current.push(line);
    }
    return () => {
      streams.forEach((stream) => stream.geometry.dispose());
    };
  }, []);

  // Animation and interactivity
  useFrame((state) => {
    const time = state.clock.elapsedTime * animationSpeed;
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
    if (coreRef.current) {
      coreRef.current.rotation.z = time * 0.2;
    }
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const angle = time + i;
        positions[i] = Math.sin(angle) * 2 + Math.sin(time * 0.5) * 0.5;
        positions[i + 1] = Math.cos(angle * 0.7) * 1.5;
        positions[i + 2] = Math.cos(angle) * 2 + Math.cos(time * 0.3) * 0.5;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
    if (dataStreamsRef.current.length > 0) {
      dataStreamsRef.current.forEach((stream) => {
        const positions = stream.geometry.attributes.position.array;
        for (let j = 0; j < positions.length; j += 3) {
          positions[j + 1] += 0.02;
          if (positions[j + 1] > 5) positions[j + 1] = -5;
        }
        stream.geometry.attributes.position.needsUpdate = true;
      });
    }
    coreMaterial.uniforms.time.value = time;
  });

  // Interactivity
  useEffect(() => {
    const handlePointerMove = (event: MouseEvent) => {
      const mouseVec = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
      raycaster.setFromCamera(mouseVec, camera);
      const intersects = raycaster.intersectObjects([coreRef.current!]);
      setHovered(intersects.length > 0);
    };

    const handleClick = (event: MouseEvent) => {
      const mouseVec = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
      raycaster.setFromCamera(mouseVec, camera);
      const intersects = raycaster.intersectObjects([coreRef.current!]);
      if (intersects.length > 0) {
        setClicked(true);
      }
    };

    gl.domElement.addEventListener("mousemove", handlePointerMove);
    gl.domElement.addEventListener("click", handleClick);
    return () => {
      gl.domElement.removeEventListener("mousemove", handlePointerMove);
      gl.domElement.removeEventListener("click", handleClick);
    };
  }, [gl, raycaster, camera]);

  // Parallax effect
  useFrame(({ mouse }) => {
    if (groupRef.current) {
      groupRef.current.position.x = mouse.x * 0.5;
      groupRef.current.position.y = mouse.y * 0.5;
    }
  });

  return (
    <>
      {/* Background parallax plane */}
      <mesh position={[0, 0, -30]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="#0A0A1A" />
      </mesh>
      {/* AI Core */}
      <group ref={groupRef}>
        <animated.mesh ref={coreRef} position={[0, 0, 0]}>
          <dodecahedronGeometry args={[1, 0]} />
          <animated.shaderMaterial
            attach="material"
            uniforms={coreMaterial.uniforms}
            vertexShader={coreMaterial.vertexShader}
            fragmentShader={coreMaterial.fragmentShader}
            transparent={coreMaterial.transparent}
            side={coreMaterial.side}
          />
        </animated.mesh>
        {particlesRef.current && <primitive object={particlesRef.current} />}
        {dataStreamsRef.current.map((stream, i) => (
          <primitive key={i} object={stream} />
        ))}
      </group>
      {/* Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(3000), 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#EC4899" transparent opacity={0.8} /> {/* Changed to pink-500 */}
      </points>
    </>
  );
};

const AICore: React.FC<AICoreProps> = ({ className = "" }) => {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ alpha: true }}>
        <fog attach="fog" args={["#0A0A1A", 10, 30]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1.0} color="#EC4899" /> {/* Changed to pink-500 */}
        <AICoreStructure />
        <OrbitControls enablePan={true} enableZoom={true} minDistance={3} maxDistance={8} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={2.5} />
          <Noise opacity={0.02} />
        </EffectComposer>
      </Canvas>
      <div className="absolute top-4 right-4">
        <Star className="w-6 h-6 text-pink-500" /> {/* Changed to pink-500 */}
      </div>
    </div>
  );
};

export default AICore;