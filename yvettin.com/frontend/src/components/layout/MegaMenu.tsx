'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MegaMenuCategory {
  name: string;
  href: string;
  items?: { name: string; href: string; isNew?: boolean; isSale?: boolean }[];
}

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  gender: 'women' | 'men';
}

const womenCategories: MegaMenuCategory[] = [
  {
    name: 'Oblečenie',
    href: '/kategoria/zeny/oblecenie',
    items: [
      { name: 'Šaty', href: '/kategoria/zeny/saty' },
      { name: 'Topy & Tričká', href: '/kategoria/zeny/topy' },
      { name: 'Nohavice', href: '/kategoria/zeny/nohavice' },
      { name: 'Sukne', href: '/kategoria/zeny/sukne' },
      { name: 'Bundy & Kabáty', href: '/kategoria/zeny/bundy' },
      { name: 'Mikiny', href: '/kategoria/zeny/mikiny', isNew: true },
      { name: 'Svetry', href: '/kategoria/zeny/svetry' },
      { name: 'Spodná bielizeň', href: '/kategoria/zeny/bielizen' },
    ],
  },
  {
    name: 'Topánky',
    href: '/kategoria/zeny/topanky',
    items: [
      { name: 'Tenisky', href: '/kategoria/zeny/tenisky' },
      { name: 'Lodičky', href: '/kategoria/zeny/lodicky' },
      { name: 'Čižmy', href: '/kategoria/zeny/cizmy' },
      { name: 'Balerínky', href: '/kategoria/zeny/balerinky' },
      { name: 'Sandále', href: '/kategoria/zeny/sandale', isNew: true },
    ],
  },
  {
    name: 'Doplnky',
    href: '/kategoria/zeny/doplnky',
    items: [
      { name: 'Kabelky', href: '/kategoria/zeny/kabelky' },
      { name: 'Peňaženky', href: '/kategoria/zeny/penazenky' },
      { name: 'Šatky', href: '/kategoria/zeny/satky' },
      { name: 'Hodinky', href: '/kategoria/zeny/hodinky' },
      { name: 'Okuliare', href: '/kategoria/zeny/okuliare' },
      { name: 'Šperky', href: '/kategoria/zeny/sperky', isSale: true },
    ],
  },
  {
    name: 'Šport',
    href: '/kategoria/zeny/sport',
    items: [
      { name: 'Legíny', href: '/kategoria/zeny/sportove-leginy' },
      { name: 'Športové topy', href: '/kategoria/zeny/sportove-topy' },
      { name: 'Tepláky', href: '/kategoria/zeny/teplaky' },
      { name: 'Bundy', href: '/kategoria/zeny/sportove-bundy' },
    ],
  },
];

const menCategories: MegaMenuCategory[] = [
  {
    name: 'Oblečenie',
    href: '/kategoria/muzi/oblecenie',
    items: [
      { name: 'Tričká & Polokošele', href: '/kategoria/muzi/tricka' },
      { name: 'Nohavice & Džínsy', href: '/kategoria/muzi/nohavice' },
      { name: 'Bundy & Kabáty', href: '/kategoria/muzi/bundy' },
      { name: 'Mikiny & Svetry', href: '/kategoria/muzi/mikiny' },
      { name: 'Košele', href: '/kategoria/muzi/kosela', isNew: true },
      { name: 'Obleky', href: '/kategoria/muzi/oblek' },
      { name: 'Spodná bielizeň', href: '/kategoria/muzi/bielizen' },
    ],
  },
  {
    name: 'Topánky',
    href: '/kategoria/muzi/topanky',
    items: [
      { name: 'Tenisky', href: '/kategoria/muzi/tenisky' },
      { name: 'Poltopánky', href: '/kategoria/muzi/poltopanky' },
      { name: 'Čižmy', href: '/kategoria/muzi/cizmy' },
      { name: 'Športové', href: '/kategoria/muzi/sportove-topanky', isNew: true },
    ],
  },
  {
    name: 'Doplnky',
    href: '/kategoria/muzi/doplnky',
    items: [
      { name: 'Tašky & Batohy', href: '/kategoria/muzi/tasiky' },
      { name: 'Opasky', href: '/kategoria/muzi/opasky' },
      { name: 'Hodinky', href: '/kategoria/muzi/hodinky' },
      { name: 'Okuliare', href: '/kategoria/muzi/okuliare' },
      { name: 'Čiapky', href: '/kategoria/muzi/ciapky', isSale: true },
    ],
  },
  {
    name: 'Šport',
    href: '/kategoria/muzi/sport',
    items: [
      { name: 'Tričká', href: '/kategoria/muzi/sportove-tricka' },
      { name: 'Šortky', href: '/kategoria/muzi/sortky' },
      { name: 'Tepláky', href: '/kategoria/muzi/teplaky' },
      { name: 'Bundy', href: '/kategoria/muzi/sportove-bundy' },
    ],
  },
];

export default function MegaMenu({ isOpen, onClose, gender }: MegaMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categories = gender === 'women' ? womenCategories : menCategories;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={onClose}
          />

          {/* Mega Menu */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-neutral-100 z-50"
            onMouseLeave={onClose}
          >
            <div className="container-custom py-8">
              <div className="grid grid-cols-12 gap-8">
                {/* Main Categories */}
                <div className="col-span-8">
                  <div className="grid grid-cols-4 gap-6">
                    {categories.map((category) => (
                      <div
                        key={category.name}
                        className="group"
                        onMouseEnter={() => setActiveCategory(category.name)}
                      >
                        <Link
                          href={category.href}
                          className="block mb-4"
                          onClick={onClose}
                        >
                          <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider group-hover:text-neutral-600 transition-colors flex items-center gap-1">
                            {category.name}
                            <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </h3>
                        </Link>
                        <ul className="space-y-2">
                          {category.items?.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-2"
                                onClick={onClose}
                              >
                                {item.name}
                                {item.isNew && (
                                  <span className="text-[10px] bg-neutral-900 text-white px-1.5 py-0.5 rounded">
                                    NOVÉ
                                  </span>
                                )}
                                {item.isSale && (
                                  <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded">
                                    SALE
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Featured Section */}
                <div className="col-span-4 border-l border-neutral-100 pl-8">
                  <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider mb-4">
                    Trendy teraz
                  </h3>
                  <div className="space-y-4">
                    <Link
                      href={gender === 'women' ? '/kategoria/zeny/saty' : '/kategoria/muzi/kosela'}
                      className="block group"
                      onClick={onClose}
                    >
                      <div className="aspect-[16/9] bg-neutral-100 rounded-lg overflow-hidden mb-2">
                        <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                          <span className="text-neutral-500 text-sm">
                            {gender === 'women' ? 'Nové šaty' : 'Nové košele'}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-neutral-900 group-hover:text-neutral-600 transition-colors">
                        {gender === 'women' ? 'Jar/Leto 2025 - Šaty' : 'Jar/Leto 2025 - Košele'}
                      </p>
                    </Link>

                    <Link
                      href="/vypredaj"
                      className="block group"
                      onClick={onClose}
                    >
                      <div className="aspect-[16/9] bg-red-50 rounded-lg overflow-hidden mb-2">
                        <div className="w-full h-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                          <span className="text-red-600 font-medium">Výpredaj až -50%</span>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-red-600 group-hover:text-red-700 transition-colors">
                        Zobraziť všetky zľavy
                      </p>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <span className="text-xs text-neutral-500">
                    Doprava zdarma nad 50€
                  </span>
                  <span className="text-xs text-neutral-500">
                    30-dňové vrátenie
                  </span>
                  <span className="text-xs text-neutral-500">
                    Bezpečná platba
                  </span>
                </div>
                <Link
                  href={gender === 'women' ? '/zeny' : '/muzi'}
                  className="text-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors flex items-center gap-1"
                  onClick={onClose}
                >
                  Zobraziť všetko
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
