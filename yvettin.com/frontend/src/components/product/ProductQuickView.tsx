'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingCart, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import Image from 'next/image';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/lib/store/cart';
import { useCartUIStore } from '@/lib/store/cart-ui';
import { useWishlistStore } from '@/lib/store/wishlist';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductQuickView({ product, isOpen, onClose }: ProductQuickViewProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const { toast } = useToast();
  const openCart = useCartUIStore(state => state.open);
  const addToCart = useCartStore(state => state.addItem);
  const addToWishlist = useWishlistStore(state => state.addItem);
  const isInWishlist = useWishlistStore(state => product ? state.isInWishlist(product.id) : false);

  if (!product) return null;

  const currentPrice = product.discountPrice || product.price;
  const hasDiscount = product.discountPrice !== null;
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
    : 0;

  // Get unique sizes and colors
  const sizes = [...new Set(product.variants.map(v => v.size).filter(Boolean))];
  const colors = [...new Set(product.variants.map(v => ({ name: v.color, hex: v.colorHex })).filter(c => c.name))];

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: 'Vyberte veľkosť a farbu',
        description: 'Pre pridanie do košíka vyberte veľkosť a farbu.',
        variant: 'destructive',
      });
      return;
    }

    const variant = product.variants.find(
      v => v.size === selectedSize && v.color === selectedColor
    );

    if (!variant) {
      toast({
        title: 'Kombinácia nie je dostupná',
        description: 'Táto kombinácia veľkosti a farby nie je dostupná.',
        variant: 'destructive',
      });
      return;
    }

    if (variant.stock === 0) {
      toast({
        title: 'Produkt nie je na sklade',
        description: 'Táto varianta je momentálne vypredaná.',
        variant: 'destructive',
      });
      return;
    }

    setIsAddingToCart(true);
    await new Promise(resolve => setTimeout(resolve, 300));

    addToCart({
      productId: product.id,
      variantId: variant.id,
      quantity: 1,
      product,
      variant,
    });

    toast({
      title: 'Pridané do košíka',
      description: `${product.name} bolo pridané do košíka.`,
    });

    setIsAddingToCart(false);
    onClose();
    openCart();
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      toast({
        title: 'Už je v wishliste',
        description: 'Tento produkt už máte v wishliste.',
      });
    } else {
      addToWishlist(product.id);
      toast({
        title: 'Pridané do wishlistu',
        description: `${product.name} bolo pridané do wishlistu.`,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Section */}
          <div className="relative bg-neutral-100">
            <div className="aspect-square relative">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-neutral-400">{product.name}</span>
                </div>
              )}
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-neutral-900 text-white px-3 py-1 text-xs font-medium">
                    NOVÉ
                  </span>
                )}
                {hasDiscount && (
                  <span className="bg-red-600 text-white px-3 py-1 text-xs font-medium">
                    -{discountPercentage}%
                  </span>
                )}
                {product.bestseller && (
                  <span className="bg-white text-neutral-900 border border-neutral-900 px-3 py-1 text-xs font-medium">
                    BESTSELLER
                  </span>
                )}
              </div>

              {/* Image Navigation */}
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage(prev => (prev > 0 ? prev - 1 : product.images!.length - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImage(prev => (prev < product.images!.length - 1 ? prev + 1 : 0))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 justify-center">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={cn(
                      'w-16 h-16 border-2 transition-all',
                      selectedImage === idx
                        ? 'border-neutral-900'
                        : 'border-white/50 hover:border-white'
                    )}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} - ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="p-6 md:p-8 flex flex-col">
            <div className="mb-6">
              <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">
                {product.brand}
              </p>
              <h2 className="text-xl md:text-2xl font-medium text-neutral-900 mb-2">
                {product.name}
              </h2>
              <p className="text-sm text-neutral-600 mb-4">
                {product.shortDescription}
              </p>
              
              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-medium text-neutral-900">
                  {formatPrice(currentPrice)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-lg text-neutral-400 line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-sm text-red-600 font-medium">
                      Ušetríte {formatPrice(product.price - product.discountPrice!)}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Colors */}
            {colors.length > 0 && (
              <div className="mb-6">
                <label className="text-sm font-medium text-neutral-900 mb-3 block">
                  Farba {selectedColor && `- ${selectedColor}`}
                </label>
                <div className="flex gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name!)}
                      className={cn(
                        'w-10 h-10 rounded-full border-2 transition-all',
                        selectedColor === color.name
                          ? 'border-neutral-900 scale-110'
                          : 'border-transparent hover:scale-105'
                      )}
                      style={{ backgroundColor: color.hex }}
                      title={color.name!}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {sizes.length > 0 && (
              <div className="mb-6">
                <label className="text-sm font-medium text-neutral-900 mb-3 block">
                  Veľkosť {selectedSize && `- ${selectedSize}`}
                </label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => {
                    const variant = product.variants.find(
                      v => v.size === size && (!selectedColor || v.color === selectedColor)
                    );
                    const inStock = variant?.stock > 0 ?? false;
                    
                    return (
                      <button
                        key={size}
                        onClick={() => inStock && setSelectedSize(size!)}
                        disabled={!inStock}
                        className={cn(
                          'min-w-[3rem] h-10 px-3 border text-sm font-medium transition-all',
                          selectedSize === size
                            ? 'border-neutral-900 bg-neutral-900 text-white'
                            : inStock
                            ? 'border-neutral-200 hover:border-neutral-900'
                            : 'border-neutral-100 text-neutral-300 cursor-not-allowed line-through'
                        )}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-auto space-y-3">
              <Button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="w-full h-12 bg-neutral-900 hover:bg-neutral-800 text-white"
              >
                {isAddingToCart ? (
                  <>Pridávam...</>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Pridať do košíka
                  </>
                )}
              </Button>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleWishlistToggle}
                  className={cn(
                    'flex-1 h-12',
                    isInWishlist && 'border-red-600 text-red-600'
                  )}
                >
                  <Heart className={cn('mr-2 h-5 w-5', isInWishlist && 'fill-red-600')} />
                  {isInWishlist ? 'V wishliste' : 'Wishlist'}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 h-12"
                >
                  Zavrieť
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
