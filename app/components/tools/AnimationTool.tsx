/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useSceneStore } from '@/app/stores/sceneStore';
import { useState } from 'react';

export default function AnimationTool() {
  const { selectedObjectId, addAnimation } = useSceneStore();
  const [time, setTime] = useState(0);
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);
  const [scale, setScale] = useState<[number, number, number]>([1, 1, 1]);

  const handleAddKeyframe = () => {
    if (selectedObjectId) {
      addAnimation(selectedObjectId, { time, position, rotation, scale });
    }
  };

  const applyPreset = (preset: string) => {
    if (!selectedObjectId) return;
    if (preset === 'bounce') {
      addAnimation(selectedObjectId, { time: 0, position: [0, 1, 0] });
      addAnimation(selectedObjectId, { time: 1, position: [0, 2, 0] });
      addAnimation(selectedObjectId, { time: 2, position: [0, 1, 0] });
    } else if (preset === 'spin') {
      addAnimation(selectedObjectId, { time: 0, rotation: [0, 0, 0] });
      addAnimation(selectedObjectId, { time: 2, rotation: [0, Math.PI * 2, 0] });
    }
  };

  return (
    <div className="p-4 bg-gray-800 border-b border-gray-700">
      <h2 className="text-lg font-bold text-white mb-4">Animations</h2>
      {!selectedObjectId ? (
        <p className="text-gray-400">Select an object to add animations</p>
      ) : (
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-400">Time (s)</label>
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(parseFloat(e.target.value))}
              className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-full"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Position</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={position[0]}
                onChange={(e) => setPosition([parseFloat(e.target.value), position[1], position[2]])}
                className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-full"
              />
              <input
                type="number"
                value={position[1]}
                onChange={(e) => setPosition([position[0], parseFloat(e.target.value), position[2]])}
                className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-full"
              />
              <input
                type="number"
                value={position[2]}
                onChange={(e) => setPosition([position[0], position[1], parseFloat(e.target.value)])}
                className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-full"
              />
            </div>
          </div>
          <button
            onClick={handleAddKeyframe}
            className="px-4 py-2 bg-pink-600 text-white rounded-full font-semibold hover:bg-pink-700"
          >
            Add Keyframe
          </button>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-white">Presets</h3>
            <button
              onClick={() => applyPreset('bounce')}
              className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
            >
              Bounce
            </button>
            <button
              onClick={() => applyPreset('spin')}
              className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
            >
              Spin
            </button>
          </div>
        </div>
      )}
    </div>
  );
}