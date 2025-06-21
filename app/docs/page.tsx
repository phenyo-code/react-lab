'use client';

import AnimatedText from '@/app/components/animations/AnimatedText';
import Sidebar from '@/app/components/Sidebar';
import { motion } from 'framer-motion';

const Docs: React.FC = () => {
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
    <div className="min-h-screen bg-[#1A1A1A] text-white font-sans flex flex-row overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 py-16 px-8 max-w-5xl mx-auto md:ml-64 min-w-0">
        {/* Overview Section */}
        <section id="overview" className="py-16">
          <AnimatedText
            effect="wave"
            duration={Infinity}
            textColor="text-pink-500"
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
            glowColor="rgba(236, 72, 153, 0.5)"
          >
            React Animations Documentation
          </AnimatedText>
          <motion.p
            className="text-lg md:text-xl text-gray-400 max-w-3xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Welcome to the official documentation for react-animations, a free, open-source, TypeScript-friendly animations library for Next.js. Powered by Framer Motion and Lenis, react-animations provides dynamic text and scroll effects to enhance your web projects with professional-grade animations. Install via `npm install react-animations` to get started.
          </motion.p>
        </section>

        {/* Installation Section */}
        <section id="installation" className="py-16" style={gradientBackground}>
          <AnimatedText
            effect="ripple"
            duration={1.5}
            textColor="text-pink-500"
            className="text-3xl md:text-4xl font-bold mb-6 tracking-tight"
            glowColor="rgba(236, 72, 153, 0.5)"
          >
            Installation
          </AnimatedText>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-[0_0_15px_rgba(236,72,153,0.2)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-gray-400 mb-4">
              Install react-animations and its dependencies via npm:
            </p>
            <pre className="bg-gray-900/80 p-4 rounded-lg text-gray-400 font-mono text-sm overflow-x-auto">
              npm install react-animations framer-motion @studio-freight/lenis
            </pre>
            <p className="text-gray-400 mt-4">
              Ensure you have React and Next.js set up in your project. react-animations is tree-shakable and TypeScript-compatible for seamless integration.
            </p>
          </motion.div>
          <hr className="border-gray-700 mt-6 max-w-md mx-auto" />
        </section>

        {/* AnimatedText Section */}
        <section id="animated-text" className="py-16" style={gradientBackground}>
          <AnimatedText
            effect="burst"
            duration={1.5}
            textColor="text-pink-500"
            className="text-3xl md:text-4xl font-bold mb-6 tracking-tight"
            glowColor="rgba(236, 72, 153, 0.5)"
          >
            AnimatedText Component
          </AnimatedText>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-gray-400">
              The <code>AnimatedText</code> component offers over 20 unique text animation effects, from rippling waves to pulsing glows, powered by Framer Motion.
            </p>
            <hr className="border-gray-700 max-w-md mx-auto" />
            <h3 className="text-xl font-semibold text-pink-500">Props</h3>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li><code>effect</code>: One of 20+ effects (e.g., <code>wave</code>, <code>ripple</code>, <code>burst</code>, <code>pulse</code>)</li>
              <li><code>textColor</code>: Tailwind class for text color (e.g., <code>text-pink-500</code>)</li>
              <li><code>glowColor</code>: Optional rgba string for glow effects (e.g., <code>rgba(236, 72, 153, 0.5)</code>)</li>
              <li><code>duration</code>: Animation duration in seconds or <code>Infinity</code> for looping effects</li>
              <li><code>className</code>: Additional Tailwind classes for styling</li>
            </ul>
            <hr className="border-gray-700 max-w-md mx-auto" />
            <h3 className="text-xl font-semibold text-pink-500 mt-6">Example</h3>
            <pre className="bg-gray-900/80 p-4 rounded-lg text-gray-400 font-mono text-sm overflow-x-auto">
              {`import AnimatedText from '@/app/components/animations/AnimatedText';

const MyComponent = () => {
  return (
    <AnimatedText
      effect="ripple"
      duration={1.5}
      textColor="text-pink-500"
      glowColor="rgba(236, 72, 153, 0.5)"
      className="text-4xl font-bold"
    >
      Hello, World!
    </AnimatedText>
  );
};
`}
            </pre>
            <div className="p-6 rounded-lg bg-gray-800/30 backdrop-blur-sm shadow-[0_0_15px_rgba(236,72,153,0.2)]">
              <AnimatedText
                effect="ripple"
                duration={1.5}
                textColor="text-pink-500"
                glowColor="rgba(236, 72, 153, 0.5)"
                className="text-2xl font-semibold"
              >
                Hello, World!
              </AnimatedText>
            </div>
          </motion.div>
          <hr className="border-gray-700 mt-6 max-w-md mx-auto" />
        </section>

        {/* AnimatedScroll Section */}
        <section id="animated-scroll" className="py-16" style={gradientBackground}>
          <AnimatedText
            effect="pulse"
            duration={1.5}
            textColor="text-pink-500"
            className="text-3xl md:text-4xl font-bold mb-6 tracking-tight"
            glowColor="rgba(236, 72, 153, 0.5)"
          >
            AnimatedScroll Component
          </AnimatedText>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-gray-400">
              The <code>AnimatedScroll</code> component enables smooth scroll-triggered animations using Framer Motion and Lenis for seamless navigation.
            </p>
            <hr className="border-gray-700 max-w-md mx-auto" />
            <h3 className="text-xl font-semibold text-pink-500">Props</h3>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li><code>effect</code>: Scroll effect (e.g., <code>scrollFade</code>, <code>slideInLeft</code>, <code>slideInRight</code>)</li>
              <li><code>triggerPoint</code>: Scroll position to trigger animation (0 to 1)</li>
              <li><code>duration</code>: Animation duration in milliseconds</li>
              <li><code>glowColor</code>: Optional rgba string for glow effects</li>
              <li><code>className</code>: Additional Tailwind classes for styling</li>
            </ul>
            <hr className="border-gray-700 max-w-md mx-auto" />
            <h3 className="text-xl font-semibold text-pink-500 mt-6">Example</h3>
            <pre className="bg-gray-900/80 p-4 rounded-lg text-gray-400 font-mono text-sm overflow-x-auto">
              {`import AnimatedScroll from '@/app/components/animations/AnimatedScroll';

const MyComponent = () => {
  return (
    <AnimatedScroll
      effect="scrollFade"
      triggerPoint={0.2}
      duration={1000}
      glowColor="rgba(236, 72, 153, 0.5)"
      className="p-6"
    >
      <h2 className="text-2xl">Scroll to Reveal</h2>
    </AnimatedScroll>
  );
};
`}
            </pre>
            <div className="p-6 rounded-lg bg-gray-800/30 backdrop-blur-sm shadow-[0_0_15px_rgba(236,72,153,0.2)]">
              <p className="text-gray-400">
                Scroll down to see <code>AnimatedScroll</code> in action on the{' '}
                <a href="/animations" className="text-pink-500 hover:text-pink-400">
                  Animations Showcase
                </a>{' '}
                page.
              </p>
            </div>
          </motion.div>
          <hr className="border-gray-700 mt-6 max-w-md mx-auto" />
        </section>

        {/* Examples Section */}
        <section id="examples" className="py-16" style={gradientBackground}>
          <AnimatedText
            effect="wave"
            duration={1.5}
            textColor="text-pink-500"
            className="text-3xl md:text-4xl font-bold mb-6 tracking-tight"
            glowColor="rgba(236, 72, 153, 0.5)"
          >
            Examples
          </AnimatedText>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-gray-400">
              Explore practical use cases for react-animations:
            </p>
            <hr className="border-gray-700 max-w-md mx-auto" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg bg-gray-800/30 backdrop-blur-sm shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                <AnimatedText
                  effect="burst"
                  duration={1.5}
                  textColor="text-pink-500"
                  className="text-xl font-semibold mb-4"
                  glowColor="rgba(236, 72, 153, 0.5)"
                >
                  Hero Section Title
                </AnimatedText>
                <p className="text-gray-400 text-sm">
                  Use <code>burst</code> for a dynamic hero section title that grabs attention.
                </p>
              </div>
              <div className="p-6 rounded-lg bg-gray-800/30 backdrop-blur-sm shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                <AnimatedText
                  effect="pulse"
                  duration={1.5}
                  textColor="text-pink-500"
                  className="text-xl font-semibold mb-4"
                  glowColor="rgba(236, 72, 153, 0.5)"
                >
                  Sale Banner
                </AnimatedText>
                <p className="text-gray-400 text-sm">
                  Apply <code>pulse</code> to highlight discounts in an e-commerce sale banner.
                </p>
              </div>
            </div>
          </motion.div>
          <hr className="border-gray-700 mt-6 max-w-md mx-auto" />
        </section>
      </main>
    </div>
  );
};

export default Docs;