'use client';

import { motion } from 'framer-motion';
import { RotateCcw, Package, Clock, CheckCircle, Shield, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ReturnsPage() {
  const steps = [
    {
      icon: Package,
      title: 'Pripravte balík',
      description: 'Zabaľte tovar do pôvodného obalu alebo iného vhodného balenia. Nezabudnite priložiť faktúru alebo číslo objednávky.',
    },
    {
      icon: Truck,
      title: 'Odoslanie',
      description: 'Odneste balík na najbližšie výdajné miesto alebo zavolajte kuriéra. Náklady na dopravu pri vrátení hradíme my.',
    },
    {
      icon: CheckCircle,
      title: 'Kontrola a vrátenie peňazí',
      description: 'Po prijatí a kontrole tovaru vám vrátime peniaze do 14 dní na váš účet alebo spôsobom, akým ste platili.',
    },
  ];

  const conditions = [
    'Tovar musí byť nenosený, nepoškodený a v pôvodnom stave',
    'Všetky visačky a štítky musia byť pripojené',
    'Vrátenie do 30 dní od prevzatia zásielky',
    'Spodná bielizeň a plavky z hygienických dôvodov nemožno vrátiť',
    'Personalizovaný tovar (vyšívanie, úpravy) nie je možné vrátiť',
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <div className="bg-white border-b border-neutral-100">
        <div className="container-custom py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <p className="text-sm font-medium tracking-wider text-neutral-500 uppercase mb-4">Výmena a vrátenie</p>
            <h1 className="text-4xl md:text-5xl font-light text-neutral-900 mb-6">Jednoduché vrátenie bez stresu</h1>
            <p className="text-lg text-neutral-600">
              Ak vám produkt nesadne, máte právo vrátiť tovar do 30 dní bez udania dôvodu. 
              Proces je jednoduchý, rýchly a bezplatný.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-12 md:py-16">
        {/* 30 Days Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white rounded-2xl p-8 mb-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                <Clock className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">30 dní na vrátenie</h2>
                <p className="text-neutral-300">Bez udania dôvodu a bezplatne</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-neutral-400">Od dátumu prevzatia zásielky</p>
            </div>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">Ako vrátiť tovar</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-xl p-6 border border-neutral-100 h-full">
                  <div className="w-12 h-12 bg-neutral-900 text-white rounded-lg flex items-center justify-center mb-4">
                    <step.icon className="h-6 w-6" />
                  </div>
                  
                  <div className="text-sm font-medium text-neutral-500 mb-2">Krok {index + 1}</div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-neutral-600 text-sm">{step.description}</p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-neutral-200" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Conditions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 border border-neutral-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-6 w-6 text-neutral-900" />
              <h2 className="text-xl font-semibold">Podmienky vrátenia</h2>
            </div>
            
            <ul className="space-y-4">
              {conditions.map((condition) => (
                <li key={condition} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-600">{condition}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-8 border border-neutral-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <RotateCcw className="h-6 w-6 text-neutral-900" />
              <h2 className="text-xl font-semibold">Výmena za inú veľkosť</h2>
            </div>
            
            <p className="text-neutral-600 mb-6">
              Ak potrebujete inú veľkosť, najrýchlejšie je vrátiť pôvodný produkt a 
              objednať nový. Pri výmene rezervujeme požadovanú veľkosť po dobu 7 dní 
              od prijatia vášho balíka.
            </p>
            
            <div className="bg-neutral-50 rounded-lg p-4">
              <p className="text-sm text-neutral-600">
                <strong>Tip:</strong> Pri vrátení uveďte do poznámky, že žiadate výmenu 
                za konkrétnu veľkosť - urýchli to celý proces.
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-100 rounded-2xl p-8 text-center"
        >
          <h2 className="text-xl font-semibold mb-4">Potrebujete pomôcť s vrátením?</h2>
          <p className="text-neutral-600 mb-6">
            Náš tím je pripravený odpovedať na všetky vaše otázky týkajúce sa vrátenia alebo výmeny.
          </p>
          <Button asChild className="rounded-full">
            <Link href="/kontakt">Kontaktovať podporu</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
