/* eslint-disable react-hooks/exhaustive-deps */

/* src/app/components/animations/Premium3D.tsx */
"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";


interface Premium3DProps {
  className?: string;
}

const WireframeStructure: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const trianglesRef = useRef<THREE.Mesh[]>([]);
  const edgesRef = useRef<THREE.Line[]>([]);
  const [highlighted, setHighlighted] = useState<number[]>([]);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  // Predefined controls
  const density = 75;
  const pulseSpeed = 0.9;
  const glowColor = "#ff6ac1";
  const animationSpeed = 0.5;

  // Initialize structure
  useEffect(() => {
    const triangles: THREE.Mesh[] = [];
    const edges: THREE.Line[] = [];
    const points = [];
    const connections: number[][] = [];

    // Generate random points for Delaunay triangulation (simplified)
    for (let i = 0; i < density; i++) {
      points.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 18, // Reduced scale to prevent edge clipping
          (Math.random() - 0.5) * 9,
          (Math.random() - 0.5) * 18
        )
      );
    }

    // Create triangles (simplified Delaunay-like structure)
    for (let i = 0; i < density - 2; i++) {
      const v1 = points[i];
      const v2 = points[i + 1];
      const v3 = points[i + 2] || points[0];
      connections[i] = [i, i + 1, i + 2 >= density ? 0 : i + 2];

      // Triangle face
      const geometry = new THREE.BufferGeometry().setFromPoints([v1, v2, v3]);
      const material = new THREE.MeshBasicMaterial({
        color: "#1A1A1A",
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
      });
      const triangle = new THREE.Mesh(geometry, material);
      triangle.userData = { index: i, connections: connections[i] };
      triangles.push(triangle);

      // Triangle edges
      const edgeGeometry = new THREE.BufferGeometry().setFromPoints([v1, v2, v2, v3, v3, v1]);
      const edgeMaterial = new THREE.LineBasicMaterial({
        color: glowColor,
        transparent: true,
        opacity: 0.8,
      });
      const edge = new THREE.LineSegments(edgeGeometry, edgeMaterial);
      edge.userData = { index: i };
      edges.push(edge);
    }

    trianglesRef.current = triangles;
    edgesRef.current = edges;

    // Initialize audio
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    const analyserNode = ctx.createAnalyser();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(80, ctx.currentTime); // Low hum
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    oscillator.connect(gain);
    gain.connect(analyserNode);
    analyserNode.connect(ctx.destination);
    oscillator.start();
    setAudioContext(ctx);
    setAnalyser(analyserNode);

    return () => {
      oscillator.stop();
      ctx.close();
    };
  }, []);

  // Animation and interactivity
  useFrame((state) => {
    if (groupRef.current && trianglesRef.current && edgesRef.current) {
      const time = state.clock.elapsedTime * animationSpeed;
      trianglesRef.current.forEach((triangle, i) => {
        const scale = 1 + Math.sin(time + i * 0.1) * 0.1;
        triangle.scale.set(scale, scale, scale);
        triangle.rotation.y += 0.002 * animationSpeed;

        // Random detach/rejoin
        if (Math.random() < 0.01) {
          triangle.position.y += Math.random() * 0.5 - 0.25;
          setTimeout(() => {
            triangle.position.y = 0;
          }, 1000);
        }

        // Update edge material
        const edge = edgesRef.current[i];
        const edgeMaterial = edge.material as THREE.LineBasicMaterial;
        edgeMaterial.opacity = 0.8 + Math.sin(time + i * 0.2) * 0.2 * pulseSpeed;
        edgeMaterial.color.set(highlighted.includes(i) ? "#ff9ad5" : glowColor);
      });

      // Sync audio with pulse
      if (analyser && audioContext) {
        const data = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(data);
        const avg = data.reduce((a, b) => a + b, 0) / data.length;
        groupRef.current.scale.set(1 + avg * 0.001, 1 + avg * 0.001, 1 + avg * 0.001);
      }
    }
  });

  // Interactivity
  const { raycaster, camera, gl } = useThree();
  const [dragging, setDragging] = useState<THREE.Mesh | null>(null);

  const handleClick = (event: MouseEvent) => {
    const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(trianglesRef.current);
    if (intersects.length > 0) {
      const triangle = intersects[0].object as THREE.Mesh;
      const index = triangle.userData.index;
      setHighlighted([index, ...triangle.userData.connections]);

      // Ripple effect
      const ripple = (idx: number, depth = 0) => {
        if (depth > 3) return;
        setTimeout(() => {
          setHighlighted((prev) => [...prev, idx]);
          trianglesRef.current[idx]?.userData.connections.forEach((conn: number) =>
            ripple(conn, depth + 1)
          );
        }, 200 * depth);
      };
      ripple(index);
      setTimeout(() => setHighlighted([]), 2000);
    }
  };

  const handleMouseDown = (event: MouseEvent) => {
    const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(trianglesRef.current);
    if (intersects.length > 0) {
      setDragging(intersects[0].object as THREE.Mesh);
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (dragging) {
      const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
      raycaster.setFromCamera(mouse, camera);
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const point = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, point);
      dragging.position.copy(point);
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  useEffect(() => {
    gl.domElement.addEventListener("click", handleClick);
    gl.domElement.addEventListener("mousedown", handleMouseDown);
    gl.domElement.addEventListener("mousemove", handleMouseMove);
    gl.domElement.addEventListener("mouseup", handleMouseUp);
    return () => {
      gl.domElement.removeEventListener("click", handleClick);
      gl.domElement.removeEventListener("mousedown", handleMouseDown);
      gl.domElement.removeEventListener("mousemove", handleMouseMove);
      gl.domElement.removeEventListener("mouseup", handleMouseUp);
    };
  }, [gl, dragging, highlighted, handleClick, handleMouseDown, handleMouseMove]);

  return (
    <group ref={groupRef}>
      {trianglesRef.current.map((triangle, i) => (
        <primitive key={`triangle-${i}`} object={triangle} />
      ))}
      {edgesRef.current.map((edge, i) => (
        <primitive key={`edge-${i}`} object={edge} />
      ))}
      {/* Particles for mist */}
      <Points>
        <PointMaterial size={0.05} color="#ff6ac1" transparent opacity={0.1} />
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array(Array.from({ length: 1000 }, () => (Math.random() - 0.5) * 50)),
              3
            ]}
          />
        </bufferGeometry>
      </Points>
    </group>
  );
};

const Premium3D: React.FC<Premium3DProps> = ({ className = "" }) => {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 5, 15], fov: 50 }} gl={{ alpha: true }}>
        <fog attach="fog" args={["#1A1A1A", 10, 50]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <WireframeStructure />
        <OrbitControls enablePan={true} enableZoom={true} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={1.5} />
        </EffectComposer>
      </Canvas>
      <div className="absolute top-4 right-4">
      </div>
    </div>
  );
};

export default Premium3D;