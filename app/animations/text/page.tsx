/* eslint-disable react/no-unescaped-entities */
'use client';

import AnimatedScroll from '@/app/components/animations/AnimatedScroll';
import AnimatedText from '@/app/components/animations/AnimatedText';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';

const Text: React.FC = () => {
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

 // Scroll-based slide-up effect
 const { scrollYProgress } = useScroll();
 const yRange = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
 const opacityRange = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

 interface TextDemo {
 title: string;
 description: string;
 effect: 'wave' | 'flip' | 'ripple' | 'holoWave' | 'vaporwave' | 'neonCircuit';
 }

 const textDemos: TextDemo[] = [
 {
 title: 'Wave',
 description: 'Smooth, flowing wave effect for dynamic text animations.',
 effect: 'wave',
 },
 {
 title: 'Flip',
 description: 'Flipping text effect for engaging, 3D-like transitions.',
 effect: 'flip',
 },
 {
 title: 'Ripple',
 description: 'Rippling scale effect for subtle, water-like text motion.',
 effect: 'ripple',
 },
 {
 title: 'Holo Wave',
 description: 'Holographic wave with glowing depth for futuristic text.',
 effect: 'holoWave',
 },
 {
 title: 'Vaporwave',
 description: 'Retro-futuristic color-shifting effect with pink and cyan tones.',
 effect: 'vaporwave',
 },
 {
 title: 'Neon Circuit',
 description: 'Pulsing neon circuit effect for tech-inspired text animations.',
 effect: 'neonCircuit',
 },
 ];

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

 // State for Try It Out section
 const [textTryText, setTextTryText] = useState('Text Animations');
 const [selectedEffect, setSelectedEffect] = useState<
 'wave' | 'flip' | 'ripple' | 'holoWave' | 'vaporwave' | 'neonCircuit'
 >('wave');

 const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 setTextTryText(e.target.value || 'Text Animations');
 };

 const handleEffectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
 setSelectedEffect(e.target.value as typeof selectedEffect);
 };

 return (
 <div className="min-h-screen bg-[#1A1A1A] text-white font-sans">
 {/* Header */}
 <Header />

 {/* Hero Section */}
 <section className="py-16 px-6 text-center max-w-7xl mx-auto border-b border-gray-700">
 <AnimatedScroll effect="slideInLeft" triggerPoint={0.1} duration={1000} className="flex flex-col items-center">
 <AnimatedText
 effect="neonCircuit"
 duration={Infinity}
 textColor="#ffffff"
 fontSize="text-4xl md:text-5xl"
 glowColor="rgba(255, 106, 193, 0.7)"
 className="font-bold tracking-tight"
 >
 Text Animations
 </AnimatedText>
 <hr className="border-gray-700 my-6 max-w-md mx-auto" />
 <motion.p
 className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-8"
 style={{ y: yRange, opacity: opacityRange }}
 >
 Elevate your Next.js projects with dynamic text animations using the React Animations library. From flowing waves to neon circuit effects, explore a range of captivating text effects. Install via `npm install react-animations` and preview the effects below or try them out interactively.
 </motion.p>
 <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
 <div className="flex flex-col sm:flex-row justify-center gap-4">
 <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
 <Link
 href="/docs"
 className="inline-block px-8 py-3 rounded-full font-semibold text-lg bg-pink-600 text-white hover:bg-pink-700 transition-colors duration-300"
 aria-label="Get Started with Documentation"
 >
 Get Started
 </Link>
 </motion.div>
 </div>
 </AnimatedScroll>
 </section>

 {/* Text Animation Showcase */}
 <section className="py-12 px-6 max-w-7xl mx-auto border-b border-gray-700" style={gradientBackground}>
 <AnimatedScroll effect="slideInRight" triggerPoint={0.2} duration={1000} className="text-center">
 <span className="text-[15px] text-gray-700 block mt-1" aria-label="Animation properties for text showcase scroll">
 effect="slideInRight" triggerPoint={0.2} duration={1000}
 </span>
 <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
 Text Animation Showcase
 </h2>
 <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-8">
 Discover the `AnimatedText` component with effects like wave, flip, and neon circuit. These animations are perfect for headings, banners, and interactive UI elements in your Next.js projects.
 </p>
 <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
 </AnimatedScroll>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {textDemos.map(({ title, description, effect }, index) => (
 <AnimatedScroll
 key={title}
 effect={index % 2 === 0 ? 'slideInLeft' : 'slideInRight'}
 triggerPoint={0.2 + index * 0.1}
 duration={1000}
 className={`py-4 flex flex-col items-center text-center ${
 index < textDemos.length - 1 ? 'md:border-r md:border-gray-700' : ''
 } ${index === 0 ? 'border-t md:border-t-0 pt-6 md:pt-4' : ''}`}
 >
 <AnimatedText
 effect={effect}
 duration={1.5}
 textColor="#ffffff"
 fontSize="text-xl"
 glowColor={
 effect === 'vaporwave'
 ? 'rgba(255, 106, 193, 0.7)'
 : effect === 'neonCircuit' || effect === 'holoWave'
 ? 'rgba(255, 106, 193, 0.7)'
 : 'rgba(255, 255, 255, 0.7)'
 }
 className="font-semibold mb-2"
 >
 {title}
 </AnimatedText>
 <hr className="border-gray-700 my-2 max-w-xs mx-auto" />
 <p className="text-gray-400 text-sm max-w-xs">{description}</p>
 <hr className="border-gray-700 my-2 max-w-xs mx-auto" />
 </AnimatedScroll>
 ))}
 </div>
 </section>

 {/* Try It Out Section */}
 <section className="py-12 px-6 max-w-7xl mx-auto border-b border-gray-700" style={gradientBackground}>
 <AnimatedScroll effect="slideInLeft" triggerPoint={0.3} duration={1000} className="text-center">
 <span className="text-[15px] text-gray-700 block mt-1" aria-label="Animation properties for text tryout scroll">
 effect="slideInLeft" triggerPoint={0.3} duration={1000}
 </span>
 <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
 Try Text Animations
 </h2>
 <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-8">
 Experiment with text animations by entering your own text and selecting an effect to preview in real-time.
 </p>
 <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
 <motion.div className="flex flex-col md:flex-row gap-6 justify-center mb-8" style={{ y: yRange, opacity: opacityRange }}>
 <input
 type="text"
 value={textTryText === 'Text Animations' ? '' : textTryText}
 onChange={handleTextChange}
 placeholder="Enter your text"
 className="px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 outline-none text-lg w-full md:w-96"
 />
 <select
 value={selectedEffect}
 onChange={handleEffectChange}
 className="px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 outline-none text-lg w-full md:w-64"
 >
 {['wave', 'flip', 'ripple', 'holoWave', 'vaporwave', 'neonCircuit'].map((effect) => (
 <option key={effect} value={effect} className="bg-gray-900 text-white">
 {effect
 .replace(/([A-Z])/g, ' $1')
 .trim()
 .replace(/^./, (str) => str.toUpperCase())}
 </option>
 ))}
 </select>
 </motion.div>
 <motion.div
 className="p-6 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center"
 style={{ y: yRange, opacity: opacityRange }}
 >
 <AnimatedText
 effect={selectedEffect}
 duration={Infinity}
 textColor="#ffffff"
 fontSize="text-2xl md:text-3xl"
 glowColor={
 selectedEffect === 'vaporwave'
 ? 'rgba(255, 106, 193, 0.7)'
 : selectedEffect === 'neonCircuit' || selectedEffect === 'holoWave'
 ? 'rgba(255, 106, 193, 0.7)'
 : 'rgba(255, 255, 255, 0.7)'
 }
 className="font-bold tracking-tight"
 >
 {textTryText}
 </AnimatedText>
 </motion.div>
 </AnimatedScroll>
 </section>

 {/* CTA Section */}
 <section className="py-12 px-6 max-w-7xl mx-auto border-b border-gray-700">
 <AnimatedScroll effect="slideInLeft" triggerPoint={0.4} duration={1000} className="text-center">
 <span className="text-[15px] text-gray-700 block mt-1" aria-label="Animation properties for CTA scroll">
 effect="slideInLeft" triggerPoint={0.4} duration={1000}
 </span>
 <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
 Start Animating Text
 </h2>
 <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-8">
 Bring your Next.js projects to life with stunning text animations using `react-animations`. Install via `npm install react-animations` to access our lightweight, TypeScript-friendly library. Check out our documentation or join our community to collaborate and learn.
 </p>
 <hr className="border-gray-700 mb-6 max-w-md mx-auto" />
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
 </AnimatedScroll>
 </section>

 {/* Footer */}
 <Footer />
 </div>
 );
};

export default Text;