'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  duration?: number;
  textColor?: string;
  className?: string;
}

const TypewriterText = ({ text, duration = 2, textColor = 'text-white', className = '' }: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const charDuration = duration * 1000 / text.length;
    intervalRef.current = setInterval(() => {
      setIndex((prev) => {
        if (prev >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return prev;
        }
        return prev + 1;
      });
      setDisplayText(text.slice(0, index + 1));
    }, charDuration);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, duration, index]);

  return (
    <motion.div
      className={`${className} ${textColor} inline-flex`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayText}
      <motion.span
        className="w-[2px] bg-current ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default TypewriterText;