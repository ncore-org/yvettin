'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { cn } from '@/lib/utils';

interface EnterpriseCarouselProps {
  products: Product[];
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  /** Počet viditeľných produktov naraz (responsive) */
  itemsPerView?: { mobile: number; tablet: number; desktop: number };
  /** Medzera medzi kartami */
  gap?: number;
  /** Svetlejšie pozadie sekcie */
  light?: boolean;
  /** Zobraziť progress bar */
  showProgress?: boolean;
}

export default function EnterpriseCarousel({
  products,
  title,
  subtitle,
  viewAllHref = '/',
  viewAllLabel = 'Zobraziť všetky',
  itemsPerView = { mobile: 1.5, tablet: 3, desktop: 4 },
  gap = 24,
  light = false,
  showProgress = true,
}: EnterpriseCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  // Motion values pre smooth drag
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });

  // Progress pre progress bar
  const maxIndex = Math.max(0, products.length - Math.floor(itemsPerView.desktop));
  const progress = useTransform(x, [0, -containerWidth * (maxIndex / products.length)], ['0%', '100%']);

  // Zistenie šírky containera
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Výpočet item width podľa viewportu
  const getItemWidth = useCallback(() => {
    if (typeof window === 'undefined') return 300;
    const width = window.innerWidth;
    if (width >= 1024) return (containerWidth - gap * (itemsPerView.desktop - 1)) / itemsPerView.desktop;
    if (width >= 768) return (containerWidth - gap * (itemsPerView.tablet - 1)) / itemsPerView.tablet;
    return (containerWidth - gap * (itemsPerView.mobile - 1)) / itemsPerView.mobile;
  }, [containerWidth, gap, itemsPerView]);

  const itemWidth = getItemWidth();
  const maxScroll = Math.max(0, products.length * (itemWidth + gap) - containerWidth);

  // Scroll na špecifický index
  const scrollToIndex = useCallback(
    (index: number) => {
      const clampedIndex = Math.max(0, Math.min(index, products.length - 1));
      setCurrentIndex(clampedIndex);
      const scrollX = -clampedIndex * (itemWidth + gap);
      x.set(Math.max(-maxScroll, scrollX));
    },
    [itemWidth, gap, maxScroll, products.length, x]
  );

  // Navigácia
  const goNext = () => scrollToIndex(currentIndex + 1);
  const goPrev = () => scrollToIndex(currentIndex - 1);

  // Drag handling
  const handleDragStart = () => setIsDragging(true);
  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    setIsDragging(false);
    const threshold = itemWidth / 3;
    const velocity = info.velocity.x;

    if (Math.abs(velocity) > 500 || Math.abs(info.offset.x) > threshold) {
      if (velocity > 0 || info.offset.x > 0) {
        goPrev();
      } else {
        goNext();
      }
    } else {
      // Snap back
      scrollToIndex(currentIndex);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  // Auto-pause on hover
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section
      className={cn('py-16 md:py-20 overflow-hidden', light ? 'bg-white' : 'bg-neutral-50')}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-10">
          <div>
            {subtitle && (
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs md:text-sm font-medium tracking-[0.25em] text-neutral-500 mb-2 block uppercase"
              >
                {subtitle}
              </motion.span>
            )}

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-neutral-900"
            >
              {title}
            </motion.h2>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            {/* Counter */}
            <span className="hidden md:block text-sm text-neutral-400">
              {String(currentIndex + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
            </span>

            {/* Nav Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={goPrev}
                disabled={currentIndex === 0}
                className="h-11 w-11 rounded-full border-neutral-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white transition-all disabled:opacity-30"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={goNext}
                disabled={currentIndex >= maxIndex}
                className="h-11 w-11 rounded-full border-neutral-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white transition-all disabled:opacity-30"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <Link
              href={viewAllHref}
              className="hidden md:inline-flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors ml-4"
            >
              {viewAllLabel}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Carousel Container with Edge Gradients */}
      <div className="relative" ref={containerRef}>
        {/* Left Gradient */}
        <div
          className={cn(
            'absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none transition-opacity duration-300',
            currentIndex > 0 ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            background: `linear-gradient(to right, ${light ? '#fff' : '#fafafa'}, transparent)`,
          }}
        />

        {/* Right Gradient */}
        <div
          className={cn(
            'absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none transition-opacity duration-300',
            currentIndex < maxIndex ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            background: `linear-gradient(to left, ${light ? '#fff' : '#fafafa'}, transparent)`,
          }}
        />

        {/* Track */}
        <motion.div
          ref={trackRef}
          className="flex cursor-grab active:cursor-grabbing px-4 md:px-8 lg:px-12"
          style={{
            x: springX,
            gap: `${gap}px`,
          }}
          drag="x"
          dragConstraints={{ left: -maxScroll, right: 0 }}
          dragElastic={0.1}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="flex-shrink-0"
              style={{ width: itemWidth }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Progress Bar */}
      {showProgress && products.length > itemsPerView.desktop && (
        <div className="container-custom mt-8">
          <div className="h-0.5 bg-neutral-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-neutral-900 rounded-full"
              style={{ width: progress }}
            />
          </div>
        </div>
      )}

      {/* Mobile View All Link */}
      <div className="container-custom mt-8 md:hidden">
        <Link
          href={viewAllHref}
          className="inline-flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          {viewAllLabel}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
