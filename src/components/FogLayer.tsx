'use client';

import { motion } from 'framer-motion';

export default function FogLayer() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Fog Layer 1 - Slow drift right */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 50%, rgba(245, 242, 237, 0.8) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 80% 30%, rgba(234, 229, 220, 0.6) 0%, transparent 60%)
          `,
        }}
        animate={{
          x: [0, 100, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Fog Layer 2 - Slow drift left */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 70% 60%, rgba(232, 220, 200, 0.7) 0%, transparent 65%),
            radial-gradient(ellipse 50% 30% at 30% 80%, rgba(212, 206, 195, 0.5) 0%, transparent 55%)
          `,
        }}
        animate={{
          x: [0, -80, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Fog Layer 3 - Vertical drift */}
      <motion.div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          background: `
            radial-gradient(ellipse 90% 40% at 50% 80%, rgba(245, 242, 237, 0.9) 0%, transparent 60%)
          `,
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0.015, 0.025, 0.015],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
