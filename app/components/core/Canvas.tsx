/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Canvas, extend } from '@react-three/fiber';
import { OrbitControls, Stars, TransformControls } from '@react-three/drei';
import * as THREE from 'three';
import { useState } from 'react';
import { useSceneStore } from '@/app/stores/sceneStore';
import Scene from './Scene';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// Extend necessary THREE.js objects
extend({ GridHelper: THREE.GridHelper });

export default function ThreeCanvas() {
  const { selectedObjectId } = useSceneStore();
  const [transformMode, setTransformMode] = useState<'translate' | 'rotate' | 'scale'>('translate');

  return (
    <Canvas
      camera={{ position: [0, 5, 10], fov: 60 }}
      style={{ height: '100vh', width: '100%' }}
      className="bg-[#1A1A1A]"
      shadows
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <pointLight position={[0, 10, 0]} intensity={0.8} color="#fff" />
      <Stars />
      <gridHelper args={[100, 100]} />
      <OrbitControls enableDamping dampingFactor={0.05} />
      {selectedObjectId && (
        <TransformControls mode={transformMode} object={useSceneStore.getState().objects.find((obj) => obj.id === selectedObjectId)?.meshRef} />
      )}
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>
      <Scene />
    </Canvas>
  );
}