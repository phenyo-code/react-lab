/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { motion, useReducedMotion, Variants } from 'framer-motion';
import React, { useMemo } from 'react';

interface AnimatedSVGProps {
  effect: 'draw'; // Initial effect, extensible for future effects
  strokeColor?: string; // Tailwind class or hex for stroke color
  glowColor?: string; // Optional rgba for glow effect
  duration?: number | 'Infinity'; // Animation duration in seconds
  className?: string; // Additional Tailwind classes
  children?: React.ReactNode; // SVG content
}

const AnimatedSVG: React.FC<AnimatedSVGProps> = ({
  effect,
  strokeColor = 'text-teal-400',
  glowColor,
  duration = 2,
  className,
  children,
}) => {
  const prefersReducedMotion = useReducedMotion();

  // Default SVG styles
  const svgStyles = {
    fill: 'none',
    stroke: strokeColor.includes('text-') ? undefined : strokeColor,
    strokeWidth: 2,
    filter: glowColor ? `drop-shadow(0 0 4px ${glowColor})` : undefined,
  };

  // Animation variants for the draw effect
  const drawVariants: Variants = {
    hidden: { strokeDashoffset: 1, opacity: 0 },
    visible: {
      strokeDashoffset: 0,
      opacity: 1,
      transition: {
        strokeDashoffset: {
          duration: prefersReducedMotion ? 0 : duration === 'Infinity' ? 2 : duration,
          ease: 'linear', // Use string for easing
        },
        opacity: {
          duration: prefersReducedMotion ? 0 : 0.3,
        },
        repeat: duration === 'Infinity' && !prefersReducedMotion ? Infinity : 0,
      },
    },
  };

  // Wrap children in motion.path with dynamic strokeDasharray
  const animatedChildren = useMemo(() => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === 'path') {
        const pathElement = child as React.ReactElement<any>;
        return (
          <motion.path
            {...pathElement.props}
            className={`${pathElement.props.className || ''} ${strokeColor.includes('text-') ? strokeColor : ''}`}
            style={{ ...svgStyles, strokeDasharray: '1', strokeDashoffset: 1 }}
            variants={drawVariants}
            initial="hidden"
            animate="visible"
          />
        );
      }
      return child;
    });
  }, [children, strokeColor, glowColor, duration, prefersReducedMotion]);

  return (
    <motion.svg
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
    >
      {animatedChildren}
    </motion.svg>
  );
};

export default AnimatedSVG;