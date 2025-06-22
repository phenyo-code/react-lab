/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import AnimatedSVG from '@/app/components/animations/AnimatedSVG';
import Header from '@/app/components/Header';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import Link from 'next/link';
import { FiPlay, FiStar } from 'react-icons/fi';
import { Play, Star } from 'lucide-react';

const SVGAnimations: React.FC = () => {
  const [inputText, setTextInput] = useState('Type your text');
  const [selectedEffect, setEffect] = useState<
    | 'neonDraw'
    | 'fireDraw'
    | 'electricDraw'
    | 'inkDraw'
    | 'pulseDraw'
    | 'scribbleDraw'
    | 'waterDraw'
    | 'goldDraw'
    | 'vortexDraw'
    | 'frostDraw'
    | 'shadowDraw'
    | 'sandDraw'
    | 'smokeDraw'
    | 'waveDraw'
    | 'fadeDraw'
    | 'whiteNeonDraw'
    | 'customColorDraw'
    | 'borderDraw'
    | 'dashedBorderDraw'
    | 'pulseBorderDraw'
  >('neonDraw');
  const [selectedType, setType] = useState<'text' | 'border' | 'icon'>('text');
  const [selectedIcon, setSelectedIcon] = useState<string>('FiPlay');
  const [customColor, setCustomColor] = useState('#ff6ac1');

  interface AnimationConfig {
    effect:
      | 'neonDraw'
      | 'fireDraw'
      | 'electricDraw'
      | 'inkDraw'
      | 'pulseDraw'
      | 'scribbleDraw'
      | 'waterDraw'
      | 'goldDraw'
      | 'vortexDraw'
      | 'frostDraw'
      | 'shadowDraw'
      | 'sandDraw'
      | 'smokeDraw'
      | 'waveDraw'
      | 'fadeDraw'
      | 'whiteNeonDraw'
      | 'customColorDraw'
      | 'borderDraw'
      | 'dashedBorderDraw'
      | 'pulseBorderDraw';
    text: string;
    description: string;
    color: string;
    type: 'text' | 'border' | 'icon';
    icon?: string;
  }

  const animations: AnimationConfig[] = [
    {
      effect: 'neonDraw',
      text: 'Neon Draw',
      description: 'Text draws with a pulsating neon glow and flicker.',
      color: '#ff6ac1',
      type: 'text',
    },
    {
      effect: 'fireDraw',
      text: 'Fire Draw',
      description: 'Text draws with a fiery orange-red stroke and glowing flame effect.',
      color: '#ff4500',
      type: 'text',
    },
    {
      effect: 'electricDraw',
      text: 'Electric Draw',
      description: 'Text draws with a jagged electric-blue stroke and sparking distortion.',
      color: '#00b7eb',
      type: 'text',
    },
    {
      effect: 'inkDraw',
      text: 'Ink Draw',
      description: 'Text draws like wet ink with a dripping, turbulent effect.',
      color: '#000000',
      type: 'text',
    },
    {
      effect: 'pulseDraw',
      text: 'Pulse Draw',
      description: 'Text draws with a pulsating stroke width and color-shifting glow.',
      color: '#ff6ac1',
      type: 'text',
    },
    {
      effect: 'scribbleDraw',
      text: 'Scribble Draw',
      description: 'Text draws with a hand-drawn, scribbled effect.',
      color: '#333333',
      type: 'text',
    },
    {
      effect: 'waterDraw',
      text: 'Water Draw',
      description: 'Text flows like water with a rippling, fluid motion.',
      color: '#00ced1',
      type: 'text',
    },
    {
      effect: 'goldDraw',
      text: 'Gold Draw',
      description: 'Text draws with a luxurious gold stroke and subtle shine.',
      color: '#ffd700',
      type: 'text',
    },
    {
      effect: 'vortexDraw',
      text: 'Vortex Draw',
      description: 'Text draws with a static vortex pattern.',
      color: '#8a2be2',
      type: 'text',
    },
    {
      effect: 'frostDraw',
      text: 'Frost Draw',
      description: 'Text draws slowly with a frosty blue glow.',
      color: '#87ceeb',
      type: 'text',
    },
    {
      effect: 'shadowDraw',
      text: 'Shadow Draw',
      description: 'Text draws with a slow, shadowy effect.',
      color: '#666666',
      type: 'text',
    },
    {
      effect: 'sandDraw',
      text: 'Sand Draw',
      description: 'Text draws very slowly like falling sand.',
      color: '#f4a460',
      type: 'text',
    },
    {
      effect: 'smokeDraw',
      text: 'Smoke Draw',
      description: 'Text draws slowly with a smoky, diffused effect.',
      color: '#a9a9a9',
      type: 'text',
    },
    {
      effect: 'waveDraw',
      text: 'Wave Draw',
      description: 'Text draws with a slow, wavy motion.',
      color: '#20b2aa',
      type: 'text',
    },
    {
      effect: 'fadeDraw',
      text: 'Fade Draw',
      description: 'Text draws slowly with a fading effect.',
      color: '#dda0dd',
      type: 'text',
    },
    {
      effect: 'whiteNeonDraw',
      text: 'White Neon Draw',
      description: 'Text draws with a white neon-like stroke without glow.',
      color: '#ffffff',
      type: 'text',
    },
    {
      effect: 'customColorDraw',
      text: 'Custom Color Draw',
      description: 'Text draws with a customizable color stroke.',
      color: '#ff6ac1',
      type: 'text',
    },
    {
      effect: 'borderDraw',
      text: 'Border Draw',
      description: 'Border draws with a neon glow, similar to the Play link.',
      color: '#ff6ac1',
      type: 'border',
    },
    {
      effect: 'dashedBorderDraw',
      text: 'Dashed Border Draw',
      description: 'Dashed border draws with a continuous motion.',
      color: '#ff6ac1',
      type: 'border',
    },
    {
      effect: 'pulseBorderDraw',
      text: 'Pulse Border Draw',
      description: 'Border draws with a pulsating stroke width and glow.',
      color: '#ff6ac1',
      type: 'border',
    },
    {
      effect: 'neonDraw',
      text: 'Icon Neon Draw',
      description: 'Icon draws with a pulsating neon glow.',
      color: '#ff6ac1',
      type: 'icon',
      icon: 'FiPlay',
    },
    {
      effect: 'fireDraw',
      text: 'Icon Fire Draw',
      description: 'Icon draws with a fiery orange-red stroke and glow.',
      color: '#ff4500',
      type: 'icon',
      icon: 'Play',
    },
    {
      effect: 'customColorDraw',
      text: 'Icon Custom Color Draw',
      description: 'Icon draws with a customizable color stroke.',
      color: '#ff6ac1',
      type: 'icon',
      icon: 'FiStar',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value || 'Type your text');
  };

  const handleEffectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEffect(e.target.value as typeof selectedEffect);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as typeof selectedType);
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIcon(e.target.value);
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

  const iconMap: { [key: string]: any } = {
    FiPlay,
    FiStar,
    Play,
    Star,
  };

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
            type="text"
          />
        </h1>
        <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          Unleash breathtaking SVG draw-on animations with ReAnime. Powered by GSAP and Framer Motion, perfect for logos, borders, and icons.
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
          <select
            value={selectedType}
            onChange={handleTypeChange}
            className="px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 outline-none text-lg w-full md:w-32"
          >
            <option value="text">Text</option>
            <option value="border">Border</option>
            <option value="icon">Icon</option>
          </select>
          {selectedType === 'text' && (
            <input
              type="text"
              value={inputText === 'Type your text' ? '' : inputText}
              onChange={handleInputChange}
              placeholder="Type your text"
              className="px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 outline-none text-lg w-full md:w-96"
            />
          )}
          {selectedType === 'icon' && (
            <select
              value={selectedIcon}
              onChange={handleIconChange}
              className="px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 outline-none text-lg w-full md:w-32"
            >
              <option value="FiPlay">FiPlay</option>
              <option value="FiStar">FiStar</option>
              <option value="Play">Play</option>
              <option value="Star">Star</option>
            </select>
          )}
          <select
            value={selectedEffect}
            onChange={handleEffectChange}
            className="px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 outline-none text-lg w-full md:w-64"
          >
            {animations
              .filter((anim) => anim.type === selectedType)
              .map(({ effect, text }) => (
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
            type={selectedType}
            effect={selectedEffect}
            duration={Infinity}
            textColor="#ffffff"
            strokeColor={animations.find((a) => a.effect === selectedEffect)?.color || '#ff6ac1'}
            customStrokeColor={selectedEffect === 'customColorDraw' ? customColor : undefined}
            className="text-2xl md:text-3xl font-bold tracking-tight"
            fontSize={selectedType === 'text' ? '48px' : selectedType === 'border' ? '24px' : '24px'}
            fontFamily="Inter, Arial, sans-serif"
            Icon={selectedType === 'icon' ? iconMap[selectedIcon] : undefined}
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
          {animations.map(({ effect, text, description, color, type, icon }, index) => (
            <motion.div
              key={effect}
              className={`p-6 rounded-lg bg-gray-800 border border-gray-700 ${
                index % 4 !== 3 ? 'lg:border-r-0' : ''
              } ${index < animations.length - (animations.length % 4 || 4) ? 'border-b-0 sm:border-b' : ''}`}
              style={{ y: yRange, opacity: opacityRange }}
            >
              <AnimatedSVG
                text={text}
                type={type}
                effect={effect}
                duration={Infinity}
                textColor="#ffffff"
                strokeColor={color}
                className="text-xl font-semibold mb-4 tracking-tight"
                fontSize={type === 'text' ? '24px' : type === 'border' ? '16px' : '24px'}
                fontFamily="Inter, Arial, sans-serif"
                Icon={type === 'icon' && icon ? iconMap[icon] : undefined}
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