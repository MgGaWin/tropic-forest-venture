'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { EASE } from '@/lib/constants';

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <footer className="py-16 md:py-24 px-8 md:px-16 bg-[#1a2e1a] border-t border-[#2d3d2b]/30" ref={ref}>
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="md:col-span-2"
          >
            <span className="font-serif text-xl tracking-[0.15em] uppercase text-[#f5f2ed]">
              Tropic
            </span>
            <p className="mt-4 text-[0.8rem] leading-relaxed text-[#6b6b63] max-w-[35ch]">
              Into the canopy, where silence speaks
              and ancient trees hold wisdom older than words.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          >
            <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[#8a8478] mb-6">
              Explore
            </p>
            <ul className="space-y-3">
              {['Expeditions', 'Philosophy', 'Journal', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-[0.8rem] text-[#a69279] hover:text-[#c4b49a] transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
          >
            <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[#8a8478] mb-6">
              Follow
            </p>
            <ul className="space-y-3">
              {['Instagram', 'Behance', 'Vimeo'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[0.8rem] text-[#a69279] hover:text-[#c4b49a] transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
          className="mt-16 pt-8 border-t border-[#2d3d2b]/30 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-[0.7rem] text-[#6b6b63]">
            &copy; {new Date().getFullYear()} Tropic Forest Venture. All rights reserved.
          </p>
          <p className="text-[0.7rem] text-[#6b6b63]">
            Crafted with reverence for the wild
          </p>
        </motion.div>

        {/* Decorative brand statement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.8, ease: EASE }}
          className="mt-24 overflow-hidden"
        >
          <p className="font-serif text-[clamp(3rem,8vw,8rem)] leading-[0.9] tracking-tight text-[#2d3d2b]/20 font-light text-center">
            Into the canopy
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
