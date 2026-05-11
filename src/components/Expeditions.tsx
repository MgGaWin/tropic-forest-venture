'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { EASE } from '@/lib/constants';

const expeditions = [
  {
    title: 'The Cloud Forest',
    location: 'Costa Rica',
    year: '2024',
    description: 'Above the mist, where epiphytes cling to ancient oaks and the air tastes of moss and rain.',
    image: '/images/expedition-cloud.png',
  },
  {
    title: 'Heart of Borneo',
    location: 'Malaysia',
    year: '2023',
    description: 'Three months beneath the densest canopy on Earth. Where orangutans build their nests at dusk.',
    image: '/images/expedition-borneo.png',
  },
  {
    title: 'The Daintree',
    location: 'Australia',
    year: '2023',
    description: 'The oldest continuously surviving rainforest. 180 million years of uninterrupted growth.',
    image: '/images/expedition-daintree.png',
  },
];

function ExpeditionCard({ expedition, index }: { expedition: typeof expeditions[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -1 : 1 }}
      animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.15, ease: EASE }}
      className="group relative"
    >
      {/* Image — clip-path wipe reveal */}
      <motion.div
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        animate={isInView ? { clipPath: 'inset(0% 0 0 0)' } : {}}
        transition={{ duration: 1, delay: index * 0.15 + 0.2, ease: EASE }}
        className="relative aspect-[4/3] overflow-hidden mb-8"
      >
        <motion.img
          src={expedition.image}
          alt={expedition.title}
          loading="lazy"
          initial={{ scale: 1.15 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 1.2, delay: index * 0.15 + 0.2, ease: EASE }}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-[#1a2e1a]/0 group-hover:bg-[#1a2e1a]/20 transition-colors duration-500" />
        {/* Year badge */}
        <div className="absolute top-6 right-6">
          <span className="text-[0.6rem] tracking-[0.2em] text-[#f5f2ed]">
            {expedition.year}
          </span>
        </div>
      </motion.div>

      {/* Content */}
      <div>
        <p className="text-[0.6rem] tracking-[0.25em] uppercase text-[#8a8478] mb-3">
          {expedition.location}
        </p>
        <h3 className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.1] text-[#1c1c1a] font-light mb-4 group-hover:translate-x-1 transition-transform duration-300">
          {expedition.title}
        </h3>
        <p className="text-[0.85rem] leading-relaxed text-[#6b6b63] max-w-[40ch]">
          {expedition.description}
        </p>
        <div className="mt-6">
          <span className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.15em] uppercase text-[#2d3d2b] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-0 group-hover:translate-x-1">
            <span>View expedition</span>
            <span>&rarr;</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Expeditions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="expeditions" className="py-32 md:py-48 px-8 md:px-16 bg-[#eae5dc]" ref={ref}>
      <div className="max-w-[1600px] mx-auto">
        {/* Section header */}
        <div className="mb-20 md:mb-32">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-[0.6rem] tracking-[0.3em] uppercase text-[#8a8478] mb-8"
          >
            Selected Expeditions
          </motion.p>

          <motion.h2
            className="font-serif text-[clamp(2rem,5vw,5rem)] leading-[1] tracking-tight text-[#1c1c1a] font-light"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
          >
            <span className="block overflow-hidden">
              <motion.span className="block" variants={{ hidden: { y: '110%' }, visible: { y: '0%', transition: { duration: 0.8, ease: EASE } } }}>Recent</motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span className="block" variants={{ hidden: { y: '110%' }, visible: { y: '0%', transition: { duration: 0.8, ease: EASE } } }}><em className="text-[#3d5a3a]">journeys</em></motion.span>
            </span>
          </motion.h2>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-5">
            <ExpeditionCard expedition={expeditions[0]} index={0} />
          </div>
          <div className="md:col-span-5 md:col-start-7 md:mt-24">
            <ExpeditionCard expedition={expeditions[1]} index={1} />
          </div>
          <div className="md:col-span-4 md:col-start-2 md:-mt-16">
            <ExpeditionCard expedition={expeditions[2]} index={2} />
          </div>
        </div>
      </div>
    </section>
  );
}
