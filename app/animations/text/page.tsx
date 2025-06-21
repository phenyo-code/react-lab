'use client';

import AnimatedText from '@/app/components/animations/AnimatedText';
import Header from '@/app/components/Header';
import { useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

const Animations: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  interface AnimationConfig {
    effect: 'fade' | 'slide' | 'neon' | 'glitch' | 'wave' | 'flip' | 'pulse' | 'burst' | 'sparkle' | 'vaporwave' | 'hologram' | 'ripple' | 'pixelate' | 'quantum' | 'blur' | 'vortex' | 'echo' | 'chromaticAberration' | 'distort' | 'bounce' | 'glowPulse' | 'dataStream' | 'holoWave' | 'neonCircuit';
    text: string;
    description: string;
    color: string;
    glowColor?: string;
  }

  const animations: AnimationConfig[] = [
    { effect: 'fade', text: 'Fade Animation', description: 'Smoothly fade in your text.', color: 'text-teal-600' },
    { effect: 'slide', text: 'Slide Animation', description: 'Slide text into view elegantly.', color: 'text-indigo-600' },
    { effect: 'neon', text: 'Neon Glow', description: 'Pulsing glow with a futuristic vibe.', color: 'text-blue-500', glowColor: 'rgba(147, 197, 253, 0.5)' },
    { effect: 'glitch', text: 'Glitch Effect', description: 'Cyberpunk-style distortion.', color: 'text-cyan-500' },
    { effect: 'wave', text: 'Wave Animation', description: 'Characters wave fluidly.', color: 'text-pink-500' },
    { effect: 'flip', text: 'Flip Animation', description: '3D-like character flips.', color: 'text-purple-400' },
    { effect: 'pulse', text: 'Pulse Effect', description: 'Continuous scaling for attention.', color: 'text-red-500' },
    { effect: 'burst', text: 'Burst Effect', description: 'Explosive character scatter.', color: 'text-orange-500' },
    { effect: 'sparkle', text: 'Sparkle Effect', description: 'Dazzling, sparkling characters.', color: 'text-yellow-500', glowColor: 'rgba(255, 215, 0, 0.7)' },
    { effect: 'vaporwave', text: 'Vaporwave Vibe', description: 'Retro-futuristic color cycling.', color: 'text-pink-400', glowColor: 'rgba(255, 106, 193, 0.7)' },
    { effect: 'hologram', text: 'Hologram Effect', description: 'Sci-fi flickering hologram.', color: 'text-blue-400', glowColor: 'rgba(59, 130, 246, 0.5)' },
    { effect: 'ripple', text: 'Ripple Animation', description: 'Characters pulse like water ripples.', color: 'text-teal-400' },
    { effect: 'pixelate', text: 'Pixelate Effect', description: 'Text breaks into pixels and reforms.', color: 'text-green-400' },
    { effect: 'quantum', text: 'Quantum Effect', description: 'Characters teleport randomly.', color: 'text-purple-500' },
    { effect: 'blur', text: 'Blur Animation', description: 'Dreamy blur fade-in effect.', color: 'text-indigo-500' },
    { effect: 'vortex', text: 'Vortex Animation', description: 'Characters swirl in like a portal.', color: 'text-orange-400' },
    { effect: 'echo', text: 'Echo Effect', description: 'Trailing, fading character duplicates.', color: 'text-cyan-400' },
    { effect: 'chromaticAberration', text: 'Chromatic Aberration', description: 'RGB split for a lens effect.', color: 'text-red-500' },
    { effect: 'distort', text: 'Distort Animation', description: 'Warped, wavy text effect.', color: 'text-yellow-400' },
    { effect: 'bounce', text: 'Bounce Animation', description: 'Springy character bounce.', color: 'text-pink-600' },
    { effect: 'glowPulse', text: 'Glow Pulse', description: 'Subtle pulsing glow effect.', color: 'text-blue-600', glowColor: 'rgba(96, 165, 250, 0.7)' },
    { effect: 'dataStream', text: 'Data Stream', description: 'Text streams in like digital data bits.', color: 'text-green-500', glowColor: 'rgba(34, 197, 94, 0.7)' },
    { effect: 'holoWave', text: 'Holo Wave', description: 'Holographic wave with 3D depth.', color: 'text-cyan-500', glowColor: 'rgba(6, 182, 212, 0.7)' },
    { effect: 'neonCircuit', text: 'Neon Circuit', description: 'Circuit-like glowing traces.', color: 'text-purple-500', glowColor: 'rgba(168, 85, 247, 0.7)' },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Dark/Light Mode Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
      </button>

      {/* Header */}
      <Header />

      {/* Animation Showcase */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <AnimatedText
          effect="wave"
          duration={Infinity}
          textColor={isDarkMode ? 'text-teal-400' : 'text-indigo-700'}
          fontSize="text-3xl md:text-4xl"
          className="text-center mb-12"
        >
          Animation Showcase
        </AnimatedText>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {animations.map(({ effect, text, description, color, glowColor }) => (
            <div
              key={effect}
              className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <AnimatedText
                effect={effect}
                duration={['pulse', 'neon', 'vaporwave', 'ripple', 'sparkle', 'glowPulse', 'dataStream', 'holoWave', 'neonCircuit'].includes(effect) ? Infinity : 2}
                textColor={isDarkMode ? color.replace('500', '400').replace('600', '500').replace('400', '300') : color}
                fontSize="text-xl"
                glowColor={glowColor}
              >
                {text}
              </AnimatedText>
              <p className={`mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Animations;