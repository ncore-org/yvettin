'use client';

import { motion } from 'framer-motion';
import { Cookie, Settings, Trash2, Shield } from 'lucide-react';
import Link from 'next/link';

export default function CookiesPage() {
  const cookieTypes = [
    {
      name: 'Nevyhnutné cookies',
      required: true,
      description: 'Tieto cookies sú nevyhnutné pre fungovanie webovej stránky. Bez nich by stránka nefungovala správne.',
      examples: ['Session cookie', 'Košík', 'Autentifikácia'],
    },
    {
      name: 'Analytické cookies',
      required: false,
      description: 'Pomáhajú nám pochopiť, ako návštevníci interagujú s webovou stránkou. Zbierajú anonymné informácie.',
      examples: ['Google Analytics', 'Hotjar', 'Návštevnosť'],
    },
    {
      name: 'Marketingové cookies',
      required: false,
      description: 'Používajú sa na sledovanie návštevníkov naprieč webovými stránkami a zobrazovanie relevantných reklám.',
      examples: ['Facebook Pixel', 'Google Ads', 'Retargeting'],
    },
    {
      name: 'Preferenčné cookies',
      required: false,
      description: 'Umožňujú webovej stránke zapamätať si vaše preferencie a prispôsobiť obsah.',
      examples: ['Jazyk', 'Mena', 'Veľkosť'],
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
            <div className="flex items-center gap-3 mb-4">
              <Cookie className="h-8 w-8 text-neutral-900" />
              <p className="text-sm font-medium tracking-wider text-neutral-500 uppercase">Cookies</p>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-neutral-900 mb-6">Nastavenia cookies</h1>
            <p className="text-lg text-neutral-600">
              Táto stránka používa cookies na zlepšenie vášho zážitku z nakupovania. 
              Tu nájdete informácie o tom, aké cookies používame a ako ich môžete spravovať.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-12 md:py-16">
        <div className="max-w-3xl">
          {/* What are cookies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-8 border border-neutral-100 mb-6"
          >
            <h2 className="text-xl font-semibold mb-4">Čo sú cookies?</h2>
            <p className="text-neutral-600 mb-4">
              Cookies sú malé textové súbory, ktoré sa ukladajú vo vašom prehliadači pri návšteve 
              webovej stránky. Umožňujú nám zapamätať si vaše preferencie, pochopiť, ako používate 
              našu stránku, a zlepšiť vašu skúsenosť pri opakovanej návšteve.
            </p>
            <p className="text-neutral-600">
              Cookies neobsahujú žiadne osobné informácie, ako sú vaše meno alebo adresa. 
              Môžete ich kedykoľvek vymazať alebo zablokovať v nastaveniach vášho prehliadača.
            </p>
          </motion.div>

          {/* Cookie Types */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-6">Typy cookies, ktoré používame</h2>
            
            <div className="space-y-4">
              {cookieTypes.map((type, index) => (
                <motion.div
                  key={type.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 border border-neutral-100"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{type.name}</h3>
                    {type.required ? (
                      <span className="text-xs bg-neutral-900 text-white px-2 py-1 rounded-full">
                        Nevyhnutné
                      </span>
                    ) : (
                      <span className="text-xs bg-neutral-200 text-neutral-600 px-2 py-1 rounded-full">
                        Voliteľné
                      </span>
                    )}
                  </div>
                  
                  <p className="text-neutral-600 text-sm mb-3">{type.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {type.examples.map((example) => (
                      <span key={example} className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded">
                        {example}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* How to manage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-8 border border-neutral-100 mb-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Settings className="h-5 w-5 text-neutral-600" />
              <h2 className="text-xl font-semibold">Ako spravovať cookies</h2>
            </div>
            
            <p className="text-neutral-600 mb-4">
              Môžete kedykoľvek zmeniť svoje preferencie cookies v nastaveniach prehliadača: 
            </p>
            
            <ul className="space-y-2 text-sm text-neutral-600">
              <li><strong>Chrome:</strong> Nastavenia → Súkromie a bezpečnosť → Cookies</li>
              <li><strong>Firefox:</strong> Nastavenia → Súkromie a bezpečnosť → Cookies</li>
              <li><strong>Safari:</strong> Nastavenia → Súkromie → Cookies</li>
              <li><strong>Edge:</strong> Nastavenia → Cookies a povolenia webu</li>
            </ul>
          </motion.div>

          {/* Delete cookies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-amber-50 border border-amber-100 rounded-xl p-6"
          >
            <div className="flex items-start gap-4">
              <Trash2 className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-900 mb-2">Vymazanie cookies</h3>
                <p className="text-sm text-amber-800 mb-3">
                  Ak chcete vymazať všetky cookies z našej stránky, kliknite na tlačidlo nižšie. 
                  Upozorňujeme, že to môže ovplyvniť funkčnosť stránky a budete musieť znova 
                  nastaviť svoje preferencie.
                </p>
                <button className="text-sm bg-amber-200 hover:bg-amber-300 text-amber-900 px-4 py-2 rounded-lg transition-colors">
                  Vymazať všetky cookies
                </button>
              </div>
            </div>
          </motion.div>

          {/* More info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 bg-neutral-900 text-white rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-5 w-5" />
              <h3 className="font-semibold">Viac informácií</h3>
            </div>
            
            <p className="text-neutral-300 text-sm mb-3">
              Podrobnejšie informácie o spracovaní osobných údajov nájdete v našich 
              dokumentoch o ochrane osobných údajov.
            </p>
            
            <Link href="/gdpr" className="text-sm underline hover:text-neutral-300">
              Prečítať GDPR
            </Link>
          </motion.div>

          <div className="mt-8 text-center text-sm text-neutral-500">
            Posledná aktualizácia: 11.02.2026
          </div>
        </div>
      </div>
    </div>
  );
}
