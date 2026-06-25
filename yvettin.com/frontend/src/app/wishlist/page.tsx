'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlistStore } from '@/lib/store/wishlist';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  
  const wishlistProducts = items
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-100 py-4">
        <div className="container-custom flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            YVETTIN<span className="text-neutral-400">®</span>
          </Link>
          <Link href="/account" className="text-sm text-neutral-600 hover:text-neutral-900">
            Môj účet
          </Link>
        </div>
      </header>

      <main className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-semibold mb-2">Moje obľúbené</h1>
          <p className="text-neutral-500 mb-8">
            {wishlistProducts.length} {wishlistProducts.length === 1 ? 'produkt' : 'produkty'}
          </p>

          {wishlistProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
              <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-10 w-10 text-neutral-400" />
              </div>
              <h2 className="text-xl font-medium mb-2">Váš wishlist je prázdny</h2>
              <p className="text-neutral-500 mb-6">
                Pridajte si produkty, ktoré sa vám páčia, a uložte si ich na neskôr.
              </p>
              <Button asChild className="rounded-full">
                <Link href="/">
                  Prezerať produkty
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistProducts.map((product, index) => (
                <motion.div
                  key={product!.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl border border-neutral-100 overflow-hidden group"
                >
                  <Link href={`/produkt/${product!.slug}`} className="block relative aspect-[3/4]">
                    <Image
                      src={product!.images[0]}
                      alt={product!.name}
                      fill
                      className="object-cover"
                    />
                  </Link>
                  
                  <div className="p-4">
                    <p className="text-xs text-neutral-400 uppercase">{product!.brand}</p>
                    <Link href={`/produkt/${product!.slug}`}>
                      <h3 className="font-medium text-neutral-900 mt-1 hover:text-neutral-600">
                        {product!.name}
                      </h3>
                    </Link>
                    
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="font-semibold">
                        {formatPrice(product!.discountPrice || product!.price)}
                      </span>
                      {product!.discountPrice && (
                        <span className="text-sm text-neutral-400 line-through">
                          {formatPrice(product!.price)}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Do košíka
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(product!.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
