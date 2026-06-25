'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, User, FileText, Bell } from 'lucide-react';
import Link from 'next/link';

export default function GDPRPage() {
  const sections = [
    {
      icon: User,
      title: 'Prevádzkovateľ',
      content: `YVETTIN Fashion s.r.o.
[Zapíšte presnú adresu sídla spoločnosti]
IČO: [Zapíšte IČO]
DIČ: [Zapíšte DIČ]
IČ DPH: [Zapíšte IČ DPH]

Zapísaná v Obchodnom registri Okresného súdu [mesto], oddiel: Sro, vložka č.: [číslo]`
    },
    {
      icon: Eye,
      title: 'Rozsah spracúvaných údajov',
      content: `Spracúvame nasledujúce kategórie osobných údajov:

• Identifikačné údaje (meno, priezvisko)
• Kontaktné údaje (email, telefón, adresa)
• Fakturačné údaje (adresa, IČO, DIČ)
• Informácie o objednávkach a nákupe
• Informácie o platbách
• IP adresa a cookies (pri návšteve webu)`
    },
    {
      icon: FileText,
      title: 'Účel spracúvania',
      content: `Vaše osobné údaje spracúvame na tieto účely:

1. Plnenie zmluvy – vybavenie objednávky, doručenie tovaru
2. Fakturácia a účtovníctvo – vyhotovenie daňových dokladov
3. Zákonné povinnosti – archivácia podľa zákona
4. Marketing – zasielanie newsletterov (s vášim súhlasom)
5. Zlepšovanie služieb – analýza návštevnosti a správania`
    },
    {
      icon: Lock,
      title: 'Právny základ',
      content: `Spracúvanie osobných údajov vykonávame na základe:

• Článok 6 ods. 1 písm. b) GDPR – plnenie zmluvy
• Článok 6 ods. 1 písm. c) GDPR – splnenie zákonnej povinnosti
• Článok 6 ods. 1 písm. a) GDPR – váš súhlas (marketing)
• Článok 6 ods. 1 písm. f) GDPR – oprávnený záujem`
    },
    {
      icon: Bell,
      title: 'Vaše práva',
      content: `Ako dotknutá osoba máte právo:

• Právo na prístup k údajom – zistiť, aké údaje spracúvame
• Právo na opravu – požiadať o opravu nepresných údajov
• Právo na vymazanie („právo byť zabudnutý“)
• Právo na obmedzenie spracúvania
• Právo na prenosnosť údajov
• Právo namietať voči spracúvaniu
• Právo odvolať súhlas

Tieto práva môžete uplatniť emailom na gdpr@yvettin.com`
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
              <Shield className="h-8 w-8 text-neutral-900" />
              <p className="text-sm font-medium tracking-wider text-neutral-500 uppercase">GDPR</p>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-neutral-900 mb-6">Ochrana osobných údajov</h1>
            <p className="text-lg text-neutral-600">
              Spoločnosť YVETTIN Fashion s.r.o. sa zaväzuje chrániť vaše osobné údaje 
              v súlade so všeobecným nariadením o ochrane údajov (GDPR).
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
                  <div className="text-neutral-600 whitespace-pre-line">{section.content}</div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-neutral-900 text-white rounded-xl p-8"
          >
            <h2 className="text-xl font-semibold mb-4">Kontakt na DPO</h2>
            <p className="text-neutral-300 mb-4">
              Ak máte akékoľvek otázky týkajúce sa spracovania vašich osobných údajov, 
              kontaktujte našu zodpovednú osobu:
            </p>
            <div className="space-y-2 text-sm">
              <p>Email: <a href="mailto:gdpr@yvettin.com" className="underline">gdpr@yvettin.com</a></p>
              <p>Adresa: YVETTIN Fashion s.r.o., [adresa sídla]</p>
            </div>
          </motion.div>

          {/* Last Updated */}
          <div className="mt-8 text-center text-sm text-neutral-500">
            Posledná aktualizácia: 11.02.2026
          </div>
        </div>
      </div>
    </div>
  );
}
