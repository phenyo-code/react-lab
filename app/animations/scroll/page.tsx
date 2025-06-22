/* eslint-disable react/no-unescaped-entities */
'use client';

import AnimatedScroll from '@/app/components/animations/AnimatedScroll';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';
import { Star } from 'lucide-react';

const Scroll: React.FC = () => {
  // Scroll-based slide-up effect for Hero and CTA
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  const opacityRange = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  interface ScrollDemo {
    title: string;
    description: string;
    scrollEffect:
      | 'scrollFade'
      | 'slideInLeft'
      | 'slideInRight'
      | 'parallax'
      | 'elasticReveal'
      | 'skewScroll'
      | 'waveShift'
      | 'depthPulse';
  }

  const scrollDemos: ScrollDemo[] = [
    {
      title: 'Scroll Fade',
      description: 'Smooth fade-in for content reveals in blogs and galleries.',
      scrollEffect: 'scrollFade',
    },
    {
      title: 'Slide In Left',
      description: 'Dynamic left-slide for engaging portfolio transitions.',
      scrollEffect: 'slideInLeft',
    },
    {
      title: 'Slide In Right',
      description: 'Bold right-slide to highlight e-commerce product grids.',
      scrollEffect: 'slideInRight',
    },
    {
      title: 'Parallax',
      description: 'Depth-adding parallax for immersive headers.',
      scrollEffect: 'parallax',
    },
    {
      title: 'Elastic Reveal',
      description: 'Springy scaling for playful UI elements.',
      scrollEffect: 'elasticReveal',
    },
    {
      title: 'Skew Scroll',
      description: 'Dynamic skew for modern, edgy transitions.',
      scrollEffect: 'skewScroll',
    },
    {
      title: 'Wave Shift',
      description: 'Wavy motion for fluid, organic animations.',
      scrollEffect: 'waveShift',
    },
    {
      title: 'Depth Pulse',
      description: '3D pulsing effect for immersive depth.',
      scrollEffect: 'depthPulse',
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
  const [scrollTryEffect, setScrollTryEffect] = useState<
    | 'scrollFade'
    | 'scrollSlide'
    | 'parallax'
    | 'scale'
    | 'fullPage'
    | 'pin'
    | 'rotate'
    | 'zoom'
    | 'glowTrail'
    | 'holoShift'
    | 'elasticReveal'
    | 'particleBurst'
    | 'cinematicZoom'
    | 'skewScroll'
    | 'waveShift'
    | 'depthPulse'
    | 'orbitTrail'
    | 'slideInLeft'
    | 'slideInRight'
  >('scrollFade');

  const handleScrollEffectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setScrollTryEffect(e.target.value as typeof scrollTryEffect);
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white font-sans">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="py-24 px-6 text-center max-w-7xl mx-auto border-b border-gray-700">
        <AnimatedScroll effect="cinematicZoom" triggerPoint={0.1} duration={1000} className="flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Scroll Animation Showcase
          </h1>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
          <motion.p
            className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-8"
            style={{ y: yRange, opacity: opacityRange }}
          >
            Discover the power of the `AnimatedScroll` component with effects like fade, slide, parallax, and more. These GPU-accelerated animations enhance user experiences in Next.js projects. Preview each effect below or try them interactively.
          </motion.p>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <AnimatedScroll effect="glowTrail" triggerPoint={0.1} duration={800}>
              <Link
                href="/docs"
                className="inline-block px-8 py-3 rounded-full font-semibold text-lg bg-pink-600 text-white hover:bg-pink-700 transition-colors duration-300"
                aria-label="Get Started with Documentation"
              >
                Get Started
              </Link>
            </AnimatedScroll>
          </motion.div>
        </AnimatedScroll>
      </section>

      {/* Scroll Animation Showcase */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-gray-700" style={gradientBackground}>
        <AnimatedScroll effect="slideInRight" triggerPoint={0.2} duration={1000} className="text-center">
          <span className="text-[15px] text-gray-700 block mt-1" aria-label="Animation properties for showcase scroll">
            effect="slideInRight" triggerPoint={0.2} duration={1000}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Explore Scroll Effects
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-12">
            Experience a variety of scroll animations, from subtle fades to dynamic 3D effects. Each effect is optimized for performance and perfect for portfolios, blogs, and e-commerce sites.
          </p>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
        </AnimatedScroll>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border-t border-gray-700">
          {scrollDemos.map(({ title, description, scrollEffect }, index) => (
            <AnimatedScroll
              key={title}
              effect={scrollEffect}
              triggerPoint={0.2 + index * 0.1}
              duration={1000}
              className={`py-6 flex flex-col items-center text-center ${
                index < scrollDemos.length - 1 ? 'md:border-r md:border-gray-700' : ''
              } ${index === 0 ? 'border-t md:border-t-0' : ''}`}
            >
              <h3 className="text-xl font-semibold mb-2 text-white flex items-center gap-2">
                {title} <Star className="w-5 h-5 text-pink-500" />
              </h3>
              <hr className="border-gray-700 mb-2 max-w-xs mx-auto" />
              <p className="text-gray-400 text-sm max-w-xs">{description}</p>
              <hr className="border-gray-700 mt-2 max-w-xs mx-auto" />
            </AnimatedScroll>
          ))}
        </div>
      </section>

      {/* Try It Out Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-gray-700" style={gradientBackground}>
        <AnimatedScroll effect="orbitTrail" triggerPoint={0.3} duration={1000} className="text-center">
          <span className="text-[15px] text-gray-700 block mt-1" aria-label="Animation properties for tryout scroll">
            effect="orbitTrail" triggerPoint={0.3} duration={1000}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Try Scroll Animations
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Select an effect to preview how it animates content as you scroll. Experiment with different triggers to see the impact on your UI.
          </p>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
          <motion.div className="flex justify-center mb-8" style={{ y: yRange, opacity: opacityRange }}>
            <select
              value={scrollTryEffect}
              onChange={handleScrollEffectChange}
              className="px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 outline-none text-lg w-full md:w-64"
            >
              {[
                'scrollFade',
                'scrollSlide',
                'parallax',
                'scale',
                'fullPage',
                'pin',
                'rotate',
                'zoom',
                'glowTrail',
                'holoShift',
                'elasticReveal',
                'particleBurst',
                'cinematicZoom',
                'skewScroll',
                'waveShift',
                'depthPulse',
                'orbitTrail',
                'slideInLeft',
                'slideInRight',
              ].map((effect) => (
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
              triggerPoint={0.3}
              duration={1000}
              className="text-center"
            >
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                Scroll to Animate <Star className="w-6 h-6 text-pink-500" />
              </h3>
              <p className="text-gray-400 text-sm max-w-xs mt-2">
                This content animates with the selected scroll effect.
              </p>
            </AnimatedScroll>
          </motion.div>
        </AnimatedScroll>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-gray-700">
        <AnimatedScroll effect="holoShift" triggerPoint={0.4} duration={1000} className="text-center">
          <span className="text-[15px] text-gray-700 block mt-1" aria-label="Animation properties for CTA scroll">
            effect="holoShift" triggerPoint={0.4} duration={1000}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Elevate Your Scrolls
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Transform your Next.js projects with `react-animations`. Install via `npm install react-animations` to access our lightweight, TypeScript-friendly scroll effects. Check out the docs or contribute to our community.
          </p>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <AnimatedScroll effect="glowTrail" triggerPoint={0.4} duration={800}>
                <Link
                  href="/docs"
                  className="inline-block px-8 py-3 rounded-full font-semibold text-lg bg-pink-600 text-white hover:bg-pink-700 transition-colors duration-300"
                  aria-label="Get Started with Docs"
                >
                  Get Started
                </Link>
              </AnimatedScroll>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <AnimatedScroll effect="glowTrail" triggerPoint={0.4} duration={800}>
                <Link
                  href="https://github.com/your-repo/react-animations"
                  className="inline-block px-8 py-3 rounded-full font-semibold text-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300"
                  aria-label="Contribute on GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contribute
                </Link>
              </AnimatedScroll>
            </motion.div>
          </div>
        </AnimatedScroll>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Scroll;