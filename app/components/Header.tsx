/* src/app/components/Header.tsx */
"use client";

import { useState, useEffect, useRef } from "react";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { Type, Mouse, PenTool, Box, Bot, Origami } from "lucide-react"; // Added Star import
import Link from "next/link";
import { motion, AnimatePresence, Variants, useInView } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import AnimatedSVG from "@/app/components/animations/AnimatedSVG";
import gsap from "gsap";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimationsOpen, setIsAnimationsOpen] = useState(false);
  const desktopPlayLinkRef = useRef<HTMLAnchorElement>(null) as React.RefObject<HTMLAnchorElement>;
  const mobilePlayLinkRef = useRef<HTMLAnchorElement>(null);
  const desktopSvgRef = useRef<SVGSVGElement>(null) as React.RefObject<SVGSVGElement>;
  const mobileSvgRef = useRef<SVGSVGElement>(null) as React.RefObject<SVGSVGElement>;
  const isDesktopInView = useInView(desktopPlayLinkRef, { once: false, amount: 0.5 });
  const isMobileInView = useInView(mobilePlayLinkRef, { once: false, amount: 0.5 });

  const navLinks = [
    { href: "/", label: "Home" },
    {
      href: "/animations",
      label: "Animations",
      subLinks: [
        { href: "/animations/text", label: "Text", icon: Type },
        { href: "/animations/scroll", label: "Scroll", icon: Mouse },
        { href: "/animations/svg", label: "SVG", icon: PenTool },
        { href: "/animations/3d", label: "3D", icon: Box },
        { href: "/animations/premium/3d", label: "Premium 3D", icon: Box },
        { href: "/animations/premium/robot", label: "Robot", icon: Bot },
      ],
    },
    { href: "/docs", label: "Docs" },
    { href: "/community", label: "Community" },
    { href: "/playground", label: "Play" },
  ];

  // Sub-menu animation variants
  const subMenuVariants: Variants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15, ease: "easeIn" } },
  };

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

  // Set SVG dimensions and animate border for Play link
  useEffect(() => {
    const updateSvg = (
      svgRef: React.RefObject<SVGSVGElement>,
      linkRef: React.RefObject<HTMLElement>,
      isInView: boolean
    ) => {
      if (!isInView || !svgRef.current || !linkRef.current) return;

      const rect = svgRef.current.querySelector("rect");
      if (!rect) return;

      const { width, height } = linkRef.current.getBoundingClientRect();
      svgRef.current.setAttribute("width", `${width}`);
      svgRef.current.setAttribute("height", `${height}`);
      rect.setAttribute("width", `${width - 2}`);
      rect.setAttribute("height", `${height - 2}`);

      const perimeter = 2 * (width + height - 4);
      gsap.set(rect, { strokeDasharray: perimeter, strokeDashoffset: perimeter });

      gsap.to(rect, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(rect, {
        filter: "url(#glow)",
        duration: 0.5,
        repeat: -1,
        yoyo: true,
      });
    };

    updateSvg(desktopSvgRef, desktopPlayLinkRef as React.RefObject<HTMLElement>, isDesktopInView);
    updateSvg(mobileSvgRef, mobilePlayLinkRef as React.RefObject<HTMLElement>, isMobileInView);
  }, [isDesktopInView, isMobileInView]);

  return (
    <motion.header
      className="bg-[#1A1A1A] text-white py-4 px-6 sticky top-0 z-50 border-b border-gray-700"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo with Animated Star Icon */}
        <Link href="/" className="flex items-center gap-1">
        <AnimatedSVG
            type="icon"
            effect="iconNeonDraw"
            Icon={Origami}
            strokeColor="#ff6ac1"
            glowColor="rgba(255, 106, 193, 0.7)"
            duration={Infinity}
            delay={0.5}
            className="w-6 h-6"
            width={24}
            height={24}
          />
          <AnimatedSVG
            text="ReAnime"
            effect="neonDraw"
            duration={Infinity}
            textColor="#ffffff"
            strokeColor="#ff6ac1"
            glowColor="rgba(255, 106, 193, 0.7)"
            fontSize="24px"
            fontFamily="Inter, Arial, sans-serif"
            className="font-bold hover:text-purple-500 transition-colors duration-300 tracking-tight"
          />
          
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link, index) => (
            <div
              key={link.href}
              className={`relative ${index < navLinks.length - 1 ? "md:border-r border-gray-700 md:pr-6" : ""}`}
              onMouseEnter={() => link.subLinks && setIsAnimationsOpen(true)}
              onMouseLeave={() => link.subLinks && setIsAnimationsOpen(false)}
            >
              <Link
                href={link.href}
                className={`flex items-center transition-colors duration-200 text-lg ${
                  link.label === "Play"
                    ? "play-link"
                    : "text-gray-400 hover:text-pink-500 focus:text-pink-500"
                }`}
                aria-haspopup={!!link.subLinks}
                aria-expanded={link.subLinks ? isAnimationsOpen : undefined}
                ref={link.label === "Play" ? desktopPlayLinkRef : null}
              >
                {link.label === "Play" ? (
                  <>
                    <svg ref={desktopSvgRef} preserveAspectRatio="none">
                      <defs>
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>
                      <rect
                        x="1"
                        y="1"
                        fill="none"
                        stroke="#ff6ac1"
                        strokeWidth="2"
                      />
                    </svg>
                    <span>{link.label}</span>
                  </>
                ) : (
                  <>
                    {link.label}
                    {link.subLinks && <FiChevronDown className="ml-1" />}
                  </>
                )}
              </Link>
              {link.subLinks && (
                <AnimatePresence>
                  {isAnimationsOpen && (
                    <motion.ul
                      className="absolute top-full left-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg overflow-hidden grid grid-cols-2 gap-0"
                      variants={subMenuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {link.subLinks.map((subLink, subIndex) => (
                        <li
                          key={subLink.href}
                          className={`flex items-center px-2 py-2 ${
                            subIndex < 3 ? "border-b border-gray-700" : ""} ${
                            subIndex % 3 === 0 || subIndex % 3 === 1 ? "border-r border-gray-700" : ""
                          }`}
                        >
                          <Link
                            href={subLink.href}
                            className="flex items-center w-full text-gray-400 hover:text-pink-500 focus:text-pink-500 transition-colors duration-200 text-base"
                            onClick={() => setIsAnimationsOpen(false)}
                          >
                            {subLink.icon && (
                              <AnimatedSVG
                                type="icon"
                                effect="iconNeonDraw"
                                Icon={subLink.icon}
                                strokeColor="#ff6ac1"
                                glowColor="rgba(255, 106, 193, 0.7)"
                                duration={Infinity}
                                delay={0.0}
                                className="w-5 h-5 mr-2 shrink-0"
                                width={16}
                                height={16}
                              />
                            )}
                            <span>{subLink.label}</span>
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-gray-400 hover:text-pink-500 focus:text-pink-500 transition-colors duration-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="md:hidden mt-4 flex flex-col space-y-4 bg-gray-800 border-t border-gray-700 py-4 px-6 rounded-b-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, index) => (
              <div key={link.href} className={index < navLinks.length - 1 ? "border-b border-gray-700 pb-4" : ""}>
                {link.subLinks ? (
                  <div>
                    <button
                      className="flex items-center text-lg text-gray-400 hover:text-pink-500 focus:text-pink-500 transition-colors duration-200 w-full text-left"
                      onClick={() => setIsAnimationsOpen(!isAnimationsOpen)}
                      aria-expanded={isAnimationsOpen}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <FiChevronDown className="ml-2" />
                    </button>
                    <AnimatePresence>
                      {isAnimationsOpen && (
                        <motion.ul
                          className="pl-4 mt-2 grid grid-cols-2 gap-0"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {link.subLinks.map((subLink, subIndex) => (
                            <li
                              key={subLink.href}
                              className={`flex items-center py-1.5 ${
                                subIndex < 3 ? "border-b border-gray-700" : ""} ${
                                subIndex % 3 === 0 || subIndex % 3 === 1 ? "border-r border-gray-700" : ""
                              }`}
                            >
                              <Link
                                href={subLink.href}
                                className="flex items-center text-base text-gray-400 hover:text-pink-500 focus:text-pink-500 transition-colors duration-200 w-full"
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setIsAnimationsOpen(false);
                                }}
                              >
                                {subLink.icon && (
                                  <AnimatedSVG
                                    type="icon"
                                    effect="iconNeonDraw"
                                    Icon={subLink.icon}
                                    strokeColor="#ff6ac1"
                                    glowColor="rgba(255, 106, 193, 0.7)"
                                    duration={Infinity}
                                    delay={0.5}
                                    className="w-4 h-4 mr-2 shrink-0"
                                    width={14}
                                    height={14}
                                  />
                                )}
                                <span>{subLink.label}</span>
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={`text-lg transition-colors duration-200 ${
                      link.label === "Play"
                        ? "play-link"
                        : "text-gray-400 hover:text-pink-500 focus:text-pink-500"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    ref={link.label === "Play" ? mobilePlayLinkRef : null}
                  >
                    {link.label === "Play" ? (
                      <>
                        <svg ref={mobileSvgRef} preserveAspectRatio="none">
                          <defs>
                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                              <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                              </feMerge>
                            </filter>
                          </defs>
                          <rect
                            x="1"
                            y="1"
                            fill="none"
                            stroke="#ff6ac1"
                            strokeWidth="2"
                          />
                        </svg>
                        <span>{link.label}</span>
                      </>
                    ) : (
                      link.label
                    )}
                  </Link>
                )}
              </div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;