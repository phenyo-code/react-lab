'use client';

import AnimatedText from './components/animations/AnimatedText';
import Header from './components/Header';
import Link from 'next/link';
import { useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

const Home: React.FC = () => {
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

      {/* Home Content */}
      <section className="py-24 px-6 text-center">
        <AnimatedText
          effect="neon"
          duration={Infinity}
          textColor={isDarkMode ? 'text-teal-400' : 'text-indigo-700'}
          fontSize="text-4xl md:text-5xl"
          className="mb-6"
        >
          Welcome to React Lab
        </AnimatedText>
        <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-8 max-w-xl mx-auto`}>
          Empowering React developers with futuristic animations and backend tools.
        </p>
        <Link
          href="/animations"
          className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition-colors"
        >
          Explore Animations
        </Link>
      </section>
    </div>
  );
};

export default Home;