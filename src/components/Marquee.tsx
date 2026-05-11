'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface MarqueeProps {
  items: string[];
  speed?: number;
  reverse?: boolean;
  className?: string;
}

export default function Marquee({ items, speed = 30, reverse = false, className = '' }: MarqueeProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const content = items.join(' · ');
  const repeated = `${content} · ${content} · `;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1, ease: 'easeOut' }}
      className={`overflow-hidden py-8 md:py-12 ${className}`}
    >
      <div
        className="flex whitespace-nowrap"
        style={{
          width: 'max-content',
          animation: `marquee ${speed}s linear infinite ${reverse ? 'reverse' : 'normal'}`,
        }}
      >
        <span className="font-serif text-[clamp(2rem,5vw,5rem)] leading-none tracking-tight font-light text-[#2d3d2b]/[0.08] px-4">
          {repeated}
        </span>
        <span className="font-serif text-[clamp(2rem,5vw,5rem)] leading-none tracking-tight font-light text-[#2d3d2b]/[0.08] px-4">
          {repeated}
        </span>
      </div>
    </motion.div>
  );
}
