'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    title: 'Jarne siluety 2026',
    subtitle: 'Editorka vyberu',
    description: 'Minimalisticke strihy, lahke vrstvenie a novinky pre kazdy den.',
    cta: 'Nakupovať teraz',
    link: '/kategoria/novinky',
    bgClass: 'bg-[linear-gradient(135deg,#f8f6f3_0%,#ece7df_45%,#e5ddd2_100%)]',
    accent: 'Nová kolekcia',
  },
  {
    id: 2,
    title: 'Atelier Sale',
    subtitle: 'Limitovana seria cien',
    description: 'Kuratorovany vyber kusov so zlavou az do 50 percent.',
    cta: 'Zobraziť výpredaj',
    link: '/kategoria/vypredaj',
    bgClass: 'bg-[linear-gradient(135deg,#f4f2ef_0%,#e9e6e1_50%,#ddd8d1_100%)]',
    accent: 'Zľavy až -50%',
  },
  {
    id: 3,
    title: 'Kvalita bez kompromisu',
    subtitle: 'Vyrobene pre dlhsi zivot',
    description: 'Nadcasove materialy, presne detaily a premium servis Yvettin.',
    cta: 'Nakupovať',
    link: '/kategoria/zeny',
    bgClass: 'bg-[linear-gradient(135deg,#f6f7f7_0%,#e9ecec_45%,#dee3e4_100%)]',
    accent: 'Doprava zdarma nad 50€',
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[500px] w-full overflow-hidden md:h-[620px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 ${slides[currentSlide].bgClass}`}
        >
          <div className="absolute inset-0 opacity-60">
            <div className="absolute -right-16 top-10 h-56 w-56 rounded-full border border-neutral-900/10" />
            <div className="absolute -left-12 bottom-8 h-40 w-40 rounded-full border border-neutral-900/10" />
          </div>
          <div className="container-custom relative flex h-full items-center justify-center">
            <div className="max-w-3xl text-center">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xs font-medium tracking-[0.34em] text-neutral-600 uppercase"
              >
                {slides[currentSlide].subtitle}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 }}
                className="mx-auto mt-5 w-fit rounded-full border border-neutral-900/20 bg-white/50 px-4 py-1 text-[11px] tracking-[0.2em] text-neutral-700 uppercase"
              >
                {slides[currentSlide].accent}
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-4xl font-medium tracking-wide text-neutral-900 md:text-6xl font-display"
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-neutral-700 md:text-base"
              >
                {slides[currentSlide].description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <Link
                  href={slides[currentSlide].link}
                  className="inline-block border border-neutral-900 bg-neutral-900 px-9 py-3 text-sm font-medium tracking-[0.16em] text-white uppercase transition-colors hover:bg-neutral-800"
                >
                  {slides[currentSlide].cta}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-neutral-400 transition-colors hover:text-neutral-900"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-neutral-400 transition-colors hover:text-neutral-900"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 transition-all ${
              index === currentSlide ? 'w-8 bg-neutral-900' : 'w-1 bg-neutral-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
