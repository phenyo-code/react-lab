/* eslint-disable react/no-unescaped-entities */
'use client';

import AnimatedText from '@/app/components/animations/AnimatedText';
import AnimatedScroll from '@/app/components/animations/AnimatedScroll';
import AnimatedSVG from '@/app/components/animations/AnimatedSVG';
import Header from '@/app/components/Header';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import Footer from '../components/Footer';

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

  interface Feature {
    title: string;
    description: string;
    image?: string;
    effect: 'scrollFade' | 'scrollSlide' | 'parallax';
    triggerPoint: number;
    reverse?: boolean;
  }

  const features: Feature[] = [
    {
      title: 'Premium Effects',
      description: 'Elevate your UI with cinematic animations including neon glows, holographic shifts, and particle bursts. These effects are designed to create a futuristic, immersive experience, ideal for modern web applications and digital storytelling.',
      image: '/images/premium-effects.jpg',
      effect: 'scrollFade',
      triggerPoint: 0.2,
    },
    {
      title: 'Performant & Accessible',
      description: 'Leverage Framer Motion and Lenis to achieve silky-smooth 60fps animations with low CPU impact. Our library fully supports prefers-reduced-motion, ensuring accessibility for users with motion sensitivities, while maintaining high performance across devices.',
      image: '/images/performance.jpg',
      effect: 'scrollSlide',
      triggerPoint: 0.3,
      reverse: true,
    },
    {
      title: 'NPM-Ready',
      description: 'Seamlessly integrate ReactLab into your projects with our lightweight, tree-shakable, TypeScript-compatible package. Available via NPM, it offers an intuitive API and comprehensive documentation to get you started quickly and efficiently.',
      effect: 'parallax',
      triggerPoint: 0.4,
    },
    {
      title: 'Customizable Design',
      description: 'Tailor animations to your brand with extensive customization options for colors, durations, and effects. Whether you need a subtle fade or a dramatic draw-on, ReactLab provides the flexibility to match your creative vision.',
      image: '/images/custom-design.jpg',
      effect: 'scrollFade',
      triggerPoint: 0.5,
    },
    {
      title: 'Community Support',
      description: 'Join a growing community of developers on GitHub and Discord. Access tutorials, share your projects, and get help from experts to maximize your use of ReactLab’s animation capabilities.',
      image: '/images/community.jpg',
      effect: 'scrollSlide',
      triggerPoint: 0.6,
      reverse: true,
    },
  ];

  // State for SVG Try It Out section
  const [svgText, setSvgText] = useState('ReactLab SVG');
  const [selectedSvgEffect, setSvgEffect] = useState<
    'neonDraw' | 'fireDraw' | 'electricDraw' | 'inkDraw' | 'pulseDraw' | 'scribbleDraw' | 'waterDraw' | 'goldDraw' | 'vortexDraw' | 'frostDraw' | 'shadowDraw' | 'sandDraw' | 'smokeDraw' | 'waveDraw' | 'fadeDraw'
  >('neonDraw');

  const handleSvgTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSvgText(e.target.value || 'ReactLab SVG');
  };

  const handleSvgEffectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSvgEffect(e.target.value as typeof selectedSvgEffect);
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
          linear-gradient(-135deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '15px 15px',
      }}
    >
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 px-8 max-w-7xl mx-auto text-center border-b border-gray-700">
        <AnimatedText
          effect="wave"
          duration={Infinity}
          textColor="text-white"
          className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
        >
          ReactLab Animations
        </AnimatedText>
        <motion.p
          className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Transform your React applications with ReactLab, a cutting-edge animations library designed for developers and designers alike. Powered by Framer Motion and Lenis, ReactLab offers a suite of premium text and scroll effects, delivering GPU-accelerated, cinematic experiences that captivate users. Whether you're building a portfolio, e-commerce site, or interactive dashboard, ReactLab enhances engagement with smooth, customizable animations.
        </motion.p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/animations/text"
              className="inline-block px-8 py-4 rounded-full font-semibold text-lg bg-pink-600 text-white hover:bg-pink-700 transition-colors duration-300"
            >
              Explore Text Animations
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/animations/scroll"
              className="inline-block px-8 py-4 rounded-full font-semibold text-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300"
            >
              Explore Scroll Animations
            </Link>
          </motion.div>
        </div>
      </section>


            {/* SVG Try It Out Section */}
      <section className="py-16 px-8 max-w-7xl mx-auto border-b border-gray-700">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white text-center mb-12 tracking-tight"
          style={{ y: yRange, opacity: opacityRange }}
        >
          Try SVG Animations
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 text-center"
          style={{ y: yRange, opacity: opacityRange }}
        >
          Experiment with our rich SVG draw-on animations. Customize text and effects to see how they enhance your UI in real-time. Choose from a variety of styles like neon, frost, or sand to match your project's aesthetic.
        </motion.p>
        <motion.div
          className="flex flex-col md:flex-row gap-6 justify-center mb-8"
          style={{ y: yRange, opacity: opacityRange }}
        >
          <input
            type="text"
            value={svgText === 'ReactLab SVG' ? '' : svgText}
            onChange={handleSvgTextChange}
            placeholder="Enter your text"
            className="px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 outline-none text-lg w-full md:w-96"
          />
          <select
            value={selectedSvgEffect}
            onChange={handleSvgEffectChange}
            className="px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 outline-none text-lg w-full md:w-64"
          >
            {['neonDraw', 'fireDraw', 'electricDraw', 'inkDraw', 'pulseDraw', 'scribbleDraw', 'waterDraw', 'goldDraw', 'vortexDraw', 'frostDraw', 'shadowDraw', 'sandDraw', 'smokeDraw', 'waveDraw', 'fadeDraw'].map((effect) => (
              <option key={effect} value={effect} className="bg-gray-900 text-white">
                {effect.charAt(0).toUpperCase() + effect.slice(1).replace('Draw', ' Draw')}
              </option>
            ))}
          </select>
        </motion.div>
        <motion.div
          className="p-8 rounded-2xl bg-gray-800 border border-gray-700 min-h-[20vh] flex items-center justify-center"
          style={{ y: yRange, opacity: opacityRange }}
        >
          <AnimatedSVG
            text={svgText}
            effect={selectedSvgEffect}
            duration={Infinity}
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
                frostDraw: '#87ceeb',
                shadowDraw: '#666666',
                sandDraw: '#f4a460',
                smokeDraw: '#a9a9a9',
                waveDraw: '#20b2aa',
                fadeDraw: '#dda0dd',
              }[selectedSvgEffect] || '#ff6ac1'
            }
            className="text-2xl md:text-3xl font-bold tracking-tight"
            fontSize="48px"
            fontFamily="Inter, Arial, sans-serif"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 max-w-7xl mx-auto border-b border-gray-700">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white text-center mb-12 tracking-tight"
          style={{ y: yRange, opacity: opacityRange }}
        >
          Why Choose ReactLab?
        </motion.h2>
        <div className="space-y-16">
          {features.map(({ title, description, image, effect, triggerPoint, reverse }, index) => (
            <AnimatedScroll
              key={title}
              effect={effect}
              triggerPoint={triggerPoint}
              duration={1000}
              className={`relative flex flex-col ${
                image ? 'md:flex-row' + (reverse ? '-reverse' : '') : 'items-center text-center'
              } gap-8 ${index < features.length - 1 ? 'border-b border-gray-700 pb-16' : ''}`}
            >
              <motion.div
                className={`flex-1 ${image ? (reverse ? 'md:border-l border-gray-700 md:pl-8' : 'md:border-r border-gray-700 md:pr-8') : ''}`}
                style={{ y: yRange, opacity: opacityRange }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-pink-500 mb-4 tracking-tight">{title}</h3>
                <p className="text-lg text-gray-400 max-w-lg mx-auto md:mx-0">{description}</p>
                {title === 'NPM-Ready' && (
                  <pre className="text-sm bg-gray-800 p-4 rounded-lg text-gray-400 font-mono mt-4 max-w-lg mx-auto md:mx-0">
                    npm install react-lab-animations-lib
                  </pre>
                )}
                {title === 'Community Support' && (
                  <div className="mt-4">
                    <Link
                      href="https://github.com/react-lab"
                      className="text-pink-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </Link>
                    {' | '}
                    <Link
                      href="https://discord.gg/reactlab"
                      className="text-pink-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Discord
                    </Link>
                  </div>
                )}
              </motion.div>
              {image && (
                <motion.div
                  className="relative w-full md:w-1/2 h-[40vh] rounded-2xl overflow-hidden border border-gray-700"
                  style={{ y: yRange, opacity: opacityRange }}
                >
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              )}
            </AnimatedScroll>
          ))}
        </div>
      </section>



      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Animations;