'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedText from '@/app/components/animations/AnimatedText';
import AnimatedScroll from '@/app/components/animations/AnimatedScroll';
import Header from '@/app/components/Header';
import Lenis from '@studio-freight/lenis';

const Examples: React.FC = () => {
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

  const gradientBackground = {
    backgroundImage: `
      linear-gradient(45deg, rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(-45deg, rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(135deg, rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(-135deg, rgba(255,255,255,0.02) 1px, transparent 1px)
    `,
    backgroundSize: '15px 15px',
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white font-sans">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 py-16 px-8 max-w-6xl mx-auto min-w-0" >
        {/* Hero Section */}
        <section id="hero" className="py-16" style={gradientBackground}>
          <AnimatedScroll
            effect="scrollFade"
            triggerPoint={0.1}
            duration={1000}
            className="text-center"
          >
            <AnimatedText
              effect="wave"
              duration={Infinity}
              textColor="text-pink-500"
              className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
            >
              React Animations Examples
            </AnimatedText>
            <motion.p
              className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Explore how `react-animations` transforms your Next.js projects with dynamic text and scroll effects. From portfolios to e-commerce and dashboards, these examples demonstrate practical applications with live demos and code snippets.
            </motion.p>
            <motion.div
              className="text-gray-400 max-w-3xl mx-auto text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-pink-500 mb-4">Best Practices</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Optimize performance by using `will-change` for animated elements.</li>
                <li>Ensure accessibility with sufficient contrast and keyboard navigation.</li>
                <li>Limit animation duration to 1–2 seconds for user comfort.</li>
                <li>Test animations on various devices to ensure smooth rendering.</li>
              </ul>
            </motion.div>
          </AnimatedScroll>
        </section>

        {/* Text Animation Examples */}
        <section id="text-examples" className="py-16" >
          <AnimatedScroll
            effect="slideInLeft"
            triggerPoint={0.15}
            duration={1000}
            className="text-center"
          >
            <AnimatedText
              effect="ripple"
              duration={1.5}
              textColor="text-pink-500"
              className="text-3xl md:text-4xl font-bold mb-6 tracking-tight"
            >
              Text Animation Examples
            </AnimatedText>
            <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12">
              Create captivating headings and callouts with `AnimatedText`. Below are five examples showcasing `ripple`, `burst`, `pulse`, `wave`, and `shuffle` effects.
            </p>
            <hr className="border-gray-700 mb-12 max-w-md mx-auto" />
          </AnimatedScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Ripple Example */}
            <AnimatedScroll
              effect="slideInLeft"
              triggerPoint={0.2}
              duration={1000}
              className="p-6 rounded-lg bg-gray-800/30 backdrop-blur-sm shadow-[0_0_15px_rgba(75,85,99,0.2)]"
            >
              <AnimatedText
                effect="ripple"
                duration={1.5}
                textColor="text-pink-500"
                className="text-xl font-semibold mb-4"
              >
                Portfolio Hero Title
              </AnimatedText>
              <hr className="border-gray-700 mb-4 max-w-xs mx-auto" />
              <p className="text-gray-400 text-sm mb-4">
                The `ripple` effect adds fluid motion to hero titles, ideal for portfolios.
              </p>
              <pre className="bg-gray-900/80 p-4 rounded-lg text-gray-400 font-mono text-sm overflow-x-auto">
                {`import AnimatedText from '@/app/components/animations/AnimatedText';

const PortfolioHero = () => (
  <AnimatedText
    effect="ripple"
    duration={1.5}
    textColor="text-pink-500"
    className="text-4xl font-bold"
  >
    Welcome to My Portfolio
  </AnimatedText>
);`}
              </pre>
              <hr className="border-gray-700 mt-4 max-w-xs mx-auto" />
            </AnimatedScroll>
            {/* Burst Example */}
            <AnimatedScroll
              effect="slideInRight"
              triggerPoint={0.2}
              duration={1000}
              className="p-6 rounded-lg bg-gray-800/30 backdrop-blur-sm shadow-[0_0_15px_rgba(75,85,99,0.2)]"
            >
              <AnimatedText
                effect="burst"
                duration={1.5}
                textColor="text-pink-500"
                className="text-xl font-semibold mb-4"
              >
                Product Highlight
              </AnimatedText>
              <hr className="border-gray-700 mb-4 max-w-xs mx-auto" />
              <p className="text-gray-400 text-sm mb-4">
                The `burst` effect emphasizes new products in e-commerce.
              </p>
              <pre className="bg-gray-900/80 p-4 rounded-lg text-gray-400 font-mono text-sm overflow-x-auto">
                {`import AnimatedText from '@/app/components/animations/AnimatedText';

const ProductHighlight = () => (
  <AnimatedText
    effect="burst"
    duration={1.5}
    textColor="text-pink-500"
    className="text-3xl font-bold"
  >
    New Arrival!
  </AnimatedText>
);`}
              </pre>
              <hr className="border-gray-700 mt-4 max-w-xs mx-auto" />
            </AnimatedScroll>
            {/* Pulse Example */}
            <AnimatedScroll
              effect="slideInLeft"
              triggerPoint={0.25}
              duration={1000}
              className="p-6 rounded-lg bg-gray-800/30 backdrop-blur-sm shadow-[0_0_15px_rgba(75,85,99,0.2)]"
            >
              <AnimatedText
                effect="pulse"
                duration={1.5}
                textColor="text-pink-500"
                className="text-xl font-semibold mb-4"
              >
                Dashboard Callout
              </AnimatedText>
              <hr className="border-gray-700 mb-4 max-w-xs mx-auto" />
              <p className="text-gray-400 text-sm mb-4">
                The `pulse` effect highlights key metrics in dashboards.
              </p>
              <pre className="bg-gray-900/80 p-4 rounded-lg text-gray-400 font-mono text-sm overflow-x-auto">
                {`import AnimatedText from '@/app/components/animations/AnimatedText';

const DashboardCallout = () => (
  <AnimatedText
    effect="pulse"
    duration={1.5}
    textColor="text-pink-500"
    className="text-2xl font-bold"
  >
    Key Metrics
  </AnimatedText>
);`}
              </pre>
              <hr className="border-gray-700 mt-4 max-w-xs mx-auto" />
            </AnimatedScroll>
            {/* Wave Example */}
            <AnimatedScroll
              effect="slideInRight"
              triggerPoint={0.25}
              duration={1000}
              className="p-6 rounded-lg bg-gray-800/30 backdrop-blur-sm shadow-[0_0_15px_rgba(75,85,99,0.2)]"
            >
              <AnimatedText
                effect="wave"
                duration={1.5}
                textColor="text-pink-500"
                className="text-xl font-semibold mb-4"
              >
                Testimonial Quote
              </AnimatedText>
              <hr className="border-gray-700 mb-4 max-w-xs mx-auto" />
              <p className="text-gray-400 text-sm mb-4">
                The `wave` effect adds smooth motion to testimonial quotes.
              </p>
              <pre className="bg-gray-900/80 p-4 rounded-lg text-gray-400 font-mono text-sm overflow-x-auto">
                {`import AnimatedText from '@/app/components/animations/AnimatedText';

const Testimonial = () => (
  <AnimatedText
    effect="wave"
    duration={1.5}
    textColor="text-pink-500"
    className="text-2xl font-semibold"
  >
    "Amazing Product!"
  </AnimatedText>
);`}
              </pre>
              <hr className="border-gray-700 mt-4 max-w-xs mx-auto" />
            </AnimatedScroll>
            {/* Shuffle Example */}
            <AnimatedScroll
              effect="slideInLeft"
              triggerPoint={0.3}
              duration={1000}
              className="p-6 rounded-lg bg-gray-800/30 backdrop-blur-sm shadow-[0_0_15px_rgba(75,85,99,0.2)]"
            >
              <AnimatedText
                effect="echo"
                duration={1.5}
                textColor="text-pink-500"
                className="text-xl font-semibold mb-4"
              >
                Navigation Highlight
              </AnimatedText>
              <hr className="border-gray-700 mb-4 max-w-xs mx-auto" />
              <p className="text-gray-400 text-sm mb-4">
                The `shuffle` effect dynamically highlights navigation links.
              </p>
              <pre className="bg-gray-900/80 p-4 rounded-lg text-gray-400 font-mono text-sm overflow-x-auto">
                {`import AnimatedText from '@/app/components/animations/AnimatedText';

const NavLink = () => (
  <AnimatedText
    effect="shuffle"
    duration={1.5}
    textColor="text-pink-500"
    className="text-lg font-semibold"
  >
    Home
  </AnimatedText>
);`}
              </pre>
              <hr className="border-gray-700 mt-4 max-w-xs mx-auto" />
            </AnimatedScroll>
          </div>
        </section>

        {/* Scroll Animation Examples */}
        <section id="scroll-examples" className="py-16" style={gradientBackground}>
          <AnimatedScroll
            effect="slideInRight"
            triggerPoint={0.35}
            duration={1000}
            className="text-center"
          >
            <AnimatedText
              effect="burst"
              duration={1.5}
              textColor="text-pink-500"
              className="text-3xl md:text-4xl font-bold mb-6 tracking-tight"
            >
              Scroll Animation Examples
            </AnimatedText>
            <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12">
              Enhance navigation with `AnimatedScroll`. Below are five examples using `scrollFade`, `slideInLeft`, `slideInRight`, `zoomIn`, and `rotateIn`.
            </p>
            <hr className="border-gray-700 mb-12 max-w-md mx-auto" />
          </AnimatedScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* ScrollFade Example */}
            <AnimatedScroll
              effect="scrollFade"
              triggerPoint={0.4}
              duration={1000}
              className="p-6 rounded-lg bg-gray-800/30 backdrop-blur-sm shadow-[0_0_15px_rgba(75,85,99,0.2)]"
            >
              <h3 className="text-xl font-semibold text-pink-500 mb-4">Blog Post Reveal</h3>
              <hr className="border-gray-700 mb-4 max-w-xs mx-auto" />
              <p className="text-gray-400 text-sm mb-4">
                The `scrollFade` effect smoothly reveals blog content.
              </p>
              <pre className="bg-gray-900/80 p-4 rounded-lg text-gray-400 font-mono text-sm overflow-x-auto">
                {`import AnimatedScroll from '@/app/components/animations/AnimatedScroll';

const BlogPost = () => (
  <AnimatedScroll
    effect="scrollFade"
    triggerPoint={0.2}
    duration={1000}
    className="p-6"
  >
    <h2 className="text-2xl">Latest Article</h2>
    <p>Engaging content here...</p>
  </AnimatedScroll>
);`}
              </pre>
              <hr className="border-gray-700 mt-4 max-w-xs mx-auto" />
            </AnimatedScroll>
            {/* SlideInLeft Example */}
            <AnimatedScroll
              effect="slideInLeft"
              triggerPoint={0.4}
              duration={1000}
              className="p-6 rounded-lg bg-gray-800/30 backdrop-blur-sm shadow-[0_0_15px_rgba(75,85,99,0.2)]"
            >
              <h3 className="text-xl font-semibold text-pink-500 mb-4">Portfolio Section</h3>
              <hr className="border-gray-700 mb-4 max-w-xs mx-auto" />
              <p className="text-gray-400 text-sm mb-4">
                The `slideInLeft` effect enhances portfolio sections.
              </p>
              <pre className="bg-gray-900/80 p-4 rounded-lg text-gray-400 font-mono text-sm overflow-x-auto">
                {`import AnimatedScroll from '@/app/components/animations/AnimatedScroll';

const PortfolioSection = () => (
  <AnimatedScroll
    effect="slideInLeft"
    triggerPoint={0.3}
    duration={1000}
    className="p-6"
  >
    <h2 className="text-2xl">My Work</h2>
    <p>Showcase projects here...</p>
  </AnimatedScroll>
);`}
              </pre>
              <hr className="border-gray-700 mt-4 max-w-xs mx-auto" />
            </AnimatedScroll>
            {/* SlideInRight Example */}
            <AnimatedScroll
              effect="slideInRight"
              triggerPoint={0.45}
              duration={1000}
              className="p-6 rounded-lg bg-gray-800/30 backdrop-blur-sm shadow-[0_0_15px_rgba(75,85,99,0.2)]"
            >
              <h3 className="text-xl font-semibold text-pink-500 mb-4">Product Grid</h3>
              <hr className="border-gray-700 mb-4 max-w-xs mx-auto" />
              <p className="text-gray-400 text-sm mb-4">
                The `slideInRight` effect highlights e-commerce products.
              </p>
              <pre className="bg-gray-900/80 p-4 rounded-lg text-gray-400 font-mono text-sm overflow-x-auto">
                {`import AnimatedScroll from '@/app/components/animations/AnimatedScroll';

const ProductGrid = () => (
  <AnimatedScroll
    effect="slideInRight"
    triggerPoint={0.3}
    duration={1000}
    className="p-6"
  >
    <h2 className="text-2xl">Featured Products</h2>
    <p>Product details here...</p>
  </AnimatedScroll>
);`}
              </pre>
              <hr className="border-gray-700 mt-4 max-w-xs mx-auto" />
            </AnimatedScroll>
            {/* ZoomIn Example */}
            <AnimatedScroll
              effect="slideInLeft"
              triggerPoint={0.45}
              duration={1000}
              className="p-6 rounded-lg bg-gray-800/30 backdrop-blur-sm shadow-[0_0_15px_rgba(75,85,99,0.2)]"
            >
              <h3 className="text-xl font-semibold text-pink-500 mb-4">Testimonial Card</h3>
              <hr className="border-gray-700 mb-4 max-w-xs mx-auto" />
              <p className="text-gray-400 text-sm mb-4">
                The `zoomIn` effect draws attention to testimonial cards.
              </p>
              <pre className="bg-gray-900/80 p-4 rounded-lg text-gray-400 font-mono text-sm overflow-x-auto">
                {`import AnimatedScroll from '@/app/components/animations/AnimatedScroll';

const TestimonialCard = () => (
  <AnimatedScroll
    effect="zoomIn"
    triggerPoint={0.3}
    duration={1000}
    className="p-6"
  >
    <h2 className="text-2xl">"Great Experience!"</h2>
    <p>Client feedback here...</p>
  </AnimatedScroll>
);`}
              </pre>
              <hr className="border-gray-700 mt-4 max-w-xs mx-auto" />
            </AnimatedScroll>
            {/* RotateIn Example */}
            <AnimatedScroll
              effect="scrollSlide"
              triggerPoint={0.5}
              duration={1000}
              className="p-6 rounded-lg bg-gray-800/30 backdrop-blur-sm shadow-[0_0_15px_rgba(75,85,99,0.2)]"
            >
              <h3 className="text-xl font-semibold text-pink-500 mb-4">Footer Reveal</h3>
              <hr className="border-gray-700 mb-4 max-w-xs mx-auto" />
              <p className="text-gray-400 text-sm mb-4">
                The `rotateIn` effect adds flair to footer sections.
              </p>
              <pre className="bg-gray-900/80 p-4 rounded-lg text-gray-400 font-mono text-sm overflow-x-auto">
                {`import AnimatedScroll from '@/app/components/animations/AnimatedScroll';

const Footer = () => (
  <AnimatedScroll
    effect="rotateIn"
    triggerPoint={0.3}
    duration={1000}
    className="p-6"
  >
    <h2 className="text-2xl">Contact Us</h2>
    <p>Footer links here...</p>
  </AnimatedScroll>
);`}
              </pre>
              <hr className="border-gray-700 mt-4 max-w-xs mx-auto" />
            </AnimatedScroll>
          </div>
        </section>

        {/* Combined Examples */}
        <section id="combined-examples" className="py-16" style={gradientBackground}>
          <AnimatedScroll
            effect="slideInLeft"
            triggerPoint={0.55}
            duration={1000}
            className="text-center"
          >
            <AnimatedText
              effect="pulse"
              duration={1.5}
              textColor="text-pink-500"
              className="text-3xl md:text-4xl font-bold mb-6 tracking-tight"
            >
              Combined Animation Examples
            </AnimatedText>
            <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12">
              Combine `AnimatedText` and `AnimatedScroll` for rich, interactive experiences. Below are three examples for e-commerce, portfolios, and dashboards.
            </p>
            <hr className="border-gray-700 mb-12 max-w-md mx-auto" />
          </AnimatedScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* E-commerce Landing */}
            <AnimatedScroll
              effect="scrollFade"
              triggerPoint={0.6}
              duration={1000}
              className="p-6 rounded-lg bg-gray-800/30 backdrop-blur-sm shadow-[0_0_15px_rgba(75,85,99,0.2)]"
            >
              <AnimatedText
                effect="burst"
                duration={1.5}
                textColor="text-pink-500"
                className="text-xl font-semibold mb-4"
              >
                Summer Sale
              </AnimatedText>
              <hr className="border-gray-700 mb-4 max-w-xs mx-auto" />
              <p className="text-gray-400 text-sm mb-4">
                Uses `scrollFade` and `burst` for an e-commerce landing page.
              </p>
              <pre className="bg-gray-900/80 p-4 rounded-lg text-gray-400 font-mono text-sm overflow-x-auto">
                {`import AnimatedText from '@/app/components/animations/AnimatedText';
import AnimatedScroll from '@/app/components/animations/AnimatedScroll';

const LandingSection = () => (
  <AnimatedScroll
    effect="scrollFade"
    triggerPoint={0.2}
    duration={1000}
    className="p-6"
  >
    <AnimatedText
      effect="burst"
      duration={1.5}
      textColor="text-pink-500"
      className="text-2xl font-bold"
    >
      Summer Sale
    </AnimatedText>
    <p>Shop now and save big!</p>
  </AnimatedScroll>
);`}
              </pre>
              <hr className="border-gray-700 mt-4 max-w-xs mx-auto" />
            </AnimatedScroll>
            {/* Portfolio Showcase */}
            <AnimatedScroll
              effect="slideInLeft"
              triggerPoint={0.6}
              duration={1000}
              className="p-6 rounded-lg bg-gray-800/30 backdrop-blur-sm shadow-[0_0_15px_rgba(75,85,99,0.2)]"
            >
              <AnimatedText
                effect="ripple"
                duration={1.5}
                textColor="text-pink-500"
                className="text-xl font-semibold mb-4"
              >
                Project Showcase
              </AnimatedText>
              <hr className="border-gray-700 mb-4 max-w-xs mx-auto" />
              <p className="text-gray-400 text-sm mb-4">
                Combines `slideInLeft` and `ripple` for portfolio projects.
              </p>
              <pre className="bg-gray-900/80 p-4 rounded-lg text-gray-400 font-mono text-sm overflow-x-auto">
                {`import AnimatedText from '@/app/components/animations/AnimatedText';
import AnimatedScroll from '@/app/components/animations/AnimatedScroll';

const ProjectSection = () => (
  <AnimatedScroll
    effect="slideInLeft"
    triggerPoint={0.2}
    duration={1000}
    className="p-6"
  >
    <AnimatedText
      effect="ripple"
      duration={1.5}
      textColor="text-pink-500"
      className="text-2xl font-bold"
    >
      Project Showcase
    </AnimatedText>
    <p>View my latest work...</p>
  </AnimatedScroll>
);`}
              </pre>
              <hr className="border-gray-700 mt-4 max-w-xs mx-auto" />
            </AnimatedScroll>
            {/* Dashboard Widget */}
            <AnimatedScroll
              effect="skewScroll"
              triggerPoint={0.65}
              duration={1000}
              className="p-6 rounded-lg bg-gray-800/30 backdrop-blur-sm shadow-[0_0_15px_rgba(75,85,99,0.2)]"
            >
              <AnimatedText
                effect="pulse"
                duration={1.5}
                textColor="text-pink-500"
                className="text-xl font-semibold mb-4"
              >
                Data Widget
              </AnimatedText>
              <hr className="border-gray-700 mb-4 max-w-xs mx-auto" />
              <p className="text-gray-400 text-sm mb-4">
                Uses `zoomIn` and `pulse` for dashboard widgets.
              </p>
              <pre className="bg-gray-900/80 p-4 rounded-lg text-gray-400 font-mono text-sm overflow-x-auto">
                {`import AnimatedText from '@/app/components/animations/AnimatedText';
import AnimatedScroll from '@/app/components/animations/AnimatedScroll';

const DataWidget = () => (
  <AnimatedScroll
    effect="zoomIn"
    triggerPoint={0.2}
    duration={1000}
    className="p-6"
  >
    <AnimatedText
      effect="pulse"
      duration={1.5}
      textColor="text-pink-500"
      className="text-2xl font-bold"
    >
      Data Widget
    </AnimatedText>
    <p>Real-time insights...</p>
  </AnimatedScroll>
);`}
              </pre>
              <hr className="border-gray-700 mt-4 max-w-xs mx-auto" />
            </AnimatedScroll>
          </div>
        </section>

        {/* Performance Tips */}
        <section id="performance-tips" className="py-16" style={gradientBackground}>
          <AnimatedScroll
            effect="slideInRight"
            triggerPoint={0.7}
            duration={1000}
            className="text-center"
          >
            <AnimatedText
              effect="wave"
              duration={1.5}
              textColor="text-pink-500"
              className="text-3xl md:text-4xl font-bold mb-6 tracking-tight"
            >
              Performance Optimization Tips
            </AnimatedText>
            <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12">
              Ensure your animations run smoothly with these best practices for `react-animations`.
            </p>
            <hr className="border-gray-700 mb-12 max-w-md mx-auto" />
          </AnimatedScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Will-Change Example */}
            <AnimatedScroll
              effect="scrollFade"
              triggerPoint={0.75}
              duration={1000}
              className="p-6 rounded-lg bg-gray-800/30 backdrop-blur-sm shadow-[0_0_15px_rgba(75,85,99,0.2)]"
            >
              <h3 className="text-xl font-semibold text-pink-500 mb-4">Use `will-change`</h3>
              <hr className="border-gray-700 mb-4 max-w-xs mx-auto" />
              <p className="text-gray-400 text-sm mb-4">
                Hint to browsers which properties will animate to optimize rendering.
              </p>
              <pre className="bg-gray-900/80 p-4 rounded-lg text-gray-400 font-mono text-sm overflow-x-auto">
                {`import AnimatedText from '@/app/components/animations/AnimatedText';

const OptimizedText = () => (
  <div style={{ willChange: 'transform, opacity' }}>
    <AnimatedText
      effect="ripple"
      duration={1.5}
      textColor="text-pink-500"
      className="text-2xl font-bold"
    >
      Optimized Animation
    </AnimatedText>
  </div>
);`}
              </pre>
              <hr className="border-gray-700 mt-4 max-w-xs mx-auto" />
            </AnimatedScroll>
            {/* Avoid Heavy DOM Updates */}
            <AnimatedScroll
              effect="slideInLeft"
              triggerPoint={0.75}
              duration={1000}
              className="p-6 rounded-lg bg-gray-800/30 backdrop-blur-sm shadow-[0_0_15px_rgba(75,85,99,0.2)]"
            >
              <h3 className="text-xl font-semibold text-pink-500 mb-4">Minimize DOM Updates</h3>
              <hr className="border-gray-700 mb-4 max-w-xs mx-auto" />
              <p className="text-gray-400 text-sm mb-4">
                Use simple transforms to reduce reflows and repaints.
              </p>
              <pre className="bg-gray-900/80 p-4 rounded-lg text-gray-400 font-mono text-sm overflow-x-auto">
                {`import AnimatedScroll from '@/app/components/animations/AnimatedScroll';

const OptimizedScroll = () => (
  <AnimatedScroll
    effect="slideInLeft"
    triggerPoint={0.2}
    duration={1000}
    className="p-6"
  >
    <div style={{ transform: 'translate3d(0, 0, 0)' }}>
      <h2 className="text-2xl">Lightweight Animation</h2>
    </div>
  </AnimatedScroll>
);`}
              </pre>
              <hr className="border-gray-700 mt-4 max-w-xs mx-auto" />
            </AnimatedScroll>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="py-16">
          <AnimatedScroll
            effect="slideInRight"
            triggerPoint={0.8}
            duration={1000}
            className="text-center"
          >
            <AnimatedText
              effect="wave"
              duration={Infinity}
              textColor="text-pink-500"
              className="text-3xl md:text-4xl font-bold mb-6 tracking-tight"
            >
              Start Animating Today
            </AnimatedText>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Elevate your Next.js projects with `react-animations`. Install via `npm install react-animations`, explore our docs, check out the showcase, or contribute on GitHub.
            </p>
            <p className="text-gray-400 text-sm mb-8">
              Want a sneak peek? Visit the <Link href="/animations" className="text-pink-500 hover:text-pink-400">Animations Showcase</Link> to see our effects in action.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/docs"
                  className="inline-block px-8 py-3 rounded-full font-semibold text-lg bg-pink-600 text-white hover:bg-pink-700 transition-colors duration-300"
                  aria-label="Get Started with Docs"
                >
                  Get Started
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/animations"
                  className="inline-block px-8 py-3 rounded-full font-semibold text-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300"
                  aria-label="View Animation Showcase"
                >
                  View Showcase
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="https://github.com/your-repo/react-animations"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 rounded-full font-semibold text-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300"
                  aria-label="Visit GitHub Repository"
                >
                  GitHub
                </Link>
              </motion.div>
            </div>
          </AnimatedScroll>
        </section>
      </main>
    </div>
  );
};

export default Examples;