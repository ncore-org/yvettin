'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ui/ProductCard';
import { Product } from '@/types';
import { cn } from '@/lib/utils';

interface SaleSectionProps {
  products: Product[];
  title: string;
  subtitle: string;
  gender: 'women' | 'men';
  compact?: boolean;
}

export default function SaleSection({
  products,
  title,
  subtitle,
  gender,
  compact = false,
}: SaleSectionProps) {
  const bgColor =
    gender === 'women'
      ? 'bg-gradient-to-br from-pink-50 to-neutral-100'
      : 'bg-gradient-to-br from-blue-50 to-neutral-100';

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        compact ? 'py-8 md:py-12' : 'py-16 md:py-24',
        bgColor
      )}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className={cn(
            'absolute -top-1/2 -right-1/4 w-full h-full rounded-full blur-3xl',
            gender === 'women' ? 'bg-pink-200' : 'bg-blue-200'
          )}
        />
      </div>

      <div className={cn('relative z-10', compact ? '' : 'container-custom')}>
        <div
          className={cn(
            'flex flex-col',
            compact ? '' : 'lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12'
          )}
        >
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn('text-center', compact ? '' : 'lg:text-left lg:max-w-md')}
          >
            <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full mb-4 md:mb-6">
              <Percent className="h-4 w-4" />
              <span className="text-sm font-medium">ZĽAVY AŽ -50%</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-neutral-900 mb-2">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-neutral-500 mb-6 md:mb-8">{subtitle}</p>

            <Link href={`/vypredaj?gender=${gender}`}>
              <Button size="lg" className="h-12 md:h-14 px-8 bg-neutral-900 hover:bg-neutral-800">
                Zobraziť zľavy
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Products Grid */}
          {!compact && (
            <div className="grid grid-cols-2 gap-4 md:gap-6 lg:flex-1">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard product={product} showDiscount />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
