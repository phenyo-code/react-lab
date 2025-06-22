/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { SceneObject, useSceneStore } from '@/app/stores/sceneStore';
import { v4 as uuidv4 } from 'uuid';

export default function GeometryTool() {
  const { addObject } = useSceneStore();

  const handleAddObject = (geometry: string, materialType: string = 'standard', physics?: SceneObject['physics'], p0?: string) => {
    const newObject = {
      id: uuidv4(),
      geometry,
      position: [Math.random() * 4 - 2, 1, Math.random() * 4 - 2] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      scale: [1, 1, 1] as [number, number, number],
      material: {
        color: '#ff0000',
        roughness: 0.5,
        metalness: 0.5,
        type: materialType as 'standard' | 'toon' | 'glass',
      },
      physics,
      animations: [],
    };
    addObject(newObject);
  };

  return (
    <div className="p-4 bg-gray-800 border-b border-gray-700 gradient-background">
      <h2 className="text-lg font-bold text-white mb-4">Geometry</h2>
      <div className="flex flex-col gap-2">
        <button
          onClick={() => handleAddObject('box')}
          className="px-4 py-2 bg-pink-600 text-white rounded-full font-semibold hover:bg-pink-700"
        >
          Add Cube
        </button>
        <button
          onClick={() => handleAddObject('sphere')}
          className="px-4 py-2 bg-pink-600 text-white rounded-full font-semibold hover:bg-pink-700"
        >
          Add Sphere
        </button>
        <button
          onClick={() => handleAddObject('cylinder')}
          className="px-4 py-2 bg-pink-600 text-white rounded-full font-semibold hover:bg-pink-700"
        >
          Add Cylinder
        </button>
        <button
          onClick={() => handleAddObject('torus')}
          className="px-4 py-2 bg-pink-600 text-white rounded-full font-semibold hover:bg-pink-700"
        >
          Add Torus
        </button>
        <button
          onClick={() => handleAddObject('cone')}
          className="px-4 py-2 bg-pink-600 text-white rounded-full font-semibold hover:bg-pink-700"
        >
          Add Cone
        </button>
        <button
          onClick={() => handleAddObject('cloth', 'standard', { type: 'cloth', mass: 1, friction: 0.5 })}
          className="px-4 py-2 bg-pink-600 text-white rounded-full font-semibold hover:bg-pink-700"
        >
          Add Cloth
        </button>
        <button
          onClick={() => handleAddObject('cartoon', 'toon', undefined, '/models/lowpoly_character.gltf')}
          className="px-4 py-2 bg-pink-600 text-white rounded-full font-semibold hover:bg-pink-700"
        >
          Add Cartoon Figure
        </button>
        <button
          onClick={() => handleAddObject('smoke')}
          className="px-4 py-2 bg-pink-600 text-white rounded-full font-semibold hover:bg-pink-700"
        >
          Add Smoke
        </button>
        <button
          onClick={() => handleAddObject('lightning')}
          className="px-4 py-2 bg-pink-600 text-white rounded-full font-semibold hover:bg-pink-700"
        >
          Add Lightning
        </button>
      </div>
    </div>
  );
}