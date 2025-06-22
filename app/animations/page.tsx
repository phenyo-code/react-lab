/* eslint-disable react/no-unescaped-entities */
'use client';

import AnimatedText from '../components/animations/AnimatedText';
import AnimatedScroll from '../components/animations/AnimatedScroll';
import AnimatedSVG from '../components/animations/AnimatedSVG';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { Star } from 'lucide-react';

const Animations: React.FC = () => {
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

  interface TextDemo {
    title: string;
    description: string;
    textEffect: 'wave' | 'ripple' | 'pulse' | 'burst' | 'bounce' | 'neon' | 'fade';
  }

  interface ScrollDemo {
    title: string;
    description: string;
    scrollEffect: 'scrollFade' | 'slideInLeft' | 'slideInRight' | 'parallax';
  }

  interface SvgDemo {
    title: string;
    description: string;
    svgEffect:
      | 'neonDraw'
      | 'fireDraw'
      | 'pulseDraw'
      | 'borderDraw'
      | 'dashedBorderDraw'
      | 'pulseBorderDraw'
      | 'iconNeonDraw'
      | 'iconFireDraw'
      | 'iconCustomColorDraw';
    type: 'text' | 'border' | 'icon';
  }

  const textDemos: TextDemo[] = [
    {
      title: 'Wave Effect',
      description: 'Smooth, wave-like motion for fluid text animations in hero sections.',
      textEffect: 'wave',
    },
    {
      title: 'Ripple Effect',
      description: 'Fluid scaling for dynamic text reveals, ideal for callouts.',
      textEffect: 'ripple',
    },
    {
      title: 'Pulse Effect',
      description: 'Rhythmic pulsing for vibrant text, great for dashboards.',
      textEffect: 'pulse',
    },
    {
      title: 'Burst Effect',
      description: 'Explosive scattering for bold text, perfect for product highlights.',
      textEffect: 'burst',
    },
    {
      title: 'Bounce Effect',
      description: 'Playful bouncing for engaging UI elements in portfolios.',
      textEffect: 'bounce',
    },
    {
      title: 'Neon Effect',
      description: 'Glowing neon for futuristic branding and logos.',
      textEffect: 'neon',
    },
    {
      title: 'Fade Effect',
      description: 'Subtle fade-in for elegant transitions in minimalist designs.',
      textEffect: 'fade',
    },
  ];

  const scrollDemos: ScrollDemo[] = [
    {
      title: 'Scroll Fade',
      description: 'Smooth fade-in for content reveals in blogs and galleries.',
      scrollEffect: 'scrollFade',
    },
    {
      title: 'Slide In Left',
      description: 'Dynamic left-slide for engaging transitions in portfolios.',
      scrollEffect: 'slideInLeft',
    },
    {
      title: 'Slide In Right',
      description: 'Bold right-slide to highlight e-commerce product grids.',
      scrollEffect: 'slideInRight',
    },
    {
      title: 'Parallax Effect',
      description: 'Depth-adding parallax for immersive headers and backgrounds.',
      scrollEffect: 'parallax',
    },
  ];

  const svgDemos: SvgDemo[] = [
    {
      title: 'Neon Draw',
      description: 'Glowing neon draw-on effect for captivating text animations.',
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
      title: 'Pulse Draw',
      description: 'Pulsing draw-on effect for vibrant text displays.',
      svgEffect: 'pulseDraw',
      type: 'text',
    },
    {
      title: 'Border Draw',
      description: 'Smooth border draw effect for outlined shapes.',
      svgEffect: 'borderDraw',
      type: 'border',
    },
    {
      title: 'Dashed Border Draw',
      description: 'Dashed border animation for stylish UI elements.',
      svgEffect: 'dashedBorderDraw',
      type: 'border',
    },
    {
      title: 'Pulse Border Draw',
      description: 'Pulsing border effect for dynamic frames.',
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

  // State for Try It Out sections
  const [textTryText, setTextTryText] = useState('Try It Out');
  const [selectedTextEffect, setTextEffect] = useState<
    'wave' | 'ripple' | 'pulse' | 'burst' | 'bounce' | 'neon' | 'fade'
  >('wave');

  const [scrollTryEffect, setScrollTryEffect] = useState<
    'scrollFade' | 'slideInLeft' | 'slideInRight' | 'parallax'
  >('scrollFade');

  const [svgTryText, setSvgTryText] = useState('React Animations');
  const [selectedSvgEffect, setSvgEffect] = useState<
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
    | 'iconNeonDraw'
    | 'iconFireDraw'
    | 'iconCustomColorDraw'
  >('neonDraw');
  const [svgType, setSvgType] = useState<'text' | 'border' | 'icon'>('text');
  const [customColor, setCustomColor] = useState('#ff6ac1');

  const handleTextTryTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextTryText(e.target.value || 'Text');
  };

  const handleTextEffectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTextEffect(e.target.value as typeof selectedTextEffect);
  };

  const handleScrollEffectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setScrollTryEffect(e.target.value as typeof scrollTryEffect);
  };

  const handleSvgTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSvgTryText(e.target.value || 'Custom');
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
      <section className="py-24 px-6 text-center max-w-7xl mx-auto border-b border-gray-700">
        <AnimatedScroll effect="slideInLeft" triggerPoint={0.1} duration={1000} className="flex flex-col items-center">
          <AnimatedSVG
            text="Animations Showcase"
            effect="neonDraw"
            duration={2}
            delay={0.5}
            textColor="#ffffff"
            strokeColor="#ff6ac1"
            glowColor="rgba(255, 106, 193, 0.7)"
            className="text-4xl md:text-5xl font-bold tracking-tight"
            fontSize="60px"
            fontFamily="Inter, Arial, sans-serif"
            key="hero-neon"
          />
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
          <motion.p
            className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-8"
            style={{ y: yRange, opacity: opacityRange }}
          >
            Explore the full range of animations in the React Animations library. From dynamic text effects and smooth scroll transitions to stunning SVG draw-on animations, discover how to enhance your Next.js projects with `npm install react-animations`. Preview each effect below and try them out interactively to see how they fit your UI.
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

      {/* Text Animation Showcase */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-gray-700" style={gradientBackground}>
        <AnimatedScroll effect="slideInRight" triggerPoint={0.2} duration={1000} className="text-center">
          <span className="text-[15px] text-gray-700 block mt-1" aria-label="Animation properties for text showcase scroll">
            effect="slideInRight" triggerPoint={0.2} duration={1000}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Text Animation Showcase
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-12">
            Experience the versatility of the `AnimatedText` component with effects like wave, ripple, pulse, and more. These animations are ideal for hero sections, callouts, and interactive UI elements. Preview each effect below.
          </p>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
        </AnimatedScroll>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border-t border-gray-700">
          {textDemos.map(({ title, description, textEffect }, index) => (
            <AnimatedScroll
              key={title}
              effect={index % 2 === 0 ? 'slideInLeft' : 'slideInRight'}
              triggerPoint={0.2 + index * 0.1}
              duration={1000}
              className={`py-6 flex flex-col items-center text-center ${
                index < textDemos.length - 1 ? 'md:border-r md:border-gray-700' : ''
              } ${index === 0 ? 'border-t md:border-t-0' : ''}`}
            >
              <AnimatedText
                effect={textEffect}
                duration={1.5}
                textColor="text-pink-500"
                fontSize="text-xl"
                glowColor="rgba(236, 72, 153, 0.5)"
                className="font-semibold mb-2"
              >
                {title}
              </AnimatedText>
              <hr className="border-gray-700 mb-2 max-w-xs mx-auto" />
              <p className="text-gray-400 text-sm max-w-xs">{description}</p>
              <hr className="border-gray-700 mt-2 max-w-xs mx-auto" />
            </AnimatedScroll>
          ))}
        </div>
      </section>

      {/* Text Try It Out Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-gray-700" style={gradientBackground}>
        <AnimatedScroll effect="slideInLeft" triggerPoint={0.3} duration={1000} className="text-center">
          <span className="text-[15px] text-gray-700 block mt-1" aria-label="Animation properties for text tryout scroll">
            effect="slideInLeft" triggerPoint={0.3} duration={1000}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Try Text Animations
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Customize and preview text animations in real-time. Enter your text and select an effect to see how it enhances your UI.
          </p>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
          <motion.div className="flex flex-col md:flex-row gap-6 justify-center mb-8" style={{ y: yRange, opacity: opacityRange }}>
            <input
              type="text"
              value={textTryText === 'Try It Out' ? '' : textTryText}
              onChange={handleTextTryTextChange}
              placeholder="Enter your text"
              className="px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 outline-none text-lg w-full md:w-96"
            />
            <select
              value={selectedTextEffect}
              onChange={handleTextEffectChange}
              className="px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 outline-none text-lg w-full md:w-64"
            >
              {['wave', 'ripple', 'pulse', 'burst', 'bounce', 'neon', 'fade'].map((effect) => (
                <option key={effect} value={effect} className="bg-gray-900 text-white">
                  {effect.charAt(0).toUpperCase() + effect.slice(1)}
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
              duration={1.5}
              textColor="text-white"
              fontSize="text-2xl"
              glowColor="rgba(236, 72, 153, 0.5)"
              className="font-bold tracking-tight"
            >
              {textTryText}
            </AnimatedText>
          </motion.div>
        </AnimatedScroll>
      </section>

      {/* Scroll Animation Showcase */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-gray-700" style={gradientBackground}>
        <AnimatedScroll effect="slideInRight" triggerPoint={0.4} duration={1000} className="text-center">
          <span className="text-[15px] text-gray-700 block mt-1" aria-label="Animation properties for scroll showcase scroll">
            effect="slideInRight" triggerPoint={0.4} duration={1000}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Scroll Animation Showcase
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-12">
            Discover the `AnimatedScroll` component with effects like scrollFade, slideInLeft, slideInRight, and parallax. These GPU-accelerated transitions enhance navigation in portfolios, blogs, and e-commerce sites.
          </p>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
        </AnimatedScroll>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border-t border-gray-700">
          {scrollDemos.map(({ title, description, scrollEffect }, index) => (
            <AnimatedScroll
              key={title}
              effect={scrollEffect}
              triggerPoint={0.4 + index * 0.1}
              duration={1000}
              className={`py-6 flex flex-col items-center text-center ${
                index < scrollDemos.length - 1 ? 'md:border-r md:border-gray-700' : ''
              } ${index === 0 ? 'border-t md:border-t-0' : ''}`}
            >
              <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
              <hr className="border-gray-700 mb-2 max-w-xs mx-auto" />
              <p className="text-gray-400 text-sm max-w-xs">{description}</p>
              <hr className="border-gray-700 mt-2 max-w-xs mx-auto" />
            </AnimatedScroll>
          ))}
        </div>
      </section>

      {/* Scroll Try It Out Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-gray-700" style={gradientBackground}>
        <AnimatedScroll effect="slideInLeft" triggerPoint={0.5} duration={1000} className="text-center">
          <span className="text-[15px] text-gray-700 block mt-1" aria-label="Animation properties for scroll tryout scroll">
            effect="slideInLeft" triggerPoint={0.5} duration={1000}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Try Scroll Animations
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Select a scroll effect to preview how it animates content as you scroll. Ideal for creating engaging transitions in your Next.js projects.
          </p>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
          <motion.div className="flex justify-center mb-8" style={{ y: yRange, opacity: opacityRange }}>
            <select
              value={scrollTryEffect}
              onChange={handleScrollEffectChange}
              className="px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 outline-none text-lg w-full md:w-64"
            >
              {['scrollFade', 'slideInLeft', 'slideInRight', 'parallax'].map((effect) => (
                <option key={effect} value={effect} className="bg-gray-900 text-white">
                  {effect
                    .replace(/([A-Z])/g, ' $1')
                    .trim()
                    .replace(/^./, (str) => str.toUpperCase())}
                </option>
              ))}
            </select>
          </motion.div>
          <motion.div
            className="p-8 rounded-2xl bg-gray-800 border border-gray-700 min-h-[20vh] flex items-center justify-center"
            style={{ y: yRange, opacity: opacityRange }}
          >
            <AnimatedScroll
              effect={scrollTryEffect}
              triggerPoint={0.5}
              duration={1000}
              className="text-center"
            >
              <h3 className="text-2xl font-bold text-white">Scroll to Animate</h3>
              <p className="text-gray-400 text-sm max-w-xs mt-2">
                This content animates with the selected scroll effect.
              </p>
            </AnimatedScroll>
          </motion.div>
        </AnimatedScroll>
      </section>

      {/* SVG Animation Showcase */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-gray-700" style={gradientBackground}>
        <AnimatedScroll effect="slideInRight" triggerPoint={0.6} duration={1000} className="text-center">
          <span className="text-[15px] text-gray-700 block mt-1" aria-label="Animation properties for SVG showcase scroll">
            effect="slideInRight" triggerPoint={0.6} duration={1000}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            SVG Animation Showcase
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-12">
            Explore the `AnimatedSVG` component with draw-on effects for text, borders, and icons. From neon and fire to custom color animations, these effects are perfect for logos, branding, and dynamic UI elements.
          </p>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
        </AnimatedScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-700">
          {svgDemos.map(({ title, description, svgEffect, type }, index) => (
            <AnimatedScroll
              key={`${title}-${svgEffect}`}
              effect={index % 2 === 0 ? 'slideInLeft' : 'slideInRight'}
              triggerPoint={0.6 + index * 0.1}
              duration={1000}
              className={`py-6 flex flex-col items-center text-center ${
                index < svgDemos.length - 1 ? 'md:border-r md:border-gray-700' : ''
              } ${index === 0 ? 'border-t md:border-t-0' : ''}`}
            >
              <AnimatedSVG
                key={`${title}-${svgEffect}`}
                text={type === 'text' ? title : undefined}
                type={type}
                effect={svgEffect}
                duration={2}
                delay={0.5}
                textColor="#ffffff"
                strokeColor={
                  svgEffect === 'fireDraw' || svgEffect === 'iconFireDraw'
                    ? '#ff4500'
                    : svgEffect === 'pulseDraw'
                    ? '#ff6ac1'
                    : '#ff6ac1'
                }
                glowColor={
                  svgEffect === 'fireDraw' || svgEffect === 'iconFireDraw'
                    ? 'rgba(255, 69, 0, 0.8)'
                    : 'rgba(255, 106, 193, 0.7)'
                }
                customStrokeColor={svgEffect === 'iconCustomColorDraw' ? '#00ff00' : undefined}
                Icon={type === 'icon' ? Star : undefined}
                className="text-xl font-semibold mb-2"
                fontSize="24px"
                fontFamily="Inter, Arial, sans-serif"
              />
              <hr className="border-gray-700 mb-2 max-w-xs mx-auto" />
              <p className="text-gray-400 text-sm max-w-xs">{description}</p>
              <hr className="border-gray-700 mt-2 max-w-xs mx-auto" />
            </AnimatedScroll>
          ))}
        </div>
      </section>

      {/* SVG Try It Out Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-gray-700" style={gradientBackground}>
        <AnimatedScroll effect="slideInLeft" triggerPoint={0.7} duration={1000} className="text-center">
          <span className="text-[15px] text-gray-700 block mt-1" aria-label="Animation properties for SVG tryout scroll">
            effect="slideInLeft" triggerPoint={0.7} duration={1000}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Try SVG Animations
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Experiment with SVG animations for text, borders, or icons. Customize text, select an effect, choose a type, and pick a color to preview the animation in real-time.
          </p>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
          <motion.div
            className="flex flex-col md:flex-row gap-6 justify-center mb-8"
            style={{ y: yRange, opacity: opacityRange }}
          >
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
                : [
                    'neonDraw',
                    'fireDraw',
                    'electricDraw',
                    'inkDraw',
                    'pulseDraw',
                    'scribbleDraw',
                    'waterDraw',
                    'goldDraw',
                    'vortexDraw',
                    'frostDraw',
                    'shadowDraw',
                    'sandDraw',
                    'smokeDraw',
                    'waveDraw',
                    'fadeDraw',
                    'whiteNeonDraw',
                    'customColorDraw',
                  ]
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
            {(selectedSvgEffect === 'customColorDraw' || selectedSvgEffect === 'iconCustomColorDraw') && (
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
              text={svgType === 'text' ? svgTryText : undefined}
              type={svgType}
              effect={selectedSvgEffect}
              duration={2}
              delay={0.5}
              textColor="#ffffff"
              strokeColor={
                {
                  neonDraw: '#ff6ac1',
                  fireDraw: '#ff4500',
                  electricDraw: '#00b7eb',
                  inkDraw: '#000000',
                  pulseDraw: '#ff6ac1',
                  scribbleDraw: '#333333',
                  waterDraw: '#00ced1',
                  goldDraw: '#ffd700',
                  vortexDraw: '#8a2be2',
                  frostDraw: '#ffffff',
                  shadowDraw: '#666666',
                  sandDraw: '#f4a460',
                  smokeDraw: '#a9a9a9',
                  waveDraw: '#20b2aa',
                  fadeDraw: '#dda0dd',
                  whiteNeonDraw: '#ffffff',
                  customColorDraw: customColor,
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
                selectedSvgEffect === 'customColorDraw' || selectedSvgEffect === 'iconCustomColorDraw'
                  ? customColor
                  : undefined
              }
              Icon={svgType === 'icon' ? Star : undefined}
              className="text-2xl md:text-3xl font-bold tracking-tight"
              fontSize="48px"
              fontFamily="Inter, Arial, sans-serif"
              key={selectedSvgEffect}
            />
          </motion.div>
        </AnimatedScroll>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-gray-700">
        <AnimatedScroll effect="slideInLeft" triggerPoint={0.8} duration={1000} className="text-center">
          <span className="text-[15px] text-gray-700 block mt-1" aria-label="Animation properties for CTA scroll">
            effect="slideInLeft" triggerPoint={0.8} duration={1000}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Start Animating Today
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Bring your Next.js projects to life with `react-animations`. Install via `npm install react-animations` to access our lightweight, TypeScript-friendly library. Dive into our documentation for setup guides or join our community to collaborate and learn.
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

export default Animations;