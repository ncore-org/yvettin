'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Gem, Footprints } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Category {
  name: string;
  href: string;
  image: string;
  count?: number;
}

interface CategoryGridProps {
  categories: Category[];
  title: string;
  subtitle: string;
  className?: string;
}

// Expert-level category grid with professional imagery and animations
export default function CategoryGrid({ categories, title, subtitle, className }: CategoryGridProps) {
  // Kategórie pre mix homepage (ženy + muži)
  const categoryData = [
    {
      name: 'Ženy Oblečenie',
      href: '/zeny/oblecenie',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80',
      icon: ShoppingBag,
      count: 8500,
      gradient: 'from-pink-500/20 to-rose-500/20',
    },
    {
      name: 'Muži Oblečenie',
      href: '/muzi/oblecenie',
      image: 'https://images.unsplash.com/photo-1488161628813-994252600322?w=800&q=80',
      icon: ShoppingBag,
      count: 5200,
      gradient: 'from-blue-500/20 to-indigo-500/20',
    },
    {
      name: 'Obuv',
      href: '/obuv',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      icon: Footprints,
      count: 3800,
      gradient: 'from-amber-500/20 to-orange-500/20',
    },
    {
      name: 'Doplnky',
      href: '/doplnky',
      image: 'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?w=800&q=80',
      icon: Gem,
      count: 2400,
      gradient: 'from-emerald-500/20 to-teal-500/20',
    },
  ];

  return (
    <section className={cn('py-16 md:py-24 bg-gradient-to-b from-white to-neutral-50', className)}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block text-xs md:text-sm font-medium tracking-[0.3em] text-neutral-500 mb-3 uppercase">
            {subtitle}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-neutral-900 mt-2">
            {title}
          </h2>
        </motion.div>

        {/* Categories Grid - 2x2 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {categoryData.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
            >
              <Link href={category.href} className="block">
                {/* Image Container */}
                <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden">
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${category.image})` }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-t opacity-60 group-hover:opacity-70 transition-opacity duration-500",
                    category.gradient,
                    "from-black/80 via-black/40 to-transparent"
                  )} />
                  
                  {/* Icon */}
                  <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <div className="transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-medium text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-sm mb-4">
                      {category.count.toLocaleString()} produktov
                    </p>
                    <div className="flex items-center text-white/90 text-sm font-medium">
                      <span className="border-b border-white/70 pb-0.5 group-hover:border-white transition-colors">
                        Preskúmať kategóriu
                      </span>
                      <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Animated Border */}
                <div className="absolute inset-0 rounded-2xl border border-white/20 group-hover:border-white/40 transition-colors duration-300 pointer-events-none" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Categories CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12 md:mt-16"
        >
          <Link
            href="/kategoria"
            className="inline-flex items-center gap-3 px-10 py-4 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <span>Zobraziť všetky kategórie</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
