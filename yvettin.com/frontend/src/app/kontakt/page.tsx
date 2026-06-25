'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    orderNumber: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: 'Správa odoslaná',
      description: 'Odpovieme vám do 24 hodín.',
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'podpora@yvettin.com',
      description: 'Odpovedáme do 24h',
    },
    {
      icon: Phone,
      title: 'Telefón',
      value: '+421 900 123 456',
      description: 'Po-Pia: 8:00 - 17:00',
    },
    {
      icon: MapPin,
      title: 'Adresa',
      value: 'Yvettin Fashion s.r.o.',
      description: 'Prievozská 18, 821 09 Bratislava',
    },
    {
      icon: Clock,
      title: 'Otváracie hodiny',
      value: 'Pondelok - Piatok',
      description: '8:00 - 17:00',
    },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="container-custom py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto bg-white rounded-2xl shadow-sm border border-neutral-100 p-12 text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-semibold mb-4">Ďakujeme za správu!</h1>
            <p className="text-neutral-600 mb-8">
              Vaša správa bola úspešne odoslaná. Náš tím vám odpovie do 24 hodín.
            </p>
            <Button onClick={() => setIsSubmitted(false)} variant="outline" className="rounded-full">
              Poslať ďalšiu správu
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

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
            <p className="text-sm font-medium tracking-wider text-neutral-500 uppercase mb-4">Kontakt</p>
            <h1 className="text-4xl md:text-5xl font-light text-neutral-900 mb-6">Sme tu pre vás</h1>
            <p className="text-lg text-neutral-600">
              Máte otázku? Náš tím je pripravený pomôcť vám s akýmkoľvek dotazom 
              týkajúcim sa vašej objednávky, produktov alebo služieb.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-4">
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-neutral-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-neutral-600" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">{item.title}</p>
                    <p className="font-medium text-neutral-900">{item.value}</p>
                    <p className="text-sm text-neutral-500">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Company Info */}
            <div className="bg-neutral-900 text-white rounded-xl p-6">
              <h3 className="font-semibold mb-4">Firemné údaje</h3>
              <div className="space-y-2 text-sm text-neutral-300">
                <p>Yvettin Fashion s.r.o.</p>
                <p>Prievozská 18, 821 09 Bratislava</p>
                <p>IČO: 12 345 678 | DIČ: 2020 123 456</p>
                <p>IČ DPH: SK2020123456</p>
                <p className="pt-2 text-neutral-400">Zapísaná v OR SR Bratislava I, odd. Sro, vložka 123456/B</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8">
              <h2 className="text-xl font-semibold mb-6">Napíšte nám</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Meno a priezvisko *</label>
                    <Input
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ján Novák"
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email *</label>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jan.novak@email.sk"
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Telefón</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+421 900 123 456"
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Číslo objednávky</label>
                    <Input
                      value={formData.orderNumber}
                      onChange={e => setFormData({ ...formData, orderNumber: e.target.value })}
                      placeholder="YV12345678"
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Predmet *</label>
                  <select
                    required
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full h-12 px-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-neutral-200 focus:border-neutral-400"
                  >
                    <option value="">Vyberte predmet</option>
                    <option value="objednavka">Otázka k objednávke</option>
                    <option value="vratenie">Vrátenie / reklamácia</option>
                    <option value="produkt">Informácie o produkte</option>
                    <option value="velkost">Poradenstvo veľkosti</option>
                    <option value="spolupraca">Spolupráca / B2B</option>
                    <option value="ine">Iné</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Správa *</label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Popíšte váš dotaz čo najpodrobnejšie..."
                    rows={6}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-full"
                >
                  {isSubmitting ? (
                    'Odosielanie...'
                  ) : (
                    <>
                      Odoslať správu
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-neutral-500 text-center">
                  Kliknutím na "Odoslať správu" súhlasíte so spracovaním osobných údajov.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
