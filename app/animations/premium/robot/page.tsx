/* eslint-disable @typescript-eslint/no-unused-vars */
/* src/app/animations/premium/robot/page.tsx */
"use client";

import AICore from "@/app/components/animations/AICore";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star } from "lucide-react";

const AICorePage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  const opacityRange = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const gradientBackground = {
    backgroundImage: `
      linear-gradient(45deg, rgba(0, 191, 255, 0.02) 1px, transparent 1px),
      linear-gradient(-45deg, rgba(0, 191, 255, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 191, 255, 0.02) 1px, transparent 1px),
      linear-gradient(135deg, rgba(0, 191, 255, 0.02) 1px, transparent 1px),
      linear-gradient(-135deg, rgba(0, 191, 255, 0.02) 1px, transparent 1px)
    `,
    backgroundSize: "15px 15px",
  };

  return (
    <div className="min-h-screen bg-[#0A0A1A] text-white font-sans">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 px-4 sm:px-6 md:px-8 max-w-[100vw] mx-auto border-b border-gray-700 overflow-hidden">
        <div className="relative w-full h-[80vh] max-w-7xl mx-auto">
          <div className="absolute inset-0 z-0">
            <AICore className="w-full h-full" />
          </div>
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center text-center h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Premium AI Core Animation
            </h1>
            <p className="text-base md:text-lg text-gray-400 max-w-xl mb-6">
              Experience a futuristic 3D holographic AI core powered by `@react-three/fiber`.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/docs"
                className="inline-block px-8 py-3 rounded-full font-semibold text-lg bg-cyan-600 text-white hover:bg-cyan-700 transition-colors duration-300 z-20"
                aria-label="Get Started with Documentation"
              >
                Get Started
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Showcase Section */}
      <section
        className="py-16 px-4 sm:px-6 md:px-8 max-w-[100vw] mx-auto border-b border-gray-700"
        style={gradientBackground}
      >
        <motion.div
          className="text-center max-w-7xl mx-auto"
          style={{ y: yRange, opacity: opacityRange }}
        >
          <span
            className="text-[15px] text-gray-700 block mt-1"
            aria-label="Animation properties for AI core showcase"
          >
            Animation: Holographic AI Core
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Explore Premium AI Core Animation
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-12">
            Interact with a dynamic 3D AI core. Hover to enhance the glow, click to expand energy rings, and use orbit controls to explore. Built with primitive geometries and custom shaders.
          </p>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
        </motion.div>
        <motion.div
          className="p-8 rounded-2xl bg-gray-800 border border-gray-700 min-h-[60vh] flex items-center justify-center max-w-7xl mx-auto"
          style={{ y: yRange, opacity: opacityRange }}
        >
          <AICore className="w-full max-w-4xl" />
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 md:px-8 max-w-[100vw] mx-auto border-b border-gray-700">
        <motion.div
          className="text-center max-w-7xl mx-auto"
          style={{ y: yRange, opacity: opacityRange }}
        >
          <span
            className="text-[15px] text-gray-700 block mt-1"
            aria-label="Animation properties for CTA"
          >
            Animation: 3D Integration
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Bring Premium 3D to Your Projects
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Elevate your Next.js apps with `react-animations` and premium 3D effects. Install via `npm install react-animations` and explore our docs to integrate dynamic, holographic animations like this AI core.
          </p>
          <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/docs"
                className="inline-block px-8 py-3 rounded-full font-semibold text-lg bg-cyan-600 text-white hover:bg-cyan-700 transition-colors duration-300"
                aria-label="Get Started with Docs"
              >
                Get Started
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="https://github.com/your-repo/react-animations"
                className="inline-block px-8 py-3 rounded-full font-semibold text-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300"
                aria-label="Contribute on GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contribute
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AICorePage;