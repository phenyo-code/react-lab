'use client';

import AnimatedText from '@/app/components/animations/AnimatedText';
import AnimatedScroll from '@/app/components/animations/AnimatedScroll';
import Header from '@/app/components/Header';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';
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
      description: 'Stand out with cinematic animations like neon glows, holographic shifts, and particle bursts. Each effect is crafted to elevate your UI with a futuristic, engaging aesthetic.',
      image: '/images/premium-effects.jpg',
      effect: 'scrollFade',
      triggerPoint: 0.2,
    },
    {
      title: 'Performant & Accessible',
      description: 'Built with Framer Motion and Lenis, ReactLab delivers 60fps animations with minimal CPU usage. Full support for prefers-reduced-motion ensures accessibility for all users.',
      image: '/images/performance.jpg',
      effect: 'scrollSlide',
      triggerPoint: 0.3,
      reverse: true,
    },
    {
      title: 'NPM-Ready',
      description: 'Lightweight, tree-shakable, and TypeScript-compatible, ReactLab integrates seamlessly into any React project via NPM. Get started in minutes with our intuitive API.',
      effect: 'parallax',
      triggerPoint: 0.4,
    },
  ];

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
          Transform your React applications with ReactLab’s lightweight, TypeScript-friendly animations library. Powered by Framer Motion and Lenis, our premium text and scroll effects deliver cinematic, GPU-accelerated experiences that captivate users.
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