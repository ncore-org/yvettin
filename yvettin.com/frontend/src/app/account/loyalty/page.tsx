'use client';

import { useLoyaltyStore } from '@/lib/store/loyalty';
import { motion } from 'framer-motion';
import { Wallet, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AccountLoyaltyPage() {
  const points = useLoyaltyStore((state) => state.points);

  const tierLabels: Record<typeof points.tier, string> = {
    bronze: 'Bronze',
    silver: 'Silver',
    gold: 'Gold',
    platinum: 'Platinum',
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-100 py-4">
        <div className="container-custom flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            YVETTIN<span className="text-neutral-400">®</span>
          </Link>
          <Link href="/account/login" className="text-sm text-neutral-600 hover:text-neutral-900">
            Prihlásiť / účet
          </Link>
        </div>
      </header>

      <main className="container-custom py-12 md:py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-sm font-medium tracking-wider text-neutral-500 uppercase mb-3">Môj účet</p>
          <h1 className="text-3xl md:text-4xl font-light text-neutral-900 mb-3">Vernostné body</h1>
          <p className="text-neutral-600 text-sm">
            Toto je ukážkový prehľad vašej vernostnej karty. Pri ostrej prevádzke sem doplníme 
            reálne dáta z backendu (body za nákup, históriu, uplatnenie bodov).
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Loyalty Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl border border-neutral-700 p-6 text-white flex flex-col justify-between min-h-[200px]"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-neutral-400">YVETTIN POINTS CARD</p>
                <p className="text-lg font-semibold tracking-[0.2em] mt-1">{points.cardNumber}</p>
              </div>
              <Wallet className="h-8 w-8 text-neutral-200" />
            </div>

            <div className="flex items-center justify-between mt-6">
              <div>
                <p className="text-xs text-neutral-400">Dostupné body</p>
                <p className="text-2xl font-semibold">{points.available}</p>
                <p className="text-xs text-neutral-400 mt-1">
                  hodnota približne {points.value.toFixed(2)} €
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-neutral-400 flex items-center justify-end gap-1">
                  <Star className="h-3 w-3 text-yellow-400" /> Úroveň
                </p>
                <p className="text-base font-semibold uppercase">{tierLabels[points.tier]}</p>
                <p className="text-xs text-neutral-400 mt-1">
                  ďalší level cca od {points.nextTierPoints} bodov
                </p>
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-neutral-100 p-6"
          >
            <h2 className="text-lg font-semibold mb-3">Ako získavam body?</h2>
            <p className="text-sm text-neutral-600 mb-3">
              Pri každom nákupe získavate body podľa hodnoty objednávky. Získané body sa 
              budú v ostrej verzii pripisovať automaticky po zaplatení objednávky.
            </p>
            <p className="text-sm text-neutral-600 mb-4">
              Táto sekcia je zatiaľ len prípravou – čísla sú demo a neslúžia ako reálny stav účtu.
            </p>
            <Link
              href="/body-za-nakup"
              className="inline-flex items-center h-10 px-4 rounded-full border border-neutral-900 text-sm font-medium hover:bg-neutral-900 hover:text-white transition-colors"
            >
              Ako fungujú body za nákup
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
