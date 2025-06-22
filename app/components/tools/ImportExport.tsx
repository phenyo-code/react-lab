/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useSceneStore } from '@/app/stores/sceneStore';
import { v4 as uuidv4 } from 'uuid';

export default function ImportExport() {
  const { addObject } = useSceneStore();

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      addObject({
        id: uuidv4(),
        geometry: 'custom',
        position: [0, 1, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        material: { color: '#ff0000', roughness: 0.5, metalness: 0.5 },
        gltf: url as unknown as any,
      });
    }
  };

  return (
    <div className="p-4 bg-gray-800 border-b border-gray-700">
      <h2 className="text-lg font-bold text-white mb-4">Import/Export</h2>
      <div className="flex flex-col gap-2">
        <input
          type="file"
          accept=".gltf,.glb"
          onChange={handleImport}
          className="px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-full"
        />
        <button className="px-4 py-2 bg-pink-600 text-white rounded-full font-semibold hover:bg-pink-700">
          Export Scene (Coming Soon)
        </button>
      </div>
    </div>
  );
}