'use client';

import { useSceneStore } from "@/app/stores/sceneStore";

export default function PropertiesPanel() {
  const { objects, selectedObjectId, updateObject } = useSceneStore();
  const selectedObject = objects.find((obj) => obj.id === selectedObjectId);

  if (!selectedObject) {
    return <div className="p-4 text-gray-400">Select an object to edit properties</div>;
  }

  const handlePositionChange = (axis: 'x' | 'y' | 'z', value: string) => {
    const newPosition = [...selectedObject.position] as [number, number, number];
    newPosition['x' === axis ? 0 : 'y' === axis ? 1 : 2] = parseFloat(value) || 0;
    updateObject(selectedObject.id, { position: newPosition });
  };

  return (
    <div className="p-4 bg-gray-800 border-t border-gray-700 gradient-background">
      <h2 className="text-lg font-bold text-white mb-4">Properties</h2>
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Position X</label>
          <input
            type="number"
            value={selectedObject.position[0]}
            onChange={(e) => handlePositionChange('x', e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-full focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 outline-none"
          />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Position Y</label>
          <input
            type="number"
            value={selectedObject.position[1]}
            onChange={(e) => handlePositionChange('y', e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-full focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 outline-none"
          />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Position Z</label>
          <input
            type="number"
            value={selectedObject.position[2]}
            onChange={(e) => handlePositionChange('z', e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-full focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 outline-none"
          />
        </div>
      </div>
    </div>
  );
}