'use client';

import { useControls } from 'leva';
import { useSceneStore } from '@/app/stores/sceneStore';
import { useEffect } from 'react';

export default function MaterialEditor() {
  const { objects, selectedObjectId, updateObject } = useSceneStore();
  const selectedObject = objects.find((obj) => obj.id === selectedObjectId);

  const materialProps = useControls(
    'Material',
    {
      color: { value: selectedObject?.material.color || '#ff0000' },
      roughness: { value: selectedObject?.material.roughness || 0.5, min: 0, max: 1 },
      metalness: { value: selectedObject?.material.metalness || 0.5, min: 0, max: 1 },
    },
    [selectedObject]
  );

  useEffect(() => {
    if (selectedObject && selectedObjectId) {
      updateObject(selectedObjectId, { material: materialProps });
    }
  }, [materialProps, selectedObject, selectedObjectId, updateObject]);

  return selectedObject ? null : (
    <div className="p-4 text-gray-400">Select an object to edit material</div>
  );
}