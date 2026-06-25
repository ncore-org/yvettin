'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Brand logos - using text representations
const brands = [
  { name: 'NIKE', id: 'nike' },
  { name: 'ADIDAS', id: 'adidas' },
  { name: 'TOMMY HILFIGER', id: 'tommy' },
  { name: 'LEVIS', id: 'levis' },
  { name: 'CALVIN KLEIN', id: 'ck' },
  { name: 'RALPH LAUREN', id: 'ralph' },
  { name: 'ZARA', id: 'zara' },
  { name: 'H&M', id: 'hm' },
  { name: 'BERSHKA', id: 'bershka' },
  { name: 'PULL&BEAR', id: 'pullbear' },
  { name: 'MANGO', id: 'mango' },
  { name: 'STRADIVARIUS', id: 'stradivarius' },
];

interface BrandLogosProps {
  className?: string;
  title?: string;
}

export default function BrandLogos({ className, title = 'Značky v našej ponuke' }: BrandLogosProps) {
  // Duplicate brands for infinite scroll
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className={cn('py-12 md:py-16 bg-white border-y border-neutral-100 overflow-hidden', className)}>
      <div className="container-custom mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-sm font-medium tracking-[0.2em] text-neutral-500 uppercase"
        >
          {title}
        </motion.h2>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling Brands */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex animate-marquee"
        >
          {duplicatedBrands.map((brand, index) => (
            <motion.div
              key={`${brand.id}-${index}`}
              whileHover={{ scale: 1.1 }}
              className="flex-shrink-0 mx-6 md:mx-10 cursor-pointer group"
            >
              <span className="text-lg md:text-xl font-medium text-neutral-300 group-hover:text-neutral-900 transition-colors duration-300 tracking-wider whitespace-nowrap">
                {brand.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Second Row - Reverse Direction */}
      <div className="relative mt-6">
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex animate-marquee"
          style={{ animationDirection: 'reverse', animationDuration: '40s' }}
        >
          {[...duplicatedBrands].reverse().map((brand, index) => (
            <motion.div
              key={`${brand.id}-rev-${index}`}
              whileHover={{ scale: 1.1 }}
              className="flex-shrink-0 mx-6 md:mx-10 cursor-pointer group"
            >
              <span className="text-lg md:text-xl font-light text-neutral-300 group-hover:text-neutral-900 transition-colors duration-300 tracking-wider whitespace-nowrap">
                {brand.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
