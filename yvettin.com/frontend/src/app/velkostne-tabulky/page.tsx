'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Ruler, Info } from 'lucide-react';

const sizeData = {
  women: [
    { size: 'XS', chest: '80-84', waist: '62-66', hips: '86-90', inseam: '76' },
    { size: 'S', chest: '84-88', waist: '66-70', hips: '90-94', inseam: '77' },
    { size: 'M', chest: '88-94', waist: '70-76', hips: '94-100', inseam: '78' },
    { size: 'L', chest: '94-100', waist: '76-82', hips: '100-106', inseam: '79' },
    { size: 'XL', chest: '100-106', waist: '82-88', hips: '106-112', inseam: '80' },
  ],
  men: [
    { size: 'S', chest: '88-94', waist: '76-82', hips: '92-98', inseam: '78' },
    { size: 'M', chest: '94-100', waist: '82-88', hips: '98-104', inseam: '80' },
    { size: 'L', chest: '100-106', waist: '88-94', hips: '104-110', inseam: '82' },
    { size: 'XL', chest: '106-112', waist: '94-100', hips: '110-116', inseam: '84' },
    { size: 'XXL', chest: '112-118', waist: '100-106', hips: '116-122', inseam: '86' },
  ],
};

const shoeSizes = {
  women: [
    { eu: '36', uk: '3.5', us: '5.5', cm: '22.5' },
    { eu: '37', uk: '4', us: '6', cm: '23' },
    { eu: '38', uk: '5', us: '7', cm: '24' },
    { eu: '39', uk: '6', us: '8', cm: '25' },
    { eu: '40', uk: '6.5', us: '8.5', cm: '25.5' },
    { eu: '41', uk: '7', us: '9', cm: '26' },
  ],
  men: [
    { eu: '40', uk: '6.5', us: '7', cm: '25.5' },
    { eu: '41', uk: '7', us: '8', cm: '26' },
    { eu: '42', uk: '8', us: '9', cm: '27' },
    { eu: '43', uk: '9', us: '10', cm: '28' },
    { eu: '44', uk: '9.5', us: '10.5', cm: '28.5' },
    { eu: '45', uk: '10.5', us: '11.5', cm: '29.5' },
    { eu: '46', uk: '11', us: '12', cm: '30' },
  ],
};

export default function SizeGuidePage() {
  const [activeTab, setActiveTab] = useState<'women' | 'men'>('women');
  const [activeSection, setActiveSection] = useState<'clothes' | 'shoes'>('clothes');

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
            <p className="text-sm font-medium tracking-wider text-neutral-500 uppercase mb-4">Veľkostné tabuľky</p>
            <h1 className="text-4xl md:text-5xl font-light text-neutral-900 mb-6">Nájdite svoju ideálnu veľkosť</h1>
            <p className="text-lg text-neutral-600">
              Presné merania pre dámske a pánske kolekcie, aby ste objednali správnu 
              veľkosť na prvý pokus.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-12 md:py-16">
        {/* How to Measure */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 border border-neutral-100 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
              <Ruler className="h-5 w-5 text-neutral-600" />
            </div>
            <h2 className="text-xl font-semibold">Ako sa správne merať</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Hrudník',
                desc: 'Merajte v najširšom mieste cez lopatky a prsia. Ruky majte voľne spustené po tele.',
              },
              {
                title: 'Pás',
                desc: 'Merajte v najužšom mieste trupu, zvyčajne tesne nad pupkom. Neťahajte pásimeter príliš.',
              },
              {
                title: 'Boky',
                desc: 'Merajte v najširšom bode panvy, približne 20 cm pod pásom. Postojte vzpriamene.',
              },
            ].map((item, index) => (
              <div key={item.title} className="bg-neutral-50 rounded-xl p-5">
                <div className="text-sm font-medium text-neutral-500 mb-1">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Size Tables */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-neutral-100 overflow-hidden"
        >
          {/* Tabs */}
          <div className="border-b border-neutral-100">
            <div className="flex">
              <button
                onClick={() => setActiveTab('women')}
                className={`flex-1 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'women'
                    ? 'bg-neutral-900 text-white'
                    : 'bg-white text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                Dámske veľkosti
              </button>
              <button
                onClick={() => setActiveTab('men')}
                className={`flex-1 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'men'
                    ? 'bg-neutral-900 text-white'
                    : 'bg-white text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                Pánske veľkosti
              </button>
            </div>
          </div>

          {/* Section Toggle */}
          <div className="p-6 border-b border-neutral-100">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveSection('clothes')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeSection === 'clothes'
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
              >
                Oblečenie
              </button>
              <button
                onClick={() => setActiveSection('shoes')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeSection === 'shoes'
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
              >
                Topánky
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="p-6">
            {activeSection === 'clothes' ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4 font-medium text-neutral-500">Veľkosť</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-500">Hrudník (cm)</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-500">Pás (cm)</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-500">Boky (cm)</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-500">Dĺžka nohavíc (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeData[activeTab].map((row) => (
                      <tr key={row.size} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-4 px-4 font-semibold">{row.size}</td>
                        <td className="py-4 px-4 text-neutral-600">{row.chest}</td>
                        <td className="py-4 px-4 text-neutral-600">{row.waist}</td>
                        <td className="py-4 px-4 text-neutral-600">{row.hips}</td>
                        <td className="py-4 px-4 text-neutral-600">{row.inseam}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4 font-medium text-neutral-500">EU</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-500">UK</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-500">US</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-500">Dĺžka chodidla (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shoeSizes[activeTab].map((row) => (
                      <tr key={row.eu} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-4 px-4 font-semibold">{row.eu}</td>
                        <td className="py-4 px-4 text-neutral-600">{row.uk}</td>
                        <td className="py-4 px-4 text-neutral-600">{row.us}</td>
                        <td className="py-4 px-4 text-neutral-600">{row.cm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>

        {/* Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-amber-50 border border-amber-100 rounded-xl p-6 flex items-start gap-4"
        >
          <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-1">Dôležité upozornenie</h3>
            <p className="text-sm text-amber-800">
              Uvedené rozmery sú orientačné a môžu sa mierne líšiť v závislosti od strihu a materiálu. 
              Ak sa nachádzate medzi dvoma veľkosťami, odporúčame zvoliť väčšiu. Pri akýchkoľvek 
              otázkach nás neváhajte kontaktovať.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
