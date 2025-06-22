/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { IconType } from 'react-icons';
import { LucideIcon } from 'lucide-react';

interface AnimatedSVGProps {
  text?: string;
  type?: 'text' | 'border' | 'icon';
  effect?: string
    | 'iconNeonDraw'
    | 'iconFireDraw'
    | 'iconCustomColorDraw'
    | 'neonDraw'
    | 'fireDraw'
    | 'electricDraw'
    | 'inkDraw'
    | 'pulseDraw'
    | 'scribbleDraw'
    | 'waterDraw'
    | 'goldDraw'
    | 'vortexDraw'
    | 'frostDraw'
    | 'shadowDraw'
    | 'sandDraw'
    | 'smokeDraw'
    | 'waveDraw'
    | 'fadeDraw'
    | 'whiteNeonDraw'
    | 'customColorDraw'
    | 'borderDraw'
    | 'dashedBorderDraw'
    | 'pulseBorderDraw';
  duration?: number | typeof Infinity;
  delay?: number;
  className?: string;
  textColor?: string;
  fontSize?: string;
  strokeColor?: string;
  glowColor?: string;
  fontFamily?: string;
  customStrokeColor?: string;
  Icon?: IconType | LucideIcon;
}

const AnimatedSVG: React.FC<AnimatedSVGProps> = ({
  text = 'Animated',
  type = 'text',
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
  Icon,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once:
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
      effect !== 'customColorDraw' &&
      effect !== 'borderDraw' &&
      effect !== 'dashedBorderDraw' &&
      effect !== 'pulseBorderDraw' &&
      effect !== 'iconNeonDraw' &&
      effect !== 'iconFireDraw' &&
      effect !== 'iconCustomColorDraw',
    amount: 0.5,
  });

  // Calculate SVG dimensions
  const fontSizePx = parseFloat(fontSize) || 48;
  const svgWidth = type === 'text' ? text.length * fontSizePx * 0.7 : type === 'icon' ? 64 : 100; // Increased for icons
  const svgHeight = type === 'text' ? fontSizePx * 1.5 : type === 'icon' ? 64 : 40; // Increased for icons

  // Map icon effects to base effects for animation logic
  const baseEffect = effect.startsWith('icon')
    ? effect.replace('icon', '').toLowerCase() as
        | 'neonDraw'
        | 'fireDraw'
        | 'customColorDraw'
    : effect as
        | 'neonDraw'
        | 'fireDraw'
        | 'electricDraw'
        | 'inkDraw'
        | 'pulseDraw'
        | 'scribbleDraw'
        | 'waterDraw'
        | 'goldDraw'
        | 'vortexDraw'
        | 'frostDraw'
        | 'shadowDraw'
        | 'sandDraw'
        | 'smokeDraw'
        | 'waveDraw'
        | 'fadeDraw'
        | 'whiteNeonDraw'
        | 'customColorDraw'
        | 'borderDraw'
        | 'dashedBorderDraw'
        | 'pulseBorderDraw';

  // GSAP animations
  useEffect(() => {
    if (!isInView || !svgRef.current) {
      console.log('GSAP skipped:', { isInView, svgRef: !!svgRef.current });
      return;
    }

    // Handle border animations
    if (type === 'border') {
      const rect = svgRef.current.querySelector('rect');
      if (rect) {
        const { width, height } = svgRef.current.getBoundingClientRect();
        rect.setAttribute('width', `${width - 2}`);
        rect.setAttribute('height', `${height - 2}`);
        const perimeter = 2 * (width + height - 4);
        gsap.set(rect, {
          strokeDasharray: baseEffect === 'dashedBorderDraw' ? '10,5' : perimeter,
          strokeDashoffset: baseEffect === 'dashedBorderDraw' ? '10,5' : perimeter,
        });

        gsap.to(rect, {
          strokeDashoffset: 0,
          duration: duration === Infinity ? 2 : duration,
          delay,
          ease: 'power2.inOut',
          repeat: duration === Infinity ? -1 : 0,
          yoyo: duration === Infinity,
        });

        if (baseEffect === 'borderDraw') {
          gsap.to(rect, {
            filter: `drop-shadow(0 0 10px ${glowColor})`,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            delay,
          });
        } else if (baseEffect === 'pulseBorderDraw') {
          gsap.to(rect, {
            filter: `drop-shadow(0 0 12px ${glowColor})`,
            keyframes: [
              { strokeWidth: 2, stroke: strokeColor },
              { strokeWidth: 4, stroke: '#ffffff' },
              { strokeWidth: 2, stroke: strokeColor },
            ],
            duration: 0.6,
            repeat: -1,
            yoyo: true,
            delay,
          });
        }
      }
    }
    // Handle icon animations
    else if (type === 'icon' && Icon) {
      // Create a temporary container to render the icon
      const tempContainer = document.createElement('div');
      document.body.appendChild(tempContainer);
      const IconComponent = Icon as any;
      const iconInstance = <IconComponent />;
      // Note: Direct rendering of React components for DOM manipulation is tricky.
      // Instead, we'll assume the icon renders an SVG with paths.

      const paths = svgRef.current.querySelectorAll('path');
      if (paths.length === 0) {
        console.warn('No <path> elements found in icon SVG');
      }

      paths.forEach((path, i) => {
        let length = path.getTotalLength();
        if (length === 0) {
          console.warn(`Path ${i} has zero length, using fallback length`);
          length = 100; // Fallback length for zero-length paths
        }
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          fill: 'none',
          stroke: strokeColor,
          strokeWidth: 2,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          duration: duration === Infinity ? 2 : duration,
          delay: delay + i * 0.1,
          ease: 'power2.inOut',
          repeat: duration === Infinity ? -1 : 0,
          yoyo: duration === Infinity,
          onComplete: () => {
            if (baseEffect === 'customColorDraw') {
              gsap.set(path, {
                stroke: 'none',
                strokeWidth: 0,
                fill: customStrokeColor || textColor,
              });
            }
          },
        });

        // Apply effect-specific animations
        if (baseEffect === 'neonDraw') {
          gsap.to(path, {
            filter: `drop-shadow(0 0 10px ${glowColor})`,
            stroke: strokeColor,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            delay: delay + i * 0.1,
          });
        } else if (baseEffect === 'fireDraw') {
          gsap.to(path, {
            filter: `drop-shadow(0 0 15px rgba(255, 69, 0, 0.8))`,
            stroke: '#ff4500',
            duration: 0.3,
            repeat: -1,
            yoyo: true,
            delay: delay + i * 0.1,
          });
        } else if (baseEffect === 'pulseDraw') {
          gsap.to(path, {
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
        }
      });

      // Clean up temporary container
      document.body.removeChild(tempContainer);
    }
    // Handle text animations
    else if (type === 'text') {
      const textElements = svgRef.current.querySelectorAll('text');
      textElements.forEach((textEl, i) => {
        const length = 1000;
        gsap.set(textEl, { strokeDasharray: length, strokeDashoffset: length });

        gsap.to(textEl, {
          strokeDashoffset: 0,
          duration: duration === Infinity ? 2 : duration,
          delay: delay + i * 0.1,
          ease: 'power2.inOut',
          repeat: duration === Infinity ? -1 : 0,
          yoyo: duration === Infinity,
          onComplete: () => {
            if (baseEffect === 'customColorDraw') {
              gsap.set(textEl, {
                stroke: 'none',
                strokeWidth: 0,
                fill: customStrokeColor || textColor,
              });
            }
          },
        });

        // Effect-specific animations for text
        if (baseEffect === 'neonDraw') {
          gsap.to(textEl, {
            filter: `drop-shadow(0 0 10px ${glowColor})`,
            opacity: 1,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            delay: delay + i * 0.1,
          });
        } else if (baseEffect === 'fireDraw') {
          gsap.to(textEl, {
            filter: `drop-shadow(0 0 15px rgba(255, 69, 0, 0.8))`,
            stroke: '#ff4500',
            duration: 0.3,
            repeat: -1,
            yoyo: true,
            delay: delay + i * 0.1,
          });
        } else if (baseEffect === 'electricDraw') {
          gsap.to(textEl, {
            filter: 'url(#spark)',
            stroke: '#00b7eb',
            duration: 0.2,
            repeat: -1,
            yoyo: true,
            delay: delay + i * 0.1,
          });
        } else if (baseEffect === 'inkDraw') {
          gsap.to(textEl, {
            filter: 'url(#drip)',
            stroke: '#000000',
            strokeWidth: 3,
            duration: 0.4,
            repeat: -1,
            yoyo: true,
            delay: delay + i * 0.1,
          });
        } else if (baseEffect === 'pulseDraw') {
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
        } else if (baseEffect === 'scribbleDraw') {
          gsap.to(textEl, {
            filter: 'url(#scribble)',
            stroke: '#333333',
            strokeWidth: 2.5,
            duration: 0.3,
            repeat: -1,
            yoyo: true,
            delay: delay + i * 0.1,
          });
        } else if (baseEffect === 'waterDraw') {
          gsap.to(textEl, {
            filter: 'url(#ripple)',
            stroke: '#00ced1',
            strokeWidth: 2,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            delay: delay + i * 0.1,
          });
        } else if (baseEffect === 'goldDraw') {
          gsap.to(textEl, {
            filter: `drop-shadow(0 0 10px #ffd700)`,
            stroke: '#ffd700',
            strokeWidth: 2.5,
            duration: 0.4,
            repeat: -1,
            yoyo: true,
            delay: delay + i * 0.1,
          });
        } else if (baseEffect === 'vortexDraw') {
          gsap.to(textEl, {
            filter: 'url(#vortex)',
            stroke: '#8a2be2',
            strokeWidth: 2,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            delay: delay + i * 0.1,
          });
        } else if (baseEffect === 'frostDraw') {
          gsap.to(textEl, {
            filter: `drop-shadow(0 0 8px #87ceeb)`,
            stroke: '#87ceeb',
            strokeWidth: 2,
            duration: 3,
            repeat: -1,
            yoyo: true,
            delay: delay + i * 0.1,
          });
        } else if (baseEffect === 'shadowDraw') {
          gsap.to(textEl, {
            filter: 'url(#shadow)',
            stroke: '#666666',
            strokeWidth: 2.5,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            delay: delay + i * 0.1,
          });
        } else if (baseEffect === 'sandDraw') {
          gsap.to(textEl, {
            filter: `drop-shadow(0 0 6px #f4a460)`,
            stroke: '#f4a460',
            strokeWidth: 2,
            duration: 4,
            repeat: -1,
            yoyo: true,
            delay: delay + i * 0.1,
          });
        } else if (baseEffect === 'smokeDraw') {
          gsap.to(textEl, {
            filter: 'url(#smoke)',
            stroke: '#a9a9a9',
            strokeWidth: 2,
            duration: 3.5,
            repeat: -1,
            yoyo: true,
            delay: delay + i * 0.1,
          });
        } else if (baseEffect === 'waveDraw') {
          gsap.to(textEl, {
            filter: 'url(#wave)',
            stroke: '#20b2aa',
            strokeWidth: 2,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            delay: delay + i * 0.1,
          });
        } else if (baseEffect === 'fadeDraw') {
          gsap.to(textEl, {
            opacity: 1,
            stroke: '#dda0dd',
            strokeWidth: 2,
            duration: 3,
            repeat: -1,
            yoyo: true,
            delay: delay + i * 0.1,
          });
        } else if (baseEffect === 'whiteNeonDraw') {
          gsap.to(textEl, {
            stroke: '#ffffff',
            strokeWidth: 2,
            duration: 2,
            repeat: -1,
            yoyo: true,
            delay: delay + i * 0.1,
          });
        }
      });
    }
  }, [
    isInView,
    type,
    baseEffect,
    duration,
    delay,
    glowColor,
    strokeColor,
    customStrokeColor,
    textColor,
    Icon,
  ]);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    console.log('Fallback triggered: prefersReducedMotion');
    return (
      <div
        className={`inline-block font-semibold ${textColor} ${fontSize} ${className}`}
        style={{ fontFamily }}
      >
        {type === 'text' ? text : type === 'icon' && Icon ? <Icon /> : ''}
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
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.05"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="5"
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>
          <filter id="drip" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="8"
              xChannelSelector="G"
              yChannelSelector="R"
            />
            <feGaussianBlur stdDeviation="2" />
          </filter>
          <filter id="scribble" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.1"
              numOctaves="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="3"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <filter id="ripple" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.1"
              numOctaves="3"
              result="ripple"
            />
            <feDisplacementMap in="SourceGraphic" in2="ripple" scale="4" />
          </filter>
          <filter id="vortex" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.05"
              numOctaves="2"
              result="vortex"
            />
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
            <feTurbulence
              type="turbulence"
              baseFrequency="0.03"
              numOctaves="2"
              result="smoke"
            />
            <feDisplacementMap in="SourceGraphic" in2="smoke" scale="3" />
            <feGaussianBlur stdDeviation="1" />
          </filter>
          <filter id="wave" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              type="sinusoidal"
              baseFrequency="0.05"
              numOctaves="2"
              result="wave"
            />
            <feDisplacementMap in="SourceGraphic" in2="wave" scale="5" />
          </filter>
        </defs>
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay }}
        >
          {type === 'text' && (
            <text
              fill={
                baseEffect === 'customColorDraw'
                  ? customStrokeColor || textColor
                  : baseEffect === 'neonDraw' ||
                    baseEffect === 'fireDraw' ||
                    baseEffect === 'electricDraw' ||
                    baseEffect === 'inkDraw' ||
                    baseEffect === 'pulseDraw' ||
                    baseEffect === 'scribbleDraw' ||
                    baseEffect === 'waterDraw' ||
                    baseEffect === 'goldDraw' ||
                    baseEffect === 'vortexDraw' ||
                    baseEffect === 'frostDraw' ||
                    baseEffect === 'shadowDraw' ||
                    baseEffect === 'sandDraw' ||
                    baseEffect === 'smokeDraw' ||
                    baseEffect === 'waveDraw' ||
                    baseEffect === 'fadeDraw' ||
                    baseEffect === 'whiteNeonDraw'
                  ? 'none'
                  : textColor
              }
              stroke={
                baseEffect === 'customColorDraw'
                  ? customStrokeColor || '#ffffff'
                  : baseEffect === 'neonDraw'
                  ? strokeColor
                  : baseEffect === 'fireDraw'
                  ? '#ff4500'
                  : baseEffect === 'electricDraw'
                  ? '#00b7eb'
                  : baseEffect === 'inkDraw'
                  ? '#000000'
                  : baseEffect === 'pulseDraw'
                  ? strokeColor
                  : baseEffect === 'scribbleDraw'
                  ? '#333333'
                  : baseEffect === 'waterDraw'
                  ? '#00ced1'
                  : baseEffect === 'goldDraw'
                  ? '#ffd700'
                  : baseEffect === 'vortexDraw'
                  ? '#8a2be2'
                  : baseEffect === 'frostDraw'
                  ? '#87ceeb'
                  : baseEffect === 'shadowDraw'
                  ? '#666666'
                  : baseEffect === 'sandDraw'
                  ? '#f4a460'
                  : baseEffect === 'smokeDraw'
                  ? '#a9a9a9'
                  : baseEffect === 'waveDraw'
                  ? '#20b2aa'
                  : baseEffect === 'fadeDraw'
                  ? '#dda0dd'
                  : baseEffect === 'whiteNeonDraw'
                  ? '#ffffff'
                  : 'none'
              }
              strokeWidth={
                baseEffect === 'customColorDraw'
                  ? 2
                  : baseEffect === 'neonDraw'
                  ? 2
                  : baseEffect === 'fireDraw'
                  ? 2.5
                  : baseEffect === 'electricDraw'
                  ? 1.5
                  : baseEffect === 'inkDraw'
                  ? 3
                  : baseEffect === 'pulseDraw'
                  ? 2
                  : baseEffect === 'scribbleDraw'
                  ? 2.5
                  : baseEffect === 'waterDraw'
                  ? 2
                  : baseEffect === 'goldDraw'
                  ? 2.5
                  : baseEffect === 'vortexDraw'
                  ? 2
                  : baseEffect === 'frostDraw'
                  ? 2
                  : baseEffect === 'shadowDraw'
                  ? 2.5
                  : baseEffect === 'sandDraw'
                  ? 2
                  : baseEffect === 'smokeDraw'
                  ? 2
                  : baseEffect === 'waveDraw'
                  ? 2
                  : baseEffect === 'fadeDraw'
                  ? 2
                  : baseEffect === 'whiteNeonDraw'
                  ? 2
                  : 0
              }
              strokeDasharray={
                baseEffect !== 'neonDraw' &&
                baseEffect !== 'fireDraw' &&
                baseEffect !== 'electricDraw' &&
                baseEffect !== 'inkDraw' &&
                baseEffect !== 'pulseDraw' &&
                baseEffect !== 'scribbleDraw' &&
                baseEffect !== 'waterDraw' &&
                baseEffect !== 'goldDraw' &&
                baseEffect !== 'vortexDraw' &&
                baseEffect !== 'frostDraw' &&
                baseEffect !== 'shadowDraw' &&
                baseEffect !== 'sandDraw' &&
                baseEffect !== 'smokeDraw' &&
                baseEffect !== 'waveDraw' &&
                baseEffect !== 'fadeDraw' &&
                baseEffect !== 'whiteNeonDraw' &&
                baseEffect !== 'customColorDraw'
                  ? '0'
                  : '1000'
              }
              fontSize={fontSizePx}
              fontFamily={fontFamily}
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              filter={getFilter(baseEffect)}
            >
              {text}
            </text>
          )}
          {type === 'border' && (
            <rect
              x="1"
              y="1"
              fill="none"
              stroke={strokeColor}
              strokeWidth={baseEffect === 'pulseBorderDraw' ? 2 : 2}
              filter={getFilter(baseEffect)}
            />
          )}
          {type === 'icon' && Icon && (
            <g
              transform={`translate(${svgWidth / 2 - 32}, ${svgHeight / 2 - 32}) scale(2.5)`}
              fill="none"
              stroke={strokeColor}
              strokeWidth="2"
            >
              <Icon />
            </g>
          )}
        </motion.g>
      </svg>
    </motion.div>
  );
};

const getFilter = (
  effect:
    | 'neonDraw'
    | 'fireDraw'
    | 'electricDraw'
    | 'inkDraw'
    | 'pulseDraw'
    | 'scribbleDraw'
    | 'waterDraw'
    | 'goldDraw'
    | 'vortexDraw'
    | 'frostDraw'
    | 'shadowDraw'
    | 'sandDraw'
    | 'smokeDraw'
    | 'waveDraw'
    | 'fadeDraw'
    | 'whiteNeonDraw'
    | 'customColorDraw'
    | 'borderDraw'
    | 'dashedBorderDraw'
    | 'pulseBorderDraw',
) => {
  switch (effect) {
    case 'neonDraw':
    case 'pulseDraw':
    case 'goldDraw':
    case 'borderDraw':
    case 'pulseBorderDraw':
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
    case 'dashedBorderDraw':
      return 'none';
    default:
      return 'none';
  }
};

export default AnimatedSVG;