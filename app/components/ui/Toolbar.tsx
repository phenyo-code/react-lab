/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useSceneStore } from '@/app/stores/sceneStore';
import { useState, useEffect } from 'react';

// Import the correct SceneObject type from the scene store or its model definition
import type { SceneObject } from '@/app/stores/sceneStore';

export default function Toolbar() {
  const { objects, removeObject, setSelectedObject, setTransformMode } = useSceneStore();
  const [history, setHistory] = useState<SceneObject[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleClearScene = () => {
    objects.forEach((obj) => removeObject(obj.id));
    setSelectedObject(null);
    setHistory([...history.slice(0, historyIndex + 1), objects]);
    setHistoryIndex(historyIndex + 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      useSceneStore.setState({ objects: history[historyIndex - 1] });
      setHistoryIndex(historyIndex - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      useSceneStore.setState({ objects: history[historyIndex + 1] });
      setHistoryIndex(historyIndex + 1);
    }
  };

  useEffect(() => {
    setHistory([...history.slice(0, historyIndex + 1), objects]);
    setHistoryIndex(historyIndex + 1);
  }, [objects]);

  return (
    <div className="bg-[#1A1A1A] p-2 border-b border-gray-700 flex gap-2 gradient-background">
      <button
        onClick={() => setTransformMode('translate')}
        className="px-4 py-2 bg-pink-600 text-white rounded-full font-semibold hover:bg-pink-700"
      >
        Move
      </button>
      <button
        onClick={() => setTransformMode('rotate')}
        className="px-4 py-2 bg-pink-600 text-white rounded-full font-semibold hover:bg-pink-700"
      >
        Rotate
      </button>
      <button
        onClick={() => setTransformMode('scale')}
        className="px-4 py-2 bg-pink-600 text-white rounded-full font-semibold hover:bg-pink-700"
      >
        Scale
      </button>
      <button
        onClick={handleUndo}
        className="px-4 py-2 bg-gray-800 text-white rounded-full font-semibold hover:bg-gray-700"
      >
        Undo
      </button>
      <button
        onClick={handleRedo}
        className="px-4 py-2 bg-gray-800 text-white rounded-full font-semibold hover:bg-gray-700"
      >
        Redo
      </button>
      <button
        onClick={handleClearScene}
        className="px-4 py-2 bg-gray-800 text-white rounded-full font-semibold hover:bg-gray-700"
      >
        Clear Scene
      </button>
    </div>
  );
}