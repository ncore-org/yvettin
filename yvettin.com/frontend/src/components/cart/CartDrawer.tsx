'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCartStore } from '@/lib/store/cart';
import { formatPrice } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore(); // total je getter z CartStore
  const { toast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      onClose();
      window.location.href = '/kosik';
    }, 300);
  };

  const handleRemove = (productId: string, productName: string) => {
    removeItem(productId);
    toast({
      title: 'Odstránené z košíka',
      description: `${productName} bolo odstránené.`,
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:w-[480px] p-0 flex flex-col">
        <SheetHeader className="px-6 py-4 border-b border-neutral-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-6 w-6" />
              <SheetTitle>Košík ({items.length})</SheetTitle>
            </div>
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="h-12 w-12 text-neutral-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">Váš košík je prázdny</h3>
            <p className="text-neutral-500 text-center mb-6">
              Pridajte si produkty do košíka a pokračujte k objednávke.
            </p>
            <Button onClick={onClose} className="rounded-full">
              Pokračovať v nákupe
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={`${item.productId}-${item.variantId}`}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-4 pb-6 border-b border-neutral-100 last:border-0"
                  >
                    {/* Image */}
                    <Link
                      href={`/produkt/${item.product.slug}`}
                      className="relative w-24 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-100"
                      onClick={onClose}
                    >
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/produkt/${item.product.slug}`}
                        onClick={onClose}
                        className="block"
                      >
                        <p className="text-xs text-neutral-400 uppercase">{item.product.brand}</p>
                        <h4 className="font-medium text-neutral-900 truncate hover:text-neutral-600">
                          {item.product.name}
                        </h4>
                      </Link>

                      <p className="text-sm text-neutral-500 mt-1">
                        Veľkosť: {item.variant.size} · Farba: {item.variant.color}
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity */}
                        <div className="flex items-center border border-neutral-200 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.productId, item.variantId, Math.max(1, item.quantity - 1))}
                            className="p-2 hover:bg-neutral-100 transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                            className="p-2 hover:bg-neutral-100 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-semibold">
                          {formatPrice((item.product.discountPrice || item.product.price) * item.quantity)}
                        </span>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => handleRemove(item.productId, item.product.name)}
                      className="p-2 text-neutral-400 hover:text-red-500 transition-colors self-start"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="border-t border-neutral-100 p-6 space-y-4 bg-neutral-50">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Medzisúčet</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Doprava</span>
                  <span className="text-green-600">Zadarmo</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-neutral-200">
                  <span>Celkom</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full h-14 text-base rounded-full"
              >
                {isCheckingOut ? (
                  'Prechádzam k pokladni...'
                ) : (
                  <>
                    Pokračovať k objednávke
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              <Button variant="outline" onClick={onClose} className="w-full rounded-full">
                Pokračovať v nákupe
              </Button>

              <p className="text-xs text-center text-neutral-500">
                Doprava zdarma pri objednávke nad 50 €
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
