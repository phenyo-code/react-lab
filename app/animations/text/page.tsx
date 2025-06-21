'use client';

import AnimatedText from '@/app/components/animations/AnimatedText';
import Header from '@/app/components/Header';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import Link from 'next/link';

const TextAnimations: React.FC = () => {
  const [inputText, setTextInput] = useState('Type your text');
  const [selectedTextEffect, setTextEffect] = useState<
    | 'fade'
    | 'slide'
    | 'neon'
    | 'glitch'
    | 'wave'
    | 'flip'
    | 'pulse'
    | 'burst'
    | 'sparkle'
    | 'vaporwave'
    | 'hologram'
    | 'ripple'
    | 'pixelate'
    | 'quantum'
    | 'blur'
    | 'vortex'
    | 'echo'
    | 'chromaticAberration'
    | 'distort'
    | 'bounce'
    | 'glowPulse'
    | 'dataStream'
    | 'holoWave'
    | 'neonCircuit'
  >('fade');

  interface AnimationConfig {
    effect:
      | 'fade'
      | 'slide'
      | 'neon'
      | 'glitch'
      | 'wave'
      | 'flip'
      | 'pulse'
      | 'burst'
      | 'sparkle'
      | 'vaporwave'
      | 'hologram'
      | 'ripple'
      | 'pixelate'
      | 'quantum'
      | 'blur'
      | 'vortex'
      | 'echo'
      | 'chromaticAberration'
      | 'distort'
      | 'bounce'
      | 'glowPulse'
      | 'dataStream'
      | 'holoWave'
      | 'neonCircuit';
    text: string;
    description: string;
    color: string;
  }

  const animations: AnimationConfig[] = [
    { effect: 'fade', text: 'Fade Animation', description: 'Smoothly fade in your text.', color: 'text-pink-500' },
    { effect: 'slide', text: 'Slide Animation', description: 'Slide text into view elegantly.', color: 'text-pink-500' },
    { effect: 'neon', text: 'Neon Glow Animation', description: 'Pulsing glow with a futuristic vibe.', color: 'text-pink-500' },
    { effect: 'glitch', text: 'Glitch Effect', description: 'Cyberpunk-style distortion.', color: 'text-pink-500' },
    { effect: 'wave', text: 'Wave Animation', description: 'Characters wave fluidly.', color: 'text-pink-500' },
    { effect: 'flip', text: 'Flip Animation', description: '3D-like character flips.', color: 'text-pink-500' },
    { effect: 'pulse', text: 'Pulse Effect', description: 'Continuous scaling for attention.', color: 'text-pink-500' },
    { effect: 'burst', text: 'Burst Effect', description: 'Explosive character scatter.', color: 'text-pink-500' },
    { effect: 'sparkle', text: 'Sparkle Effect', description: 'Dazzling, sparkling characters.', color: 'text-pink-500' },
    { effect: 'vaporwave', text: 'Vaporwave Vibe', description: 'Retro-futuristic color cycling.', color: 'text-pink-500' },
    { effect: 'hologram', text: 'Hologram Effect', description: 'Sci-fi flickering hologram.', color: 'text-pink-500' },
    { effect: 'ripple', text: 'Ripple Animation', description: 'Characters pulse like water ripples.', color: 'text-pink-500' },
    { effect: 'pixelate', text: 'Pixelate Effect', description: 'Text breaks into pixels and reforms.', color: 'text-pink-500' },
    { effect: 'quantum', text: 'Quantum Effect', description: 'Characters teleport randomly.', color: 'text-pink-500' },
    { effect: 'blur', text: 'Blur Animation', description: 'Dreamy blur fade-in effect.', color: 'text-pink-500' },
    { effect: 'vortex', text: 'Vortex Animation', description: 'Characters swirl in like a portal.', color: 'text-pink-500' },
    { effect: 'echo', text: 'Echo Effect', description: 'Trailing, fading character duplicates.', color: 'text-pink-500' },
    {
      effect: 'chromaticAberration',
      text: 'Chromatic Aberration',
      description: 'RGB split for a lens effect.',
      color: 'text-pink-500',
    },
    { effect: 'distort', text: 'Distort Animation', description: 'Warped, wavy text effect.', color: 'text-pink-500' },
    { effect: 'bounce', text: 'Bounce Animation', description: 'Springy character bounce.', color: 'text-pink-500' },
    { effect: 'glowPulse', text: 'Glow Pulse', description: 'Subtle pulsing glow effect.', color: 'text-pink-500' },
    { effect: 'dataStream', text: 'Data Stream', description: 'Text streams in like digital data bits.', color: 'text-pink-500' },
    { effect: 'holoWave', text: 'Holo Wave', description: 'Holographic wave with 3D depth.', color: 'text-pink-500' },
    { effect: 'neonCircuit', text: 'Neon Circuit', description: 'Circuit-like glowing traces.', color: 'text-pink-500' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value || 'Type your text');
  };

  const handleEffectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTextEffect(e.target.value as typeof selectedTextEffect);
  };

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // Scroll-based slide-up effect
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  const opacityRange = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <div
      className="min-h-screen bg-[#1A1A1A] text-white font-sans relative"
      style={{
        backgroundImage: `
          linear-gradient(45deg, rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(-45deg, rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(135deg, rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(-135deg, rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(30deg, rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(-30deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '15px 15px',
      }}
    >
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto text-center border-b border-gray-700">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          <AnimatedText
            effect="wave"
            duration={Infinity}
            textColor="text-white"
            className="text-4xl md:text-5xl font-bold tracking-tight"
          >
            Text Animations
          </AnimatedText>
        </h1>
        <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          Elevate your UI with 24 lightweight, TypeScript-friendly text animations, powered by Framer Motion. Craft dynamic, professional effects directly in your React components.
        </p>
        <Link
          href="#try-it-out"
          className="inline-block bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition-colors duration-200 text-lg font-medium"
        >
          Explore Animations
        </Link>
      </section>

      {/* Interactive Input Section */}
      <section id="try-it-out" className="py-16 px-6 max-w-7xl mx-auto border-b border-gray-700">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white text-center mb-8 tracking-tight"
          style={{ y: yRange, opacity: opacityRange }}
        >
          Try It Out
        </motion.h2>
        <motion.div
          className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12"
          style={{ y: yRange, opacity: opacityRange }}
        >
          <input
            type="text"
            value={inputText === 'Type your text' ? '' : inputText}
            onChange={handleInputChange}
            placeholder="Type your text"
            className="px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 outline-none text-lg w-full md:w-96"
          />
          <select
            value={selectedTextEffect}
            onChange={handleEffectChange}
            className="px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 outline-none text-lg w-full md:w-64"
          >
            {animations.map(({ effect, text }) => (
              <option key={effect} value={effect} className="bg-gray-900 text-white">
                {text}
              </option>
            ))}
          </select>
        </motion.div>
        <motion.div
          className="p-8 rounded-2xl bg-gray-800 border border-gray-700 min-h-[20vh] flex items-center justify-center"
          style={{ y: yRange, opacity: opacityRange }}
        >
          <AnimatedText
            effect={selectedTextEffect}
            duration={
              ['pulse', 'neon', 'vaporwave', 'ripple', 'sparkle', 'glowPulse', 'dataStream', 'holoWave', 'neonCircuit'].includes(
                selectedTextEffect
              )
                ? Infinity
                : 2
            }
            textColor="text-pink-500"
            className="text-2xl md:text-3xl font-bold tracking-tight"
          >
            {inputText}
          </AnimatedText>
        </motion.div>
      </section>

      {/* Animation Showcase */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white text-center mb-12 tracking-tight"
          style={{ y: yRange, opacity: opacityRange }}
        >
          Animation Showcase
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {animations.map(({ effect, text, description, color }, index) => (
            <motion.div
              key={effect}
              className={`p-6 rounded-lg bg-gray-800 border border-gray-700 ${
                index % 4 !== 3 ? 'lg:border-r-0' : ''
              } ${index < animations.length - (animations.length % 4 || 4) ? 'border-b-0 sm:border-b' : ''}`}
              style={{ y: yRange, opacity: opacityRange }}
            >
              <AnimatedText
                effect={effect}
                duration={
                  ['pulse', 'neon', 'vaporwave', 'ripple', 'sparkle', 'glowPulse', 'dataStream', 'holoWave', 'neonCircuit'].includes(
                    effect
                  )
                    ? Infinity
                    : 2
                }
                textColor={color}
                className="text-xl font-semibold mb-4 tracking-tight"
              >
                {text}
              </AnimatedText>
              <p className="text-gray-400 text-sm">{description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-gray-400 border-t border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/docs" className="hover:text-pink-500 transition-colors duration-200">
              Docs
            </Link>
            <Link href="/animations" className="hover:text-pink-500 transition-colors duration-200">
              Showcase
            </Link>
            <Link
              href="https://github.com/your-repo/react-lab"
              className="hover:text-pink-500 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          </div>
          <p>Copyright © 2025 React Lab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TextAnimations;