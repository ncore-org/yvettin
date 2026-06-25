'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Truck, RefreshCw, Shield, Clock, Package, Headphones, Award, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrustItem {
  icon: React.ElementType;
  title: string;
  description: string;
  value?: number;
  suffix?: string;
}

const trustItems: TrustItem[] = [
  {
    icon: Truck,
    title: 'Doprava zdarma',
    description: 'Pri nákupe nad 50€',
  },
  {
    icon: RefreshCw,
    title: '30-dňové vrátenie',
    description: 'Bez otázok',
  },
  {
    icon: Shield,
    title: 'Bezpečná platba',
    description: 'SSL šifrovanie',
  },
  {
    icon: Clock,
    title: 'Rýchle doručenie',
    description: '1-3 pracovné dni',
  },
];

// Additional stats for enhanced version
const statsItems: TrustItem[] = [
  {
    icon: Package,
    title: 'Produkty',
    description: 'Široká ponuka',
    value: 5000,
    suffix: '+',
  },
  {
    icon: Headphones,
    title: 'Zákazníkov',
    description: 'Spokojných klientov',
    value: 50,
    suffix: 'k+',
  },
  {
    icon: Award,
    title: 'Kvalita',
    description: 'Overené značky',
    value: 100,
    suffix: '+',
  },
  {
    icon: CreditCard,
    title: 'Platby',
    description: 'Všetky metódy',
    value: 10,
    suffix: '+',
  },
];

// Animated counter component
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

interface TrustBannerProps {
  variant?: 'simple' | 'enhanced' | 'stats';
  className?: string;
}

export default function TrustBanner({ variant = 'simple', className }: TrustBannerProps) {
  const items = variant === 'stats' ? statsItems : trustItems;

  return (
    <section className={cn('bg-neutral-900 text-white', className)}>
      {/* Main Trust Banner */}
      <div className="py-8 md:py-12">
        <div className="container-custom">
          {/* Mobile: Horizontal scroll / Desktop: Grid */}
          <div className="flex md:grid md:grid-cols-4 gap-4 md:gap-8 overflow-x-auto pb-4 md:pb-0 scrollbar-hide snap-x snap-mandatory">
            {items.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0 md:flex-shrink w-[140px] md:w-auto snap-center flex flex-col items-center text-center group cursor-default"
              >
                {/* Icon Container */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-white/20 transition-colors duration-300"
                >
                  <item.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </motion.div>

                {/* Title */}
                <h3 className="text-sm md:text-base font-medium mb-1">{item.title}</h3>

                {/* Description or Counter */}
                {item.value ? (
                  <p className="text-lg md:text-xl font-light text-white/90">
                    <AnimatedCounter value={item.value} suffix={item.suffix} />
                  </p>
                ) : (
                  <p className="text-xs md:text-sm text-neutral-400">{item.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Optional: Bottom Border with Gradient */}
      {variant === 'enhanced' && (
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      )}
    </section>
  );
}

// Export individual components for flexibility
export { AnimatedCounter, trustItems, statsItems };
export type { TrustItem };
