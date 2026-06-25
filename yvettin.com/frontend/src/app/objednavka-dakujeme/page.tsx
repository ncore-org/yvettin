'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Package, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ThankYouPage() {
  const orderNumber = `YV${Date.now().toString().slice(-8)}`;

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <header className="bg-white border-b border-neutral-100 py-4">
        <div className="container-custom">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            YVETTIN<span className="text-neutral-400">®</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full bg-white rounded-2xl border border-neutral-100 p-8 md:p-12 text-center"
        >
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>

          <h1 className="text-2xl md:text-3xl font-semibold mb-4">
            Ďakujeme za objednávku!
          </h1>
          
          <p className="text-neutral-600 mb-6">
            Vaša objednávka bola úspešne prijatá a spracovávame ju.
          </p>

          {/* Order Number */}
          <div className="bg-neutral-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-neutral-500 mb-1">Číslo objednávky</p>
            <p className="text-xl font-mono font-semibold">{orderNumber}</p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-neutral-50 rounded-xl">
              <Package className="h-6 w-6 text-neutral-400 mx-auto mb-2" />
              <p className="text-sm text-neutral-600">Dodanie do 2-3 dní</p>
            </div>
            <div className="p-4 bg-neutral-50 rounded-xl">
              <Mail className="h-6 w-6 text-neutral-400 mx-auto mb-2" />
              <p className="text-sm text-neutral-600">Potvrdenie emailom</p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button asChild className="w-full h-12 rounded-full">
              <Link href="/">
                Pokračovať v nákupe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="w-full h-12 rounded-full">
              <Link href="/account">
                Zobraziť moje objednávky
              </Link>
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
