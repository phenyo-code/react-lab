/* src/app/components/animations/Triangles.tsx */
"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

interface TrianglesProps {
  className?: string;
}

const TriangleStructure: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const trianglesRef = useRef<THREE.Mesh[]>([]);
  const edgesRef = useRef<THREE.Line[]>([]);
  const [highlighted, setHighlighted] = useState<number[]>([]);

  // Predefined controls
  const triangleCount = 8; // Slightly fewer for bolder, larger lines
  const glowColor = "#ff6ac1"; // Homepage pink glow
  const animationSpeed = 0.4; // Slightly faster for dynamic line movement
  const pulseSpeed = 0.8; // Enhanced pulsing for glowing lines

  // Initialize structure
  useEffect(() => {
    const triangles: THREE.Mesh[] = [];
    const edges: THREE.Line[] = [];
    const points: THREE.Vector3[] = [];
    const connections: number[][] = [];

    // Generate points for massive triangles
    for (let i = 0; i < triangleCount * 3; i++) {
      points.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 30, // Larger scale for massive structure
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 30
        )
      );
    }

    // Create interconnected triangles (focus on edges)
    for (let i = 0; i < triangleCount; i++) {
      const v1 = points[i * 3];
      const v2 = points[i * 3 + 1];
      const v3 = points[i * 3 + 2];
      connections[i] = [
        i * 3,
        i * 3 + 1,
        i * 3 + 2,
        Math.floor(Math.random() * triangleCount * 3), // Random connection
      ];

      // Triangle face (nearly invisible)
      const geometry = new THREE.BufferGeometry().setFromPoints([v1, v2, v3]);
      const material = new THREE.MeshBasicMaterial({
        color: "#1A1A1A",
        transparent: true,
        opacity: 0.05, // Almost fully transparent to hide faces
        side: THREE.DoubleSide,
      });
      const triangle = new THREE.Mesh(geometry, material);
      triangle.userData = { index: i, connections: connections[i] };
      triangles.push(triangle);

      // Thick edges for prominent lines
      const edgeGeometry = new THREE.BufferGeometry().setFromPoints([v1, v2, v2, v3, v3, v1]);
      const edgeMaterial = new THREE.LineBasicMaterial({
        color: glowColor,
        transparent: true,
        opacity: 0.95,
        linewidth: 4, // Thicker for bold, moving lines
      });
      const edge = new THREE.LineSegments(edgeGeometry, edgeMaterial);
      edge.userData = { index: i };
      edges.push(edge);
    }

    trianglesRef.current = triangles;
    edgesRef.current = edges;

    return () => {
      triangles.forEach((t) => t.geometry.dispose());
      edges.forEach((e) => e.geometry.dispose());
    };
  }, []);

  // Animation for moving lines
  useFrame((state) => {
    if (groupRef.current && trianglesRef.current && edgesRef.current) {
      const time = state.clock.elapsedTime * animationSpeed;
      trianglesRef.current.forEach((triangle, i) => {
        // Subtle vertex movement for dynamic lines
        const offset = Math.sin(time + i * 0.2) * 0.5;
        triangle.position.y += offset * 0.02;
        triangle.rotation.y += 0.002 * animationSpeed;

        // Update edge material for pulsing effect
        const edge = edgesRef.current[i];
        const edgeMaterial = edge.material as THREE.LineBasicMaterial;
        edgeMaterial.opacity = 0.95 + Math.sin(time + i * 0.3) * 0.15 * pulseSpeed;
        edgeMaterial.color.set(highlighted.includes(i) ? "#ff9ad5" : glowColor);
      });

      groupRef.current.rotation.y += 0.003 * animationSpeed; // Slightly faster group rotation
    }
  });

  // Interactivity (click-based ripple)
  const { raycaster, camera, gl } = useThree();

  useEffect(() => {
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
          if (depth > 2) return;
          setTimeout(() => {
            setHighlighted((prev) => [...prev, idx]);
            trianglesRef.current[idx]?.userData.connections.forEach((conn: number) =>
              ripple(conn, depth + 1)
            );
          }, 150 * depth);
        };
        ripple(index);
        setTimeout(() => setHighlighted([]), 1500);
      }
    };

    gl.domElement.addEventListener("click", handleClick);
    return () => {
      gl.domElement.removeEventListener("click", handleClick);
    };
  }, [gl, highlighted, raycaster, camera]);

  return (
    <group ref={groupRef}>
      {trianglesRef.current.map((triangle, i) => (
        <primitive key={`triangle-${i}`} object={triangle} />
      ))}
      {edgesRef.current.map((edge, i) => (
        <primitive key={`edge-${i}`} object={edge} />
      ))}
      {/* Minimal particle mist */}
      <Points>
        <PointMaterial size={0.02} color="#ff6ac1" transparent opacity={0.03} />
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array(Array.from({ length: 300 }, () => (Math.random() - 0.5) * 40)), // Even fewer particles
              3,
            ]}
          />
        </bufferGeometry>
      </Points>
    </group>
  );
};

const Triangles: React.FC<TrianglesProps> = ({ className = "" }) => {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 5, 25], fov: 60 }} gl={{ alpha: true }}>
        <fog attach="fog" args={["#1A1A1A", 10, 50]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <TriangleStructure />
        <OrbitControls enablePan={true} enableZoom={false} enableRotate={true} /> {/* Disable zoom */}
        <EffectComposer>
          {/* Slightly brighter bloom */}
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.8} intensity={1.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default Triangles;