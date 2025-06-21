/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import AnimatedScroll from '@/app/components/animations/AnimatedScroll';
import AnimatedText from '@/app/components/animations/AnimatedText';
import Header from '@/app/components/Header';
import { useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

const ScrollAnimations: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedEffect, setSelectedEffect] = useState<
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
    | 'orbitTrail'
  >('scrollFade');

  interface ScrollAnimationConfig {
    effect:
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
    text: string;
    description: string;
    useCases: string[];
    caseStudy: string;
    communityExample: string;
    color: string;
    glowColor?: string;
  }

  const animations: ScrollAnimationConfig[] = [
    {
      effect: 'scrollFade',
      text: 'Fade In',
      description: 'A smooth fade-in effect that gently reveals elements, ideal for professional, understated introductions.',
      useCases: ['Hero section text', 'Image galleries', 'Content blocks'],
      caseStudy: 'Used in an e-commerce homepage to reveal product categories with a clean, inviting transition, boosting click-through rates by 15%.',
      communityExample: 'A developer used Fade In to animate blog post previews, creating a sleek reading experience.',
      color: 'text-teal-600',
      glowColor: 'rgba(147, 197, 253, 0.5)',
    },
    {
      effect: 'scrollSlide',
      text: 'Slide In',
      description: 'Slides elements upward with soft opacity, perfect for dynamic, engaging content entrances.',
      useCases: ['Feature cards', 'Testimonials', 'Navigation menus'],
      caseStudy: 'Implemented in a portfolio site to slide in project thumbnails, increasing user dwell time by 20%.',
      communityExample: 'A startup animated their team bios with Slide In, adding a modern touch to their About page.',
      color: 'text-indigo-600',
      glowColor: 'rgba(79, 70, 229, 0.5)',
    },
    {
      effect: 'parallax',
      text: 'Parallax',
      description: 'Creates vertical parallax movement for immersive depth, enhancing scrolling experiences.',
      useCases: ['Background images', 'Layered hero visuals', 'Storytelling sections'],
      caseStudy: 'Applied to a travel blog’s hero section for a layered mountain effect, improving user retention.',
      communityExample: 'A photographer used Parallax for gallery backgrounds, creating a cinematic scroll effect.',
      color: 'text-blue-500',
      glowColor: 'rgba(59, 130, 246, 0.5)',
    },
    {
      effect: 'scale',
      text: 'Scale Up',
      description: 'Scales elements in with opacity, drawing attention to critical content with elegance.',
      useCases: ['Call-to-action buttons', 'Product images', 'Stats or metrics'],
      caseStudy: 'Used in a SaaS landing page to scale up pricing plans, boosting conversions by 10%.',
      communityExample: 'A freelancer animated service icons with Scale Up, enhancing their portfolio’s appeal.',
      color: 'text-purple-500',
      glowColor: 'rgba(139, 92, 246, 0.5)',
    },
    {
      effect: 'fullPage',
      text: 'Full Page',
      description: 'Reveals entire sections with a cinematic entrance, ideal for high-impact transitions.',
      useCases: ['Full-screen hero reveals', 'Section introductions', 'Portfolio showcases'],
      caseStudy: 'Featured in a creative agency site to introduce service pages, driving engagement.',
      communityExample: 'A designer used Full Page for project reveals, creating a dramatic portfolio.',
      color: 'text-red-500',
      glowColor: 'rgba(239, 68, 68, 0.5)',
    },
    {
      effect: 'pin',
      text: 'Pinned Section',
      description: 'Pins sections with a fading effect, creating sticky focal points during scrolls.',
      useCases: ['Sticky headers', 'Feature descriptions', 'Interactive timelines'],
      caseStudy: 'Used in a startup pitch deck to pin key metrics, clarifying the value proposition.',
      communityExample: 'A blogger pinned article headers, improving navigation during long reads.',
      color: 'text-orange-500',
      glowColor: 'rgba(249, 115, 22, 0.5)',
    },
    {
      effect: 'rotate',
      text: 'Rotate In',
      description: 'Rotates elements into view, adding playful engagement to scroll animations.',
      useCases: ['Icons', 'Logos', 'Infographics'],
      caseStudy: 'Applied to a tech blog’s category icons, increasing click rates with a fun twist.',
      communityExample: 'A startup animated their logo with Rotate In, creating a memorable brand intro.',
      color: 'text-yellow-500',
      glowColor: 'rgba(234, 179, 8, 0.5)',
    },
    {
      effect: 'zoom',
      text: 'Zoom Effect',
      description: 'Zooms in elements with scale, creating bold, attention-grabbing reveals.',
      useCases: ['Hero images', 'Product showcases', 'Headlines'],
      caseStudy: 'Used in a fashion retailer’s site to zoom in on product photos, enhancing visual impact.',
      communityExample: 'An artist zoomed in gallery thumbnails, adding a dynamic portfolio effect.',
      color: 'text-pink-500',
      glowColor: 'rgba(236, 72, 153, 0.5)',
    },
    {
      effect: 'glowTrail',
      text: 'Glow Trail',
      description: 'A glowing aura trails elements, perfect for futuristic, sci-fi aesthetics.',
      useCases: ['Tech landing pages', 'Dashboards', 'Futuristic UI'],
      caseStudy: 'Featured in a gaming platform’s UI to highlight menu items with neon glow.',
      communityExample: 'A developer used Glow Trail for a tech demo, creating a cyberpunk vibe.',
      color: 'text-cyan-500',
      glowColor: 'rgba(147, 197, 253, 0.5)',
    },
    {
      effect: 'holoShift',
      text: 'Holo Shift',
      description: 'Holographic color shifts with 3D tilt, creating a mesmerizing sci-fi effect.',
      useCases: ['Hero animations', 'Portfolio highlights', 'Product demos'],
      caseStudy: 'Used in a VR startup’s site to showcase devices with holographic transitions.',
      communityExample: 'A designer animated product cards with Holo Shift, adding a futuristic flair.',
      color: 'text-blue-400',
      glowColor: 'rgba(59, 130, 246, 0.5)',
    },
    {
      effect: 'elasticReveal',
      text: 'Elastic Reveal',
      description: 'Stretches and snaps elements into place with springy, playful motion.',
      useCases: ['Buttons', 'Cards', 'Game UI'],
      caseStudy: 'Applied to a mobile app’s onboarding cards for a lively, engaging entrance.',
      communityExample: 'A game dev used Elastic Reveal for UI buttons, enhancing interactivity.',
      color: 'text-green-500',
      glowColor: 'rgba(34, 197, 94, 0.5)',
    },
    {
      effect: 'particleBurst',
      text: 'Particle Burst',
      description: 'Subtle particle explosions enhance scroll reveals with a magical touch.',
      useCases: ['Portfolio sections', 'Event pages', 'Content reveals'],
      caseStudy: 'Used in an event site to reveal schedules with sparkling particle effects.',
      communityExample: 'A creative agency animated event banners with Particle Burst, adding flair.',
      color: 'text-orange-400',
      glowColor: 'rgba(255, 159, 64, 0.7)',
    },
    {
      effect: 'cinematicZoom',
      text: 'Cinematic Zoom',
      description: 'Dramatic zoom with vignette effect, ideal for movie-like transitions.',
      useCases: ['Hero intros', 'Video portfolios', 'Story-driven sites'],
      caseStudy: 'Featured in a filmmaker’s portfolio to introduce reels with cinematic flair.',
      communityExample: 'A videographer used Cinematic Zoom for video thumbnails, creating drama.',
      color: 'text-purple-400',
      glowColor: 'rgba(168, 85, 247, 0.7)',
    },
    {
      effect: 'skewScroll',
      text: 'Skew Scroll',
      description: 'Dynamically skews elements for a futuristic, distorted scroll effect.',
      useCases: ['Tech product pages', 'Interactive galleries', 'Creative intros'],
      caseStudy: 'Used in a digital art gallery to skew artwork previews, creating a unique navigation experience.',
      communityExample: 'A tech startup animated feature cards with Skew Scroll, adding a modern edge.',
      color: 'text-teal-500',
      glowColor: 'rgba(45, 212, 191, 0.5)',
    },
    {
      effect: 'waveShift',
      text: 'Wave Shift',
      description: 'Elements move in a wave-like pattern, simulating fluid, organic motion.',
      useCases: ['Nature-themed sites', 'Wellness apps', 'Creative portfolios'],
      caseStudy: 'Applied to a yoga studio’s site to animate class schedules with a flowing wave effect.',
      communityExample: 'A wellness app used Wave Shift for section headers, evoking calm motion.',
      color: 'text-blue-600',
      glowColor: 'rgba(37, 99, 235, 0.5)',
    },
    {
      effect: 'depthPulse',
      text: 'Depth Pulse',
      description: 'Combines 3D depth with a pulsing scale for a heartbeat-like effect.',
      useCases: ['Health tech UIs', 'Hero sections', 'Interactive dashboards'],
      caseStudy: 'Used in a health app’s dashboard to pulse key metrics with a 3D effect.',
      communityExample: 'A fitness tracker UI animated stats with Depth Pulse, enhancing engagement.',
      color: 'text-red-600',
      glowColor: 'rgba(220, 38, 38, 0.5)',
    },
    {
      effect: 'orbitTrail',
      text: 'Orbit Trail',
      description: 'Elements follow an orbital path with trailing particles, evoking cosmic motion.',
      useCases: ['Space-themed sites', 'Tech demos', 'Creative intros'],
      caseStudy: 'Featured in a space startup’s site to orbit product images with particle trails.',
      communityExample: 'A sci-fi blog used Orbit Trail for article intros, creating a cosmic vibe.',
      color: 'text-indigo-500',
      glowColor: 'rgba(99, 102, 241, 0.5)',
    },
  ];

  const currentAnimation = animations.find((anim) => anim.effect === selectedEffect) || animations[0];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      {/* Dark/Light Mode Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 z-50"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
      </button>

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-6 max-w-7xl mx-auto text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(147,197,253,0.1)] dark:to-[rgba(59,130,246,0.2)] -z-10" />
        <AnimatedText
          effect="holoWave"
          duration={Infinity}
          textColor={isDarkMode ? 'text-teal-400' : 'text-indigo-700'}
          fontSize="text-4xl md:text-5xl"
          glowColor="rgba(6, 182, 212, 0.7)"
          className="font-bold mb-6"
        >
          Master Scroll Animations
        </AnimatedText>
        <p className={`text-lg md:text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} max-w-3xl mx-auto mb-8`}>
          Explore ReactLab’s cutting-edge scroll animations, powered by Framer Motion and Lenis. Select an effect to experience its full potential through an immersive showcase, complete with real-world applications, performance insights, and community examples.
        </p>
      </section>

      {/* Effect Selector */}
      <section className="py-8 px-6 max-w-7xl mx-auto sticky top-0 bg-inherit z-40">
        <div className="flex justify-center mb-12">
          <select
            value={selectedEffect}
            onChange={(e) => setSelectedEffect(e.target.value as any)}
            className={`w-full max-w-md p-3 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-cyan-500 transition-all duration-200 text-lg font-semibold cursor-pointer shadow-md hover:shadow-lg`}
          >
            {animations.map(({ effect, text }) => (
              <option key={effect} value={effect}>
                {text}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Extended Showcase Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto min-h-[350vh] flex flex-col gap-16">
        {/* Main Effect Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <AnimatedScroll
            effect={selectedEffect}
            triggerPoint={0.2}
            duration={800}
            glowColor={currentAnimation.glowColor}
            className="p-8 rounded-lg shadow-xl bg-white dark:bg-gray-800 transition-colors duration-300"
          >
            <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? currentAnimation.color.replace('500', '400').replace('600', '500').replace('400', '300') : currentAnimation.color} mb-4`}>
              {currentAnimation.text}
            </h2>
            <p className={`text-base md:text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              {currentAnimation.description}
            </p>
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-teal-400' : 'text-indigo-600'} mb-2`}>Use Cases</h3>
            <ul className={`list-disc list-inside ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {currentAnimation.useCases.map((useCase, index) => (
                <li key={index}>{useCase}</li>
              ))}
            </ul>
          </AnimatedScroll>
          <AnimatedScroll
            effect={selectedEffect}
            triggerPoint={0.2}
            duration={800}
            glowColor={currentAnimation.glowColor}
            className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-xl"
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${currentAnimation.glowColor || 'rgba(147, 197, 253, 0.5)'}, transparent 70%)`,
              }}
            />
            <div className={`absolute inset-0 flex items-center justify-center font-semibold text-2xl md:text-3xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Primary Visual
            </div>
          </AnimatedScroll>
        </div>

        {/* Why Use Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <AnimatedScroll
            effect={selectedEffect}
            triggerPoint={0.3}
            duration={800}
            glowColor={currentAnimation.glowColor}
            className="relative h-48 md:h-64 rounded-lg overflow-hidden shadow-xl order-2 md:order-1"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 dark:from-cyan-600 dark:to-blue-600 opacity-75"
            />
            <div className={`absolute inset-0 flex items-center justify-center font-semibold text-xl md:text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Supporting Visual
            </div>
          </AnimatedScroll>
          <AnimatedScroll
            effect={selectedEffect}
            triggerPoint={0.3}
            duration={800}
            glowColor={currentAnimation.glowColor}
            className="p-8 rounded-lg shadow-xl bg-white dark:bg-gray-800 transition-colors duration-300 order-1 md:order-2"
          >
            <h2 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? currentAnimation.color.replace('500', '400').replace('600', '500').replace('400', '300') : currentAnimation.color} mb-4`}>
              Why Use {currentAnimation.text}?
            </h2>
            <p className={`text-base md:text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {currentAnimation.text} transforms static pages into dynamic experiences. Its GPU-accelerated animations ensure buttery-smooth performance, while flexible props allow tailoring to any design system, from minimalist portfolios to vibrant e-commerce sites.
            </p>
          </AnimatedScroll>
        </div>

        {/* Case Study Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <AnimatedScroll
            effect={selectedEffect}
            triggerPoint={0.4}
            duration={800}
            glowColor={currentAnimation.glowColor}
            className="p-8 rounded-lg shadow-xl bg-white dark:bg-gray-800 transition-colors duration-300"
          >
            <h2 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? currentAnimation.color.replace('500', '400').replace('600', '500').replace('400', '300') : currentAnimation.color} mb-4`}>
              Real-World Example
            </h2>
            <p className={`text-base md:text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {currentAnimation.caseStudy} This implementation showcases how {currentAnimation.text} can elevate user engagement and drive measurable results.
            </p>
          </AnimatedScroll>
          <AnimatedScroll
            effect={selectedEffect}
            triggerPoint={0.4}
            duration={800}
            glowColor={currentAnimation.glowColor}
            className="relative h-48 md:h-64 rounded-lg overflow-hidden shadow-xl"
          >
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(45deg, ${currentAnimation.glowColor || 'rgba(147, 197, 253, 0.5)'}, transparent)`,
              }}
            />
            <div className={`absolute inset-0 flex items-center justify-center font-semibold text-xl md:text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Case Study Visual
            </div>
          </AnimatedScroll>
        </div>

        {/* Technical Insights Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <AnimatedScroll
            effect={selectedEffect}
            triggerPoint={0.5}
            duration={800}
            glowColor={currentAnimation.glowColor}
            className="relative h-48 md:h-64 rounded-lg overflow-hidden shadow-xl order-2 md:order-1"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-600 dark:to-purple-600 opacity-75"
            />
            <div className={`absolute inset-0 flex items-center justify-center font-semibold text-xl md:text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Technical Visual
            </div>
          </AnimatedScroll>
          <AnimatedScroll
            effect={selectedEffect}
            triggerPoint={0.5}
            duration={800}
            glowColor={currentAnimation.glowColor}
            className="p-8 rounded-lg shadow-xl bg-white dark:bg-gray-800 transition-colors duration-300 order-1 md:order-2"
          >
            <h2 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? currentAnimation.color.replace('500', '400').replace('600', '500').replace('400', '300') : currentAnimation.color} mb-4`}>
              Technical Insights
            </h2>
            <p className={`text-base md:text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {currentAnimation.text} leverages Framer Motion’s scroll-based transforms and Lenis for silky-smooth scrolling. Customize with props like <code>triggerPoint</code> (viewport activation), <code>duration</code> (animation length), and <code>glowColor</code> (visual flair). Integrate with ReactLab’s ecosystem for cohesive, high-performance UIs.
            </p>
          </AnimatedScroll>
        </div>

        {/* Performance Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <AnimatedScroll
            effect={selectedEffect}
            triggerPoint={0.6}
            duration={800}
            glowColor={currentAnimation.glowColor}
            className="p-8 rounded-lg shadow-xl bg-white dark:bg-gray-800 transition-colors duration-300"
          >
            <h2 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? currentAnimation.color.replace('500', '400').replace('600', '500').replace('400', '300') : currentAnimation.color} mb-4`}>
              Performance Benefits
            </h2>
            <p className={`text-base md:text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Optimized for 60fps on modern devices, {currentAnimation.text} uses GPU-accelerated transforms to ensure smooth rendering, even on mobile. Minimal DOM impact and efficient scroll listeners make it ideal for performance-critical applications.
            </p>
            <ul className={`list-disc list-inside ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-4`}>
              <li>60fps on desktop and mobile</li>
              <li>Low CPU usage with GPU acceleration</li>
              <li>Efficient scroll event handling</li>
            </ul>
          </AnimatedScroll>
          <AnimatedScroll
            effect={selectedEffect}
            triggerPoint={0.6}
            duration={800}
            glowColor={currentAnimation.glowColor}
            className="relative h-48 md:h-64 rounded-lg overflow-hidden shadow-xl"
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 30% 70%, ${currentAnimation.glowColor || 'rgba(147, 197, 253, 0.5)'}, transparent 70%)`,
              }}
            />
            <div className={`absolute inset-0 flex items-center justify-center font-semibold text-xl md:text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Performance Visual
            </div>
          </AnimatedScroll>
        </div>

        {/* Community Examples Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <AnimatedScroll
            effect={selectedEffect}
            triggerPoint={0.7}
            duration={800}
            glowColor={currentAnimation.glowColor}
            className="relative h-48 md:h-64 rounded-lg overflow-hidden shadow-xl order-2 md:order-1"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 dark:from-pink-600 dark:to-purple-600 opacity-75"
            />
            <div className={`absolute inset-0 flex items-center justify-center font-semibold text-xl md:text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Community Visual
            </div>
          </AnimatedScroll>
          <AnimatedScroll
            effect={selectedEffect}
            triggerPoint={0.7}
            duration={800}
            glowColor={currentAnimation.glowColor}
            className="p-8 rounded-lg shadow-xl bg-white dark:bg-gray-800 transition-colors duration-300 order-1 md:order-2"
          >
            <h2 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? currentAnimation.color.replace('500', '400').replace('600', '500').replace('400', '300') : currentAnimation.color} mb-4`}>
              Community Examples
            </h2>
            <p className={`text-base md:text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {currentAnimation.communityExample} Join the ReactLab community to share your creations and discover innovative ways to use {currentAnimation.text} in your projects.
            </p>
          </AnimatedScroll>
        </div>

        {/* Get Started Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <AnimatedScroll
            effect={selectedEffect}
            triggerPoint={0.8}
            duration={800}
            glowColor={currentAnimation.glowColor}
            className="p-8 rounded-lg shadow-xl bg-white dark:bg-gray-800 transition-colors duration-300"
          >
            <h2 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? currentAnimation.color.replace('500', '400').replace('600', '500').replace('400', '300') : currentAnimation.color} mb-4`}>
              Get Started
            </h2>
            <p className={`text-base md:text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              Install ReactLab via npm and integrate {currentAnimation.text} with a single component. Customize its behavior to match your design system and create stunning, interactive experiences.
            </p>
            <div className="mt-4">
              <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-teal-400' : 'text-indigo-600'} mb-2`}>Key Props</h4>
              <ul className={`list-disc list-inside ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li><code>effect</code>: Choose from {animations.length} scroll effects</li>
                <li><code>triggerPoint</code>: Set viewport activation (0 to 1)</li>
                <li><code>duration</code>: Control animation length in pixels</li>
                <li><code>glowColor</code>: Customize glow for effects like {currentAnimation.text}</li>
              </ul>
            </div>
          </AnimatedScroll>
          <AnimatedScroll
            effect={selectedEffect}
            triggerPoint={0.8}
            duration={800}
            glowColor={currentAnimation.glowColor}
            className="relative h-48 md:h-64 rounded-lg overflow-hidden shadow-xl"
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 70% 30%, ${currentAnimation.glowColor || 'rgba(147, 197, 253, 0.5)'}, transparent 70%)`,
              }}
            />
            <div className={`absolute inset-0 flex items-center justify-center font-semibold text-xl md:text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Integration Visual
            </div>
          </AnimatedScroll>
        </div>
      </section>
    </div>
  );
};

export default ScrollAnimations;