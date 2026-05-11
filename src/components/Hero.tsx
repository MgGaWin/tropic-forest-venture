'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { EASE } from '@/lib/constants';
import GodRays from './GodRays';

const titleVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const lineVariants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 1.2, ease: EASE },
  },
};

export default function Hero() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-end overflow-hidden">
      {/* Background Video — slow zoom (disabled for reduced motion) */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay={!prefersReducedMotion}
          muted
          loop
          playsInline
          poster="/images/hero-bg.png"
          preload="metadata"
          className={`absolute inset-0 w-full h-full object-cover ${prefersReducedMotion ? '' : 'scale-105 animate-[slowZoom_20s_ease-in-out_infinite_alternate]'}`}
          src="/images/hero-video.mp4"
        />
      </div>

      {/* Inward gradient mask — vignette + right fade */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 70% at 30% 50%, transparent 0%, rgba(26,46,26,0.4) 100%),
            linear-gradient(to right, transparent 50%, rgba(26,46,26,0.6) 100%),
            linear-gradient(to bottom, transparent 70%, #f5f2ed 100%)
          `,
        }}
      />

      {/* God Rays Effect (hidden for reduced motion) */}
      {!prefersReducedMotion && <GodRays />}

      {/* Content — left aligned */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-8 md:px-16 pb-20 md:pb-32">
        {/* Small label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
          className="text-[0.6rem] tracking-[0.4em] uppercase text-[#c4b49a] mb-8"
        >
          Into the canopy
        </motion.p>

        {/* Main Title — clip reveal */}
        <div className="max-w-[90%] md:max-w-[60%]">
          <motion.h1
            ref={titleRef}
            className="font-serif text-[clamp(3.5rem,9vw,9rem)] leading-[0.85] tracking-tight text-[#f5f2ed] font-extralight"
            variants={titleVariants}
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={prefersReducedMotion ? 'visible' : (titleInView ? 'visible' : 'hidden')}
          >
            <span className="block overflow-hidden">
              <motion.span className="block" variants={lineVariants}>Where</motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span className="block" variants={lineVariants}>the canopy</motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span className="block text-[#c4b49a] font-light italic" variants={lineVariants}>breathes</motion.span>
            </span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: EASE }}
          className="mt-12 text-[0.75rem] tracking-[0.15em] text-[#a69279] max-w-[45ch] leading-relaxed"
        >
          We venture where light filters through ancient canopies,
          <br />
          where silence speaks louder than words.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8, ease: EASE }}
          className="mt-16"
        >
          <motion.a
            href="#expeditions"
            className="inline-flex items-center gap-3 text-[0.7rem] tracking-[0.2em] uppercase text-[#c4b49a] border-b border-[#c4b49a]/30 pb-2 hover:gap-4 transition-all duration-300"
            whileHover={prefersReducedMotion ? undefined : { x: 5, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <span>Explore our world</span>
            <span>&rarr;</span>
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.2, ease: EASE }}
          className="mt-24"
        >
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-start gap-2"
          >
            <span className="text-[0.6rem] tracking-[0.25em] uppercase text-[#8a8478]">
              Scroll
            </span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-[#8a8478] to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
