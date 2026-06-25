'use client';

import { motion } from 'framer-motion';
import { Gift, Star, ArrowRight, Wallet } from 'lucide-react';
import Link from 'next/link';

export default function LoyaltyInfoPage() {
  const tiers = [
    { name: 'Bronze', points: '0 - 499 bodov', benefits: ['Základný zber bodov 10 % z hodnoty nákupu'] },
    { name: 'Silver', points: '500 - 1 999 bodov', benefits: ['12 % z hodnoty nákupu v bodoch', 'Prioritná zákaznícka podpora'] },
    { name: 'Gold', points: '2 000 - 4 999 bodov', benefits: ['15 % z hodnoty nákupu', 'Prednostný prístup k výpredajom'] },
    { name: 'Platinum', points: '5 000+ bodov', benefits: ['20 % z hodnoty nákupu', 'Exkluzívne ponuky a eventy'] },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-white border-b border-neutral-100">
        <div className="container-custom py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <Gift className="h-8 w-8 text-neutral-900" />
              <p className="text-sm font-medium tracking-wider text-neutral-500 uppercase">Body za nákup</p>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-neutral-900 mb-6">Vernostný program YVETTIN</h1>
            <p className="text-lg text-neutral-600">
              Za každý nákup získavate body, ktoré môžete neskôr použiť ako zľavu na ďalšie objednávky.
              Tento systém je zatiaľ v príprave – čísla slúžia ako ukážka.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-12 md:py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 border border-neutral-100 mb-10"
        >
          <h2 className="text-2xl font-semibold mb-4">Ako to funguje</h2>
          <p className="text-neutral-600 mb-4 text-sm leading-relaxed">
            Pri každom nákupe získate <strong>body</strong> podľa hodnoty objednávky. 
            Za každé 1 € z ceny produktu si pripíšete približne <strong>0.1 bodu</strong> (10 %). 
            Hodnota 1 bodu je približne <strong>0.01 €</strong>. Konkrétne nastavenia budú upresnené pri spustení systému.
          </p>
          <p className="text-neutral-600 text-sm leading-relaxed">
            Pri produktoch uvidíte informáciu: <em>„Za tento nákup získate X bodov v hodnote Y €“</em>. 
            V zákazníckom účte budete mať prehľad všetkých nazbieraných bodov a ich hodnoty.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-8 border border-neutral-100 mb-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <Star className="h-5 w-5 text-neutral-900" />
            <h2 className="text-xl font-semibold">Úrovne vernostného programu (draft)</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tiers.map((tier) => (
              <div key={tier.name} className="border border-neutral-100 rounded-xl p-5 bg-neutral-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{tier.name}</h3>
                  <span className="text-xs text-neutral-500">{tier.points}</span>
                </div>
                <ul className="text-sm text-neutral-600 space-y-1">
                  {tier.benefits.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-neutral-900 text-white rounded-2xl p-8 flex items-center justify-between gap-6"
        >
          <div>
            <h2 className="text-xl font-semibold mb-2">Vaša karta YVETTIN (pripravuje sa)</h2>
            <p className="text-sm text-neutral-300 mb-4">
              Po spustení programu uvidíte v svojom účte počet bodov, ich hodnotu a úroveň vernostného programu.
            </p>
            <Link
              href="/account/login"
              className="inline-flex items-center h-11 px-5 bg-white text-neutral-900 rounded-full text-sm font-medium hover:bg-neutral-100 transition-colors"
            >
              Prihlásiť sa do účtu
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="w-64 h-40 rounded-2xl bg-gradient-to-br from-neutral-700 to-neutral-900 border border-neutral-600 p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-300">YVETTIN POINTS</span>
                <Wallet className="h-5 w-5 text-neutral-200" />
              </div>
              <div>
                <p className="text-xs text-neutral-400 mb-1">KARTA</p>
                <p className="text-lg font-semibold tracking-[0.2em]">YV00 0000 00</p>
              </div>
              <div className="flex items-center justify-between text-xs text-neutral-300">
                <div>
                  <p>Stav bodov:</p>
                  <p className="text-base font-semibold text-white">0</p>
                </div>
                <div className="text-right">
                  <p>Úroveň:</p>
                  <p className="font-semibold text-white">BRONZE</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
