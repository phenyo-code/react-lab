/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import * as THREE from 'three';
import { useRef, useEffect, JSX } from 'react';
import { useFrame } from '@react-three/fiber';
import { useDrag } from '@use-gesture/react';
import { useSceneStore } from '@/app/stores/sceneStore';
import { useGLTF } from '@react-three/drei';
import ParticleSystem from './ParticleSystem';

interface AnimationKey {
  time: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}

interface ObjectProps {
  id: string;
  geometry: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  material: {
    color: string;
    roughness: number;
    metalness: number;
    type?: 'standard' | 'toon' | 'glass';
  };
  physics?: {
    type: 'rigid' | 'soft' | 'cloth';
    mass: number;
    friction: number;
  };
  animations?: AnimationKey[];
  gltf?: string; // Path to GLTF model
}

export default function Object({ id, geometry, position, rotation, scale, material, physics, animations, gltf }: ObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { updateObject, setSelectedObject, selectedObjectId } = useSceneStore();
  const isSelected = selectedObjectId === id;

  // Load GLTF for cartoon figures
  const gltfModel = gltf ? useGLTF(gltf) : null;

  // Physics for cloth
  // Physics for cloth (not implemented, as @react-three/cannon has no Cloth export)
  // const [clothRef, api] = physics?.type === 'cloth' ? Cloth({ mass: physics.mass, friction: physics.friction }) : [null, null];
  // Animation handling
  useFrame((state, delta) => {
    if (animations && meshRef.current) {
      const time = state.clock.getElapsedTime();
      animations.forEach(({ time: keyTime, position, rotation, scale }) => {
        if (Math.abs(time - keyTime) < 0.1) {
          if (meshRef.current) {
            if (position) meshRef.current.position.set(...position);
            if (rotation) meshRef.current.rotation.set(...rotation);
            if (scale) meshRef.current.scale.set(...scale);
          }
        }
      });
    }
  });

  const bind = useDrag(({ offset: [x, z] }) => {
    updateObject(id, { position: [x / 10, position[1], z / 10] });
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    setSelectedObject(id);
  };

  const geometryMap: Record<string, JSX.Element> = {
    box: <boxGeometry args={[1, 1, 1]} />,
    sphere: <sphereGeometry args={[0.5, 32, 32]} />,
    cylinder: <cylinderGeometry args={[0.5, 0.5, 1, 32]} />,
    torus: <torusGeometry args={[0.5, 0.2, 16, 100]} />,
    cone: <coneGeometry args={[0.5, 1, 32]} />,
    cloth: <planeGeometry args={[2, 2, 32, 32]} />,
  };

  const materialMap = {
    standard: <meshStandardMaterial color={isSelected ? '#ff6ac1' : material.color} roughness={material.roughness} metalness={material.metalness} />,
    toon: <meshToonMaterial color={isSelected ? '#ff6ac1' : material.color} />,
    glass: <meshPhysicalMaterial color={material.color} transmission={0.9} roughness={0} />,
  };

  return (
    <>
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation}
        scale={scale}
        onClick={handleClick}
        {...bind()}
        castShadow
        receiveShadow
      >
        {gltfModel ? <primitive object={gltfModel.scene} /> : geometryMap[geometry] || <boxGeometry args={[1, 1, 1]} />}
        {materialMap[material.type || 'standard']}
      </mesh>
      {geometry === 'smoke' && <ParticleSystem type="smoke" position={position} />}
      {geometry === 'lightning' && (
        <pointLight position={position} intensity={2} color="#fff" distance={10}>
          <mesh>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshBasicMaterial color="#fff" />
          </mesh>
        </pointLight>
      )}
    </>
  );
}