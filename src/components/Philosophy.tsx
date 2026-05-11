'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { EASE } from '@/lib/constants';

export default function Philosophy() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const imageRef = useRef(null);

  // Parallax for image
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="philosophy" className="py-32 md:py-48 px-8 md:px-16" ref={ref}>
      <div className="max-w-[1600px] mx-auto">
        {/* Decorative divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: '4rem' } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="h-[1px] bg-[#c4b49a]/40 mb-20 md:mb-32"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-start">
          {/* Left — Text, slides in from left */}
          <div className="md:sticky md:top-32">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-[0.6rem] tracking-[0.3em] uppercase text-[#8a8478] mb-8"
            >
              Our Philosophy
            </motion.p>

            <motion.h2
              className="font-serif text-[clamp(2rem,4vw,4rem)] leading-[1.1] tracking-tight text-[#1c1c1a] font-light mb-12"
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
            >
              <span className="block overflow-hidden">
                <motion.span className="block" variants={{ hidden: { y: '110%' }, visible: { y: '0%', transition: { duration: 0.8, ease: EASE } } }}>We don&apos;t explore</motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span className="block" variants={{ hidden: { y: '110%' }, visible: { y: '0%', transition: { duration: 0.8, ease: EASE } } }}>to conquer.</motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span className="block" variants={{ hidden: { y: '110%' }, visible: { y: '0%', transition: { duration: 0.8, ease: EASE } } }}>We explore</motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span className="block" variants={{ hidden: { y: '110%' }, visible: { y: '0%', transition: { duration: 0.8, ease: EASE } } }}>to <em className="text-[#3d5a3a]">understand</em>.</motion.span>
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
              className="space-y-6"
            >
              <p className="text-[0.9rem] leading-relaxed text-[#3d3d38] max-w-[50ch]">
                Every expedition begins with humility. The forest
                has existed for millennia — we are merely guests
                in its cathedral of light and shadow.
              </p>
              <p className="text-[0.9rem] leading-relaxed text-[#6b6b63] max-w-[50ch]">
                Our approach is one of quiet observation,
                of listening to the language of leaves
                and the stories told by ancient bark.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
              className="mt-12"
            >
              <a
                href="#expeditions"
                className="inline-flex items-center gap-3 text-[0.7rem] tracking-[0.2em] uppercase text-[#2d3d2b] group"
              >
                <span>Our expeditions</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  &rarr;
                </span>
              </a>
            </motion.div>
          </div>

          {/* Right — Image with clip-path wipe reveal */}
          <motion.div
            ref={imageRef}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={isInView ? { clipPath: 'inset(0 0 0% 0)' } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
            className="relative aspect-[3/4] overflow-hidden"
          >
            <motion.img
              src="/images/philosophy-tree.png"
              alt="Ancient tree trunk in tropical rainforest"
              loading="lazy"
              initial={{ scale: 1.15 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ y: imageY }}
            />
            {/* Caption */}
            <div className="absolute bottom-8 left-8">
              <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[#f5f2ed]">
                Borneo, 2024
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
