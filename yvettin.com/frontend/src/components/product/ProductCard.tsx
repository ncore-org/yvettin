'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, cn } from '@/lib/utils';
import { useWishlistStore } from '@/lib/store/wishlist';
import { useCartStore } from '@/lib/store/cart';
import { useCartUIStore } from '@/lib/store/cart-ui';
import { useBreakpoint, useTouchDevice } from '@/lib/hooks/use-enterprise';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  /**
   * Kompaktnejší layout pre carousely (aktuálne vizuálne totožný,
   * ale ponechávam hák do budúcna).
   */
  compact?: boolean;
}

export default function ProductCard({ product, onClick, onQuickView }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { isMobile } = useBreakpoint();
  const isTouch = useTouchDevice();
  const { toast } = useToast();

  const openCart = useCartUIStore(state => state.open);
  const isInWishlist = useWishlistStore(state => state.isInWishlist(product.id));
  const addToWishlist = useWishlistStore(state => state.addItem);
  const removeFromWishlist = useWishlistStore(state => state.removeItem);
  const addToCart = useCartStore(state => state.addItem);

  const handleWishlistToggle = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isInWishlist) {
        removeFromWishlist(product.id);
        toast({
          title: 'Odstránené z wishlistu',
          description: `${product.name} bolo odstránené z vášho wishlistu.`,
        });
      } else {
        addToWishlist(product.id);
        toast({
          title: 'Pridané do wishlistu',
          description: `${product.name} bolo pridané do vášho wishlistu.`,
        });
      }
    },
    [isInWishlist, product, addToWishlist, removeFromWishlist, toast]
  );

  const handleAddToCart = useCallback(
    async (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();

      setIsAddingToCart(true);
      const defaultVariant = product.variants[0];

      if (defaultVariant) {
        // Simulate network delay for better UX
        await new Promise(resolve => setTimeout(resolve, 300));

        addToCart({
          productId: product.id,
          variantId: defaultVariant.id,
          quantity: 1,
          product,
          variant: defaultVariant,
        });

        toast({
          title: 'Pridané do košíka',
          description: `${product.name} bolo pridané do košíka.`,
        });

        // Otvor cart drawer pre efekt "slide zľava" po pridaní
        openCart();
      }

      setIsAddingToCart(false);
    },
    [product, addToCart, toast]
  );

  const handleQuickView = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onQuickView?.(product);
    },
    [onQuickView, product]
  );

  const handleCardClick = useCallback(() => {
    onClick?.(product);
  }, [onClick, product]);

  const currentPrice = product.discountPrice || product.price;
  const hasDiscount = product.discountPrice !== null;
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
    : 0;

  // Get unique sizes and colors
  const sizes = [...new Set(product.variants.map(v => v.size).filter(Boolean))];
  const colors = [...new Set(product.variants.map(v => v.color).filter(Boolean))];

  // Show actions on hover (desktop) or always (mobile with touch)
  const showActions = isHovered || (isTouch && isMobile);

  // Get second image for hover effect
  const secondImage = product.images && product.images.length > 1 ? product.images[1] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col overflow-hidden bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link
        href={`/produkt/${product.slug}`}
        onClick={handleCardClick}
        className="relative aspect-[3/4] overflow-hidden bg-neutral-100 block"
      >
        {/* Primary Image */}
        <div className="absolute inset-0 flex items-center justify-center">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className={cn(
                "w-full h-full object-cover transition-all duration-500",
                secondImage && "group-hover:opacity-0"
              )}
              loading="lazy"
            />
          ) : (
            <span className="text-center text-xs text-neutral-400 px-4">{product.name}</span>
          )}
        </div>

        {/* Second Image on Hover */}
        {secondImage && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <img
              src={secondImage}
              alt={`${product.name} - alternatívny pohľad`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* Badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-1 pointer-events-none">
          {product.isNew && (
            <span className="bg-neutral-900 px-2 py-1 text-[10px] font-medium tracking-wider text-white">
              NOVÉ
            </span>
          )}
          {hasDiscount && (
            <span className="bg-red-600 px-2 py-1 text-[10px] font-medium tracking-wider text-white">
              -{discountPercentage}%
            </span>
          )}
          {product.bestseller && (
            <span className="border border-neutral-900 bg-white px-2 py-1 text-[10px] font-medium tracking-wider text-neutral-900">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Wishlist Button - Always visible on mobile, hover on desktop */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute right-2 top-2 p-2 rounded-full bg-white/90 shadow-sm transition-all duration-200 hover:bg-white touch-target ${
            isInWishlist
              ? 'opacity-100'
              : isMobile
                ? 'opacity-100'
                : 'opacity-0 group-hover:opacity-100'
          }`}
          aria-label={isInWishlist ? 'Odstrániť z wishlistu' : 'Pridať do wishlistu'}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isInWishlist ? 'fill-red-500 text-red-500' : 'text-neutral-600'
            }`}
          />
        </button>

        {/* Quick Actions Overlay */}
        <div
          className={`absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-sm border-t border-neutral-100 transition-all duration-300 ${
            showActions ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        >
          <div className="p-3 space-y-2">
            {/* Quick View Button */}
            {onQuickView && (
              <Button
                variant="outline"
                size="sm"
                className="w-full h-10 text-xs font-medium"
                onClick={handleQuickView}
              >
                <Eye className="mr-2 h-4 w-4" />
                Rýchly náhľad
              </Button>
            )}

            {/* Add to Cart Button */}
            <Button
              size="sm"
              className="w-full h-10 text-xs font-medium bg-neutral-900 hover:bg-neutral-800"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {isAddingToCart ? 'Pridávam...' : 'Pridať do košíka'}
            </Button>
          </div>
        </div>

        {/* Mobile-Only Swipe Hint */}
        {isMobile && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 pointer-events-none">
            {product.images?.map((_, idx) => (
              <div
                key={idx}
                className={`w-1.5 h-1.5 rounded-full ${
                  idx === 0 ? 'bg-neutral-900' : 'bg-neutral-300'
                }`}
              />
            ))}
          </div>
        )}
      </Link>

      {/* Product Details */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-[11px] sm:text-xs text-neutral-400 uppercase tracking-wider">
          {product.brand}
        </p>
        <h3 className="mt-1 text-sm font-normal text-neutral-900 line-clamp-2 group-hover:text-neutral-600 transition-colors">
          {product.name}
        </h3>

        {/* Price */}
        <div className="mt-auto pt-2 sm:pt-3">
          <div className="flex items-baseline gap-2 flex-wrap mb-1">
            <span className="text-sm sm:text-base font-medium text-neutral-900">
              {formatPrice(currentPrice)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-neutral-400 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Loyalty points preview */}

          {/* Available Sizes */}
          {sizes.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {sizes.slice(0, isMobile ? 3 : 4).map(size => (
                <span
                  key={size}
                  className="border border-neutral-200 px-1.5 py-0.5 text-[10px] text-neutral-500"
                >
                  {size}
                </span>
              ))}
              {sizes.length > (isMobile ? 3 : 4) && (
                <span className="px-1.5 py-0.5 text-[10px] text-neutral-400">
                  +{sizes.length - (isMobile ? 3 : 4)}
                </span>
              )}
            </div>
          )}
          {/* Available Colors */}
          {colors.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {colors.slice(0, isMobile ? 4 : 5).map((color, idx) => {
                // Get color hex from variants
                const variantWithColor = product.variants.find(v => v.color === color);
                const colorHex = variantWithColor?.colorHex || '#ccc';
                
                return (
                  <span
                    key={color}
                    className="w-4 h-4 rounded-full border border-neutral-200 shadow-sm"
                    style={{ backgroundColor: colorHex }}
                    title={color}
                  />
                );
              })}
              {colors.length > (isMobile ? 4 : 5) && (
                <span className="text-[10px] text-neutral-400 self-center">
                  +{colors.length - (isMobile ? 4 : 5)}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
