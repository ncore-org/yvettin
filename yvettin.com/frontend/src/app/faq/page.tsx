'use client';

import { motion } from 'framer-motion';
import { Search, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';

const faqCategories = [
  {
    id: 'objednavky',
    name: 'Objednávky',
    items: [
      {
        id: 'faq-1',
        question: 'Ako rýchlo je moja objednávka expedovaná?',
        answer:
          'Objednávky prijaté do 13:00 v pracovný deň expedujeme v ten istý deň. Pri vyššej vyťaženosti alebo sezónnom vrchole vás informujeme emailom. Po expedícii dostanete tracking číslo na sledovanie zásielky.',
      },
      {
        id: 'faq-2',
        question: 'Môžem zmeniť objednávku po zaplatení?',
        answer:
          'Áno, pokiaľ objednávka ešte nebola expedovaná. Kontaktujte podporu čo najskôr s číslom objednávky a požadovanou zmenou. Ak je tovar už na ceste, zmenu už nie je možné vykonať.',
      },
      {
        id: 'faq-3',
        question: 'Ako zistím stav mojej objednávky?',
        answer:
          'Stav objednávky môžete sledovať po prihlásení v sekcii „Moje objednávky“. Po expedícii vám príde email s tracking číslom, pomocou ktorého môžete sledovať doručenie na stránke prepravcu.',
      },
    ],
  },
  {
    id: 'velkosti',
    name: 'Veľkosti a produkty',
    items: [
      {
        id: 'faq-4',
        question: 'Ako vyberiem správnu veľkosť?',
        answer:
          'Odporúčame porovnať rozmery z veľkostnej tabuľky s vaším obľúbeným kúskom oblečenia. Pri nejasnostiach vám radi poradíme na podpore. Každý produkt má detailné rozmery v popise.',
      },
      {
        id: 'faq-5',
        question: 'Je tovar na sklade?',
        answer:
          'Áno, všetky produkty označené ako „Skladom“ máme fyzicky dostupné a expedujeme ihneď. Pri produktoch s označením „Na objednávku“ je dodacia lehota 7-14 dní.',
      },
      {
        id: 'faq-6',
        question: 'Aký materiál je použitý?',
        answer:
          'Pri každom produkte uvádzame presné zloženie materiálu. Dbáme na kvalitu a udržateľnosť. V prípade otázok o konkrétnom materiáli nás kontaktujte.',
      },
    ],
  },
  {
    id: 'platba',
    name: 'Platba a doprava',
    items: [
      {
        id: 'faq-7',
        question: 'Aké spôsoby platby akceptujete?',
        answer:
          'Akceptujeme platobné karty (Visa, Mastercard), Google Pay, Apple Pay, bankový prevod a dobierku. Platba je bezpečná a šifrovaná.',
      },
      {
        id: 'faq-8',
        question: 'Kedy mi príde objednávka?',
        answer:
          'Štandardná dodacia lehota je 1-3 pracovné dni. Pri objednávkach nad 50 € je doprava zdarma. Expresné doručenie je dostupné za príplatok.',
      },
    ],
  },
  {
    id: 'vratenie',
    name: 'Vrátenie a reklamácie',
    items: [
      {
        id: 'faq-9',
        question: 'Je možné vrátiť tovar zakúpený v akcii?',
        answer:
          'Áno, tovar vo výpredaji je možné vrátiť za rovnakých podmienok ako štandardný sortiment, pokiaľ nie je uvedené inak pri konkrétnom produkte. Lehota na vrátenie je 30 dní.',
      },
      {
        id: 'faq-10',
        question: 'Ako prebieha reklamácia?',
        answer:
          'Reklamáciu môžete uplatniť do 24 mesiacov od zakúpenia. Vyplňte formulár v sekcii „Kontakt“ alebo nám pošlite email s popisom vady a fotografiou. Reklamácie vybavujeme do 30 dní.',
      },
    ],
  },
];

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredFaq = faqCategories.flatMap((cat) =>
    cat.items
      .filter(
        (item) =>
          (activeCategory === 'all' || activeCategory === cat.id) &&
          (item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .map((item) => ({ ...item, category: cat.name }))
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <div className="bg-white border-b border-neutral-100">
        <div className="container-custom py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <p className="text-sm font-medium tracking-wider text-neutral-500 uppercase mb-4">FAQ</p>
            <h1 className="text-4xl md:text-5xl font-light text-neutral-900 mb-6">Často kladené otázky</h1>
            <p className="text-lg text-neutral-600 mb-8">
              Nájdite rýchle odpovede na najčastejšie otázky. Ak nenájdete čo hľadáte, 
              neváhajte nás kontaktovať.
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="search"
                placeholder="Hľadať v otázkach..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 border border-neutral-200 rounded-full focus:ring-2 focus:ring-neutral-200 focus:border-neutral-400"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Categories */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl border border-neutral-100 p-4 sticky top-4"
            >
              <h3 className="font-semibold mb-4 px-2">Kategórie</h3>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                    activeCategory === 'all'
                      ? 'bg-neutral-900 text-white'
                      : 'hover:bg-neutral-100'
                  }`}
                >
                  Všetky otázky
                  <ChevronRight className="h-4 w-4" />
                </button>
                {faqCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                      activeCategory === cat.id
                        ? 'bg-neutral-900 text-white'
                        : 'hover:bg-neutral-100'
                    }`}
                  >
                    {cat.name}
                    <span className="text-xs opacity-60">{cat.items.length}</span>
                  </button>
                ))}
              </nav>
            </motion.div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-neutral-100 p-6"
            >
              <Accordion type="single" collapsible className="w-full">
                {filteredFaq.map((item, index) => (
                  <AccordionItem key={item.id} value={item.id} className="border-b border-neutral-100">
                    <AccordionTrigger className="py-5 hover:no-underline">
                      <div className="flex items-center gap-3 text-left">
                        <span className="text-xs font-medium text-neutral-400 uppercase">
                          {item.category}
                        </span>
                        <span className="font-medium">{item.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5">
                      <p className="text-neutral-600 leading-relaxed pl-16">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {filteredFaq.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-neutral-500">Žiadne výsledky pre „{searchQuery}“</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                    className="text-sm text-neutral-900 underline mt-2"
                  >
                    Zobraziť všetky otázky
                  </button>
                </div>
              )}
            </motion.div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 bg-neutral-100 rounded-2xl p-8 text-center"
            >
              <h2 className="text-xl font-semibold mb-4">Nenašli ste odpoveď?</h2>
              <p className="text-neutral-600 mb-6">
                Náš tím je pripravený pomôcť vám s akýmikoľvek otázkami.
              </p>
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center h-11 px-6 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-colors"
              >
                Kontaktovať podporu
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
