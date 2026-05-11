'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'Expeditions', href: '#expeditions' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Journal', href: '#journal' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = ['expeditions', 'philosophy', 'journal', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 h-[56px] md:h-[60px] transition-all duration-500 ${
          scrolled
            ? 'bg-[#1a2e1a] backdrop-blur-md border-b border-[#2d3d2b]/30'
            : 'bg-transparent'
        }`}
      >
        <div
          className="flex h-full w-full items-center justify-between px-7 sm:px-10"
          style={{ paddingInline: 'clamp(48px, 4.2vw, 86px)' }}
        >
          <a
            href="#"
            className={`font-serif text-base md:text-lg tracking-[0.35em] font-light transition-colors duration-300 ${
              scrolled ? 'text-[#f5f2ed]' : 'text-white'
            }`}
          >
            TROPIC
          </a>

          <div className="hidden md:flex items-center gap-11 lg:gap-14">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-[0.65rem] tracking-[0.22em] uppercase font-light transition-colors duration-300 ${
                  activeSection === link.href.replace('#', '')
                    ? scrolled
                      ? 'text-[#f5f2ed]'
                      : 'text-white'
                    : scrolled
                      ? 'text-[#8a8478] hover:text-[#c4b49a]'
                      : 'text-white/70 hover:text-white'
                } text-xs md:text-[0.72rem]`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-[5px] relative z-[60] w-6"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className={`block h-[1px] w-6 transition-colors ${
                scrolled ? 'bg-[#f5f2ed]' : 'bg-white'
              }`}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className={`block h-[1px] w-6 transition-colors ${
                scrolled ? 'bg-[#f5f2ed]' : 'bg-white'
              }`}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className={`block h-[1px] w-6 transition-colors ${
                scrolled ? 'bg-[#f5f2ed]' : 'bg-white'
              }`}
            />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-[55] bg-[#f5f2ed] flex flex-col items-center justify-center gap-8"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="font-serif text-4xl tracking-[0.1em] text-[#1a2e1a] font-light"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
