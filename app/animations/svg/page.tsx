/* eslint-disable react/no-unescaped-entities */
'use client';

import AnimatedScroll from '@/app/components/animations/AnimatedScroll';
import AnimatedSVG from '@/app/components/animations/AnimatedSVG';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { Star } from 'lucide-react';

const SVGs: React.FC = () => {
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

  interface SvgDemo {
    title: string;
    description: string;
    svgEffect:
      | 'neonDraw'
      | 'fireDraw'
      | 'electricDraw'
      | 'borderDraw'
      | 'dashedBorderDraw'
      | 'pulseBorderDraw'
      | 'iconNeonDraw'
      | 'iconFireDraw'
      | 'iconCustomColorDraw';
    type: 'text' | 'border' | 'icon';
  }

  const svgDemos: SvgDemo[] = [
    {
      title: 'Neon Draw',
      description: 'Glowing neon draw-on effect for vibrant text animations.',
      svgEffect: 'neonDraw',
      type: 'text',
    },
    {
      title: 'Fire Draw',
      description: 'Fiery draw-on effect for bold, attention-grabbing text.',
      svgEffect: 'fireDraw',
      type: 'text',
    },
    {
      title: 'Electric Draw',
      description: 'Sparking electric effect for dynamic text displays.',
      svgEffect: 'electricDraw',
      type: 'text',
    },
    {
      title: 'Border Draw',
      description: 'Smooth draw-on effect for outlined borders.',
      svgEffect: 'borderDraw',
      type: 'border',
    },
    {
      title: 'Dashed Border Draw',
      description: 'Dashed border animation for stylish UI frames.',
      svgEffect: 'dashedBorderDraw',
      type: 'border',
    },
    {
      title: 'Pulse Border Draw',
      description: 'Pulsing border effect for dynamic outlines.',
      svgEffect: 'pulseBorderDraw',
      type: 'border',
    },
    {
      title: 'Icon Neon Draw',
      description: 'Neon draw-on effect for SVG icons, ideal for logos.',
      svgEffect: 'iconNeonDraw',
      type: 'icon',
    },
    {
      title: 'Icon Fire Draw',
      description: 'Fiery draw-on effect for striking icon animations.',
      svgEffect: 'iconFireDraw',
      type: 'icon',
    },
    {
      title: 'Icon Custom Color Draw',
      description: 'Customizable color draw-on effect for icons.',
      svgEffect: 'iconCustomColorDraw',
      type: 'icon',
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

  // State for Try It Out section
  const [svgTryText, setSvgTryText] = useState('React Animations');
  const [selectedSvgEffect, setSvgEffect] = useState<
    | 'neonDraw'
    | 'fireDraw'
    | 'electricDraw'
    | 'borderDraw'
    | 'dashedBorderDraw'
    | 'pulseBorderDraw'
    | 'iconNeonDraw'
    | 'iconFireDraw'
    | 'iconCustomColorDraw'
  >('neonDraw');
  const [svgType, setSvgType] = useState<'text' | 'border' | 'icon'>('text');
  const [customColor, setCustomColor] = useState('#ff6ac1');

  const handleSvgTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSvgTryText(e.target.value || 'React Animations');
  };

  const handleSvgEffectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newEffect = e.target.value as typeof selectedSvgEffect;
    setSvgEffect(newEffect);
    if (newEffect.startsWith('icon')) {
      setSvgType('icon');
    } else if (['borderDraw', 'dashedBorderDraw', 'pulseBorderDraw'].includes(newEffect)) {
      setSvgType('border');
    } else {
      setSvgType('text');
    }
  };

  const handleSvgTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as 'text' | 'border' | 'icon';
    setSvgType(newType);
    if (newType === 'icon') {
      setSvgEffect('iconNeonDraw');
    } else if (newType === 'border') {
      setSvgEffect('borderDraw');
    } else {
      setSvgEffect('neonDraw');
    }
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomColor(e.target.value);
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white font-sans">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-6 text-center max-w-7xl mx-auto border-b border-gray-700">
        <AnimatedScroll effect="slideInLeft" triggerPoint={0.1} duration={1000} className="flex flex-col items-center">
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
          <hr className="border-gray-700 my-6 max-w-md mx-auto" />
          <motion.p
            className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-8"
            style={{ y: yRange, opacity: opacityRange }}
          >
            Discover the power of SVG animations with the React Animations library. From neon and fire draw-on effects to dynamic border and icon animations, enhance your Next.js projects with `npm install react-animations`. Preview all SVG effects below and try them out interactively to bring your UI to life.
          </motion.p>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/docs"
                className="inline-block px-8 py-3 rounded-full font-semibold text-lg bg-pink-600 text-white hover:bg-pink-700 transition-colors duration-300"
                aria-label="Get Started with Documentation"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </AnimatedScroll>
      </section>

      {/* SVG Animation Showcase */}
      <section className="py-12 px-6 max-w-7xl mx-auto border-b border-gray-700" style={gradientBackground}>
        <AnimatedScroll effect="slideInRight" triggerPoint={0.2} duration={1000} className="text-center">
          <span className="text-[15px] text-gray-700 block mt-1" aria-label="Animation properties for SVG showcase scroll">
            effect="slideInRight" triggerPoint={0.2} duration={1000}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            SVG Animation Showcase
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Explore the `AnimatedSVG` component with draw-on effects for text, borders, and icons. From glowing neon to fiery icon animations, these effects are perfect for logos, branding, and dynamic UI elements in your Next.js projects.
          </p>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
        </AnimatedScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {svgDemos.map(({ title, description, svgEffect, type }, index) => (
            <AnimatedScroll
              key={title}
              effect={index % 2 === 0 ? 'slideInLeft' : 'slideInRight'}
              triggerPoint={0.2 + index * 0.1}
              duration={1000}
              className={`py-4 flex flex-col items-center text-center ${
                index < svgDemos.length - 1 ? 'md:border-r md:border-gray-700' : ''
              } ${index === 0 ? 'border-t md:border-t-0 pt-6 md:pt-4' : ''}`}
            >
              <AnimatedSVG
                text={type === 'text' ? title : undefined}
                type={type}
                effect={svgEffect}
                duration={1.5}
                textColor="#ffffff"
                strokeColor={
                  {
                    neonDraw: '#ff6ac1',
                    fireDraw: '#ff4500',
                    electricDraw: '#00b7eb',
                    borderDraw: '#ff6ac1',
                    dashedBorderDraw: '#ff6ac1',
                    pulseBorderDraw: '#ff6ac1',
                    iconNeonDraw: '#ff6ac1',
                    iconFireDraw: '#ff4500',
                    iconCustomColorDraw: '#ff6ac1',
                  }[svgEffect]
                }
                glowColor={
                  svgEffect === 'fireDraw' || svgEffect === 'iconFireDraw'
                    ? 'rgba(255, 69, 0, 0.8)'
                    : 'rgba(255, 106, 193, 0.7)'
                }
                customStrokeColor={
                  svgEffect === 'iconCustomColorDraw' ? '#ff6ac1' : undefined
                }
                Icon={type === 'icon' ? Star : undefined}
                className="text-xl font-semibold mb-2"
                fontSize="24px"
                fontFamily="Inter, Arial, sans-serif"
                width={type === 'icon' ? 24 : undefined}
                height={type === 'icon' ? 24 : undefined}
              />
              <hr className="border-gray-700 my-2 max-w-xs mx-auto" />
              <p className="text-gray-400 text-sm max-w-xs">{description}</p>
              <hr className="border-gray-700 my-2 max-w-xs mx-auto" />
            </AnimatedScroll>
          ))}
        </div>
      </section>

      {/* SVG Try It Out Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto border-b border-gray-700" style={gradientBackground}>
        <AnimatedScroll effect="slideInLeft" triggerPoint={0.3} duration={1000} className="text-center">
          <span className="text-[15px] text-gray-700 block mt-1" aria-label="Animation properties for SVG tryout scroll">
            effect="slideInLeft" triggerPoint={0.3} duration={1000}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Try SVG Animations
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Experiment with SVG animations for text, borders, or icons. Customize text, select an effect, choose a type, and pick a color to preview the animation in real-time.
          </p>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
          <motion.div className="flex flex-col md:flex-row gap-6 justify-center mb-8" style={{ y: yRange, opacity: opacityRange }}>
            <input
              type="text"
              value={svgTryText === 'React Animations' ? '' : svgTryText}
              onChange={handleSvgTextChange}
              placeholder="Enter your text"
              className="px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 outline-none text-lg w-full md:w-96"
              disabled={svgType !== 'text'}
            />
            <select
              value={svgType}
              onChange={handleSvgTypeChange}
              className="px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 outline-none text-lg w-full md:w-32"
            >
              {['text', 'border', 'icon'].map((type) => (
                <option key={type} value={type} className="bg-gray-900 text-white">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={selectedSvgEffect}
              onChange={handleSvgEffectChange}
              className="px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 outline-none text-lg w-full md:w-64"
            >
              {(svgType === 'icon'
                ? ['iconNeonDraw', 'iconFireDraw', 'iconCustomColorDraw']
                : svgType === 'border'
                ? ['borderDraw', 'dashedBorderDraw', 'pulseBorderDraw']
                : ['neonDraw', 'fireDraw', 'electricDraw']
              ).map((effect) => (
                <option key={effect} value={effect} className="bg-gray-900 text-white">
                  {effect
                    .replace(/([A-Z])/g, ' $1')
                    .trim()
                    .replace(/^./, (str) => str.toUpperCase())
                    .replace('Draw', ' Draw')}
                </option>
              ))}
            </select>
            {(selectedSvgEffect === 'iconCustomColorDraw') && (
              <input
                type="color"
                value={customColor}
                onChange={handleCustomColorChange}
                className="w-12 h-12 rounded-full border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50"
              />
            )}
          </motion.div>
          <motion.div
            className="p-6 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center"
            style={{ y: yRange, opacity: opacityRange }}
          >
            <AnimatedSVG
              text={svgType === 'text' ? svgTryText : undefined}
              type={svgType}
              effect={selectedSvgEffect}
              duration={Infinity}
              textColor="#ffffff"
              strokeColor={
                {
                  neonDraw: '#ff6ac1',
                  fireDraw: '#ff4500',
                  electricDraw: '#00b7eb',
                  borderDraw: '#ff6ac1',
                  dashedBorderDraw: '#ff6ac1',
                  pulseBorderDraw: '#ff6ac1',
                  iconNeonDraw: '#ff6ac1',
                  iconFireDraw: '#ff4500',
                  iconCustomColorDraw: customColor,
                }[selectedSvgEffect] || '#ff6ac1'
              }
              glowColor={
                selectedSvgEffect === 'fireDraw' || selectedSvgEffect === 'iconFireDraw'
                  ? 'rgba(255, 69, 0, 0.8)'
                  : 'rgba(255, 106, 193, 0.7)'
              }
              customStrokeColor={
                selectedSvgEffect === 'iconCustomColorDraw' ? customColor : undefined
              }
              Icon={svgType === 'icon' ? Star : undefined}
              className="text-2xl md:text-3xl font-bold tracking-tight"
              fontSize="48px"
              fontFamily="Inter, Arial, sans-serif"
              width={svgType === 'icon' ? 48 : undefined}
              height={svgType === 'icon' ? 48 : undefined}
            />
          </motion.div>
        </AnimatedScroll>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto border-b border-gray-700">
        <AnimatedScroll effect="slideInLeft" triggerPoint={0.4} duration={1000} className="text-center">
          <span className="text-[15px] text-gray-700 block mt-1" aria-label="Animation properties for CTA scroll">
            effect="slideInLeft" triggerPoint={0.4} duration={1000}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Start Animating with SVGs
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Elevate your Next.js projects with stunning SVG animations using `react-animations`. Install via `npm install react-animations` to access our lightweight, TypeScript-friendly library. Dive into our documentation for setup guides or join our community to collaborate and learn.
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
        </AnimatedScroll>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SVGs;