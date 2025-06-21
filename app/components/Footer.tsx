'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const Footer: React.FC = () => {
  const linkSections = [
    {
      title: 'Project',
      ariaLabel: 'Project Navigation',
      links: [
        { href: '/', label: 'Home' },
        { href: '/animations', label: 'Animations' },
        { href: '/docs', label: 'Docs' },
        { href: '/examples', label: 'Examples' },
        { href: '/faq', label: 'FAQ' },
      ],
    },
    {
      title: 'Resources',
      ariaLabel: 'Resources Navigation',
      links: [
        { href: 'https://github.com/your-repo/react-animations', label: 'GitHub', external: true },
        { href: 'https://www.npmjs.com/package/react-animations', label: 'NPM', external: true },
        { href: 'https://www.framer.com/motion/', label: 'Framer Motion', external: true },
        { href: 'https://lenis.studiofreight.com/', label: 'Lenis', external: true },
      ],
    },
    {
      title: 'Community',
      ariaLabel: 'Community Navigation',
      links: [
        { href: 'https://twitter.com', label: 'Twitter', external: true },
        { href: 'https://discord.com', label: 'Discord', external: true },
        { href: 'https://stackoverflow.com', label: 'Stack Overflow', external: true },
        { href: 'https://reddit.com', label: 'Reddit', external: true },
      ],
    },
    {
      title: 'Support',
      ariaLabel: 'Support Navigation',
      links: [
        { href: 'mailto:support@react-animations.com', label: 'Email', external: true },
        { href: 'https://github.com/your-repo/react-animations/issues', label: 'Issues', external: true },
        { href: 'https://forum.react-animations.com', label: 'Forum', external: true },
        { href: '/blog', label: 'Blog' },
      ],
    },
  ];

  return (
    <footer className="py-8 px-6 text-center text-gray-400 border-t border-gray-700 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
          {linkSections.map((section, index) => (
            <nav
              key={section.title}
              role="navigation"
              aria-label={section.ariaLabel}
              className={`flex flex-col items-center md:items-start ${index < linkSections.length - 1 ? 'md:border-r border-gray-700 md:pr-6' : ''}`}
            >
              <h3 className="text-sm font-semibold text-gray-400 mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-400 hover:text-pink-500 transition-colors duration-200"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-gray-400 hover:text-pink-500 transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      )}
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <p className="text-sm">Copyright © 2025 React Animations. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;