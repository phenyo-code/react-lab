'use client';

import AnimatedText from '@/app/components/animations/AnimatedText';
import Header from '@/app/components/Header';
import { useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import Link from 'next/link';

const Animations: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Dark/Light Mode Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
      </button>

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto text-center">
        <AnimatedText
          effect="glitch"
          duration={Infinity}
          textColor={isDarkMode ? 'text-teal-400' : 'text-indigo-700'}
          fontSize="text-4xl md:text-5xl"
          glowColor="rgba(6, 182, 212, 0.7)"
          className="mb-6"
        >
          ReactLab Animations
        </AnimatedText>
        <p className={`text-lg md:text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} max-w-3xl mx-auto mb-8`}>
          Elevate your web projects with ReactLab, a lightweight, TypeScript-friendly animations library. Featuring premium text and scroll effects powered by Framer Motion and Lenis, ReactLab delivers stunning, performant animations for modern React applications. Explore our curated collection of effects below.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/animations/text"
            className={`inline-block px-6 py-3 rounded-lg font-semibold text-lg ${isDarkMode ? 'bg-teal-500 text-white hover:bg-teal-600' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
          >
            View Text Animations
          </Link>
          <Link
            href="/animations/scroll"
            className={`inline-block px-6 py-3 rounded-lg font-semibold text-lg ${isDarkMode ? 'bg-cyan-500 text-white hover:bg-cyan-600' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
          >
            View Scroll Animations
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <AnimatedText
          effect="neon"
          duration={Infinity}
          textColor={isDarkMode ? 'text-blue-400' : 'text-blue-600'}
          fontSize="text-2xl md:text-3xl"
          glowColor="rgba(147, 197, 253, 0.5)"
          className="text-center mb-8"
        >
          Why Choose ReactLab?
        </AnimatedText>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-teal-400' : 'text-indigo-600'} mb-2`}>Premium Effects</h3>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Stand out with unique, cinematic animations like neon glows, holographic shifts, and particle bursts.
            </p>
          </div>
          <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-teal-400' : 'text-indigo-600'} mb-2`}>Performant & Accessible</h3>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Built with Framer Motion and Lenis for smooth, GPU-accelerated animations, with full support for prefers-reduced-motion.
            </p>
          </div>
          <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-teal-400' : 'text-indigo-600'} mb-2`}>NPM-Ready</h3>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Lightweight, tree-shakable, and TypeScript-compatible for seamless integration into any React project.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Animations;