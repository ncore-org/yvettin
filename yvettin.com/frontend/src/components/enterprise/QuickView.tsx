'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Heart, Share2, ShoppingCart, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useBreakpoint, useSwipe } from '@/lib/hooks/use-enterprise';

interface QuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

// Image Gallery Component
function ImageGallery({ images, productName }: { images: string[]; productName: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe(
    () => setCurrentIndex(prev => Math.min(prev + 1, images.length - 1)),
    () => setCurrentIndex(prev => Math.max(prev - 1, 0))
  );

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-neutral-100 flex items-center justify-center">
        <span className="text-neutral-400 text-sm">{productName}</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className="aspect-square bg-neutral-100 overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${productName} - ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.2 }}
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentIndex(prev => Math.max(prev - 1, 0))}
              disabled={currentIndex === 0}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm disabled:opacity-30 hover:bg-white transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrentIndex(prev => Math.min(prev + 1, images.length - 1))}
              disabled={currentIndex === images.length - 1}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm disabled:opacity-30 hover:bg-white transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`flex-shrink-0 w-16 h-16 border-2 overflow-hidden transition-colors ${
                idx === currentIndex ? 'border-neutral-900' : 'border-transparent'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              idx === currentIndex ? 'bg-neutral-900' : 'bg-neutral-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Size Selector Component
function SizeSelector({
  sizes,
  selectedSize,
  onSelect,
}: {
  sizes: string[];
  selectedSize: string | null;
  onSelect: (size: string) => void;
}) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-neutral-900">Veľkosť</label>
      <div className="flex flex-wrap gap-2">
        {sizes.map(size => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={`min-w-[3rem] px-3 py-2 text-sm border transition-all ${
              selectedSize === size
                ? 'border-neutral-900 bg-neutral-900 text-white'
                : 'border-neutral-200 hover:border-neutral-400 text-neutral-700'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}

// QuickView Modal Component
export function QuickView({ product, isOpen, onClose, onPrev, onNext }: QuickViewProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { toast } = useToast();
  const { isMobile } = useBreakpoint();

  const handleAddToCart = useCallback(() => {
    if (!selectedSize && product?.variants.some(v => v.size)) {
      toast({
        title: 'Vyberte veľkosť',
        description: 'Prosím, vyberte veľkosť pred pridaním do košíka.',
        variant: 'destructive',
      });
      return;
    }

    setIsAddingToCart(true);
    setTimeout(() => {
      setIsAddingToCart(false);
      toast({
        title: 'Pridané do košíka',
        description: `${product?.name} bolo pridané do košíka.`,
      });
      onClose();
    }, 600);
  }, [product, selectedSize, toast, onClose]);

  const handleWishlist = useCallback(() => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? 'Odstránené z wishlistu' : 'Pridané do wishlistu',
      description: `${product?.name} ${isWishlisted ? 'bolo odstránené' : 'bolo pridané'}.`,
    });
  }, [isWishlisted, product, toast]);

  if (!product) return null;

  const currentPrice = product.discountPrice || product.price;
  const hasDiscount = product.discountPrice !== null;
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
    : 0;

  const sizes = [...new Set(product.variants.map(v => v.size).filter(Boolean))];
  const images = product.images || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden">
        <DialogTitle className="sr-only">{product.name} - Quick View</DialogTitle>

        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 hover:bg-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} h-full`}>
          {/* Image Section */}
          <div className="bg-neutral-50">
            <ImageGallery images={images} productName={product.name} />
          </div>

          {/* Product Info Section */}
          <ScrollArea className={`${isMobile ? 'h-[50vh]' : 'h-[600px]'}`}>
            <div className="p-6 space-y-6">
              {/* Header */}
              <div>
                <p className="text-sm text-neutral-500 uppercase tracking-wider">{product.brand}</p>
                <h2 className="text-xl font-medium text-neutral-900 mt-1">{product.name}</h2>

                <div className="flex items-center gap-3 mt-3">
                  <span className="text-lg font-medium">{formatPrice(currentPrice)}</span>
                  {hasDiscount && (
                    <>
                      <span className="text-sm text-neutral-400 line-through">
                        {formatPrice(product.price)}
                      </span>
                      <Badge variant="destructive" className="bg-red-600">
                        -{discountPercentage}%
                      </Badge>
                    </>
                  )}
                </div>
              </div>

              <Separator />

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {product.isNew && <Badge variant="secondary">NOVÉ</Badge>}
                {product.bestseller && <Badge variant="outline">BESTSELLER</Badge>}
                {product.sustainable && (
                  <Badge variant="secondary" className="text-green-700">
                    Udržateľné
                  </Badge>
                )}
              </div>

              {/* Size Selector */}
              {sizes.length > 0 && (
                <SizeSelector
                  sizes={sizes}
                  selectedSize={selectedSize}
                  onSelect={setSelectedSize}
                />
              )}

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full bg-neutral-900 hover:bg-neutral-800 h-12 text-base"
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                >
                  {isAddingToCart ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Pridané
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Pridať do košíka
                    </>
                  )}
                </Button>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={handleWishlist}>
                    <Heart
                      className={`mr-2 h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
                    />
                    {isWishlisted ? 'V wishliste' : 'Wishlist'}
                  </Button>

                  <Button variant="outline" className="flex-1">
                    <Share2 className="mr-2 h-4 w-4" />
                    Zdieľať
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Product Details */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Popis</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Navigation Arrows (if prev/next available) */}
              {(onPrev || onNext) && (
                <div className="flex justify-between pt-4">
                  {onPrev && (
                    <Button variant="ghost" onClick={onPrev}>
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Predchádzajúci
                    </Button>
                  )}
                  {onNext && (
                    <Button variant="ghost" onClick={onNext} className="ml-auto">
                      Ďalší
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default QuickView;
