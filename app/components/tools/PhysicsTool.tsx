'use client';

import { useSceneStore } from '@/app/stores/sceneStore';
import { useState } from 'react';

export default function PhysicsTool() {
  const { selectedObjectId, updateObject } = useSceneStore();
  const [physicsType, setPhysicsType] = useState<'rigid' | 'soft' | 'cloth'>('rigid');
  const [mass, setMass] = useState(1);
  const [friction, setFriction] = useState(0.5);

  const handleApplyPhysics = () => {
    if (selectedObjectId) {
      updateObject(selectedObjectId, { physics: { type: physicsType, mass, friction } });
    }
  };

  return (
    <div className="p-4 bg-gray-800 border-b border-gray-700">
      <h2 className="text-lg font-bold text-white mb-4">Physics</h2>
      {!selectedObjectId ? (
        <p className="text-gray-400">Select an object to apply physics</p>
      ) : (
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-400">Physics Type</label>
            <select
              value={physicsType}
              onChange={(e) => setPhysicsType(e.target.value as 'rigid' | 'soft' | 'cloth')}
              className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-full"
            >
              <option value="rigid">Rigid Body</option>
              <option value="soft">Soft Body</option>
              <option value="cloth">Cloth</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-400">Mass</label>
            <input
              type="number"
              value={mass}
              onChange={(e) => setMass(parseFloat(e.target.value))}
              className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-full"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Friction</label>
            <input
              type="number"
              value={friction}
              onChange={(e) => setFriction(parseFloat(e.target.value))}
              className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-full"
            />
          </div>
          <button
            onClick={handleApplyPhysics}
            className="px-4 py-2 bg-pink-600 text-white rounded-full font-semibold hover:bg-pink-700"
          >
            Apply Physics
          </button>
        </div>
      )}
    </div>
  );
}