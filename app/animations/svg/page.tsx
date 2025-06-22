'use client';

import AnimatedSVG from '@/app/components/animations/AnimatedSVG';
import Header from '@/app/components/Header';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import Link from 'next/link';

const SVGAnimations: React.FC = () => {
  const [inputText, setTextInput] = useState('Type your text');
  const [selectedEffect, setEffect] = useState<
    'neonDraw' | 'fireDraw' | 'electricDraw' | 'inkDraw' | 'pulseDraw' | 'scribbleDraw' | 'waterDraw' | 'goldDraw' | 'vortexDraw' | 'frostDraw' | 'shadowDraw' | 'sandDraw' | 'smokeDraw' | 'waveDraw' | 'fadeDraw' | 'whiteNeonDraw' | 'customColorDraw'
  >('neonDraw');
  const [customColor, setCustomColor] = useState('#ff6ac1'); // Default custom color

  interface AnimationConfig {
    effect: 'neonDraw' | 'fireDraw' | 'electricDraw' | 'inkDraw' | 'pulseDraw' | 'scribbleDraw' | 'waterDraw' | 'goldDraw' | 'vortexDraw' | 'frostDraw' | 'shadowDraw' | 'sandDraw' | 'smokeDraw' | 'waveDraw' | 'fadeDraw' | 'whiteNeonDraw' | 'customColorDraw';
    text: string;
    description: string;
    color: string;
  }

  const animations: AnimationConfig[] = [
    {
      effect: 'neonDraw',
      text: 'Neon Draw',
      description: 'Text draws with a pulsating neon glow and flicker.',
      color: '#ff6ac1',
    },
    {
      effect: 'fireDraw',
      text: 'Fire Draw',
      description: 'Text draws with a fiery orange-red stroke and glowing flame effect.',
      color: '#ff4500',
    },
    {
      effect: 'electricDraw',
      text: 'Electric Draw',
      description: 'Text draws with a jagged electric-blue stroke and sparking distortion.',
      color: '#00b7eb',
    },
    {
      effect: 'inkDraw',
      text: 'Ink Draw',
      description: 'Text draws like wet ink with a dripping, turbulent effect.',
      color: '#000000',
    },
    {
      effect: 'pulseDraw',
      text: 'Pulse Draw',
      description: 'Text draws with a pulsating stroke width and color-shifting glow.',
      color: '#ff6ac1',
    },
    {
      effect: 'scribbleDraw',
      text: 'Scribble Draw',
      description: 'Text draws with a hand-drawn, scribbled effect.',
      color: '#333333',
    },
    {
      effect: 'waterDraw',
      text: 'Water Draw',
      description: 'Text flows like water with a rippling, fluid motion.',
      color: '#00ced1',
    },
    {
      effect: 'goldDraw',
      text: 'Gold Draw',
      description: 'Text draws with a luxurious gold stroke and subtle shine.',
      color: '#ffd700',
    },
    {
      effect: 'vortexDraw',
      text: 'Vortex Draw',
      description: 'Text draws with a static vortex pattern.',
      color: '#8a2be2',
    },
    {
      effect: 'frostDraw',
      text: 'Frost Draw',
      description: 'Text draws slowly with a frosty blue glow.',
      color: '#87ceeb',
    },
    {
      effect: 'shadowDraw',
      text: 'Shadow Draw',
      description: 'Text draws with a slow, shadowy effect.',
      color: '#666666',
    },
    {
      effect: 'sandDraw',
      text: 'Sand Draw',
      description: 'Text draws very slowly like falling sand.',
      color: '#f4a460',
    },
    {
      effect: 'smokeDraw',
      text: 'Smoke Draw',
      description: 'Text draws slowly with a smoky, diffused effect.',
      color: '#a9a9a9',
    },
    {
      effect: 'waveDraw',
      text: 'Wave Draw',
      description: 'Text draws with a slow, wavy motion.',
      color: '#20b2aa',
    },
    {
      effect: 'fadeDraw',
      text: 'Fade Draw',
      description: 'Text draws slowly with a fading effect.',
      color: '#dda0dd',
    },
    {
      effect: 'whiteNeonDraw',
      text: 'White Neon Draw',
      description: 'Text draws with a white neon-like stroke without glow.',
      color: '#ffffff',
    },
    {
      effect: 'customColorDraw',
      text: 'Custom Color Draw',
      description: 'Text draws with a customizable color stroke.',
      color: '#ff6ac1', // Default color, will be overridden by customColor state
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value || 'Type your text');
  };

  const handleEffectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEffect(e.target.value as typeof selectedEffect);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomColor(e.target.value);
  };

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
      <Header />
      <section className="py-24 px-6 max-w-7xl mx-auto text-center border-b border-gray-700">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          <AnimatedSVG
            text="SVG Animations"
            effect="neonDraw"
            duration={Infinity}
            textColor="#ffffff"
            strokeColor="#ff6ac1"
            className="text-4xl md:text-5xl font-bold tracking-tight"
            fontSize="60px"
            fontFamily="Inter, Arial, sans-serif"
          />
        </h1>
        <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          Unleash breathtaking SVG draw-on animations with ReAnime. Powered by GSAP and Framer Motion, perfect for logos and dynamic UI.
        </p>
        <Link
          href="#try-it-out"
          className="inline-block bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition-colors duration-200 text-lg font-medium"
        >
          Explore SVG Animations
        </Link>
      </section>
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
            value={selectedEffect}
            onChange={handleEffectChange}
            className="px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 outline-none text-lg w-full md:w-64"
          >
            {animations.map(({ effect, text }) => (
              <option key={effect} value={effect} className="bg-gray-900 text-white">
                {text}
              </option>
            ))}
          </select>
          {selectedEffect === 'customColorDraw' && (
            <input
              type="color"
              value={customColor}
              onChange={handleCustomColorChange}
              className="w-12 h-12 rounded-full border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50"
            />
          )}
        </motion.div>
        <motion.div
          className="p-8 rounded-2xl bg-gray-800 border border-gray-700 min-h-[20vh] flex items-center justify-center"
          style={{ y: yRange, opacity: opacityRange }}
        >
          <AnimatedSVG
            text={inputText}
            effect={selectedEffect}
            duration={Infinity}
            textColor="#ffffff"
            strokeColor={animations.find((a) => a.effect === selectedEffect)?.color || '#ff6ac1'}
            customStrokeColor={selectedEffect === 'customColorDraw' ? customColor : undefined}
            className="text-2xl md:text-3xl font-bold tracking-tight"
            fontSize="48px"
            fontFamily="Inter, Arial, sans-serif"
          />
        </motion.div>
      </section>
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white text-center mb-12 tracking-tight"
          style={{ y: yRange, opacity: opacityRange }}
        >
          SVG Animation Showcase
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
              <AnimatedSVG
                text={text}
                effect={effect}
                duration={Infinity}
                textColor="#ffffff"
                strokeColor={color}
                className="text-xl font-semibold mb-4 tracking-tight"
                fontSize="24px"
                fontFamily="Inter, Arial, sans-serif"
              />
              <p className="text-gray-400 text-sm">{description}</p>
            </motion.div>
          ))}
        </div>
      </section>
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

export default SVGAnimations;