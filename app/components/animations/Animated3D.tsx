/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Physics, RigidBody } from '@react-three/rapier';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useControls } from 'leva';
import { Star } from 'lucide-react';

interface Animated3DProps {
  className?: string;
  type?: 'cloth' | 'lines' | 'wave' | 'blob' | 'deform';
}

const ClothSimulation: React.FC = () => {
  const clothRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  const { windStrength, clothStiffness } = useControls('Cloth', {
    windStrength: { value: 0, min: 0, max: 10, step: 0.1 },
    clothStiffness: { value: 0.1, min: 0.01, max: 1, step: 0.01 },
    textureImage: {
      value: null,
      label: 'Texture Image',
      options: [null],
      onChange: (file: File | null) => {
        if (file) {
          const url = URL.createObjectURL(file);
          const loader = new THREE.TextureLoader();
          loader.load(
            url,
            (tex) => {
              tex.flipY = false;
              setTexture(tex);
              URL.revokeObjectURL(url);
            },
            undefined,
            (err) => console.error('Texture load error:', err)
          );
        } else {
          setTexture(null);
        }
      },
    },
  });

  const defaultTexture = useLoader(THREE.TextureLoader, '/textures/fabric.jpg');
  const width = 10;
  const height = 10;
  const segments = 32;
  const geometry = new THREE.PlaneGeometry(width, height, segments, segments);
  const material = new THREE.MeshStandardMaterial({
    map: texture || defaultTexture,
    side: THREE.DoubleSide,
    metalness: 0.2,
    roughness: 0.8,
    transparent: true,
  });

  useFrame(() => {
    if (clothRef.current) {
      const positions = clothRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const z = positions[i + 2];
        const wind = Math.sin(x + Date.now() * 0.001) * windStrength;
        positions[i + 2] = z + wind * 0.01;
      }
      clothRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group rotation={[0, Math.PI / 6, 0]}>
      <RigidBody type="fixed" colliders={false} restitution={0} friction={0.7}>
        <mesh
          ref={clothRef}
          geometry={geometry}
          material={material}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

const LinesSimulation: React.FC = () => {
  const lineRefs = useRef<THREE.Mesh[]>([]);
  const { windStrength, clothStiffness, lineColor } = useControls('Lines', {
    windStrength: { value: 0.4, min: 0, max: 10, step: 0.1 },
    clothStiffness: { value: 0.01, min: 0.01, max: 1, step: 0.01 },
    lineColor: { value: '#ff6ac1', label: 'Color' },
  });

  const width = 10;
  const lineHeight = 0.3;
  const gap = 0.05;
  const numLines = 9;
  const geometry = new THREE.PlaneGeometry(width, lineHeight, 20, 1);
  const material = new THREE.MeshStandardMaterial({
    color: lineColor,
    side: THREE.DoubleSide,
    metalness: 0.2,
    roughness: 0.8,
  });

  useFrame(() => {
    lineRefs.current.forEach((line) => {
      if (line) {
        const positions = line.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          const x = positions[i];
          const z = positions[i + 2];
          const wind = Math.sin(x + Date.now() * 0.001) * windStrength;
          positions[i + 2] = z + wind * 0.01;
        }
        line.geometry.attributes.position.needsUpdate = true;
      }
    });
  });

  return (
    <group rotation={[0, Math.PI / 6, 0]}>
      {Array.from({ length: numLines }).map((_, index) => {
        const yPos = (numLines - 1) * (lineHeight + gap) * 0.5 - index * (lineHeight + gap);
        return (
          <RigidBody key={index} type="fixed" colliders={false} restitution={0} friction={0.7}>
            <mesh
              ref={(el) => (lineRefs.current[index] = el!)}
              geometry={geometry}
              material={material}
              position={[0, yPos, 0]}
              castShadow
              receiveShadow
            />
          </RigidBody>
        );
      })}
    </group>
  );
};

const WaveSimulation: React.FC = () => {
  const waveRef = useRef<THREE.Mesh>(null);
  const { waveAmplitude, waveFrequency, waveColor } = useControls('Wave', {
    waveAmplitude: { value: 1, min: 0, max: 2, step: 0.1 },
    waveFrequency: { value: 1, min: 0.1, max: 3, step: 0.1 },
    waveColor: { value: '#ff6ac1', label: 'Color' },
  });

  const geometry = new THREE.PlaneGeometry(10, 10, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color: waveColor,
    side: THREE.DoubleSide,
    metalness: 0.3,
    roughness: 0.7,
  });

  useFrame((state) => {
    if (waveRef.current) {
      const positions = waveRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        positions[i + 2] = Math.sin(x * waveFrequency + time) * Math.sin(y * waveFrequency + time) * waveAmplitude;
      }
      waveRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group rotation={[0, Math.PI / 6, 0]}>
      <RigidBody type="fixed" colliders={false} restitution={0} friction={0.7}>
        <mesh
          ref={waveRef}
          geometry={geometry}
          material={material}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

const BlobSimulation: React.FC = () => {
  const blobRef = useRef<THREE.Mesh>(null);
  const { blobRadius, blobSpeed, blobColor } = useControls('Blob', {
    blobRadius: { value: 1, min: 0.5, max: 2, step: 0.1 },
    blobSpeed: { value: 1, min: 0.1, max: 2, step: 0.1 },
    blobColor: { value: '#ff6ac1', label: 'Color' },
  });

  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(blobColor) },
      uRadius: { value: blobRadius },
    },
    vertexShader: `
      varying vec3 vPosition;
      void main() {
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor;
      uniform float uRadius;
      varying vec3 vPosition;
      void main() {
        float dist = length(vPosition);
        float intensity = smoothstep(uRadius, uRadius * 0.5, dist);
        gl_FragColor = vec4(uColor, intensity * 0.8);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
  });

  useFrame((state) => {
    if (blobRef.current) {
      const time = state.clock.elapsedTime * blobSpeed;
      blobRef.current.position.set(
        Math.sin(time) * 2,
        Math.cos(time * 0.7) * 1.5,
        Math.sin(time * 0.5) * 1
      );
      (blobRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = time;
      (blobRef.current.material as THREE.ShaderMaterial).uniforms.uColor.value.set(blobColor);
      (blobRef.current.material as THREE.ShaderMaterial).uniforms.uRadius.value = blobRadius;
    }
  });

  return (
    <group rotation={[0, Math.PI / 6, 0]}>
      <mesh ref={blobRef} geometry={geometry} material={material} />
    </group>
  );
};

const DeformSimulation: React.FC = () => {
  const deformRef = useRef<THREE.Mesh>(null);
  const { deformAmount, deformSpeed, deformColor } = useControls('Deform', {
    deformAmount: { value: 1, min: 0, max: 2, step: 0.1 },
    deformSpeed: { value: 1, min: 0.1, max: 2, step: 0.1 },
    deformColor: { value: '#ff6ac1', label: 'Color' },
  });

  const geometry = new THREE.BoxGeometry(5, 5, 5, 16, 16, 16);
  const material = new THREE.MeshStandardMaterial({
    color: deformColor,
    metalness: 0.3,
    roughness: 0.7,
  });

  useFrame((state) => {
    if (deformRef.current) {
      const positions = deformRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime * deformSpeed;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];
        positions[i] = x + Math.sin(y * 0.5 + time) * deformAmount * 0.5;
        positions[i + 1] = y + Math.cos(z * 0.5 + time) * deformAmount * 0.5;
        positions[i + 2] = z + Math.sin(x * 0.5 + time) * deformAmount * 0.5;
      }
      deformRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group rotation={[0, Math.PI / 6, 0]}>
      <RigidBody type="fixed" colliders={false} restitution={0} friction={0.7}>
        <mesh
          ref={deformRef}
          geometry={geometry}
          material={material}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

const GroundPlane: React.FC = () => {
  const geometry = new THREE.PlaneGeometry(20, 20);
  const material = new THREE.ShadowMaterial({ opacity: 0.3 });
  return (
    <RigidBody type="fixed">
      <mesh
        geometry={geometry}
        material={material}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -5, 0]}
        receiveShadow
      />
    </RigidBody>
  );
};

const Animated3D: React.FC<Animated3DProps> = ({ className = '', type = 'cloth' }) => {
  return (
    <div className={`relative w-full h-[60vh] ${className}`}>
      <Canvas
        camera={{ position: [5, 2, 15], fov: 50 }}
        shadows
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-near={0.1}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
        <Physics gravity={[0, -9.81, 0]}>
          {type === 'cloth' ? (
            <ClothSimulation />
          ) : type === 'lines' ? (
            <LinesSimulation />
          ) : type === 'wave' ? (
            <WaveSimulation />
          ) : type === 'blob' ? (
            <BlobSimulation />
          ) : (
            <DeformSimulation />
          )}
          {type !== 'blob' && <GroundPlane />}
        </Physics>
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={1.5} />
        </EffectComposer>
      </Canvas>
      <div className="absolute top-4 right-4">
        <Star className="w-6 h-6 text-pink-500" />
      </div>
    </div>
  );
};

export default Animated3D;