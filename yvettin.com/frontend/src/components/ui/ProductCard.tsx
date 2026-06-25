'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  showDiscount?: boolean;
}

export default function ProductCard({ product, showDiscount = false }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);

  const hasDiscount = product.discountPrice !== null && product.discountPrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
    : 0;

  return (
    <div className="group relative">
      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden mb-3">
        <Link href={`/produkt/${product.slug}`}>
          {!imageError && product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-200">
              <span className="text-neutral-400 text-sm">{product.name}</span>
            </div>
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && <Badge className="bg-white text-neutral-900 text-xs">NOVÉ</Badge>}
          {product.bestseller && (
            <Badge className="bg-neutral-900 text-white text-xs">BESTSELLER</Badge>
          )}
          {(showDiscount || hasDiscount) && discountPercent > 0 && (
            <Badge className="bg-red-600 text-white text-xs">-{discountPercent}%</Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={cn(
            'absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all',
            'bg-white/80 hover:bg-white backdrop-blur-sm',
            isWishlisted && 'text-red-600'
          )}
        >
          <Heart className={cn('h-4 w-4', isWishlisted && 'fill-current')} />
        </button>

        {/* Quick Add - Appears on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full h-10 bg-white text-sm font-medium text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors">
            Pridať do košíka
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-1">
        <p className="text-xs text-neutral-500">{product.brand}</p>

        <Link href={`/produkt/${product.slug}`}>
          <h3 className="text-sm font-medium text-neutral-900 line-clamp-1 hover:text-neutral-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2">
          {hasDiscount ? (
            <>
              <span className="text-sm font-medium text-red-600">
                {product.discountPrice?.toFixed(2)} €
              </span>
              <span className="text-sm text-neutral-400 line-through">
                {product.price.toFixed(2)} €
              </span>
            </>
          ) : (
            <span className="text-sm font-medium text-neutral-900">
              {product.price.toFixed(2)} €
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
