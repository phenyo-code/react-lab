'use client';

import { motion, useScroll, useTransform, useMotionTemplate, MotionValue, MotionStyle, Transition } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

interface AnimatedScrollProps {
  children: React.ReactNode;
  effect?:
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
  triggerPoint = 0.25, // Adjusted for earlier, precise triggers
  duration = 800, // Longer for smoother transitions
  className = '',
  textColor = 'text-gray-900',
  fontSize = 'text-2xl',
  glowColor = 'rgba(59, 130, 246, 0.5)',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end 75%'], // Tighter range for accuracy
  });

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8, // Slightly longer for fluid scrolling
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -12 * t)),
      smoothWheel: true,
      touchMultiplier: 2, // Enhance touch sensitivity
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
  const parallaxY: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const parallaxScale: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const scale: MotionValue<number> = useTransform(scrollYProgress, [triggerPoint - 0.1, triggerPoint], [0.9, 1]);
  const rotate: MotionValue<number> = useTransform(scrollYProgress, [triggerPoint - 0.1, triggerPoint], [-20, 0]);
  const zoomScale: MotionValue<number> = useTransform(scrollYProgress, [triggerPoint - 0.1, triggerPoint], [1, 1.5]);
  const glowOpacity: MotionValue<number> = useTransform(scrollYProgress, [triggerPoint - 0.1, triggerPoint], [0, 0.8]);
  const holoRotateX: MotionValue<number> = useTransform(scrollYProgress, [triggerPoint - 0.1, triggerPoint], [15, 0]);
  const elasticScaleX: MotionValue<number> = useTransform(scrollYProgress, [triggerPoint - 0.1, triggerPoint], [0.8, 1.1]);
  const elasticScaleY: MotionValue<number> = useTransform(scrollYProgress, [triggerPoint - 0.1, triggerPoint], [0.8, 1]);
  const particleOpacity: MotionValue<number> = useTransform(scrollYProgress, [triggerPoint - 0.05, triggerPoint, triggerPoint + 0.05], [0, 1, 0]);
  const cinematicScale: MotionValue<number> = useTransform(scrollYProgress, [triggerPoint - 0.1, triggerPoint], [0.8, 1.3]);
  const skewX: MotionValue<number> = useTransform(scrollYProgress, [triggerPoint - 0.1, triggerPoint], [10, 0]);
  const waveY: MotionValue<number> = useTransform(scrollYProgress, [triggerPoint - 0.1, triggerPoint], [0, -25]);
  const waveX: MotionValue<number> = useTransform(scrollYProgress, [triggerPoint - 0.1, triggerPoint], [0, 25]);
  const depthZ: MotionValue<number> = useTransform(scrollYProgress, [triggerPoint - 0.1, triggerPoint], [-30, 0]);
  const orbitX: MotionValue<number> = useTransform(scrollYProgress, [triggerPoint - 0.1, triggerPoint], [25, 0]);
  const orbitY: MotionValue<number> = useTransform(scrollYProgress, [triggerPoint - 0.1, triggerPoint], [0, -25]);

  const glowShadow = useMotionTemplate`0 0 ${useTransform(glowOpacity, (v: number) => v * 20)}px ${glowColor}, 0 0 ${useTransform(glowOpacity, (v: number) => v * 40)}px ${glowColor}`;
  const holoFilter = useTransform(
    scrollYProgress,
    [triggerPoint - 0.1, triggerPoint],
    ['hue-rotate(0deg) brightness(1)', `hue-rotate(${triggerPoint * 100}deg) brightness(${1 + triggerPoint * 0.5})`]
  );
  const cinematicFilter = useTransform(cinematicScale, (v: number) => `brightness(${1 + v * 0.3}) contrast(${1 + v * 0.2})`);

  interface Variant {
    style: MotionStyle;
    transition?: Transition;
  }

  const variants: Record<NonNullable<AnimatedScrollProps['effect']>, Variant> = {
    scrollFade: { style: { opacity }, transition: { ease: [0.4, 0, 0.2, 1], duration: duration / 1000 } },
    scrollSlide: { style: { opacity, y }, transition: { ease: [0.4, 0, 0.2, 1], duration: duration / 1000 } },
    parallax: {
      style: { y: parallaxY, scale: parallaxScale, opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.7]) },
      transition: { ease: 'linear', duration: duration / 1000 },
    },
    scale: { style: { opacity, scale }, transition: { ease: [0.4, 0, 0.2, 1], duration: duration / 1000 } },
    fullPage: {
      style: { opacity, scale: useTransform(scrollYProgress, [triggerPoint - 0.1, triggerPoint], [0.98, 1]), height: '100vh' },
      transition: { ease: [0.4, 0, 0.2, 1], duration: duration / 1000 },
    },
    pin: { style: { opacity }, transition: { ease: [0.4, 0, 0.2, 1], duration: duration / 1000 } },
    rotate: { style: { opacity, rotate }, transition: { ease: [0.4, 0, 0.2, 1], duration: duration / 1000 } },
    zoom: { style: { opacity, scale: zoomScale }, transition: { ease: [0.4, 0, 0.2, 1], duration: duration / 1000 } },
    glowTrail: {
      style: { opacity, textShadow: glowShadow, boxShadow: glowShadow },
      transition: { ease: [0.4, 0, 0.2, 1], duration: duration / 1000 },
    },
    holoShift: {
      style: { opacity, rotateX: holoRotateX, filter: holoFilter, textShadow: glowShadow },
      transition: { ease: [0.4, 0, 0.2, 1], duration: duration / 1000 },
    },
    elasticReveal: {
      style: { opacity, scaleX: elasticScaleX, scaleY: elasticScaleY },
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
    particleBurst: {
      style: { opacity: particleOpacity, scale: cinematicScale, filter: cinematicFilter },
      transition: { ease: [0.4, 0, 0.2, 1], duration: duration / 1000 },
    },
    cinematicZoom: {
      style: { opacity, scale: cinematicScale, filter: cinematicFilter },
      transition: { ease: [0.4, 0, 0.2, 1], duration: duration / 1000 },
    },
    skewScroll: {
      style: { opacity, skewX, y, textShadow: glowShadow },
      transition: { ease: [0.4, 0, 0.2, 1], duration: duration / 1000 },
    },
    waveShift: {
      style: { opacity, y: waveY, x: waveX, textShadow: glowShadow },
      transition: { ease: [0.4, 0, 0.2, 1], duration: duration / 1000 },
    },
    depthPulse: {
      style: { opacity, translateZ: depthZ, scale: useTransform(scrollYProgress, [triggerPoint - 0.1, triggerPoint], [0.98, 1.15]), boxShadow: glowShadow },
      transition: { ease: [0.4, 0, 0.2, 1], duration: duration / 1000 },
    },
    orbitTrail: {
      style: { opacity, x: orbitX, y: orbitY, textShadow: glowShadow },
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
      className={`relative ${effect === 'pin' ? 'sticky top-0' : ''} ${effect === 'particleBurst' || effect === 'orbitTrail' ? 'overflow-hidden' : ''} ${className} ${textColor} ${fontSize}`}
    >
      {(effect === 'particleBurst' || effect === 'orbitTrail') && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: particleOpacity,
            background: `
              radial-gradient(circle at ${effect === 'orbitTrail' ? '60% 20%' : '20% 20%'}, ${glowColor} 10%, transparent 0),
              radial-gradient(circle at ${effect === 'orbitTrail' ? '30% 70%' : '80% 30%'}, ${glowColor} 8%, transparent 0),
              radial-gradient(circle at ${effect === 'orbitTrail' ? '50% 50%' : '50% 80%'}, ${glowColor} 15%, transparent 0)
            `,
          }}
        />
      )}
      {children}
    </motion.div>
  );
};

export default AnimatedScroll;