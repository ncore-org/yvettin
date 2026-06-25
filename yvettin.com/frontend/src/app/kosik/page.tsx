'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store/cart';
import { formatPrice } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function KosikPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();
  const { toast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      window.location.href = '/checkout';
    }, 500);
  };

  if (items.length === 0) {
    return (
      <div className="container-custom py-16 md:py-24">
        <div className="max-w-md mx-auto text-center">
          <div className="w-32 h-32 mx-auto mb-8 bg-neutral-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="h-16 w-16 text-neutral-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Váš košík je prázdny
          </h1>
          <p className="text-neutral-600 mb-8">
            Pridajte si produkty do košíka a pokračujte v nákupe.
          </p>
          <Link href="/">
            <Button className="h-12 px-8 bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Späť na nákupy
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
          Nákupný košík
        </h1>
        <p className="text-neutral-600">
          {items.length} {items.length === 1 ? 'produkt' : items.length < 5 ? 'produkty' : 'produktov'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 bg-white border border-neutral-200 rounded-xl"
            >
              {/* Product Image */}
              <div className="w-24 h-24 md:w-32 md:h-32 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-neutral-400" />
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <Link
                    href={`/produkt/${item.slug}`}
                    className="text-base font-medium text-neutral-900 hover:text-neutral-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-neutral-500 mt-1">{item.brand}</p>
                  {item.selectedSize && (
                    <p className="text-xs text-neutral-400 mt-1">
                      Veľkosť: {item.selectedSize}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(item.id, item.name)}
                    className="p-2 text-neutral-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="text-right">
                <p className="text-lg font-semibold text-neutral-900">
                  {formatPrice(item.price * item.quantity)}
                </p>
                {item.discountPrice && (
                  <p className="text-sm text-neutral-400 line-through">
                    {formatPrice(item.price)}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* Clear Cart Button */}
          <div className="pt-4">
            <Button
              variant="outline"
              onClick={clearCart}
              className="h-11 px-6 border-neutral-300 text-neutral-600 hover:text-red-600 hover:border-red-300"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Vyprázdniť košík
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-neutral-50 rounded-2xl p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">
              Zhrnutie objednávky
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Medzisúčet</span>
                <span className="font-medium text-neutral-900">{formatPrice(total)}</span>
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

            {/* Checkout Button */}
            <Button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full h-12 bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-full shadow-lg transition-all"
            >
              {isCheckingOut ? (
                'Prebieha spracovanie...'
              ) : (
                <>
                  Pokračovať k pokladni
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>

            {/* Continue Shopping */}
            <Link href="/">
              <Button
                variant="ghost"
                className="w-full h-11 mt-3 text-neutral-600 hover:text-neutral-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Späť na nákupy
              </Button>
            </Link>

            {/* Trust Badges */}
            <div className="mt-6 pt-6 border-t border-neutral-200">
              <div className="space-y-3 text-xs text-neutral-500">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Doprava zdarma nad 50€</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Možnosť vrátenia do 30 dní</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Bezpečná platba</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
