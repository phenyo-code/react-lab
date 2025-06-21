/* eslint-disable react/no-unescaped-entities */
'use client';

import AnimatedText from './components/animations/AnimatedText';
import AnimatedScroll from './components/animations/AnimatedScroll';
import Header from './components/Header';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import Footer from './components/Footer';

const Home: React.FC = () => {
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
    icon: string;
    textEffect: 'wave' | 'ripple' | 'pulse';
  }

  interface TextDemo {
    title: string;
    description: string;
    textEffect: 'ripple' | 'burst' | 'pulse';
  }

  interface ScrollDemo {
    title: string;
    description: string;
    scrollEffect: 'scrollFade' | 'slideInLeft' | 'slideInRight';
  }

  const features: Feature[] = [
    {
      title: 'Text Animations',
      description: 'Over 20 dynamic text effects to create engaging headings and UI elements for portfolios, landing pages, and more.',
      icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
      textEffect: 'wave',
    },
    {
      title: 'Scroll Animations',
      description: 'Smooth, GPU-accelerated scroll effects to enhance navigation in e-commerce sites and dashboards.',
      icon: 'M4 6h16M4 12h16M4 18h16',
      textEffect: 'ripple',
    },
    {
      title: 'Easy Integration',
      description: 'Plug-and-play components with TypeScript support for rapid development in any Next.js project.',
      icon: 'M12 8v8m-4-4h8',
      textEffect: 'pulse',
    },
  ];

  const textDemos: TextDemo[] = [
    {
      title: 'Ripple Effect',
      description: 'Fluid, wave-like scaling for dynamic text reveals, ideal for hero sections and callouts.',
      textEffect: 'ripple',
    },
    {
      title: 'Burst Effect',
      description: 'Explosive scattering for bold, attention-grabbing text, perfect for product highlights.',
      textEffect: 'burst',
    },
    {
      title: 'Pulse Effect',
      description: 'Rhythmic pulsing for vibrant text displays, great for interactive dashboards.',
      textEffect: 'pulse',
    },
  ];

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
      <section className="py-24 px-6 text-center max-w-7xl mx-auto border-b border-gray-700">
        <AnimatedScroll
          effect="slideInLeft"
          triggerPoint={0.1}
          duration={1000}
          className="flex flex-col items-center"
        >

          <AnimatedText
            effect="wave"
            duration={Infinity}
            textColor="text-white"
            fontSize="text-4xl md:text-5xl"
            glowColor="rgba(255,255,255,0)"
            className="font-bold mb-6 tracking-tight"
          >
            React Animations
          </AnimatedText>

          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
          <motion.p
            className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-8"
            style={{ y: yRange, opacity: opacityRange }}
          >
            React Animations is a free, open-source library crafted for Next.js developers to effortlessly add dynamic, GPU-accelerated animations. Install with `npm install react-animations` to integrate lightweight, TypeScript-friendly text and scroll effects powered by Framer Motion and Lenis. Elevate your portfolios, e-commerce sites, and dashboards with professional-grade UI animations in minutes.
          </motion.p>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/animations"
                className="inline-block px-8 py-3 rounded-full font-semibold text-lg bg-pink-600 text-white hover:bg-pink-700 transition-colors duration-300"
                aria-label="Explore React Animations"
              >
                Explore Animations
              </Link>
            </motion.div>
          </div>
        </AnimatedScroll>
      </section>

      {/* Introduction Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-gray-700" style={gradientBackground}>
        <AnimatedScroll effect="slideInLeft" triggerPoint={0.15} duration={1000} className="text-center">
          <span className="text-[15px] text-gray-700 block mt-1" aria-label="Animation properties for introduction scroll">
            effect="slideInLeft" triggerPoint={0.15} duration={1000}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Why React Animations?
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            React Animations empowers developers to enhance their Next.js applications with minimal effort. Install via `npm install react-animations` and drop our components into your project to create stunning, performant UIs. Built with TypeScript, Framer Motion, and Lenis, our library is perfect for portfolios, e-commerce platforms, dashboards, and more, offering seamless integration and professional-grade animations.
          </p>
          <hr className="border-gray-700 max-w-md mx-auto" />
        </AnimatedScroll>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-gray-700">
        <AnimatedScroll effect="slideInLeft" triggerPoint={0.2} duration={1000} className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 tracking-tight">
            Core Features
          </h2>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
        </AnimatedScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-700">
          {features.map(({ title, description, icon, textEffect }, index) => (
            <AnimatedScroll
              key={title}
              effect={index % 2 === 0 ? 'slideInLeft' : 'slideInRight'}
              triggerPoint={0.2 + index * 0.1}
              duration={1000}
              className={`py-6 flex flex-col items-center text-center ${
                index < features.length - 1 ? 'md:border-r md:border-gray-700' : ''
              } ${index === 0 ? 'border-t md:border-t-0' : ''}`}
            >
              <svg
                className="w-10 h-10 mb-4 text-pink-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
              </svg>
              <h3 className="text-xl font-semibold mb-2">
                <AnimatedText
                  effect={textEffect}
                  duration={Infinity}
                  textColor="text-white"
                  fontSize="text-xl"
                  glowColor="rgba(236, 72, 153, 0.5)"
                  className="font-semibold"
                >
                  {title}
                </AnimatedText>
              </h3>
              <p className="text-gray-400 text-sm max-w-xs">{description}</p>
            </AnimatedScroll>
          ))}
        </div>
      </section>

      {/* Text Animation Showcase */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-gray-700" style={gradientBackground}>
        <AnimatedScroll effect="slideInRight" triggerPoint={0.4} duration={1000} className="text-center">
          <span className="text-[15px] text-gray-700 block mt-1" aria-label="Animation properties for text showcase scroll">
            effect="slideInRight" triggerPoint={0.4} duration={1000}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Text Animation Showcase
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-12">
            Discover the power of our `AnimatedText` component with effects like ripple, burst, and pulse. These animations, infused with wave-like motion, are perfect for hero sections, product highlights, and interactive dashboards. Explore all 20+ effects to add flair to your Next.js projects.
          </p>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
        </AnimatedScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-700">
          {textDemos.map(({ title, description, textEffect }, index) => (
            <AnimatedScroll
              key={title}
              effect={index % 2 === 0 ? 'slideInLeft' : 'slideInRight'}
              triggerPoint={0.4 + index * 0.1}
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

      {/* Scroll Animation Showcase */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-gray-700" style={gradientBackground}>
        <AnimatedScroll effect="slideInLeft" triggerPoint={0.5} duration={1000} className="text-center">
          <span className="text-[15px] text-gray-700 block mt-1" aria-label="Animation properties for scroll showcase scroll">
            effect="slideInLeft" triggerPoint={0.5} duration={1000}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Scroll Animation Showcase
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-12">
            Transform navigation with our `AnimatedScroll` component. Effects like scrollFade, slideInLeft, and slideInRight create engaging transitions for blog posts, portfolios, and e-commerce grids. Explore these GPU-accelerated animations to captivate your users.
          </p>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
        </AnimatedScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-700">
          {scrollDemos.map(({ title, description, scrollEffect }, index) => (
            <AnimatedScroll
              key={title}
              effect={scrollEffect}
              triggerPoint={0.5 + index * 0.1}
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

      {/* Community Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-gray-700">
        <AnimatedScroll effect="slideInRight" triggerPoint={0.55} duration={1000} className="text-center">
          <span className="text-[10px] text-gray-700 block mt-1" aria-label="Animation properties for community scroll">
            effect="slideInRight" triggerPoint={0.55} duration={1000}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Join Our Community
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            React Animations thrives on community contributions. Join developers worldwide on GitHub to share feedback, report issues, or contribute new effects. Star our repository, explore our open-source code, and help shape the future of animation in Next.js.
          </p>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="https://github.com/your-repo/react-animations"
              className="inline-block px-8 py-3 rounded-full font-semibold text-lg bg-pink-600 text-white hover:bg-pink-700 transition-colors duration-300"
              aria-label="Contribute on GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contribute on GitHub
            </Link>
          </motion.div>
        </AnimatedScroll>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-b border-gray-700">
        <AnimatedScroll effect="slideInLeft" triggerPoint={0.6} duration={1000} className="text-center">
          <span className="text-[15px] text-gray-700 block mt-1" aria-label="Animation properties for CTA scroll">
            effect="slideInLeft" triggerPoint={0.6} duration={1000}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Get Started with React Animations
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Start building captivating Next.js applications today with `react-animations`. Install via `npm install react-animations` to access our lightweight, TypeScript-friendly library. Dive into our documentation for setup guides or explore the showcase to see our animations in action.
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
                href="/animations"
                className="inline-block px-8 py-3 rounded-full font-semibold text-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300"
                aria-label="View Animation Showcase"
              >
                View Showcase
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

export default Home;