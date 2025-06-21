'use client';

import AnimatedScroll from '@/app/components/animations/AnimatedScroll';
import AnimatedText from '@/app/components/animations/AnimatedText';
import Header from '@/app/components/Header';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

const ScrollAnimations: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedEffect, setSelectedEffect] = useState<
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
  >('scrollFade');

  interface ScrollAnimationConfig {
    effect:
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
      | 'orbitTrail';
    text: string;
    description: string;
    useCase: {
      title: string;
      context: string;
      codeSnippet: string;
      image?: string;
    };
    color: string;
    glowColor: string;
  }

  const animations: ScrollAnimationConfig[] = [
    {
      effect: 'scrollFade',
      text: 'Fade In',
      description: 'A subtle fade-in effect for elegant content reveals, perfect for professional landing pages.',
      useCase: {
        title: 'E-Commerce Hero Section',
        context:
          'Use Fade In to reveal a hero headline and product image on an e-commerce homepage, creating a clean, inviting entry that drives conversions.',
        codeSnippet: `<AnimatedScroll effect="scrollFade" textColor="text-pink-400" glowColor="rgba(236, 72, 153, 0.5)">Shop Now</AnimatedScroll>`,
        image: '/images/iphone.jpg',
      },
      color: 'text-pink-400',
      glowColor: 'rgba(236, 72, 153, 0.5)',
    },
    {
      effect: 'scrollSlide',
      text: 'Slide In',
      description: 'Slides content upward with opacity, ideal for dynamic feature showcases.',
      useCase: {
        title: 'Portfolio Feature List',
        context:
          'Slide In feature descriptions in a creative portfolio, highlighting skills or services with a smooth, engaging motion.',
        codeSnippet: `<AnimatedScroll effect="scrollSlide" textColor="text-teal-400">Web Development</AnimatedScroll>`,
      },
      color: 'text-teal-400',
      glowColor: 'rgba(45, 212, 191, 0.5)',
    },
    {
      effect: 'parallax',
      text: 'Parallax',
      description: 'Creates layered depth for immersive storytelling sections.',
      useCase: {
        title: 'Travel Blog Hero',
        context:
          'Apply Parallax to a travel blog’s hero image, with a foreground text layer moving slower than the background, evoking adventure.',
        codeSnippet: `<AnimatedScroll effect="parallax" className="h-[80vh]"><Image src="/bg.jpg" alt="Travel" /></AnimatedScroll>`,
        image: '/images/iphone.jpg',
      },
      color: 'text-blue-400',
      glowColor: 'rgba(59, 130, 246, 0.5)',
    },
    {
      effect: 'scale',
      text: 'Scale Up',
      description: 'Scales elements in with focus, perfect for highlighting key CTAs.',
      useCase: {
        title: 'SaaS Call-to-Action',
        context:
          'Use Scale Up to emphasize a “Sign Up” button on a SaaS landing page, drawing attention with a subtle grow effect.',
        codeSnippet: `<AnimatedScroll effect="scale" className="px-6 py-3 bg-pink-500 rounded-full">Sign Up</AnimatedScroll>`,
      },
      color: 'text-pink-500',
      glowColor: 'rgba(236, 72, 153, 0.5)',
    },
    {
      effect: 'fullPage',
      text: 'Full Page',
      description: 'Reveals entire sections with cinematic flair, ideal for impactful intros.',
      useCase: {
        title: 'Agency Service Intro',
        context:
          'Reveal an agency’s service page with Full Page, showcasing a full-screen visual and headline for maximum impact.',
        codeSnippet: `<AnimatedScroll effect="fullPage" className="h-screen"><h1>Our Services</h1></AnimatedScroll>`,
        image: '/images/iphone.jpg',
      },
      color: 'text-purple-400',
      glowColor: 'rgba(139, 92, 246, 0.5)',
    },
    {
      effect: 'pin',
      text: 'Pinned Section',
      description: 'Pins content for sticky focal points, great for navigation or headers.',
      useCase: {
        title: 'Product Sticky Header',
        context:
          'Pin a product page’s header with key details (e.g., price, add to cart) as users scroll through reviews, ensuring easy access.',
        codeSnippet: `<AnimatedScroll effect="pin" className="bg-gray-800 p-4">Add to Cart</AnimatedScroll>`,
      },
      color: 'text-orange-400',
      glowColor: 'rgba(249, 115, 22, 0.5)',
    },
    {
      effect: 'rotate',
      text: 'Rotate In',
      description: 'Rotates elements into view for playful, engaging reveals.',
      useCase: {
        title: 'Tech Blog Icons',
        context:
          'Rotate In category icons on a tech blog, adding a fun, dynamic touch to navigation or content previews.',
        codeSnippet: `<AnimatedScroll effect="rotate" className="w-12 h-12"><svg>...</svg></AnimatedScroll>`,
        image: '/images/iphone.jpg',
      },
      color: 'text-yellow-400',
      glowColor: 'rgba(234, 179, 8, 0.5)',
    },
    {
      effect: 'zoom',
      text: 'Zoom Effect',
      description: 'Zooms in for bold, attention-grabbing content reveals.',
      useCase: {
        title: 'Fashion Product Showcase',
        context:
          'Use Zoom to highlight product images in a fashion retailer’s gallery, creating a dramatic reveal as users scroll.',
        codeSnippet: `<AnimatedScroll effect="zoom"><Image src="/product.jpg" alt="Shoes" /></AnimatedScroll>`,
        image: '/images/iphone.jpg',
      },
      color: 'text-pink-400',
      glowColor: 'rgba(236, 72, 153, 0.5)',
    },
    {
      effect: 'glowTrail',
      text: 'Glow Trail',
      description: 'A neon glow trails elements, perfect for futuristic UIs.',
      useCase: {
        title: 'Gaming Platform Menu',
        context:
          'Apply Glow Trail to menu items in a gaming platform’s UI, creating a cyberpunk aesthetic that enhances navigation.',
        codeSnippet: `<AnimatedScroll effect="glowTrail" textColor="text-cyan-400">Play Now</AnimatedScroll>`,
      },
      color: 'text-cyan-400',
      glowColor: 'rgba(147, 197, 253, 0.5)',
    },
    {
      effect: 'holoShift',
      text: 'Holo Shift',
      description: 'Holographic color shifts for sci-fi, cutting-edge designs.',
      useCase: {
        title: 'VR Product Demo',
        context:
          'Use Holo Shift to animate a VR headset image on a product page, with holographic effects that evoke advanced tech.',
        codeSnippet: `<AnimatedScroll effect="holoShift"><Image src="/vr.jpg" alt="VR Headset" /></AnimatedScroll>`,
        image: '/images/iphone.jpg',
      },
      color: 'text-blue-300',
      glowColor: 'rgba(59, 130, 246, 0.5)',
    },
    {
      effect: 'elasticReveal',
      text: 'Elastic Reveal',
      description: 'Springy, playful reveals for interactive elements.',
      useCase: {
        title: 'Mobile App Onboarding',
        context:
          'Elastic Reveal onboarding cards in a mobile app, adding a lively, engaging motion to guide users through setup.',
        codeSnippet: `<AnimatedScroll effect="elasticReveal" className="p-6 bg-green-500 rounded-xl">Next</AnimatedScroll>`,
      },
      color: 'text-green-400',
      glowColor: 'rgba(34, 197, 94, 0.5)',
    },
    {
      effect: 'particleBurst',
      text: 'Particle Burst',
      description: 'Sparkling particle effects for magical, celebratory reveals.',
      useCase: {
        title: 'Event Schedule Reveal',
        context:
          'Use Particle Burst to reveal an event’s schedule, with sparkling particles adding excitement to each session’s entry.',
        codeSnippet: `<AnimatedScroll effect="particleBurst" glowColor="rgba(255, 159, 64, 0.7)">Day 1</AnimatedScroll>`,
        image: '/images/iphone.jpg',
      },
      color: 'text-orange-300',
      glowColor: 'rgba(255, 159, 64, 0.7)',
    },
    {
      effect: 'cinematicZoom',
      text: 'Cinematic Zoom',
      description: 'Dramatic zoom with vignette for movie-like transitions.',
      useCase: {
        title: 'Filmmaker Portfolio',
        context:
          'Apply Cinematic Zoom to video thumbnails in a filmmaker’s portfolio, creating a theatrical reveal for each project.',
        codeSnippet: `<AnimatedScroll effect="cinematicZoom"><Image src="/video.jpg" alt="Film" /></AnimatedScroll>`,
        image: '/images/iphone.jpg',
      },
      color: 'text-purple-300',
      glowColor: 'rgba(168, 85, 247, 0.7)',
    },
    {
      effect: 'skewScroll',
      text: 'Skew Scroll',
      description: 'Distorted skews for futuristic, dynamic layouts.',
      useCase: {
        title: 'Digital Art Gallery',
        context:
          'Use Skew Scroll to animate artwork previews in a digital gallery, creating a unique, avant-garde navigation experience.',
        codeSnippet: `<AnimatedScroll effect="skewScroll"><Image src="/art.jpg" alt="Artwork" /></AnimatedScroll>`,
        image: '/images/iphone.jpg',
      },
      color: 'text-teal-300',
      glowColor: 'rgba(45, 212, 191, 0.5)',
    },
    {
      effect: 'waveShift',
      text: 'Wave Shift',
      description: 'Fluid, wave-like motion for organic, calming effects.',
      useCase: {
        title: 'Wellness App Header',
        context:
          'Apply Wave Shift to a wellness app’s section headers, evoking a soothing, flowing motion for class schedules or tips.',
        codeSnippet: `<AnimatedScroll effect="waveShift" textColor="text-blue-500">Meditation</AnimatedScroll>`,
      },
      color: 'text-blue-500',
      glowColor: 'rgba(37, 99, 235, 0.5)',
    },
    {
      effect: 'depthPulse',
      text: 'Depth Pulse',
      description: '3D pulsing depth for engaging, heartbeat-like effects.',
      useCase: {
        title: 'Health Tech Dashboard',
        context:
          'Use Depth Pulse to animate key metrics (e.g., heart rate) in a health tech dashboard, emphasizing data with a 3D pulse.',
        codeSnippet: `<AnimatedScroll effect="depthPulse" className="p-4 bg-red-500 rounded-lg">120 BPM</AnimatedScroll>`,
        image: '/images/iphone.jpg',
      },
      color: 'text-red-300',
      glowColor: 'rgba(220, 38, 38, 0.5)',
    },
    {
      effect: 'orbitTrail',
      text: 'Orbit Trail',
      description: 'Cosmic orbital motion with particle trails for sci-fi intros.',
      useCase: {
        title: 'Space Startup Hero',
        context:
          'Apply Orbit Trail to a space startup’s hero image, with orbiting particles creating a cosmic, futuristic intro.',
        codeSnippet: `<AnimatedScroll effect="orbitTrail"><Image src="/space.jpg" alt="Rocket" /></AnimatedScroll>`,
        image: '/images/iphone.jpg',
      },
      color: 'text-indigo-300',
      glowColor: 'rgba(99, 102, 241, 0.5)',
    },
  ];

  const currentAnimation = animations.find((anim) => anim.effect === selectedEffect) || animations[0];

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
      {/* Dark/Light Mode Toggle */}
      <motion.button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-4 right-4 p-3 rounded-full bg-gray-900/80 backdrop-blur-sm text-pink-400 hover:text-pink-300 transition-colors duration-300 z-50 shadow-[0_0_10px_rgba(236,72,153,0.3)]"
        aria-label="Toggle dark mode"
        whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(236, 72, 153, 0.5)' }}
        whileTap={{ scale: 0.95 }}
      >
        {isDarkMode ? <FiSun size={20} /> : <FiMoon />}
      </motion.button>

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 px-8 max-w-7xl mx-auto text-center border-b border-gray-700">
        <AnimatedText
          effect="holoWave"
          duration={Infinity}
          textColor="text-pink-500"
          className="text-4xl md:text-6xl font-bold mb-4 tracking-tight"
          glowColor="rgba(236, 72, 153, 0.6)"
        >
          Scroll Animations Reimagined
        </AnimatedText>
        <motion.p
          className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Discover 17 powerful scroll animations from ReactLab, built with Framer Motion and Lenis. Dive into real-world examples to inspire your next React project with seamless, GPU-accelerated effects.
        </motion.p>
      </section>

      {/* Effect Selector */}
      <section className="py-4 px-8 max-w-7xl mx-auto sticky top-0 bg-[#1A1A1A]/90 backdrop-blur-md z-40 border-b border-gray-700">
        <motion.div
          className="flex flex-wrap justify-center gap-2 md:gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {animations.map(({ effect, text }) => (
            <motion.button
              key={effect}
              onClick={() => setSelectedEffect(effect)}
              className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                selectedEffect === effect
                  ? 'bg-pink-500 text-white shadow-[0_0_12px_rgba(236,72,153,0.5)]'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-pink-400'
              }`}
              whileHover={{ scale: 1.05, boxShadow: '0 0 8px rgba(236, 72, 153, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              {text}
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* Use Case Showcase */}
      <section className="py-16 px-8 max-w-7xl mx-auto">
        <motion.div
          className="relative min-h-[100vh] mb-12"
          key={selectedEffect}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatedScroll
            effect={selectedEffect}
            triggerPoint={0.1}
            duration={1000}
            glowColor={currentAnimation.glowColor}
            className="relative"
          >
            <div className="relative z-10">
              <h2 className={`text-3xl md:text-4xl font-bold ${currentAnimation.color} mb-6 tracking-tight`}>
                {currentAnimation.useCase.title}
              </h2>
              <p className="text-lg text-gray-400 mb-8 max-w-2xl">{currentAnimation.useCase.context}</p>
              {currentAnimation.useCase.image && (
                <motion.div
                  className="relative w-full h-[50vh] md:h-[60vh] rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={currentAnimation.useCase.image}
                    alt={currentAnimation.useCase.title}
                    fill
                    className="object-cover"
                  />
                  <motion.div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to top, rgba(0,0,0,0.7), transparent 50%)` }}
                    animate={{ opacity: [0.5, 0.7, 0.5] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  />
                </motion.div>
              )}
              <pre className="mt-8 text-sm bg-gray-800/80 p-4 rounded-lg text-gray-400 max-w-2xl font-mono">
                {currentAnimation.useCase.codeSnippet}
              </pre>
            </div>
            <motion.div
              className="absolute inset-0 -z-10"
              style={{ background: `radial-gradient(circle at 50% 50%, ${currentAnimation.glowColor}, transparent 70%)` }}
              animate={{ opacity: [0.15, 0.25, 0.15] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
          </AnimatedScroll>
        </motion.div>

        {/* Why Use Section */}
        <motion.div className="relative min-h-[60vh] mb-12">
          <AnimatedScroll
            effect={selectedEffect}
            triggerPoint={0.3}
            duration={1000}
            glowColor={currentAnimation.glowColor}
            className="relative flex flex-col md:flex-row items-center gap-8"
          >
            <div className="flex-1">
              <h3 className={`text-2xl md:text-3xl font-bold ${currentAnimation.color} mb-4`}>Why Use {currentAnimation.text}?</h3>
              <p className="text-lg text-gray-400 max-w-lg">
                {currentAnimation.description} Its GPU-accelerated animations and easy-to-use props make it a versatile choice for modern React applications.
              </p>
            </div>
            <motion.div
              className="relative w-full md:w-1/2 h-[40vh] rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r"
                style={{ background: `linear-gradient(to right, ${currentAnimation.glowColor}, transparent)` }}
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-white">
                Visual Example
              </div>
            </motion.div>
          </AnimatedScroll>
        </motion.div>

        {/* Technical Details Section */}
        <motion.div className="relative min-h-[60vh]">
          <AnimatedScroll
            effect={selectedEffect}
            triggerPoint={0.5}
            duration={1000}
            glowColor={currentAnimation.glowColor}
            className="relative"
          >
            <div className="relative z-10">
              <h3 className={`text-2xl md:text-3xl font-bold ${currentAnimation.color} mb-4`}>Technical Details</h3>
              <p className="text-lg text-gray-400 mb-6 max-w-2xl">
                Powered by Framer Motion and Lenis, {currentAnimation.text} offers customizable props like <code>triggerPoint</code>, <code>duration</code>, and <code>glowColor</code>. Optimized for 60fps with minimal CPU usage.
              </p>
              <ul className="list-disc list-inside text-gray-400">
                <li>Trigger Point: {0.1} to {0.5}</li>
                <li>Duration: Up to {1000}px</li>
                <li>Glow Color: {currentAnimation.glowColor}</li>
              </ul>
            </div>
            <motion.div
              className="absolute inset-0 -z-10"
              style={{ background: `radial-gradient(circle at 80% 20%, ${currentAnimation.glowColor}, transparent 70%)` }}
              animate={{ opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />
          </AnimatedScroll>
        </motion.div>
      </section>
    </div>
  );
};

export default ScrollAnimations;