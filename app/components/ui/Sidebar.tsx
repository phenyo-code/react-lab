/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import GeometryTool from '../tools/GeometryTool';
import MaterialEditor from '../tools/MaterialEditor';
import AnimationTool from '../tools/AnimationTool';
import PhysicsTool from '../tools/PhysicsTool';
import ImportExport from '../tools/ImportExport';

export default function Sidebar() {
  const [activeTool, setActiveTool] = useState('geometry');
  const [showHelp, setShowHelp] = useState(false);

  const tools = {
    geometry: <GeometryTool />,
    materials: <MaterialEditor />,
    animations: <AnimationTool />,
    physics: <PhysicsTool />,
    importExport: <ImportExport />,
    help: (
      <div className="p-4 bg-gray-800 border-b border-gray-700">
        <h2 className="text-lg font-bold text-white mb-4">Help</h2>
        <p className="text-gray-400">Quick Start Guide:</p>
        <ul className="text-gray-400 list-disc pl-5">
          <li>Click "Geometry" to add objects like cubes or cloth.</li>
          <li>Use the Toolbar to move, rotate, or scale objects.</li>
          <li>Add animations in the Animations tab with presets like "Bounce."</li>
          <li>Apply physics in the Physics tab for realistic motion.</li>
        </ul>
      </div>
    ),
  };

  return (
    <div className="w-64 bg-[#1A1A1A] h-screen overflow-y-auto border-r border-gray-700 gradient-background">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-white mb-4">3D Editor</h1>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setActiveTool('geometry')}
            className={`w-full px-4 py-2 rounded-full font-semibold text-white transition-colors duration-300 ${
              activeTool === 'geometry' ? 'bg-pink-600 hover:bg-pink-700' : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            Geometry
          </button>
          <button
            onClick={() => setActiveTool('materials')}
            className={`w-full px-4 py-2 rounded-full font-semibold text-white transition-colors duration-300 ${
              activeTool === 'materials' ? 'bg-pink-600 hover:bg-pink-700' : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            Materials
          </button>
          <button
            onClick={() => setActiveTool('animations')}
            className={`w-full px-4 py-2 rounded-full font-semibold text-white transition-colors duration-300 ${
              activeTool === 'animations' ? 'bg-pink-600 hover:bg-pink-700' : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            Animations
          </button>
          <button
            onClick={() => setActiveTool('physics')}
            className={`w-full px-4 py-2 rounded-full font-semibold text-white transition-colors duration-300 ${
              activeTool === 'physics' ? 'bg-pink-600 hover:bg-pink-700' : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            Physics
          </button>
          <button
            onClick={() => setActiveTool('importExport')}
            className={`w-full px-4 py-2 rounded-full font-semibold text-white transition-colors duration-300 ${
              activeTool === 'importExport' ? 'bg-pink-600 hover:bg-pink-700' : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            Import/Export
          </button>
          <button
            onClick={() => setActiveTool('help')}
            className={`w-full px-4 py-2 rounded-full font-semibold text-white transition-colors duration-300 ${
              activeTool === 'help' ? 'bg-pink-600 hover:bg-pink-700' : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            Help
          </button>
        </div>
      </div>
      {tools[activeTool as keyof typeof tools]}
    </div>
  );
}