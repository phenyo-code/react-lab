
'use client';

import Animated3D from '@/app/components/animations/Animated3D';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';
import { Star } from 'lucide-react';

const Animations3D: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  const opacityRange = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  interface Demo3D {
    title: string;
    description: string;
    animationType: 'cloth' | 'lines' | 'wave' | 'blob' | 'deform';
  }

  const demos3D: Demo3D[] = [
    {
      title: 'Cloth Simulation',
      description: 'A dynamic cloth that drapes naturally with physics-based interactions, perfect for immersive 3D UI elements.',
      animationType: 'cloth',
    },
    {
      title: 'Lines Simulation',
      description: 'Nine thin horizontal lines with cloth-like physics, customizable colors, and dynamic wind effects.',
      animationType: 'lines',
    },
    {
      title: 'Wave Simulation',
      description: 'A rippling surface with wave-like motion, customizable amplitude, frequency, and color.',
      animationType: 'wave',
    },
    {
      title: 'Blob Simulation',
      description: 'A fluid, organic blob with metaball-like merging, customizable size, speed, and color.',
      animationType: 'blob',
    },
    {
      title: 'Mesh Deformation',
      description: 'A deforming cube that stretches and twists dynamically, with customizable intensity and color.',
      animationType: 'deform',
    },
  ];

  const gradientBackground = {
    backgroundImage: `
      linear-gradient(45deg, rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(-45deg, rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(135deg, rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(-135deg, rgba(255,255,255,0.02) 1px, transparent 1px)
    `,
    backgroundSize: '15px 15px',
  };

  const [selectedAnimation, setSelectedAnimation] = useState<'cloth' | 'lines' | 'wave' | 'blob' | 'deform'>('cloth');

  const handleAnimationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAnimation(e.target.value as 'cloth' | 'lines' | 'wave' | 'blob' | 'deform');
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white font-sans">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="py-24 px-6 text-center max-w-7xl mx-auto border-b border-gray-700">
        <motion.div className="flex flex-col items-center" style={{ y: yRange, opacity: opacityRange }}>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            3D Animation Showcase
          </h1>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Experience stunning 3D animations powered by `@react-three/fiber` and `@react-three/rapier`. Explore cloth, lines, waves, blobs, and mesh deformation with interactive controls. Install via `npm install react-animations` to enhance your Next.js projects.
          </p>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/docs"
              className="inline-block px-8 py-3 rounded-full font-semibold text-lg bg-pink-600 text-white hover:bg-pink-700 transition-colors duration-300"
              aria-label="Get Started with Documentation"
            >
              Get Started
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 3D Animation Showcase */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-gray-700" style={gradientBackground}>
        <motion.div className="text-center" style={{ y: yRange, opacity: opacityRange }}>
          <span className="text-[15px] text-gray-700 block mt-1" aria-label="Animation properties for 3D showcase">
            Animations: Cloth, Lines, Wave, Blob, and Deform
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Explore 3D Animations
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-12">
            Dive into our physics-driven and dynamic animations. Adjust parameters like wave amplitude, blob speed, or deformation intensity to see these 3D effects in action.
          </p>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-700">
          {demos3D.map(({ title, description, animationType }, index) => (
            <motion.div
              key={title}
              className={`py-6 flex flex-col items-center text-center ${
                index < demos3D.length - 1 ? 'md:border-r md:border-gray-700' : ''
              } ${index === 0 ? 'border-t md:border-t-0' : ''}`}
              style={{ y: yRange, opacity: opacityRange }}
            >
              <h3 className="text-xl font-semibold mb-2 text-white flex items-center gap-2">
                {title} <Star className="w-5 h-5 text-pink-500" />
              </h3>
              <hr className="border-gray-700 mb-2 max-w-xs mx-auto" />
              <p className="text-gray-400 text-sm max-w-xs mb-4">{description}</p>
              <Animated3D className="w-full max-w-4xl" type={animationType} />
              <hr className="border-gray-700 mt-4 max-w-xs mx-auto" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Try It Out Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-gray-700" style={gradientBackground}>
        <motion.div className="text-center" style={{ y: yRange, opacity: opacityRange }}>
          <span className="text-[15px] text-gray-700 block mt-1" aria-label="Animation properties for 3D tryout">
            Animation: Select Cloth, Lines, Wave, Blob, or Deform
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Try 3D Animations
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Interact with cloth, lines, wave, blob, or deformation animations using Leva controls. Adjust parameters like amplitude, speed, or colors to see dynamic 3D effects.
          </p>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
          <motion.div className="flex justify-center mb-8" style={{ y: yRange, opacity: opacityRange }}>
            <select
              value={selectedAnimation}
              onChange={handleAnimationChange}
              className="px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 outline-none text-lg w-full md:w-64"
            >
              {['cloth', 'lines', 'wave', 'blob', 'deform'].map((type) => (
                <option key={type} value={type} className="bg-gray-900 text-white">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </motion.div>
          <motion.div
            className="p-8 rounded-2xl bg-gray-800 border border-gray-700 min-h-[60vh] flex items-center justify-center"
            style={{ y: yRange, opacity: opacityRange }}
          >
            <Animated3D className="w-full max-w-4xl" type={selectedAnimation} />
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-gray-700">
        <motion.div className="text-center" style={{ y: yRange, opacity: opacityRange }}>
          <span className="text-[15px] text-gray-700 block mt-1" aria-label="Animation properties for CTA">
            Animation: 3D Integration
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Bring 3D to Your Projects
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Elevate your Next.js apps with `react-animations` and 3D effects. Install via `npm install react-animations` and explore our docs to integrate dynamic animations like cloth, lines, waves, blobs, and deformation.
          </p>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/docs"
                className="inline-block px-8 py-3 rounded-full font-semibold text-lg bg-pink-600 text-white hover:bg-pink-700 transition-colors duration-300"
                aria-label="Get Started with Docs"
              >
                Get Started
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="https://github.com/your-repo/react-animations"
                className="inline-block px-8 py-3 rounded-full font-semibold text-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300"
                aria-label="Contribute on GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contribute
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Animations3D;