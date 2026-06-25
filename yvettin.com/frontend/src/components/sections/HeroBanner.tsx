'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
  image: string;
  badge?: string;
  gender: 'women' | 'men' | 'mixed';
}

interface HeroBannerProps {
  slides: HeroSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  className?: string;
}

export default function HeroBanner({
  slides,
  autoPlay = true,
  autoPlayInterval = 6000,
  showIndicators = true,
  showArrows = true,
  className,
}: HeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  // Auto-play logic
  useEffect(() => {
    if (!autoPlay || isPaused || slides.length <= 1) return;

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + 100 / (autoPlayInterval / 100);
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [autoPlay, isPaused, autoPlayInterval, nextSlide, slides.length]);

  const slide = slides[currentSlide];

  // Dynamic styles based on gender
  const getGenderStyles = (gender: string) => {
    switch (gender) {
      case 'women':
        return {
          gradient: 'bg-gradient-to-r from-pink-50/80 via-white to-neutral-50',
          accent: 'text-pink-500',
          badge: 'bg-pink-500',
          buttonSecondary: 'border-pink-500 text-pink-500 hover:bg-pink-50',
        };
      case 'men':
        return {
          gradient: 'bg-gradient-to-r from-blue-50/80 via-white to-neutral-50',
          accent: 'text-blue-500',
          badge: 'bg-blue-500',
          buttonSecondary: 'border-blue-500 text-blue-500 hover:bg-blue-50',
        };
      default:
        return {
          gradient: 'bg-gradient-to-r from-neutral-50 via-white to-neutral-50',
          accent: 'text-neutral-900',
          badge: 'bg-neutral-900',
          buttonSecondary: 'border-neutral-900 text-neutral-900 hover:bg-neutral-100',
        };
    }
  };

  const styles = getGenderStyles(slide.gender);

  return (
    <section
      className={cn(
        'relative h-[680px] flex items-center overflow-hidden',
        styles.gradient,
        className
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Progress Bar */}
      {autoPlay && showIndicators && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-200/50 z-20">
          <motion.div
            className={cn('h-full', styles.badge)}
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>
      )}

      <div className="container-custom relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
          >
            {/* Text Content */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              {/* Badge */}
              {slide.badge && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0 }}
                  className="mb-4 md:mb-6"
                >
                  <span
                    className={cn(
                      'inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-medium tracking-wider uppercase',
                      styles.badge
                    )}
                  >
                    {slide.badge}
                  </span>
                </motion.div>
              )}

              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <span className="inline-block text-xs md:text-sm font-medium tracking-[0.3em] text-neutral-500 mb-3 md:mb-4">
                  {slide.subtitle}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight text-neutral-900 mb-4 md:mb-6"
              >
                {slide.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className="text-base md:text-lg text-neutral-600 max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed"
              >
                {slide.description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link href={slide.ctaLink}>
                  <Button
                    size="lg"
                    className="h-12 md:h-14 px-8 md:px-12 text-sm md:text-base bg-neutral-900 hover:bg-neutral-800 transition-all duration-300 group"
                  >
                    {slide.ctaText}
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                {slide.ctaSecondaryText && slide.ctaSecondaryLink && (
                  <Link href={slide.ctaSecondaryLink}>
                    <Button
                      size="lg"
                      variant="outline"
                      className={cn(
                        'h-12 md:h-14 px-8 md:px-12 text-sm md:text-base transition-all duration-300',
                        styles.buttonSecondary
                      )}
                    >
                      {slide.ctaSecondaryText}
                    </Button>
                  </Link>
                )}
              </motion.div>
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                className="relative aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] overflow-hidden rounded-lg"
              >
                {/* Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                {/* Decorative Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6, type: 'spring' }}
                  className="absolute -bottom-2 -right-2 md:bottom-6 md:right-6 w-20 h-20 md:w-28 md:h-28 bg-white rounded-full flex items-center justify-center shadow-lg"
                >
                  <div className="text-center">
                    <span className="block text-[10px] md:text-xs text-neutral-500 uppercase tracking-wider">
                      Nová
                    </span>
                    <span className="block text-sm md:text-lg font-medium text-neutral-900">
                      Kolekcia
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {showArrows && slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center transition-all duration-200 hover:bg-white hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            aria-label="Predchádzajúci slide"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-neutral-900" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center transition-all duration-200 hover:bg-white hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            aria-label="Ďalší slide"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-neutral-900" />
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && slides.length > 1 && (
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'h-2 rounded-full transition-all duration-300 focus:outline-none',
                currentSlide === index
                  ? 'w-8 bg-neutral-900'
                  : 'w-2 bg-neutral-300 hover:bg-neutral-400'
              )}
              aria-label={`Prejsť na slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Slide Counter */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 md:bottom-10 right-4 md:right-8 z-20 hidden md:block">
          <span className="text-sm text-neutral-500 font-medium">
            {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>
      )}
    </section>
  );
}

// Export types for use in other files
export type { HeroSlide, HeroBannerProps };
