'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Mail, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useBreakpoint } from '@/lib/hooks/use-enterprise';
import { useToast } from '@/hooks/use-toast';

const shopLinks = [
  { name: 'Ženy', href: '/kategoria/zeny' },
  { name: 'Muži', href: '/kategoria/muzi' },
  { name: 'Výpredaj', href: '/kategoria/vypredaj', highlight: true },
  { name: 'Novinky', href: '/kategoria/novinky' },
  { name: 'Značky', href: '/kategoria/znacky' },
];

const serviceLinks = [
  { name: 'Kontakt', href: '/kontakt' },
  { name: 'Doprava a platba', href: '/doprava' },
  { name: 'Výmena a vrátenie', href: '/vymena-vratenie' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Veľkostné tabuľky', href: '/velkostne-tabulky' },
  { name: 'Body za nákup', href: '/body-za-nakup' },
];

const legalLinks = [
  { name: 'GDPR', href: '/gdpr' },
  { name: 'Cookies', href: '/cookies' },
  { name: 'Obchodné podmienky', href: '/obchodne-podmienky' },
];

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
];

// Mobile Accordion Section
function FooterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useBreakpoint();

  if (!isMobile) {
    return (
      <div>
        <h3 className="text-sm font-medium tracking-wider text-neutral-900">{title}</h3>
        <div className="mt-4">{children}</div>
      </div>
    );
  }

  return (
    <div className="border-b border-neutral-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <h3 className="text-sm font-medium tracking-wider text-neutral-900">{title}</h3>
        <ChevronDown
          className={`h-4 w-4 text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="pb-4"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const { isMobile } = useBreakpoint();
  const { toast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast({
        title: 'Úspešne prihlásené!',
        description: 'Ďakujeme za prihlásenie na odber noviniek.',
      });
      setEmail('');
    }
  };

  return (
    <footer className="border-t border-neutral-100 bg-white">
      <div className="container-custom">
        {/* Main Footer */}
        <div
          className={`py-12 md:py-16 ${isMobile ? '' : 'grid md:grid-cols-2 lg:grid-cols-4 gap-8'}`}
        >
          {/* Brand */}
          <div className={isMobile ? 'mb-8' : ''}>
            <Link href="/" className="inline-block">
              <span className="text-lg font-light tracking-[0.25em] text-neutral-900">YVETTIN</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-neutral-500">
              Váš partner pre štýlovú módu a oblečenie. Kvalita, ktorej dôverujete.
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map(social => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target flex items-center justify-center text-neutral-400 transition-colors hover:text-neutral-900"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <FooterSection title="Nakupovanie">
            <ul className="space-y-3 text-sm">
              {shopLinks.map(link => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`transition-colors hover:text-neutral-900 ${
                      link.highlight ? 'text-red-600' : 'text-neutral-500'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterSection>

          {/* Customer Service */}
          <FooterSection title="Zákaznícky servis">
            <ul className="space-y-3 text-sm">
              {serviceLinks.map(link => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-500 transition-colors hover:text-neutral-900"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterSection>

          {/* Newsletter */}
          <div className={isMobile ? 'mt-8 pt-8 border-t border-neutral-100' : ''}>
            <h3 className="text-sm font-medium tracking-wider text-neutral-900">Newsletter</h3>
            <p className="mt-4 text-sm leading-relaxed text-neutral-500">
              Prihláste sa na odber a získajte 10% zľavu na prvý nákup.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="mt-4 flex gap-2">
              <Input
                type="email"
                placeholder="Váš email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 h-11 border-neutral-200 focus:border-neutral-400"
                required
              />
              <Button type="submit" className="h-11 px-4 bg-neutral-900 hover:bg-neutral-800">
                <Mail className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-neutral-100 py-6 text-xs text-neutral-500 md:flex-row">
          <p>© 2026 Yvettin. Všetky práva vyhradené.</p>
          <div className="flex gap-6">
            {legalLinks.map(link => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-neutral-900 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
