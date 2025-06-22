'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';

interface AnimatedSVGProps {
  text: string;
  effect?: 'neonDraw' | 'fireDraw' | 'electricDraw' | 'inkDraw' | 'pulseDraw' | 'scribbleDraw' | 'waterDraw' | 'goldDraw' | 'vortexDraw' | 'frostDraw' | 'shadowDraw' | 'sandDraw' | 'smokeDraw' | 'waveDraw' | 'fadeDraw' | 'whiteNeonDraw' | 'customColorDraw';
  duration?: number | typeof Infinity;
  delay?: number;
  className?: string;
  textColor?: string;
  fontSize?: string;
  strokeColor?: string;
  glowColor?: string;
  fontFamily?: string;
  customStrokeColor?: string;
}

const AnimatedSVG: React.FC<AnimatedSVGProps> = ({
  text,
  effect = 'neonDraw',
  duration = 2,
  delay = 0,
  className = '',
  textColor = '#ffffff',
  fontSize = '48px',
  strokeColor = '#ff6ac1',
  glowColor = 'rgba(255, 106, 193, 0.7)',
  fontFamily = 'Arial, sans-serif',
  customStrokeColor,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: effect !== 'neonDraw' && effect !== 'fireDraw' && effect !== 'electricDraw' && effect !== 'inkDraw' && effect !== 'pulseDraw' && effect !== 'scribbleDraw' && effect !== 'waterDraw' && effect !== 'goldDraw' && effect !== 'vortexDraw' && effect !== 'frostDraw' && effect !== 'shadowDraw' && effect !== 'sandDraw' && effect !== 'smokeDraw' && effect !== 'waveDraw' && effect !== 'fadeDraw' && effect !== 'whiteNeonDraw' && effect !== 'customColorDraw',
    amount: 0.5,
  });

  // Calculate SVG dimensions
  const fontSizePx = parseFloat(fontSize) || 48;
  const svgWidth = text.length * fontSizePx * 0.7;
  const svgHeight = fontSizePx * 1.5;

  // GSAP animations
  useEffect(() => {
    if (!isInView || !svgRef.current) {
      console.log('GSAP skipped:', { isInView, svgRef: !!svgRef.current });
      return;
    }

    const textElements = svgRef.current.querySelectorAll('text');
    textElements.forEach((textEl, i) => {
      const length = 1000;
      gsap.set(textEl, { strokeDasharray: length, strokeDashoffset: length });

      // Common draw-on animation
      gsap.to(textEl, {
        strokeDashoffset: 0,
        duration: duration === Infinity ? 2 : duration,
        delay: delay + i * 0.1,
        ease: 'power2.inOut',
        repeat: duration === Infinity ? -1 : 0,
        yoyo: duration === Infinity,
      });

      // Effect-specific animations
      if (effect === 'neonDraw') {
        gsap.to(textEl, {
          filter: `drop-shadow(0 0 10px ${glowColor})`,
          opacity: 1,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          delay: delay + i * 0.1,
        });
      } else if (effect === 'fireDraw') {
        gsap.to(textEl, {
          filter: `drop-shadow(0 0 15px rgba(255, 69, 0, 0.8))`,
          stroke: '#ff4500',
          duration: 0.3,
          repeat: -1,
          yoyo: true,
          delay: delay + i * 0.1,
        });
      } else if (effect === 'electricDraw') {
        gsap.to(textEl, {
          filter: 'url(#spark)',
          stroke: '#00b7eb',
          duration: 0.2,
          repeat: -1,
          yoyo: true,
          delay: delay + i * 0.1,
        });
      } else if (effect === 'inkDraw') {
        gsap.to(textEl, {
          filter: 'url(#drip)',
          stroke: '#000000',
          strokeWidth: 3,
          duration: 0.4,
          repeat: -1,
          yoyo: true,
          delay: delay + i * 0.1,
        });
      } else if (effect === 'pulseDraw') {
        gsap.to(textEl, {
          filter: `drop-shadow(0 0 12px ${glowColor})`,
          keyframes: [
            { strokeWidth: 2, stroke: strokeColor },
            { strokeWidth: 4, stroke: '#ffffff' },
            { strokeWidth: 2, stroke: strokeColor },
          ],
          duration: 0.6,
          repeat: -1,
          yoyo: true,
          delay: delay + i * 0.1,
        });
      } else if (effect === 'scribbleDraw') {
        gsap.to(textEl, {
          filter: 'url(#scribble)',
          stroke: '#333333',
          strokeWidth: 2.5,
          duration: 0.3,
          repeat: -1,
          yoyo: true,
          delay: delay + i * 0.1,
        });
      } else if (effect === 'waterDraw') {
        gsap.to(textEl, {
          filter: 'url(#ripple)',
          stroke: '#00ced1',
          strokeWidth: 2,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          delay: delay + i * 0.1,
        });
      } else if (effect === 'goldDraw') {
        gsap.to(textEl, {
          filter: `drop-shadow(0 0 10px #ffd700)`,
          stroke: '#ffd700',
          strokeWidth: 2.5,
          duration: 0.4,
          repeat: -1,
          yoyo: true,
          delay: delay + i * 0.1,
        });
      } else if (effect === 'vortexDraw') {
        gsap.to(textEl, {
          filter: 'url(#vortex)',
          stroke: '#8a2be2',
          strokeWidth: 2,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          delay: delay + i * 0.1,
        });
      } else if (effect === 'frostDraw') {
        gsap.to(textEl, {
          filter: `drop-shadow(0 0 8px #87ceeb)`,
          stroke: '#87ceeb',
          strokeWidth: 2,
          duration: 3,
          repeat: -1,
          yoyo: true,
          delay: delay + i * 0.1,
        });
      } else if (effect === 'shadowDraw') {
        gsap.to(textEl, {
          filter: 'url(#shadow)',
          stroke: '#666666',
          strokeWidth: 2.5,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          delay: delay + i * 0.1,
        });
      } else if (effect === 'sandDraw') {
        gsap.to(textEl, {
          filter: `drop-shadow(0 0 6px #f4a460)`,
          stroke: '#f4a460',
          strokeWidth: 2,
          duration: 4,
          repeat: -1,
          yoyo: true,
          delay: delay + i * 0.1,
        });
      } else if (effect === 'smokeDraw') {
        gsap.to(textEl, {
          filter: 'url(#smoke)',
          stroke: '#a9a9a9',
          strokeWidth: 2,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          delay: delay + i * 0.1,
        });
      } else if (effect === 'waveDraw') {
        gsap.to(textEl, {
          filter: 'url(#wave)',
          stroke: '#20b2aa',
          strokeWidth: 2,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          delay: delay + i * 0.1,
        });
      } else if (effect === 'fadeDraw') {
        gsap.to(textEl, {
          opacity: 1,
          stroke: '#dda0dd',
          strokeWidth: 2,
          duration: 3,
          repeat: -1,
          yoyo: true,
          delay: delay + i * 0.1,
        });
      } else if (effect === 'whiteNeonDraw') {
        gsap.to(textEl, {
          stroke: '#ffffff',
          strokeWidth: 2,
          duration: 2,
          repeat: -1,
          yoyo: true,
          delay: delay + i * 0.1,
        });
      } else if (effect === 'customColorDraw') {
        // Temporary stroke for draw-on effect, then clear stroke and set fill
        gsap.set(textEl, { stroke: customStrokeColor || '#ffffff', strokeWidth: 2, fill: 'none' });
        gsap.to(textEl, {
          strokeDashoffset: 0,
          duration: duration === Infinity ? 2 : duration,
          delay: delay + i * 0.1,
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.set(textEl, { stroke: 'none', strokeWidth: 0, fill: customStrokeColor || textColor });
          },
          repeat: duration === Infinity ? -1 : 0,
          yoyo: duration === Infinity,
        });
      }
    });
    console.log(`Animation triggered for effect: ${effect}`);
  }, [isInView, effect, duration, delay, glowColor, strokeColor, customStrokeColor, textColor]);

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    console.log('Fallback triggered: prefersReducedMotion');
    return (
      <div className={`inline-block font-semibold ${textColor} ${fontSize} ${className}`} style={{ fontFamily }}>
        {text}
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{ position: 'relative' }}
    >
      <svg
        ref={svgRef}
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="spark" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="B" />
          </filter>
          <filter id="drip" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="G" yChannelSelector="R" />
            <feGaussianBlur stdDeviation="2" />
          </filter>
          <filter id="scribble" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence type="turbulence" baseFrequency="0.1" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="ripple" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence type="turbulence" baseFrequency="0.1" numOctaves="3" result="ripple" />
            <feDisplacementMap in="SourceGraphic" in2="ripple" scale="4" />
          </filter>
          <filter id="vortex" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="vortex" />
            <feDisplacementMap in="SourceGraphic" in2="vortex" scale="6" />
          </filter>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feOffset dx="2" dy="2" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="smoke" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="2" result="smoke" />
            <feDisplacementMap in="SourceGraphic" in2="smoke" scale="3" />
            <feGaussianBlur stdDeviation="1" />
          </filter>
          <filter id="wave" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence type="sinusoidal" baseFrequency="0.05" numOctaves="2" result="wave" />
            <feDisplacementMap in="SourceGraphic" in2="wave" scale="5" />
          </filter>
        </defs>
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay }}
        >
          <text
            fill={
              effect === 'customColorDraw' ? customStrokeColor || textColor :
              effect === 'neonDraw' || effect === 'fireDraw' || effect === 'electricDraw' || effect === 'inkDraw' || effect === 'pulseDraw' || effect === 'scribbleDraw' || effect === 'waterDraw' || effect === 'goldDraw' || effect === 'vortexDraw' || effect === 'frostDraw' || effect === 'shadowDraw' || effect === 'sandDraw' || effect === 'smokeDraw' || effect === 'waveDraw' || effect === 'fadeDraw' || effect === 'whiteNeonDraw' ? 'none' : textColor
            }
            stroke={
              effect === 'customColorDraw' ? customStrokeColor || '#ffffff' : // Temporary stroke for draw-on
              effect === 'neonDraw' ? strokeColor :
              effect === 'fireDraw' ? '#ff4500' :
              effect === 'electricDraw' ? '#00b7eb' :
              effect === 'inkDraw' ? '#000000' :
              effect === 'pulseDraw' ? strokeColor :
              effect === 'scribbleDraw' ? '#333333' :
              effect === 'waterDraw' ? '#00ced1' :
              effect === 'goldDraw' ? '#ffd700' :
              effect === 'vortexDraw' ? '#8a2be2' :
              effect === 'frostDraw' ? '#87ceeb' :
              effect === 'shadowDraw' ? '#666666' :
              effect === 'sandDraw' ? '#f4a460' :
              effect === 'smokeDraw' ? '#a9a9a9' :
              effect === 'waveDraw' ? '#20b2aa' :
              effect === 'fadeDraw' ? '#dda0dd' :
              effect === 'whiteNeonDraw' ? '#ffffff' : 'none'
            }
            strokeWidth={
              effect === 'customColorDraw' ? 2 : // Temporary stroke for draw-on
              effect === 'neonDraw' ? 2 :
              effect === 'fireDraw' ? 2.5 :
              effect === 'electricDraw' ? 1.5 :
              effect === 'inkDraw' ? 3 :
              effect === 'pulseDraw' ? 2 :
              effect === 'scribbleDraw' ? 2.5 :
              effect === 'waterDraw' ? 2 :
              effect === 'goldDraw' ? 2.5 :
              effect === 'vortexDraw' ? 2 :
              effect === 'frostDraw' ? 2 :
              effect === 'shadowDraw' ? 2.5 :
              effect === 'sandDraw' ? 2 :
              effect === 'smokeDraw' ? 2 :
              effect === 'waveDraw' ? 2 :
              effect === 'fadeDraw' ? 2 :
              effect === 'whiteNeonDraw' ? 2 : 0
            }
            strokeDasharray={
              effect !== 'neonDraw' &&
              effect !== 'fireDraw' &&
              effect !== 'electricDraw' &&
              effect !== 'inkDraw' &&
              effect !== 'pulseDraw' &&
              effect !== 'scribbleDraw' &&
              effect !== 'waterDraw' &&
              effect !== 'goldDraw' &&
              effect !== 'vortexDraw' &&
              effect !== 'frostDraw' &&
              effect !== 'shadowDraw' &&
              effect !== 'sandDraw' &&
              effect !== 'smokeDraw' &&
              effect !== 'waveDraw' &&
              effect !== 'fadeDraw' &&
              effect !== 'whiteNeonDraw' &&
              effect !== 'customColorDraw'
                ? '0'
                : '1000'
            }
            fontSize={fontSizePx}
            fontFamily={fontFamily}
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            filter={getFilter(effect)}
          >
            {text}
          </text>
        </motion.g>
      </svg>
    </motion.div>
  );
};

const getFilter = (effect: AnimatedSVGProps['effect']) => {
  switch (effect) {
    case 'neonDraw':
    case 'pulseDraw':
    case 'goldDraw':
      return 'url(#glow)';
    case 'fireDraw':
      return 'url(#glow)';
    case 'electricDraw':
      return 'url(#spark)';
    case 'inkDraw':
      return 'url(#drip)';
    case 'scribbleDraw':
      return 'url(#scribble)';
    case 'waterDraw':
      return 'url(#ripple)';
    case 'vortexDraw':
      return 'url(#vortex)';
    case 'frostDraw':
      return 'url(#glow)';
    case 'shadowDraw':
      return 'url(#shadow)';
    case 'smokeDraw':
      return 'url(#smoke)';
    case 'waveDraw':
      return 'url(#wave)';
    case 'fadeDraw':
    case 'whiteNeonDraw':
    case 'customColorDraw':
      return 'none';
    default:
      return 'none';
  }
};

export default AnimatedSVG;