'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const leaves = [
  { x: '5%', y: '20%', size: 40, delay: 0, speed: 0.15 },
  { x: '85%', y: '35%', size: 35, delay: 1, speed: 0.12 },
  { x: '15%', y: '60%', size: 30, delay: 2, speed: 0.18 },
  { x: '75%', y: '75%', size: 45, delay: 0.5, speed: 0.1 },
  { x: '45%', y: '10%', size: 25, delay: 1.5, speed: 0.2 },
  { x: '90%', y: '50%', size: 38, delay: 3, speed: 0.14 },
];

function Leaf({ x, y, size, delay, speed }: typeof leaves[0]) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -200 * speed]);

  return (
    <motion.div
      ref={ref}
      className="absolute pointer-events-none"
      style={{
        left: x,
        top: y,
        y: yOffset,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.06 }}
      transition={{ delay: delay, duration: 2 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 5C50 5 20 30 15 60C10 90 30 95 50 95C70 95 90 90 85 60C80 30 50 5 50 5Z"
          fill="currentColor"
          className="text-[#3d5a3a]"
        />
        <path
          d="M50 15V85"
          stroke="currentColor"
          strokeWidth="1"
          className="text-[#2d3d2b]"
          opacity="0.5"
        />
        <path
          d="M50 30C40 40 30 50 25 55"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-[#2d3d2b]"
          opacity="0.3"
        />
        <path
          d="M50 40C60 50 70 55 75 58"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-[#2d3d2b]"
          opacity="0.3"
        />
      </svg>
    </motion.div>
  );
}

export default function FloatingLeaves() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {leaves.map((leaf, i) => (
        <Leaf key={i} {...leaf} />
      ))}
    </div>
  );
}
