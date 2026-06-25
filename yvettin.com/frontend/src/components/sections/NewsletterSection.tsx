'use client';

import { motion } from 'framer-motion';
import { Truck, RotateCcw, ShieldCheck, Headphones, Star, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BenefitCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}

function BenefitCard({ icon: Icon, title, description, delay }: BenefitCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative p-6 md:p-8 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Icon Background */}
      <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-neutral-50 group-hover:bg-neutral-900 transition-colors duration-300 flex items-center justify-center">
        <Icon className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
      </div>

      {/* Content */}
      <div className="pr-16">
        <h3 className="text-lg font-medium text-neutral-900 mb-2">{title}</h3>
        <p className="text-sm text-neutral-500 leading-relaxed">{description}</p>
      </div>

      {/* Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Truck,
      title: 'Doprava zdarma',
      description: 'Pri objednávke nad 50€ máte dopravu úplne zadarmo. Rýchle doručenie do 24-48 hodín.',
      delay: 0.1,
    },
    {
      icon: RotateCcw,
      title: '30 dní na vrátenie',
      description: 'Nepáči sa vám tovar? Do 30 dní ho môžete vrátiť bez udania dôvodu. Jednoduché a rýchle.',
      delay: 0.2,
    },
    {
      icon: ShieldCheck,
      title: 'Záruka kvality',
      description: 'Všetky produkty sú originálne a pokryté zárukou 24 mesiacov. Kvalita je u nás priorita.',
      delay: 0.3,
    },
    {
      icon: Headphones,
      title: 'Podpora 24/7',
      description: 'Náš zákaznícky servis je tu pre vás kedykoľvek. Rýchle odpovede a ochotný prístup.',
      delay: 0.4,
    },
    {
      icon: Star,
      title: 'Vernostný program',
      description: 'Za každý nákup získavate body, ktoré môžete vymeniť za zľavy na ďalšie nákupy.',
      delay: 0.5,
    },
    {
      icon: Heart,
      title: 'Obľúbené značky',
      description: 'Vyberáme len tie najlepšie značky. Kvalita, štýl a trendy v jednom mieste.',
      delay: 0.6,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block text-xs md:text-sm font-medium tracking-[0.3em] text-neutral-500 mb-3 uppercase">
            Výhody nákupu
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-neutral-900 mt-2">
            PREČO NAKUPOVAŤ U NÁS
          </h2>
          <p className="text-neutral-500 mt-4 max-w-2xl mx-auto">
            Starostlivosť o zákazníka je u nás na prvom mieste. Presvedčte sa sami.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={benefit.title}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              delay={benefit.delay}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="text-center mt-12 md:mt-16"
        >
          <p className="text-neutral-600 mb-6">
            Máte otázky? Kontaktujte nás na{' '}
            <a href="mailto:podpora@yvettin.sk" className="text-neutral-900 underline hover:no-underline">
              podpora@yvettin.sk
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
