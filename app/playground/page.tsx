import ThreeCanvas from '../components/core/Canvas';
import Sidebar from '../components/ui/Sidebar';
import Toolbar from '../components/ui/Toolbar';
import PropertiesPanel from '../components/ui/PropertiesPanel';

export default function Playground() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white font-sans flex flex-col">
      <Toolbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 relative">
          <ThreeCanvas />
          <div className="absolute bottom-0 w-full">
            <PropertiesPanel />
          </div>
        </div>
      </div>
    </div>
  );
}