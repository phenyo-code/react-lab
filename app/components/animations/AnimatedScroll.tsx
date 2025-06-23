'use client';

import { motion, useScroll, useTransform, useMotionTemplate, MotionValue, MotionStyle, Transition } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

interface AnimatedScrollProps {
  children: React.ReactNode;
  effect?: 'scrollFade' | 'slideInLeft' | 'slideInRight' | 'parallax' | 'skewScroll' | 'slideUp';
  triggerPoint?: number;
  duration?: number;
  className?: string;
  textColor?: string;
  fontSize?: string;
  glowColor?: string;
}

const AnimatedScroll: React.FC<AnimatedScrollProps> = ({
  children,
  effect = 'scrollFade',
  triggerPoint = 0.25,
  duration = 800,
  className = '',
  textColor = 'text-gray-900',
  fontSize = 'text-2xl',
  glowColor = 'rgba(59, 130, 246, 0.5)',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end 75%'],
  });

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -12 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // Animation transforms
  const opacity: MotionValue<number> = useTransform(scrollYProgress, [triggerPoint - 0.1, triggerPoint], [0, 1]);
  const y: MotionValue<number> = useTransform(scrollYProgress, [triggerPoint - 0.1, triggerPoint], [50, 0]);
  const slideInLeft: MotionValue<number> = useTransform(scrollYProgress, [triggerPoint - 0.1, triggerPoint], [-100, 0]);
  const slideInRight: MotionValue<number> = useTransform(scrollYProgress, [triggerPoint - 0.1, triggerPoint], [100, 0]);
  const parallaxY: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const parallaxScale: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const skewX: MotionValue<number> = useTransform(scrollYProgress, [triggerPoint - 0.1, triggerPoint], [10, 0]);
  const slideUpY: MotionValue<number> = useTransform(scrollYProgress, [triggerPoint - 0.1, triggerPoint], [100, 0]);
  const glowShadow = useMotionTemplate`0 0 ${useTransform(opacity, (v: number) => v * 20)}px ${glowColor}, 0 0 ${useTransform(opacity, (v: number) => v * 40)}px ${glowColor}`;

  interface Variant {
    style: MotionStyle;
    transition?: Transition;
  }

  const variants: Record<NonNullable<AnimatedScrollProps['effect']>, Variant> = {
    scrollFade: { style: { opacity }, transition: { ease: [0.4, 0, 0.2, 1], duration: duration / 1000 } },
    slideInLeft: {
      style: { opacity, x: slideInLeft },
      transition: { ease: [0.4, 0, 0.2, 1], duration: duration / 1000 },
    },
    slideInRight: {
      style: { opacity, x: slideInRight },
      transition: { ease: [0.4, 0, 0.2, 1], duration: duration / 1000 },
    },
    parallax: {
      style: { y: parallaxY, scale: parallaxScale, opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.7]) },
      transition: { ease: 'linear', duration: duration / 1000 },
    },
    skewScroll: {
      style: { opacity, skewX, y, textShadow: glowShadow },
      transition: { ease: [0.4, 0, 0.2, 1], duration: duration / 1000 },
    },
    slideUp: {
      style: { opacity, y: slideUpY },
      transition: { ease: [0.4, 0, 0.2, 1], duration: duration / 1000 },
    },
  };

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return <div className={`${className} ${textColor} ${fontSize}`}>{children}</div>;
  }

  const { style, transition } = variants[effect] || variants.scrollFade;

  return (
    <motion.div
      ref={ref}
      style={style}
      transition={transition}
      className={`relative ${className} ${textColor} ${fontSize}`}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedScroll;