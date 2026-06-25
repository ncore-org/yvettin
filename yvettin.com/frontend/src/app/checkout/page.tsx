'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Truck, CreditCard, Check, Smartphone, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useCartStore } from '@/lib/store/cart';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple-pay' | 'google-pay' | 'bank' | 'paypal'>('card');

  // Card form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardName, setCardName] = useState('');

  const handleOrder = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    clearCart();
    window.location.href = '/objednavka-dakujeme';
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-semibold mb-4">Váš košík je prázdny</h1>
        <Button asChild>
          <Link href="/">Pokračovať v nákupe</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-100 py-4">
        <div className="container-custom flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            YVETTIN<span className="text-neutral-400">®</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Lock className="h-4 w-4" />
            Zabezpečená platba
          </div>
        </div>
      </header>

      <div className="container-custom py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div>
            {/* Step Indicator */}
            <div className="flex items-center gap-2 mb-8">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    s <= step
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-200 text-neutral-600'
                  }`}
                >
                  {s < step ? <Check className="w-4 h-4" /> : s}
                </div>
              ))}
            </div>

            {/* Step 1: Contact Info */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-semibold">Kontaktné údaje</h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="vas@email.sk" className="h-12" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Telefón</label>
                    <Input placeholder="+421 900 000 000" className="h-12" />
                  </div>

                  <Button onClick={() => setStep(2)} className="w-full h-12 rounded-full">
                    Pokračovať
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Shipping */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-semibold">Doprava a adresa</h2>

                <div className="space-y-3">
                  {[
                    { name: 'Kuriér DPD', price: 3.99, time: '1-2 pracovné dni' },
                    { name: 'Slovenská pošta', price: 2.99, time: '2-3 pracovné dni' },
                    { name: 'Zásielkovňa', price: 2.49, time: '2-3 pracovné dni' },
                    { name: 'Osobný odber', price: 0, time: 'Zadarmo' },
                  ].map((method) => (
                    <label
                      key={method.name}
                      className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl cursor-pointer hover:border-neutral-900 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <input type="radio" name="shipping" className="w-4 h-4" />
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-neutral-500">{method.time}</p>
                        </div>
                      </div>
                      <span className="font-medium">
                        {method.price === 0 ? 'Zadarmo' : `${method.price.toFixed(2)} €`}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ulica a číslo</label>
                    <Input placeholder="Hlavná 123" className="h-12" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">PSČ</label>
                      <Input placeholder="010 00" className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Mesto</label>
                      <Input placeholder="Žilina" className="h-12" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-12 rounded-full">
                    Späť
                  </Button>
                  <Button onClick={() => setStep(3)} className="flex-1 h-12 rounded-full">
                    Pokračovať
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-semibold">Platba</h2>

                {/* Payment Methods */}
                <div className="space-y-3">
                  <label
                    className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-neutral-900 bg-neutral-50'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="w-4 h-4"
                      />
                      <CreditCard className="h-5 w-5 text-neutral-400" />
                      <span className="font-medium">Platobná karta</span>
                    </div>
                  </label>

                  <label
                    className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                      paymentMethod === 'apple-pay'
                        ? 'border-neutral-900 bg-neutral-50'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'apple-pay'}
                        onChange={() => setPaymentMethod('apple-pay')}
                        className="w-4 h-4"
                      />
                      <Smartphone className="h-5 w-5 text-neutral-400" />
                      <span className="font-medium">Apple Pay</span>
                    </div>
                  </label>

                  <label
                    className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                      paymentMethod === 'google-pay'
                        ? 'border-neutral-900 bg-neutral-50'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'google-pay'}
                        onChange={() => setPaymentMethod('google-pay')}
                        className="w-4 h-4"
                      />
                      <Smartphone className="h-5 w-5 text-neutral-400" />
                      <span className="font-medium">Google Pay</span>
                    </div>
                  </label>

                  <label
                    className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                      paymentMethod === 'bank'
                        ? 'border-neutral-900 bg-neutral-50'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'bank'}
                        onChange={() => setPaymentMethod('bank')}
                        className="w-4 h-4"
                      />
                      <Building className="h-5 w-5 text-neutral-400" />
                      <span className="font-medium">Bankový prevod</span>
                    </div>
                  </label>

                  <label
                    className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                      paymentMethod === 'paypal'
                        ? 'border-neutral-900 bg-neutral-50'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'paypal'}
                        onChange={() => setPaymentMethod('paypal')}
                        className="w-4 h-4"
                      />
                      <span className="font-medium text-blue-600 font-bold">PayPal</span>
                    </div>
                  </label>
                </div>

                {/* Card Form - Show only if card payment selected */}
                {paymentMethod === 'card' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4 p-4 bg-neutral-50 rounded-xl"
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Číslo karty</label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                        <Input
                          placeholder="4242 4242 4242 4242"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="h-12 pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Meno na karte</label>
                      <Input
                        placeholder="JOZEF MRKVIČKA"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="h-12"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Dátum platnosti</label>
                        <Input
                          placeholder="MM/RR"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">CVC</label>
                        <Input
                          placeholder="123"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="h-12"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Terms */}
                <div className="flex items-start gap-2">
                  <Checkbox id="terms" />
                  <label htmlFor="terms" className="text-sm text-neutral-600">
                    Súhlasím s{' '}
                    <Link href="/obchodne-podmienky" className="underline">obchodnými podmienkami</Link>
                  </label>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1 h-12 rounded-full">
                    Späť
                  </Button>
                  <Button
                    onClick={handleOrder}
                    disabled={isProcessing}
                    className="flex-1 h-12 rounded-full bg-neutral-900 hover:bg-neutral-800"
                  >
                    {isProcessing ? 'Spracovávam...' : `Objednať za ${formatPrice(total)}`}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Zhrnutie objednávky</h2>

              {/* Products */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-neutral-500">Množstvo: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              {/* Price Summary */}
              <div className="border-t border-neutral-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Medzisúčet</span>
                  <span className="font-medium">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Doprava</span>
                  <span className="font-medium text-green-600">ZDARMA</span>
                </div>
                <div className="border-t border-neutral-200 pt-4">
                  <div className="flex justify-between text-base font-semibold">
                    <span className="text-neutral-900">Celkom</span>
                    <span className="text-neutral-900">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 p-4 bg-neutral-50 rounded-xl">
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Lock className="h-4 w-4" />
                  <span>Platba je zabezpečená pomocou SSL šifrovania</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
