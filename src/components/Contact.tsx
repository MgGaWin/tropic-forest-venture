'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useState, useRef, useEffect, useCallback } from 'react';
import { EASE } from '@/lib/constants';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          'error-callback'?: () => void;
          theme?: string;
          size?: string;
        }
      ) => string;
      remove: (widgetId: string) => void;
    };
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const scriptLoadedRef = useRef(false);
  const showCaptchaRef = useRef(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const checkFields = useCallback(() => {
    if (!formRef.current) return;
    const name = (formRef.current.elements.namedItem('name') as HTMLInputElement)?.value.trim();
    const email = (formRef.current.elements.namedItem('email') as HTMLInputElement)?.value.trim();
    const message = (formRef.current.elements.namedItem('message') as HTMLTextAreaElement)?.value.trim();
    if (name && email && message && !showCaptchaRef.current) {
      showCaptchaRef.current = true;
      setShowCaptcha(true);
    }
  }, []);

  // Load Turnstile script once
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || scriptLoadedRef.current) return;
    scriptLoadedRef.current = true;

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // Clean up widget if mounted
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      scriptLoadedRef.current = false;
    };
  }, []);

  // Render widget when showCaptcha becomes true
  useEffect(() => {
    if (!showCaptcha || !TURNSTILE_SITE_KEY) return;

    const renderWidget = () => {
      if (!window.turnstile || !turnstileRef.current || widgetIdRef.current) return;
      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token: string) => setCaptchaToken(token),
        'error-callback': () => setCaptchaToken(null),
        theme: 'light',
        size: 'normal',
      });
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      const check = setInterval(() => {
        if (window.turnstile) {
          clearInterval(check);
          renderWidget();
        }
      }, 100);
      return () => clearInterval(check);
    }
  }, [showCaptcha]);

  const resetCaptcha = () => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    }
    setCaptchaToken(null);
    showCaptchaRef.current = false;
    setShowCaptcha(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (TURNSTILE_SITE_KEY && !captchaToken) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('sending');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      token: captchaToken,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to send');

      setStatus('sent');
      formRef.current?.reset();
      resetCaptcha();
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const buttonText = {
    idle: 'Send Message',
    sending: 'Sending...',
    sent: 'Message Sent',
    error: 'Failed — Try Again',
  };

  return (
    <section id="contact" className="py-32 md:py-48 px-8 md:px-16 bg-[#1a2e1a]" ref={ref}>
      <div className="max-w-[1600px] mx-auto">
        {/* Decorative divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: '4rem' } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="h-[1px] bg-[#c4b49a]/40 mb-20 md:mb-32"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          {/* Left — Content */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -15 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-[0.6rem] tracking-[0.3em] uppercase text-[#8a8478] mb-8"
            >
              Get in Touch
            </motion.p>

            <motion.h2
              className="font-serif text-[clamp(2rem,4vw,4rem)] leading-[1.1] tracking-tight text-[#f5f2ed] font-light mb-12"
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
            >
              <span className="block overflow-hidden">
                <motion.span className="block" variants={{ hidden: { y: '110%' }, visible: { y: '0%', transition: { duration: 0.8, ease: EASE } } }}>Every great</motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span className="block" variants={{ hidden: { y: '110%' }, visible: { y: '0%', transition: { duration: 0.8, ease: EASE } } }}>expedition begins</motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span className="block" variants={{ hidden: { y: '110%' }, visible: { y: '0%', transition: { duration: 0.8, ease: EASE } } }}>with a <em className="text-[#c4b49a]">conversation</em>.</motion.span>
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
              className="space-y-8"
            >
              <div>
                <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[#8a8478] mb-2">
                  Email
                </p>
                <a
                  href="mailto:hello@tropicforestventure.com"
                  className="text-[0.9rem] text-[#c4b49a] hover:text-[#f5f2ed] transition-colors duration-300"
                >
                  hello@tropicforestventure.com
                </a>
              </div>

              <div>
                <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[#8a8478] mb-2">
                  Location
                </p>
                <p className="text-[0.9rem] text-[#a69279]">
                  Based in the canopy
                  <br />
                  Roaming worldwide
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right — Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
            className="space-y-8"
          >
            <div>
              <label htmlFor="contact-name" className="block text-[0.6rem] tracking-[0.2em] uppercase text-[#8a8478] mb-3">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Your name"
                required
                disabled={status === 'sending'}
                onChange={checkFields}
                className="w-full bg-transparent border-b border-[#3d5a3a]/30 pb-3 text-[0.9rem] text-[#f5f2ed] placeholder:text-[#6b6b63] focus:border-[#c4b49a] focus:border-b-[1.5px] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c4b49a]/50 transition-all duration-300 disabled:opacity-50"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-[0.6rem] tracking-[0.2em] uppercase text-[#8a8478] mb-3">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                disabled={status === 'sending'}
                onChange={checkFields}
                className="w-full bg-transparent border-b border-[#3d5a3a]/30 pb-3 text-[0.9rem] text-[#f5f2ed] placeholder:text-[#6b6b63] focus:border-[#c4b49a] focus:border-b-[1.5px] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c4b49a]/50 transition-all duration-300 disabled:opacity-50"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-[0.6rem] tracking-[0.2em] uppercase text-[#8a8478] mb-3">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Tell us about your expedition..."
                rows={4}
                required
                disabled={status === 'sending'}
                onChange={checkFields}
                className="w-full bg-transparent border-b border-[#3d5a3a]/30 pb-3 text-[0.9rem] text-[#f5f2ed] placeholder:text-[#6b6b63] focus:border-[#c4b49a] focus:border-b-[1.5px] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c4b49a]/50 transition-all duration-300 resize-none disabled:opacity-50"
              />
            </div>

            {/* Cloudflare Turnstile — shows after all fields filled */}
            <AnimatePresence>
              {showCaptcha && TURNSTILE_SITE_KEY && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div ref={turnstileRef} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* ARIA live region for form status */}
            <div aria-live="polite" aria-atomic="true" className="sr-only">
              {status === 'sent' && 'Message sent successfully.'}
              {status === 'error' && 'Failed to send message. Please try again.'}
            </div>

            <motion.button
              type="submit"
              disabled={status === 'sending'}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="mt-4 px-8 py-3 border border-[#c4b49a]/30 text-[0.7rem] tracking-[0.2em] uppercase text-[#c4b49a] hover:bg-[#c4b49a] hover:text-[#1a2e1a] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {buttonText[status]}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
