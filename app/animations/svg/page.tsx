'use client';

import AnimatedSVG from '@/app/components/animations/AnimatedSVG';
import AnimatedText from '@/app/components/animations/AnimatedText';
import Header from '@/app/components/Header';
import { motion } from 'framer-motion';
import { JSX, useState } from 'react';

const SVGAnimations: React.FC = () => {
  const [selectedSVG, setSelectedSVG] = useState('circle');
  const [inputDuration, setInputDuration] = useState<number | 'Infinity'>('Infinity');

  interface SVGConfig {
    id: string;
    label: string;
    svgContent: JSX.Element;
    description: string;
    strokeColor: string;
    glowColor?: string;
  }

  const svgs: SVGConfig[] = [
    {
      id: 'circle',
      label: 'Circle',
      svgContent: (
        <path d="M50 50 A25 25 0 1 1 50 25 A25 25 0 1 1 50 50" />
      ),
      description: 'A simple circular path with a smooth draw effect.',
      strokeColor: 'text-teal-400',
      glowColor: 'rgba(45, 212, 191, 0.6)',
    },
    {
      id: 'star',
      label: 'Star',
      svgContent: (
        <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" />
      ),
      description: 'A star shape with sharp edges, drawn progressively.',
      strokeColor: 'text-purple-400',
      glowColor: 'rgba(168, 85, 247, 0.7)',
    },
    {
      id: 'spiral',
      label: 'Spiral',
      svgContent: (
        <path d="M50 50 A10 10 0 0 1 60 40 A15 15 0 0 1 65 25 A20 20 0 0 1 60 5 A25 25 0 0 1 35 5 A30 30 0 0 1 20 25 A35 35 0 0 1 25 60 A40 40 0 0 1 50 80" />
      ),
      description: 'A spiral path that draws in a mesmerizing loop.',
      strokeColor: 'text-cyan-400',
      glowColor: 'rgba(6, 182, 212, 0.7)',
    },
  ];

  const handleSVGChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSVG(e.target.value);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputDuration(e.target.value === 'Infinity' ? 'Infinity' : parseFloat(e.target.value));
  };

  const currentSVG = svgs.find((svg) => svg.id === selectedSVG) || svgs[0];

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white font-sans">
      {/* Background Animation */}
      <motion.div
        className="fixed inset-0 -z-10"
        animate={{
          background: [
            'radial-gradient(circle at 10% 10%, rgba(45, 212, 191, 0.15), transparent 70%)',
            'radial-gradient(circle at 90% 90%, rgba(59, 130, 246, 0.15), transparent 70%)',
            'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.15), transparent 70%)',
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
      />

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 px-8 max-w-7xl mx-auto text-center">
        <motion.div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[rgba(45,212,191,0.05)] to-[rgba(59,130,246,0.1)]"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
        <AnimatedText
          effect="holoWave"
          duration={Infinity}
          className="text-teal-500 text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          glowColor="rgba(6, 182, 212, 0.6)"
        >
          SVG Animations
        </AnimatedText>
        <motion.p
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Bring your SVGs to life with ReactLab’s AnimatedSVG component. Powered by Framer Motion, the draw effect creates a stunning, progressive path animation for any SVG shape.
        </motion.p>
      </section>

      {/* Interactive SVG Preview */}
      <section className="py-16 px-8 max-w-7xl mx-auto">
        <AnimatedText
          effect="neon"
          duration={Infinity}
          textColor="text-blue-400"
          className="text-3xl md:text-4xl font-bold text-center mb-8 tracking-tight"
          glowColor="rgba(147, 197, 253, 0.5)"
        >
          Try It Out
        </AnimatedText>
        <motion.div
          className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <select
            value={selectedSVG}
            onChange={handleSVGChange}
            className="px-4 py-2 rounded-full bg-gray-800/50 text-white border border-gray-700/50 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50 outline-none text-lg w-full md:w-64 shadow-[0_0_8px_rgba(45,212,191,0.2)]"
          >
            {svgs.map(({ id, label }) => (
              <option key={id} value={id} className="bg-gray-900 text-white">
                {label}
              </option>
            ))}
          </select>
          <select
            value={inputDuration}
            onChange={handleDurationChange}
            className="px-4 py-2 rounded-full bg-gray-800/50 text-white border border-gray-700/50 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50 outline-none text-lg w-full md:w-64 shadow-[0_0_8px_rgba(45,212,191,0.2)]"
          >
            <option value="2" className="bg-gray-900 text-white">2 seconds</option>
            <option value="4" className="bg-gray-900 text-white">4 seconds</option>
            <option value="Infinity" className="bg-gray-900 text-white">Infinite</option>
          </select>
        </motion.div>
        <motion.div
          className="relative p-8 rounded-2xl bg-gray-900/30 backdrop-blur-sm shadow-[0_0_20px_rgba(45,212,191,0.3)] min-h-[20vh] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatedSVG
            effect="draw"
            strokeColor={currentSVG.strokeColor}
            glowColor={currentSVG.glowColor}
            duration={inputDuration}
            className="w-32 h-32"
          >
            {currentSVG.svgContent}
          </AnimatedSVG>
          <motion.div
            className="absolute inset-0 -z-10"
            style={{ background: `radial-gradient(circle at 50% 50%, ${currentSVG.glowColor || 'rgba(45, 212, 191, 0.2)'}, transparent 70%)` }}
            animate={{ opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      </section>

      {/* SVG Showcase */}
      <section className="py-16 px-8 max-w-7xl mx-auto">
        <AnimatedText
          effect="glowPulse"
          duration={Infinity}
          textColor="text-purple-400"
          className="text-3xl md:text-4xl font-bold text-center mb-12 tracking-tight"
          glowColor="rgba(168, 85, 247, 0.7)"
        >
          SVG Animation Showcase
        </AnimatedText>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {svgs.map(({ id, label, svgContent, description, strokeColor, glowColor }) => (
            <motion.div
              key={id}
              className="p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm shadow-[0_0_15px_rgba(45,212,191,0.2)] hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatedSVG
                effect="draw"
                strokeColor={strokeColor}
                glowColor={glowColor}
                duration={2}
                className="w-24 h-24 mx-auto mb-4"
              >
                {svgContent}
              </AnimatedSVG>
              <h3 className="text-xl font-semibold text-gray-100 mb-2">{label}</h3>
              <p className="text-gray-300 text-sm">{description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SVGAnimations;