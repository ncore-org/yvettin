'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface BannerSlide {
  id: string;
  image: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

interface CategoryBannerSliderProps {
  slides: BannerSlide[];
  autoPlayInterval?: number; // in milliseconds, default 15000 (15s)
}

export default function CategoryBannerSlider({
  slides,
  autoPlayInterval = 15000,
}: CategoryBannerSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, [slides.length]);

  // Auto-play with progress
  useEffect(() => {
    if (isPaused) return;

    const startTime = Date.now();
    const startProgress = progress;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed / autoPlayInterval) * 100;

      if (newProgress >= 100) {
        nextSlide();
      } else {
        setProgress(newProgress);
        requestAnimationFrame(animate);
      }
    };

    const animationFrame = requestAnimationFrame(animate);
    const timeout = setTimeout(() => {
      nextSlide();
    }, autoPlayInterval - (progress / 100) * autoPlayInterval);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timeout);
    };
  }, [currentSlide, isPaused, progress, autoPlayInterval, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  if (!slides || slides.length === 0) return null;

  return (
    <div
      className="relative w-full overflow-hidden bg-neutral-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <div className="relative aspect-[21/9] md:aspect-[21/7] lg:aspect-[21/6]">
        <AnimatePresence initial={false} custom={currentSlide}>
          <motion.div
            key={currentSlide}
            custom={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <div
              className="relative w-full h-full"
              style={{
                backgroundImage: `url(${slides[currentSlide].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
              
              {/* Content overlay */}
              {(slides[currentSlide].title || slides[currentSlide].subtitle) && (
                <div className="absolute inset-0 flex items-center">
                  <div className="container-custom py-8 md:py-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="max-w-xl text-white"
                    >
                      {slides[currentSlide].subtitle && (
                        <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-white/90 mb-2">
                          {slides[currentSlide].subtitle}
                        </p>
                      )}
                      {slides[currentSlide].title && (
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                          {slides[currentSlide].title}
                        </h2>
                      )}
                      {slides[currentSlide].ctaText && slides[currentSlide].ctaLink && (
                        <Button
                          asChild
                          className="mt-6 h-11 md:h-12 px-6 md:px-8 bg-white text-neutral-900 hover:bg-neutral-100 font-medium rounded-full"
                        >
                          <a href={slides[currentSlide].ctaLink}>
                            {slides[currentSlide].ctaText}
                          </a>
                        </Button>
                      )}
                    </motion.div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
          </>
        )}
      </div>

      {/* Progress Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative w-8 md:w-10 h-1.5 rounded-full overflow-hidden bg-white/30 hover:bg-white/50 transition-colors"
              tabIndex={-1}
            >
              <motion.div
                className={cn(
                  "absolute inset-y-0 left-0 rounded-full",
                  index === currentSlide ? "bg-white" : "bg-white/60"
                )}
                initial={{ width: index < currentSlide ? '100%' : '0%' }}
                animate={{
                  width: index === currentSlide && !isPaused ? '100%' : (index < currentSlide ? '100%' : '0%')
                }}
                transition={{ duration: 0 }}
              />
              {index === currentSlide && !isPaused && (
                <motion.div
                  className="absolute inset-y-0 left-0 bg-white rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: autoPlayInterval / 1000, ease: 'linear' }}
                  key={`progress-${currentSlide}`}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
