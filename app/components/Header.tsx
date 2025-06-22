'use client';

import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import AnimatedSVG from '@/app/components/animations/AnimatedSVG';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimationsOpen, setIsAnimationsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    {
      href: '/animations',
      label: 'Animations',
      subLinks: [
        { href: '/animations/text', label: 'Text' },
        { href: '/animations/scroll', label: 'Scroll' },
        { href: '/animations/svg', label: 'SVG' },
      ],
    },
    { href: '/docs', label: 'Docs' },
    { href: '/examples', label: 'Examples' },
    { href: '/playground', label: 'Play' },
  ];

  // Sub-menu animation variants
  const subMenuVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: 'easeIn',
      },
    },
  };

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

  return (
    <motion.header
      className="bg-[#1A1A1A] text-white py-4 px-6 sticky top-0 z-50 border-b border-gray-700"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo with AnimatedSVG */}
        <Link href="/" className="flex items-center">
          <AnimatedSVG
            text="ReAnime"
            effect="neonDraw"
            duration={Infinity}
            textColor="#ffffff"
            strokeColor="#ff6ac1"
            glowColor="rgba(255, 106, 193, 0.7)"
            fontSize="24px"
            fontFamily="Inter, Arial, sans-serif"
            className="font-bold hover:text-purple-500 transition-colors duration-300 tracking-tight"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link, index) => (
            <div
              key={link.href}
              className={`relative ${index < navLinks.length - 1 ? 'md:border-r border-gray-700 md:pr-6' : ''}`}
              onMouseEnter={() => link.subLinks && setIsAnimationsOpen(true)}
              onMouseLeave={() => link.subLinks && setIsAnimationsOpen(false)}
            >
              <Link
                href={link.href}
                className={`flex items-center transition-colors duration-200 text-lg ${
                  link.label === 'Play'
                    ? 'play-link'
                    : 'text-gray-400 hover:text-pink-500 focus:text-pink-500'
                }`}
                aria-haspopup={!!link.subLinks}
                aria-expanded={link.subLinks ? isAnimationsOpen : undefined}
              >
                {link.label}
                {link.subLinks && <FiChevronDown className="ml-1" />}
              </Link>
              {link.subLinks && (
                <AnimatePresence>
                  {isAnimationsOpen && (
                    <motion.ul
                      className="absolute top-full left-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg overflow-hidden"
                      variants={subMenuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {link.subLinks.map((subLink, subIndex) => (
                        <li
                          key={subLink.href}
                          className={subIndex < link.subLinks.length - 1 ? 'border-b border-gray-700' : ''}
                        >
                          <Link
                            href={subLink.href}
                            className="block px-4 py-2 text-gray-400 hover:text-pink-500 focus:text-pink-500 transition-colors duration-200 text-base"
                            onClick={() => setIsAnimationsOpen(false)}
                          >
                            {subLink.label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-gray-400 hover:text-pink-500 focus:text-pink-500 transition-colors duration-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="md:hidden mt-4 flex flex-col space-y-4 bg-gray-800 border-t border-gray-700 py-4 px-6 rounded-b-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, index) => (
              <div key={link.href} className={index < navLinks.length - 1 ? 'border-b border-gray-700 pb-4' : ''}>
                {link.subLinks ? (
                  <div>
                    <button
                      className="flex items-center text-lg text-gray-400 hover:text-pink-500 focus:text-pink-500 transition-colors duration-200 w-full text-left"
                      onClick={() => setIsAnimationsOpen(!isAnimationsOpen)}
                      aria-expanded={isAnimationsOpen}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <FiChevronDown className="ml-2" />
                    </button>
                    <AnimatePresence>
                      {isAnimationsOpen && (
                        <motion.ul
                          className="pl-4 mt-2 space-y-2"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {link.subLinks.map((subLink, subIndex) => (
                            <li
                              key={subLink.href}
                              className={subIndex < link.subLinks.length - 1 ? 'border-b border-gray-700 pb-2' : ''}
                            >
                              <Link
                                href={subLink.href}
                                className="block text-base text-gray-400 hover:text-pink-500 focus:text-pink-500 transition-colors duration-200"
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setIsAnimationsOpen(false);
                                }}
                              >
                                {subLink.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={`text-lg transition-colors duration-200 ${
                      link.label === 'Play'
                        ? 'play-link'
                        : 'text-gray-400 hover:text-pink-500 focus:text-pink-500'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;