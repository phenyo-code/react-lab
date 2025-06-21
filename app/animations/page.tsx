'use client';

import AnimatedText from '@/app/components/animations/AnimatedText';
import AnimatedScroll from '@/app/components/animations/AnimatedScroll';
import Header from '@/app/components/Header';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Animations: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white font-sans">
      {/* Subtle Background Animation */}
      <motion.div
        className="fixed inset-0 -z-10"
        animate={{
          background: [
            'radial-gradient(circle at 10% 10%, rgba(45, 212, 191, 0.15), transparent 70%)',
            'radial-gradient(circle at 90% 90%, rgba(59, 130, 246, 0.15), transparent 70%)',
            'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.15), transparent 70%)',
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
      />

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 px-8 max-w-7xl mx-auto text-center">
        <motion.div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[rgba(45,212,191,0.05)] to-[rgba(59,130,246,0.1)]"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
        <AnimatedText
          effect="holoWave"
          duration={Infinity}
          textColor="text-teal-500"
          className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          glowColor="rgba(6, 182, 212, 0.6)"
        >
          ReactLab Animations
        </AnimatedText>
        <motion.p
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Transform your React applications with ReactLab’s lightweight, TypeScript-friendly animations library. Powered by Framer Motion and Lenis, our premium text and scroll effects deliver cinematic, GPU-accelerated experiences that captivate users.
        </motion.p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.div whileHover={{ scale: 1.05, boxShadow: '0 0 12px rgba(45, 212, 191, 0.5)' }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/animations/text"
              className="inline-block px-8 py-4 rounded-full font-semibold text-lg bg-teal-500 text-white hover:bg-teal-600 transition-colors duration-300 shadow-[0_0_10px_rgba(45,212,191,0.3)]"
            >
              Explore Text Animations
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, boxShadow: '0 0 12px rgba(79, 70, 229, 0.5)' }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/animations/scroll"
              className="inline-block px-8 py-4 rounded-full font-semibold text-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors duration-300 shadow-[0_0_10px_rgba(79,70,229,0.3)]"
            >
              Explore Scroll Animations
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 max-w-7xl mx-auto">
        <AnimatedText
          effect="neon"
          duration={Infinity}
          textColor="text-blue-400"
          className="text-3xl md:text-4xl font-bold text-center mb-12 tracking-tight"
          glowColor="rgba(147, 197, 253, 0.5)"
        >
          Why Choose ReactLab?
        </AnimatedText>

        {/* Feature 1: Premium Effects */}
        <AnimatedScroll
          effect="scrollFade"
          triggerPoint={0.2}
          duration={1000}
          glowColor="rgba(45, 212, 191, 0.5)"
          className="relative flex flex-col md:flex-row items-center gap-8 mb-16"
        >
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-bold text-teal-400 mb-4 tracking-tight">Premium Effects</h3>
            <p className="text-lg text-gray-300 max-w-lg">
              Stand out with cinematic animations like neon glows, holographic shifts, and particle bursts. Each effect is crafted to elevate your UI with a futuristic, engaging aesthetic.
            </p>
          </div>
          <motion.div
            className="relative w-full md:w-1/2 h-[40vh] rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/images/placeholder12.jpg"
              alt="Premium Effects"
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
          <motion.div
            className="absolute inset-0 -z-10"
            style={{ background: `radial-gradient(circle at 80% 20%, rgba(45, 212, 191, 0.2), transparent 70%)` }}
            animate={{ opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
        </AnimatedScroll>

        {/* Feature 2: Performant & Accessible */}
        <AnimatedScroll
          effect="scrollSlide"
          triggerPoint={0.3}
          duration={1000}
          glowColor="rgba(79, 70, 229, 0.5)"
          className="relative flex flex-col md:flex-row-reverse items-center gap-8 mb-16"
        >
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-bold text-indigo-400 mb-4 tracking-tight">Performant & Accessible</h3>
            <p className="text-lg text-gray-300 max-w-lg">
              Built with Framer Motion and Lenis, ReactLab delivers 60fps animations with minimal CPU usage. Full support for prefers-reduced-motion ensures accessibility for all users.
            </p>
          </div>
          <motion.div
            className="relative w-full md:w-1/2 h-[40vh] rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/images/placeholder13.jpg"
              alt="Performant & Accessible"
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
          <motion.div
            className="absolute inset-0 -z-10"
            style={{ background: `radial-gradient(circle at 20% 80%, rgba(79, 70, 229, 0.2), transparent 70%)` }}
            animate={{ opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
        </AnimatedScroll>

        {/* Feature 3: NPM-Ready */}
        <AnimatedScroll
          effect="parallax"
          triggerPoint={0.4}
          duration={1000}
          glowColor="rgba(139, 92, 246, 0.5)"
          className="relative flex flex-col items-center text-center"
        >
          <div className="max-w-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-purple-400 mb-4 tracking-tight">NPM-Ready</h3>
            <p className="text-lg text-gray-300 mb-8">
              Lightweight, tree-shakable, and TypeScript-compatible, ReactLab integrates seamlessly into any React project via NPM. Get started in minutes with our intuitive API.
            </p>
            <pre className="text-sm bg-gray-900/80 p-4 rounded-lg text-gray-300 font-mono max-w-lg mx-auto">
              npm install react-lab-animations-lib
            </pre>
          </div>
          <motion.div
            className="absolute inset-0 -z-10"
            style={{ background: `radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.2), transparent 70%)` }}
            animate={{ opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
        </AnimatedScroll>
      </section>
    </div>
  );
};

export default Animations;