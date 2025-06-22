import { create } from 'zustand';
import * as THREE from 'three';
import { Mesh } from 'three';
import { GLTF } from 'three-stdlib';

interface AnimationKey {
  time: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}

export interface SceneObject {
  id: string;
  geometry: string; // e.g., box, sphere, cloth, cartoon
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  material: {
    color: string;
    roughness: number;
    metalness: number;
    type?: 'standard' | 'toon' | 'glass';
  };
  physics?: {
    type: 'rigid' | 'soft' | 'cloth';
    mass: number;
    friction: number;
  };
  animations?: AnimationKey[];
  meshRef?: Mesh; // Reference to THREE.Mesh
  gltf?: GLTF; // For imported models like cartoon figures
}

interface SceneState {
  objects: SceneObject[];
  selectedObjectId: string | null;
  transformMode: 'translate' | 'rotate' | 'scale';
  addObject: (obj: SceneObject) => void;
  updateObject: (id: string, updates: Partial<SceneObject>) => void;
  removeObject: (id: string) => void;
  setSelectedObject: (id: string | null) => void;
  setTransformMode: (mode: 'translate' | 'rotate' | 'scale') => void;
  addAnimation: (id: string, key: AnimationKey) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  objects: [],
  selectedObjectId: null,
  transformMode: 'translate',
  addObject: (obj) => set((state) => ({ objects: [...state.objects, { ...obj, meshRef: new THREE.Mesh() }] })),
  updateObject: (id, updates) =>
    set((state) => ({
      objects: state.objects.map((obj) => (obj.id === id ? { ...obj, ...updates } : obj)),
    })),
  removeObject: (id) =>
    set((state) => ({
      objects: state.objects.filter((obj) => obj.id !== id),
      selectedObjectId: state.selectedObjectId === id ? null : state.selectedObjectId,
    })),
  setSelectedObject: (id) => set({ selectedObjectId: id }),
  setTransformMode: (mode) => set({ transformMode: mode }),
  addAnimation: (id, key) =>
    set((state) => ({
      objects: state.objects.map((obj) =>
        obj.id === id ? { ...obj, animations: [...(obj.animations || []), key] } : obj
      ),
    })),
}));