'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { EASE } from '@/lib/constants';

const entries = [
  {
    title: 'The Language of Moss',
    category: 'Field Notes',
    date: 'March 2024',
    excerpt: 'In the silence of the cloud forest, moss teaches patience. It grows where others cannot — on stone, on shadow, on the edge of possibility.',
    image: '/images/journal-moss.png',
  },
  {
    title: 'Listening to Canopy',
    category: 'Reflections',
    date: 'February 2024',
    excerpt: 'Sound travels differently through layers of leaves. A bird call becomes a whisper. Rain becomes percussion.',
    image: '/images/journal-canopy.png',
  },
  {
    title: 'Root Systems',
    category: 'Research',
    date: 'January 2024',
    excerpt: 'Beneath the forest floor lies a network older than civilization. Trees communicate through mycelium — a wood wide web of ancient wisdom.',
    image: '/images/journal-roots.png',
  },
];

export default function Journal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="journal" className="py-32 md:py-48 px-8 md:px-16" ref={ref}>
      <div className="max-w-[1600px] mx-auto">
        {/* Section header */}
        <div className="mb-20 md:mb-32 max-w-[800px]">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-[0.6rem] tracking-[0.3em] uppercase text-[#8a8478] mb-8"
          >
            From the Field
          </motion.p>

          <motion.h2
            className="font-serif text-[clamp(2rem,5vw,5rem)] leading-[1] tracking-tight text-[#1c1c1a] font-light"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
          >
            <span className="block overflow-hidden">
              <motion.span className="block" variants={{ hidden: { y: '110%' }, visible: { y: '0%', transition: { duration: 0.8, ease: EASE } } }}>Journal</motion.span>
            </span>
          </motion.h2>
        </div>

        {/* Hero article — full width with text overlay */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="group relative mb-16 md:mb-24"
        >
          <motion.div
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
            className="relative aspect-[21/9] md:aspect-[3/1] overflow-hidden"
          >
            <motion.img
              src={entries[0].image}
              alt={entries[0].title}
              loading="lazy"
              initial={{ scale: 1.1 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1a]/80 via-[#1a2e1a]/20 to-transparent" />
            {/* Content overlay */}
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 max-w-[600px]">
              <span className="text-[0.55rem] tracking-[0.2em] uppercase text-[#c4b49a] mb-3 block">
                {entries[0].category} — {entries[0].date}
              </span>
              <h3 className="font-serif text-[clamp(1.5rem,3vw,3rem)] leading-[1.1] text-[#f5f2ed] font-light mb-4">
                {entries[0].title}
              </h3>
              <p className="text-[0.85rem] leading-relaxed text-[#f5f2ed]/70 max-w-[45ch] hidden md:block">
                {entries[0].excerpt}
              </p>
            </div>
          </motion.div>
        </motion.article>

        {/* Smaller articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {entries.slice(1).map((entry, i) => (
            <motion.article
              key={entry.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.15, ease: EASE }}
              className="group"
            >
              {/* Image — wipe reveal */}
              <motion.div
                initial={{ clipPath: 'inset(0 0 100% 0)' }}
                animate={isInView ? { clipPath: 'inset(0 0 0% 0)' } : {}}
                transition={{ duration: 1, delay: 0.6 + i * 0.15, ease: EASE }}
                className="relative aspect-[3/2] overflow-hidden mb-8"
              >
                <motion.img
                  src={entry.image}
                  alt={entry.title}
                  loading="lazy"
                  initial={{ scale: 1.15 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.6 + i * 0.15, ease: EASE }}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="text-[0.55rem] tracking-[0.2em] uppercase text-[#f5f2ed] bg-[#1a2e1a]/50 px-3 py-1.5 backdrop-blur-sm">
                    {entry.category}
                  </span>
                </div>
              </motion.div>

              {/* Content */}
              <div>
                <p className="text-[0.6rem] tracking-[0.2em] text-[#8a8478] mb-3">
                  {entry.date}
                </p>
                <h3 className="font-serif text-[clamp(1.2rem,2vw,1.8rem)] leading-[1.2] text-[#1c1c1a] font-light mb-4 group-hover:text-[#2d3d2b] transition-colors duration-300">
                  {entry.title}
                </h3>
                <p className="text-[0.85rem] leading-relaxed text-[#6b6b63]">
                  {entry.excerpt}
                </p>
                <div className="mt-6">
                  <span className="text-[0.7rem] tracking-[0.15em] uppercase text-[#2d3d2b] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Read more &rarr;
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
