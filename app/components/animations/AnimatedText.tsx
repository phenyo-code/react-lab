/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface AnimatedTextProps {
  children: string;
  effect?:
    | 'fade'
    | 'slide'
    | 'neon'
    | 'glitch'
    | 'wave'
    | 'flip'
    | 'pulse'
    | 'burst'
    | 'sparkle'
    | 'vaporwave'
    | 'hologram'
    | 'ripple'
    | 'pixelate'
    | 'quantum'
    | 'blur'
    | 'vortex'
    | 'echo'
    | 'chromaticAberration'
    | 'distort'
    | 'bounce'
    | 'glowPulse'
    | 'dataStream'
    | 'holoWave'
    | 'neonCircuit';
  duration?: number | typeof Infinity;
  delay?: number;
  className?: string;
  textColor?: string;
  fontSize?: string;
  glowColor?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  effect = 'fade',
  duration = 1,
  delay = 0,
  className = '',
  textColor = 'text-gray-900',
  fontSize = 'text-2xl',
  glowColor = 'rgba(59, 130, 246, 0.5)',
}) => {
  const [text, setText] = useState(children);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: !['pulse', 'neon', 'vaporwave', 'ripple', 'sparkle', 'glowPulse', 'dataStream', 'holoWave', 'neonCircuit'].includes(effect),
    amount: 0.5,
  });

  useEffect(() => {
    if (isInView) {
      setText(children);
    }
  }, [children, isInView]);

  // Split text into characters
  const characters = text.split('');

  // Animation variants
  const variants: Record<string, any> = {
    fade: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0, transition: { duration, delay, ease: 'easeOut' } },
    },
    slide: {
      initial: { y: 50, opacity: 0 },
      animate: { y: 0, opacity: 1, transition: { duration, delay, ease: 'easeOut' } },
    },
    neon: {
      initial: { opacity: 0.7, textShadow: 'none' },
      animate: {
        opacity: [0.7, 1, 0.7],
        textShadow: [
          'none',
          `0 0 10px ${glowColor}, 0 0 20px ${glowColor}, 0 0 30px ${glowColor}`,
          'none',
        ],
        transition: {
          duration: duration === Infinity ? 2 : duration,
          repeat: duration === Infinity ? Infinity : 0,
          ease: 'easeInOut',
          delay,
        },
      },
    },
    glitch: {
      initial: { x: 0, opacity: 1 },
      animate: (i: number) => ({
        x: [0, (Math.random() - 0.5) * 8, 0, (Math.random() - 0.5) * 8, 0],
        y: [0, (Math.random() - 0.5) * 4, 0],
        color: [textColor, '#ff0000', textColor, '#00ff00', textColor],
        opacity: [1, 0.8, 1, 0.9, 1],
        '--line-opacity': [0, 0.6, 0, 0.6, 0],
        '--line-y': [0, '2px', '-2px', '1px', '0px'],
        transition: {
          duration: duration === Infinity ? 0.5 : duration / 3,
          repeat: duration === Infinity ? Infinity : 2,
          times: [0, 0.2, 0.4, 0.6, 1],
          delay: delay + i * 0.05,
          ease: 'easeInOut', // Changed from steps(1) to easeInOut
        },
      }),
    },
    wave: {
      initial: { y: 0 },
      animate: (i: number) => ({
        y: [0, -10, 0],
        transition: {
          duration: duration === Infinity ? 1 : duration,
          repeat: duration === Infinity ? Infinity : 0,
          delay: delay + i * 0.1,
          ease: 'easeInOut',
        },
      }),
    },
    flip: {
      initial: { rotateX: 90, opacity: 0 },
      animate: (i: number) => ({
        rotateX: [90, 0],
        opacity: [0, 1],
        transition: {
          duration: duration === Infinity ? 1 : duration,
          repeat: duration === Infinity ? Infinity : 0,
          delay: delay + i * 0.05,
          ease: 'easeOut',
        },
      }),
    },
    pulse: {
      initial: { scale: 1 },
      animate: {
        scale: [1, 1.1, 1],
        transition: {
          duration: duration === Infinity ? 2 : duration,
          repeat: duration === Infinity ? Infinity : 0,
          ease: 'easeInOut',
          delay,
        },
      },
    },
    burst: {
      initial: { x: 0, y: 0, opacity: 1 },
      animate: (i: number) => ({
        x: [0, (Math.random() - 0.5) * 100, 0],
        y: [0, (Math.random() - 0.5) * 100, 0],
        opacity: [1, 0.5, 1],
        transition: {
          duration: duration === Infinity ? 1.5 : duration,
          repeat: duration === Infinity ? Infinity : 0,
          delay: delay + i * 0.05,
          ease: 'easeOut',
        },
      }),
    },
    sparkle: {
      initial: { scale: 1, opacity: 1, textShadow: 'none' },
      animate: (i: number) => ({
        scale: [1, 1.3, 1],
        opacity: [1, 0.8, 1],
        textShadow: [
          'none',
          `0 0 10px ${glowColor}, 0 0 20px ${glowColor}`,
          'none',
        ],
        transition: {
          duration: duration === Infinity ? 1.2 : duration,
          repeat: duration === Infinity ? Infinity : 0,
          delay: delay + Math.random() * 0.3,
          ease: 'easeInOut',
        },
      }),
    },
    vaporwave: {
      initial: { opacity: 0.8, textShadow: 'none' },
      animate: {
        color: [textColor, '#ff6ac1', '#00f7ff', textColor],
        textShadow: [
          'none',
          `0 0 15px ${glowColor}`,
          `0 0 15px rgba(255, 106, 193, 0.7)`,
          'none',
        ],
        translateX: [-5, 5, -5, 0],
        transition: {
          duration: duration === Infinity ? 4 : duration,
          repeat: duration === Infinity ? Infinity : 0,
          ease: 'easeInOut',
          delay,
        },
      },
    },
    hologram: {
      initial: { opacity: 0 },
      animate: {
        opacity: [0, 0.6, 0.3, 0.6],
        textShadow: [
          'none',
          `0 0 10px ${glowColor}`,
          'none',
          `0 0 10px ${glowColor}`,
        ],
        transition: {
          duration: duration === Infinity ? 2 : duration,
          repeat: duration === Infinity ? Infinity : 0,
          times: [0, 0.2, 0.4, 1],
          ease: 'linear',
          delay,
        },
      },
    },
    ripple: {
      initial: { scale: 1 },
      animate: (i: number) => ({
        scale: [1, 1.5, 1],
        opacity: [1, 0.7, 1],
        transition: {
          duration: duration === Infinity ? 1.2 : duration,
          repeat: duration === Infinity ? Infinity : 0,
          delay: delay + i * 0.1,
          ease: 'easeInOut',
        },
      }),
    },
    pixelate: {
      initial: { opacity: 0, scale: 0.5 },
      animate: (i: number) => ({
        opacity: [0, 1, 1],
        scale: [0.5, 1.2, 1],
        x: [(Math.random() - 0.5) * 20, 0],
        transition: {
          duration: duration === Infinity ? 1.5 : duration,
          repeat: duration === Infinity ? Infinity : 0,
          delay: delay + i * 0.07,
          ease: 'easeOut',
        },
      }),
    },
    quantum: {
      initial: { opacity: 0, x: 0, y: 0 },
      animate: (i: number) => ({
        opacity: [0, 1, 0, 1],
        x: [(Math.random() - 0.5) * 50, 0],
        y: [(Math.random() - 0.5) * 50, 0],
        transition: {
          duration: duration === Infinity ? 1.8 : duration,
          repeat: duration === Infinity ? Infinity : 0,
          delay: delay + i * 0.06,
          ease: 'easeInOut',
        },
      }),
    },
    blur: {
      initial: { opacity: 0, filter: 'blur(10px)' },
      animate: {
        opacity: [0, 1, 1],
        filter: ['blur(10px)', 'blur(0px)', 'blur(0px)'],
        transition: {
          duration: duration === Infinity ? 2 : duration,
          repeat: duration === Infinity ? Infinity : 0,
          ease: 'easeOut',
          delay,
        },
      },
    },
    vortex: {
      initial: { opacity: 0, rotate: 0, scale: 0.5 },
      animate: (i: number) => ({
        opacity: [0, 1],
        rotate: [360, 0],
        scale: [0.5, 1],
        transition: {
          duration: duration === Infinity ? 1.5 : duration,
          repeat: duration === Infinity ? Infinity : 0,
          delay: delay + i * 0.08,
          ease: 'easeInOut',
        },
      }),
    },
    echo: {
      initial: { opacity: 0, x: 0 },
      animate: (i: number) => ({
        opacity: [0, 1, 0.5, 1],
        x: [0, (i % 2 === 0 ? -10 : 10), 0],
        transition: {
          duration: duration === Infinity ? 1.3 : duration,
          repeat: duration === Infinity ? Infinity : 0,
          delay: delay + i * 0.06,
          ease: 'easeOut',
        },
      }),
    },
    chromaticAberration: {
      initial: { opacity: 0 },
      animate: (i: number) => ({
        opacity: [0, 1],
        x: [i % 3 === 0 ? -3 : i % 3 === 1 ? 3 : 0, 0],
        color: [i % 3 === 0 ? '#ff0000' : i % 3 === 1 ? '#00ff00' : '#0000ff', textColor],
        transition: {
          duration: duration === Infinity ? 1.4 : duration,
          repeat: duration === Infinity ? Infinity : 0,
          delay: delay + i * 0.05,
          ease: 'easeInOut',
        },
      }),
    },
    distort: {
      initial: { skewX: 0, scale: 1 },
      animate: (i: number) => ({
        skewX: [0, (Math.random() - 0.5) * 10, 0],
        scale: [1, 1.1, 1],
        transition: {
          duration: duration === Infinity ? 1.2 : duration,
          repeat: duration === Infinity ? Infinity : 0,
          delay: delay + i * 0.07,
          ease: 'easeInOut',
        },
      }),
    },
    bounce: {
      initial: { y: 0, scale: 1 },
      animate: (i: number) => ({
        y: [0, -15, 0],
        scale: [1, 1.2, 1],
        transition: {
          duration: duration === Infinity ? 0.8 : duration,
          repeat: duration === Infinity ? Infinity : 0,
          delay: delay + i * 0.06,
          ease: 'easeOut',
        },
      }),
    },
    glowPulse: {
      initial: { scale: 1, textShadow: 'none' },
      animate: {
        scale: [1, 1.05, 1],
        textShadow: [
          'none',
          `0 0 15px ${glowColor}, 0 0 30px ${glowColor}`,
          'none',
        ],
        transition: {
          duration: duration === Infinity ? 2.5 : duration,
          repeat: duration === Infinity ? Infinity : 0,
          ease: 'easeInOut',
          delay,
        },
      },
    },
    dataStream: {
      initial: { opacity: 0, y: 30, scale: 0.8 },
      animate: (i: number) => ({
        opacity: [0, 1, 1],
        y: [30, 0, 0],
        scale: [0.8, 1, 1],
        textShadow: [
          'none',
          `0 0 8px ${glowColor}`,
          'none',
        ],
        transition: {
          duration: duration === Infinity ? 1.5 : duration,
          repeat: duration === Infinity ? Infinity : 0,
          delay: delay + Math.random() * 0.4,
          ease: 'easeOut',
        },
      }),
    },
    holoWave: {
      initial: { opacity: 0, translateZ: -50 },
      animate: (i: number) => ({
        opacity: [0, 1, 0.8, 1],
        translateZ: [-50, 0, 0, 0],
        textShadow: [
          'none',
          `0 0 12px ${glowColor}`,
          'none',
          `0 0 12px ${glowColor}`,
        ],
        transition: {
          duration: duration === Infinity ? 2 : duration,
          repeat: duration === Infinity ? Infinity : 0,
          delay: delay + i * 0.07,
          ease: 'easeInOut',
        },
      }),
    },
    neonCircuit: {
      initial: { opacity: 0.5, textShadow: 'none' },
      animate: (i: number) => ({
        opacity: [0.5, 1, 0.7, 1],
        textShadow: [
          'none',
          `0 0 10px ${glowColor}, 0 0 20px ${glowColor}`,
          'none',
        ],
        x: [0, (i % 2 === 0 ? -5 : 5), 0],
        transition: {
          duration: duration === Infinity ? 1.8 : duration,
          repeat: duration === Infinity ? Infinity : 0,
          delay: delay + i * 0.06,
          ease: 'easeInOut',
        },
      }),
    },
  };

  // Respect reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return (
      <div className={`inline-block font-semibold ${textColor} ${fontSize} ${className}`}>
        {text}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`inline-flex ${className}`}
      style={{ position: 'relative' }}
    >
      {[
        'wave',
        'flip',
        'burst',
        'sparkle',
        'ripple',
        'pixelate',
        'quantum',
        'vortex',
        'echo',
        'chromaticAberration',
        'distort',
        'bounce',
        'dataStream',
        'holoWave',
        'neonCircuit',
        'glitch',
      ].includes(effect)
        ? characters.map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              custom={i}
              initial={variants[effect].initial}
              animate={isInView ? variants[effect].animate : variants[effect].initial}
              className={`inline-block font-semibold ${effect !== 'chromaticAberration' && effect !== 'glitch' ? textColor : ''} ${fontSize}`}
              style={{
                whiteSpace: 'pre',
                position: 'relative',
                ...(effect === 'glitch' && {
                  '--line-color': glowColor,
                  '--line-height': '1px',
                  '--line-width': '100%',
                }),
              }}
            >
              {char}
              {effect === 'glitch' && (
                <>
                  <span
                    style={{
                      position: 'absolute',
                      top: 'var(--line-y)',
                      left: 0,
                      width: 'var(--line-width)',
                      height: 'var(--line-height)',
                      background: 'var(--line-color)',
                      opacity: 'var(--line-opacity)',
                      pointerEvents: 'none',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: 'calc(var(--line-y) + 3px)',
                      left: 0,
                      width: 'var(--line-width)',
                      height: 'var(--line-height)',
                      background: 'var(--line-color)',
                      opacity: 'calc(var(--line-opacity) * 0.5)',
                      pointerEvents: 'none',
                    }}
                  />
                </>
              )}
            </motion.span>
          ))
        : (
            <motion.div
              initial={variants[effect].initial}
              animate={isInView ? variants[effect].animate : variants[effect].initial}
              className={`inline-block font-semibold ${textColor} ${fontSize}`}
            >
              {text}
            </motion.div>
          )}
    </motion.div>
  );
};

export default AnimatedText;