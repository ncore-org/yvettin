'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Brand data
const brands = [
  { name: 'Nike', id: 'nike', logo: 'NIKE' },
  { name: 'Adidas', id: 'adidas', logo: 'ADIDAS' },
  { name: 'Tommy Hilfiger', id: 'tommy', logo: 'TOMMY' },
  { name: "Levi's", id: 'levis', logo: "LEVI'S" },
  { name: 'Calvin Klein', id: 'ck', logo: 'CK' },
  { name: 'Ralph Lauren', id: 'ralph', logo: 'POLO' },
  { name: 'Zara', id: 'zara', logo: 'ZARA' },
  { name: 'H&M', id: 'hm', logo: 'H&M' },
  { name: 'Bershka', id: 'bershka', logo: 'BERSHKA' },
  { name: 'Pull&Bear', id: 'pullbear', logo: 'P&B' },
  { name: 'Mango', id: 'mango', logo: 'MANGO' },
  { name: 'Stradivarius', id: 'stradivarius', logo: 'STRAD' },
];

interface BrandsCarouselProps {
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function BrandsCarousel({
  className,
  autoPlay = true,
  autoPlayInterval = 3000,
}: BrandsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const itemsPerPage = 6;

  const maxIndex = Math.ceil(brands.length / itemsPerPage) - 1;

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, isPaused, autoPlayInterval, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  const visibleBrands = brands.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <div
      className={cn('relative', className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white shadow-md border border-neutral-200"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white shadow-md border border-neutral-200"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>

      {/* Carousel Content */}
      <div className="overflow-hidden px-12 md:px-16">
        <AnimatePresence initial={false} custom={currentIndex}>
          <motion.div
            key={currentIndex}
            custom={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6"
          >
            {visibleBrands.map(brand => (
              <div
                key={brand.id}
                className="flex items-center justify-center p-4 md:p-6 rounded-xl border border-neutral-100 bg-white hover:border-neutral-300 hover:shadow-md transition-all cursor-pointer group"
              >
                <span className="text-sm md:text-base font-medium text-neutral-400 group-hover:text-neutral-900 transition-colors tracking-wider text-center">
                  {brand.logo}
                </span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              'w-2 h-2 rounded-full transition-all',
              index === currentIndex
                ? 'bg-neutral-900 w-6'
                : 'bg-neutral-300 hover:bg-neutral-400'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
