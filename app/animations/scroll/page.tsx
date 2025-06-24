/* eslint-disable react/no-unescaped-entities */
'use client';

import AnimatedScroll from '@/app/components/animations/AnimatedScroll';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import Link from 'next/link';
import AnimatedSVG from '@/app/components/animations/AnimatedSVG';

interface ScrollDemo {
  title: string;
  description: string;
  scrollEffect: 'scrollFade' | 'slideInLeft' | 'slideInRight' | 'parallax' | 'skewScroll' | 'slideUp';
}

const Scrollpage: React.FC = () => {
  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // Scroll-based slide-up effect for CTA buttons
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  const opacityRange = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const scrollDemos: ScrollDemo[] = [
    {
      title: 'Scroll Fade',
      description: 'Subtle fade-in for smooth content reveals, ideal for blog posts and galleries.',
      scrollEffect: 'scrollFade',
    },
    {
      title: 'Slide In Left',
      description: 'Dynamic left-slide entry for engaging section transitions in portfolios.',
      scrollEffect: 'slideInLeft',
    },
    {
      title: 'Slide In Right',
      description: 'Bold right-slide effect to highlight content in e-commerce product grids.',
      scrollEffect: 'slideInRight',
    },
    {
      title: 'Parallax Effect',
      description: 'Depth-adding parallax scroll for immersive backgrounds and headers.',
      scrollEffect: 'parallax',
    },
    {
      title: 'Skew Scroll',
      description: 'Skewed transformation with a glowing trail, perfect for dynamic hero sections.',
      scrollEffect: 'skewScroll',
    },
    {
      title: 'Slide Up',
      description: 'Smooth upward slide for elegant content reveals, great for landing pages.',
      scrollEffect: 'slideUp',
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

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white font-sans">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative pt-18 px-4 sm:px-6 md:px-8 max-w-[100vw] mx-auto border-b border-gray-700 overflow-hidden">
        <div className="relative w-full max-w-7xl mx-auto">
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center text-center h-[60vh]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <AnimatedSVG
                        text="Scroll Animations"
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
            <p className="text-base md:text-lg text-gray-100 max-w-xl mb-6">
              Explore the power of GPU-accelerated scroll animations with React Animations. Discover effects like fade, slide, parallax, skew, and more, designed for seamless integration into your Next.js projects.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/docs"
                className="inline-block px-8 py-3 rounded-full font-semibold text-lg bg-pink-600 text-white hover:bg-pink-700 transition-colors duration-300"
                aria-label="Get Started with Scroll Animations"
              >
                Get Started
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-gray-700" style={gradientBackground}>
        <AnimatedScroll effect="scrollFade" triggerPoint={0.15} duration={1000} className="text-center">
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Why Scroll Animations?
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Scroll animations bring your Next.js applications to life with smooth, engaging transitions. Powered by Framer Motion and Lenis, our `AnimatedScroll` component offers effects like fade, slide, parallax, skew, and slide-up to enhance user experiences in portfolios, e-commerce platforms, and interactive dashboards.
          </p>
          <hr className="border-gray-700 max-w-md mx-auto" />
        </AnimatedScroll>
      </section>

      {/* Scroll Animation Showcase */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-gray-700" style={gradientBackground}>
        <AnimatedScroll effect="slideInLeft" triggerPoint={0.2} duration={1000} className="text-center">
          <span className="text-[15px] text-gray-700 block mt-1" aria-label="Animation properties for scroll showcase scroll">
            effect="slideInLeft" triggerPoint={0.2} duration={1000}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Explore Scroll Effects
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-12">
            Experience all six scroll effects in action. Each effect is GPU-accelerated for performance and designed for easy integration. Scroll through to see how `scrollFade`, `slideInLeft`, `slideInRight`, `parallax`, `skewScroll`, and `slideUp` can elevate your UI.
          </p>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
        </AnimatedScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-700">
          {scrollDemos.map(({ title, description, scrollEffect }, index) => (
            <AnimatedScroll
              key={title}
              effect={scrollEffect}
              triggerPoint={0.3 + index * 0.1}
              duration={1000}
              className={`py-6 flex flex-col items-center text-center ${
                index < scrollDemos.length - 1 ? 'md:border-r md:border-gray-700' : ''
              } ${index === 0 ? 'border-t md:border-t-0' : ''}`}
              textColor="text-white"
              fontSize="text-xl"
              glowColor="rgba(236, 72, 153, 0.5)"
            >
              <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
              <hr className="border-gray-700 mb-2 max-w-xs mx-auto" />
              <p className="text-gray-400 text-sm max-w-xs">{description}</p>
              <hr className="border-gray-700 mt-2 max-w-xs mx-auto" />
            </AnimatedScroll>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-gray-700">
        <AnimatedScroll effect="slideUp" triggerPoint={0.4} duration={1000} className="text-center">
          <span className="text-[15px] text-gray-700 block mt-1" aria-label="Animation properties for CTA scroll">
            effect="slideUp" triggerPoint={0.4} duration={1000}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Start Animating Today
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Integrate these scroll effects into your Next.js projects with `react-animations`. Install via `npm install react-animations` and explore our documentation for setup guides and advanced customizations.
          </p>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div style={{ y: yRange, opacity: opacityRange }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/docs"
                className="inline-block px-8 py-3 rounded-full font-semibold text-lg bg-pink-600 text-white hover:bg-pink-700 transition-colors duration-300"
                aria-label="Get Started with Docs"
              >
                Get Started
              </Link>
            </motion.div>
            <motion.div style={{ y: yRange, opacity: opacityRange }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="https://github.com/your-repo/react-animations"
                className="inline-block px-8 py-3 rounded-full font-semibold text-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300"
                aria-label="View on GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
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

export default Scrollpage;