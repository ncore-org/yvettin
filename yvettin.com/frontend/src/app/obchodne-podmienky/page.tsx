'use client';

import { motion } from 'framer-motion';
import { FileText, Scale, Truck, RotateCcw, Shield, Mail } from 'lucide-react';

export default function TermsPage() {
  const sections = [
    {
      icon: FileText,
      title: 'Základné ustanovenia',
      content: `1.1. Tieto všeobecné obchodné podmienky (ďalej len "VOP") upravujú práva a povinnosti predávajúceho a kupujúceho pri nákupe tovaru prostredníctvom internetového obchodu YVETTIN.

1.2. Predávajúcim je:
YVETTIN Fashion s.r.o.
[Zapíšte adresu sídla]
IČO: [Zapíšte IČO]
DIČ: [Zapíšte DIČ]
Zapísaná v OR SR [mesto], odd. Sro, vložka č.: [číslo]

1.3. Kupujúcim je fyzická alebo právnická osoba, ktorá uzatvorila s predávajúcim kúpnu zmluvu prostredníctvom internetového obchodu.`
    },
    {
      icon: Scale,
      title: 'Ceny a platba',
      content: `2.1. Všetky ceny uvedené na webovej stránke sú v EUR a zahŕňajú DPH.

2.2. Doprava zdarma pri objednávke nad 50 EUR.

2.3. Platobné metódy:
• Platobná karta online (Visa, Mastercard)
• Google Pay a Apple Pay
• Bankový prevod
• Dobierka (+1.20 EUR)

2.4. Faktúra bude zaslaná elektronicky na email kupujúceho.`
    },
    {
      icon: Truck,
      title: 'Dodanie tovaru',
      content: `3.1. Dodacia lehota je 1-3 pracovné dni, pokiaľ nie je pri produkte uvedené inak.

3.2. Spôsoby dopravy:
• Kuriér DPD - 3.90 EUR (1-2 dni)
• Zásielkovňa - 2.90 EUR (2-3 dni)
• Slovenská pošta - 3.50 EUR (2-4 dni)

3.3. Po expedícii zásielky dostane kupujúci email s tracking číslom.`
    },
    {
      icon: RotateCcw,
      title: 'Vrátenie tovaru',
      content: `4.1. Lehota na vrátenie tovaru je 30 dní od prevzatia zásielky.

4.2. Tovar musí byť:
• Nenosený a nepoškodený
• S pôvodnými visačkami a štítkami
• V pôvodnom obale

4.3. Náklady na vrátenie hradí predávajúci (vrátenie zdarma).

4.4. Peniaze budú vrátené do 14 dní od prijatia vráteného tovaru.`
    },
    {
      icon: Shield,
      title: 'Záruka a reklamácie',
      content: `5.1. Záručná doba je 24 mesiacov od prevzatia tovaru.

5.2. Reklamáciu je možné uplatniť:
• Emailom: reklamacie@yvettin.com
• Poštou na adresu sídla spoločnosti

5.3. Lehota na vybavenie reklamácie je 30 dní.

5.4. Pri oprávnenej reklamácii predávajúci uhradí náklady na dopravu.`
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
              <Scale className="h-8 w-8 text-neutral-900" />
              <p className="text-sm font-medium tracking-wider text-neutral-500 uppercase">Obchodné podmienky</p>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-neutral-900 mb-6">Všeobecné obchodné podmienky</h1>
            <p className="text-lg text-neutral-600">
              Tieto obchodné podmienky upravujú vzťahy medzi predávajúcim a kupujúcim 
              pri nákupe v internetovom obchode YVETTIN.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-12 md:py-16">
        <div className="max-w-3xl">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 border border-neutral-100 mb-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <section.icon className="h-5 w-5 text-neutral-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                  <div className="text-neutral-600 whitespace-pre-line text-sm leading-relaxed">{section.content}</div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Final provisions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl p-8 border border-neutral-100 mb-6"
          >
            <h2 className="text-xl font-semibold mb-4">Záverečné ustanovenia</h2>
            
            <div className="text-neutral-600 text-sm leading-relaxed space-y-4">
              <p>
                <strong>6.1. Ochrana osobných údajov:</strong> Predávajúci spracúva osobné údaje v súlade 
                so zákonom o ochrane osobných údajov a GDPR. Podrobné informácie nájdete v 
                dokumente Ochrana osobných údajov.
              </p>
              
              <p>
                <strong>6.2. Alternatívne riešenie sporov:</strong> V prípade sporu má kupujúci právo 
                obrátiť sa na orgán dohľadu alebo využiť platformu alternatívneho riešenia sporov 
                dostupnú na <a href="https://ec.europa.eu/consumers/odr" className="underline" target="_blank" rel="noopener noreferrer">ec.europa.eu/consumers/odr</a>.
              </p>
              
              <p>
                <strong>6.3. Zmeny VOP:</strong> Predávajúci si vyhradzuje právo zmeniť tieto VOP. 
                O zmene bude informovať na webovej stránke.
              </p>
              
              <p>
                <strong>6.4. Účinnosť:</strong> Tieto VOP nadobúdajú účinnosť dňa 11.02.2026.
              </p>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-neutral-900 text-white rounded-xl p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <Mail className="h-5 w-5" />
              <h3 className="font-semibold">Kontakt</h3>
            </div>
            
            <p className="text-neutral-300 text-sm mb-3">
              Ak máte akékoľvek otázky týkajúce sa týchto obchodných podmienok, kontaktujte nás:
            </p>
            
            <div className="text-sm">
              <p>Email: <a href="mailto:info@yvettin.com" className="underline">info@yvettin.com</a></p>
              <p>Telefón: +421 900 123 456</p>
            </div>
          </motion.div>

          <div className="mt-8 text-center text-sm text-neutral-500">
            Platné od: 11.02.2026
          </div>
        </div>
      </div>
    </div>
  );
}
