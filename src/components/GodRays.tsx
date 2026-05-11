'use client';

import { motion } from 'framer-motion';

export default function GodRays() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Ray 1 - Left diagonal */}
      <motion.div
        className="absolute top-0 left-[10%] w-[200px] h-[120%] opacity-0"
        style={{
          background: 'linear-gradient(165deg, rgba(245,242,237,0.15) 0%, transparent 50%)',
          transform: 'rotate(-15deg)',
          transformOrigin: 'top left',
        }}
        animate={{
          opacity: [0, 0.08, 0.04, 0.08, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Ray 2 - Center */}
      <motion.div
        className="absolute top-0 left-[40%] w-[300px] h-[120%] opacity-0"
        style={{
          background: 'linear-gradient(170deg, rgba(245,242,237,0.12) 0%, transparent 45%)',
          transform: 'rotate(-10deg)',
          transformOrigin: 'top center',
        }}
        animate={{
          opacity: [0, 0.06, 0.03, 0.06, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Ray 3 - Right */}
      <motion.div
        className="absolute top-0 right-[15%] w-[250px] h-[120%] opacity-0"
        style={{
          background: 'linear-gradient(175deg, rgba(245,242,237,0.1) 0%, transparent 40%)',
          transform: 'rotate(-12deg)',
          transformOrigin: 'top right',
        }}
        animate={{
          opacity: [0, 0.05, 0.02, 0.05, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />
    </div>
  );
}
