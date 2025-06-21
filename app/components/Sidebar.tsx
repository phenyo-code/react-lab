'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX, FiStar, FiZap } from 'react-icons/fi';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sections = [
    { id: 'overview', label: 'Overview', icon: FiStar, effect: 'ripple' },
    { id: 'installation', label: 'Installation', icon: FiZap, effect: 'burst' },
    { id: 'animated-text', label: 'AnimatedText', icon: FiStar, effect: 'pulse' },
    { id: 'animated-scroll', label: 'AnimatedScroll', icon: FiStar, effect: 'ripple' },
    { id: 'examples', label: 'Examples', icon: FiZap, effect: 'burst' },
  ];

  // Icon animation variants (matching Header)
  const iconVariants: Record<string, Variants> = {
    ripple: {
      initial: { scale: 1, y: 0 },
      animate: {
        scale: [1, 1.5, 1],
        y: [0, -5, 0],
        opacity: [1, 0.7, 1],
        transition: {
          duration: 1.5,
          repeat: 0,
          ease: 'easeInOut',
        },
      },
    },
    burst: {
      initial: { x: 0, y: 0, opacity: 1 },
      animate: {
        x: [0, (Math.random() - 0.5) * 10, 0],
        y: [0, -5, 0],
        opacity: [1, 0.5, 1],
        transition: {
          duration: 1.5,
          repeat: 0,
          ease: 'easeOut',
        },
      },
    },
    pulse: {
      initial: { scale: 1, y: 0 },
      animate: {
        scale: [1, 1.3, 1],
        y: [0, -5, 0],
        transition: {
          duration: 1.5,
          repeat: 0,
          ease: 'easeInOut',
        },
      },
    },
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <motion.button
        className="md:hidden fixed top-6 left-6 p-2 rounded-full bg-gray-800/80 backdrop-blur-sm text-pink-500 z-50 shadow-[0_0_10px_rgba(236,72,153,0.4)]"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </motion.button>

      {/* Sidebar */}
      <motion.aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800/80 backdrop-blur-md text-white p-6 z-40 md:static md:block md:w-64 md:h-screen md:shadow-none transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        initial={{ x: -256 }}
        animate={{ x: isOpen ? 0 : -256 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="flex items-center mb-8">
          <Link href="/" className="text-2xl font-bold text-pink-500 hover:text-pink-400 transition-colors duration-300">
            React Animations Docs
          </Link>
        </div>
        <nav className="space-y-4">
          {sections.map(({ id, label, icon: Icon, effect }) => (
            <motion.div key={id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href={`#${id}`}
                className="flex items-center justify-between text-gray-300 hover:text-pink-500 transition-colors duration-200 text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                {label}
                {Icon && (
                  <motion.span
                    variants={iconVariants[effect]}
                    initial="initial"
                    animate="animate"
                    className="text-pink-500"
                    style={{ textShadow: `0 0 10px rgba(236, 72, 153, 0.5)` }}
                  >
                    <Icon size={16} />
                  </motion.span>
                )}
              </a>
            </motion.div>
          ))}
        </nav>
      </motion.aside>

      {/* Overlay for Mobile */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;