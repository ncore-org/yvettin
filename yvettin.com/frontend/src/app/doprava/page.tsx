'use client';

import { motion } from 'framer-motion';
import { Truck, CreditCard, Package, Clock, MapPin, Shield } from 'lucide-react';

export default function ShippingPage() {
  const shippingMethods = [
    {
      icon: Truck,
      name: 'Kuriér DPD',
      price: '3.90 €',
      time: '1-2 pracovné dni',
      features: ['Sledovanie zásielky', 'SMS notifikácia', 'Výber času doručenia'],
    },
    {
      icon: MapPin,
      name: 'Výdajné miesto Zásielkovňa',
      price: '2.90 €',
      time: '2-3 pracovné dni',
      features: ['Pobočky po celom Slovensku', 'Výhodné ceny', 'Praktické otváracie hodiny'],
    },
    {
      icon: Package,
      name: 'Slovenská pošta',
      price: '3.50 €',
      time: '2-4 pracovné dni',
      features: ['Doručenie na adresu', 'Doručenie na poštu', 'Dostupné pre všetky obce'],
    },
  ];

  const paymentMethods = [
    {
      icon: CreditCard,
      name: 'Platobná karta',
      description: 'Visa, Mastercard, Maestro',
      secure: true,
    },
    {
      icon: Shield,
      name: 'Google Pay & Apple Pay',
      description: 'Rýchle a bezpečné platby',
      secure: true,
    },
    {
      icon: Package,
      name: 'Dobierka',
      description: 'Platba pri prevzatí (+1.20 €)',
      secure: false,
    },
    {
      icon: Clock,
      name: 'Bankový prevod',
      description: 'Pre firemné objednávky',
      secure: true,
    },
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
            <p className="text-sm font-medium tracking-wider text-neutral-500 uppercase mb-4">Doprava a platba</p>
            <h1 className="text-4xl md:text-5xl font-light text-neutral-900 mb-6">Transparentné dodanie</h1>
            <p className="text-lg text-neutral-600">
              Ponúkame viacero spôsobov dopravy a platby, aby ste si mohli vybrať 
              ten najvhodnejší pre vás. Pri objednávke nad 50 € je doprava zdarma.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-12 md:py-16">
        {/* Free Shipping Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-900 text-white rounded-2xl p-8 mb-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                <Truck className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Doprava zdarma</h2>
                <p className="text-neutral-300">Pri objednávke nad 50 €</p>
              </div>
            </div>
            <p className="text-sm text-neutral-400">Automaticky sa aplikuje v košíku</p>
          </div>
        </motion.div>

        {/* Shipping Methods */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">Spôsoby dopravy</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shippingMethods.map((method, index) => (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-neutral-100"
              >
                <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center mb-4">
                  <method.icon className="h-6 w-6 text-neutral-600" />
                </div>
                
                <h3 className="font-semibold text-lg mb-2">{method.name}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold">{method.price}</span>
                  <span className="text-sm text-neutral-500">{method.time}</span>
                </div>
                
                <ul className="space-y-2">
                  {method.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-neutral-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">Platobné metódy</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-neutral-100 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <method.icon className="h-6 w-6 text-neutral-600" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{method.name}</h3>
                    {method.secure && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        Secure
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-neutral-500">{method.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Order Tracking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 border border-neutral-100"
        >
          <h2 className="text-2xl font-semibold mb-4">Sledovanie objednávky</h2>
          <p className="text-neutral-600 mb-6">
            Po expedícii vašej objednávky vám pošleme email s tracking číslom a odkazom 
            na sledovanie zásielky. Môžete sledovať stav doručenia priamo na stránke 
            prepravcu alebo v sekcii „Moje objednávky“ po prihlásení.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: '1', text: 'Objednávka prijatá' },
              { step: '2', text: 'Pripravujeme' },
              { step: '3', text: 'Expedované' },
              { step: '4', text: 'Doručené' },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-neutral-900 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {item.step}
                </div>
                <span className="text-sm text-neutral-600">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
