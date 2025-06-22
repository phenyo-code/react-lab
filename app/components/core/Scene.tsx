/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useSceneStore } from '@/app/stores/sceneStore';
import Object from './Object';
import { Physics, usePlane } from '@react-three/cannon';
import * as THREE from 'three';
import { Sky } from '@react-three/drei';

// Ground plane with physics
function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    material: { friction: 0.5, restitution: 0.3 },
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#333" />
    </mesh>
  );
}

export default function Scene() {
  const objects = useSceneStore((state) => state.objects);

  return (
    <Physics gravity={[0, -9.81, 0]} allowSleep>
      {/* Skybox for immersive environment */}
      <Sky distance={4500} sunPosition={[0, 1, 0]} inclination={0.6} azimuth={0.1} />

      {/* Fog for atmospheric effect */}
      <fog attach="fog" args={['#1A1A1A', 10, 50]} />

      {/* Render all objects (cubes, cloth, cartoon figures, smoke, etc.) */}
      {objects.map((obj) => {
        // Convert or extract a string from obj.gltf if necessary
        const { gltf, ...rest } = obj;
        return (
          <Object
            key={obj.id}
            {...rest}
            gltf={typeof gltf === 'string' ? gltf : undefined}
          />
        );
      })}

      {/* Ground plane with physics */}
      <Ground />
    </Physics>
  );
}