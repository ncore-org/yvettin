'use client';

import CategoryBannerSlider, { BannerSlide } from '@/components/category/CategoryBannerSlider';
import ProductCard from '@/components/ui/ProductCard';
import BrandsCarousel from '@/components/sections/BrandsCarousel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';
import { TrendingUp, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useMemo } from 'react';

interface CategoryPageProps {
  slug: string;
  title: string;
  description: string;
  products: Product[];
  bannerSlides: BannerSlide[];
  isSpecialPage?: boolean;
  specialPageType?: 'sale' | 'new';
}

export default function CategoryPageTemplate({
  slug,
  title,
  description,
  products,
  bannerSlides,
  isSpecialPage = false,
  specialPageType,
}: CategoryPageProps) {
  const [activeSection, setActiveSection] = useState<'all' | 'bestsellers' | 'sale'>('all');

  const bestsellers = useMemo(
    () => products.filter(p => p.bestseller).slice(0, 12),
    [products]
  );

  const saleProducts = useMemo(
    () => products.filter(p => p.discountPrice !== null).slice(0, 12),
    [products]
  );

  const displayProducts = useMemo(() => {
    if (activeSection === 'bestsellers') return bestsellers;
    if (activeSection === 'sale') return saleProducts;
    return products;
  }, [activeSection, products, bestsellers, saleProducts]);

  return (
    <div className="min-h-screen bg-white">
      {/* Banner Slider */}
      <CategoryBannerSlider slides={bannerSlides} autoPlayInterval={15000} />

      {/* Category Header */}
      <div className="container-custom py-8 md:py-10">
        <div className="max-w-4xl">
          {!isSpecialPage ? (
            <>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Kategória</p>
              <h1 className="mt-2 font-display text-3xl md:text-4xl lg:text-5xl text-neutral-900">
                {title}
              </h1>
              <p className="mt-3 text-sm md:text-base text-neutral-600 leading-relaxed">
                {description}
              </p>
            </>
          ) : specialPageType === 'sale' ? (
            <>
              <div className="flex items-center gap-3 mb-3">
                <Badge className="bg-red-600 text-white hover:bg-red-700 px-3 py-1">
                  Až -70%
                </Badge>
                <Badge variant="outline" className="border-red-200 text-red-700">
                  Obmedzená ponuka
                </Badge>
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-neutral-900">
                {title}
              </h1>
              <p className="mt-3 text-sm md:text-base text-neutral-600">
                {description}
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-3">
                <Badge className="bg-neutral-900 text-white hover:bg-neutral-800 px-3 py-1">
                  Nová kolekcia
                </Badge>
                <Badge variant="outline" className="border-neutral-300 text-neutral-700">
                  Práve dorazené
                </Badge>
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-neutral-900">
                {title}
              </h1>
              <p className="mt-3 text-sm md:text-base text-neutral-600">
                {description}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      {!isSpecialPage && products.length > 0 && (
        <div className="container-custom pb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Button
              variant={activeSection === 'all' ? 'default' : 'ghost'}
              onClick={() => setActiveSection('all')}
              className="h-10 px-4 rounded-full whitespace-nowrap bg-neutral-900 hover:bg-neutral-800"
            >
              Všetky produkty
            </Button>
            <Button
              variant={activeSection === 'bestsellers' ? 'default' : 'ghost'}
              onClick={() => setActiveSection('bestsellers')}
              className="h-10 px-4 rounded-full whitespace-nowrap"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Najpredávanejšie
            </Button>
            <Button
              variant={activeSection === 'sale' ? 'default' : 'ghost'}
              onClick={() => setActiveSection('sale')}
              className="h-10 px-4 rounded-full whitespace-nowrap"
            >
              <Clock className="w-4 h-4 mr-2" />
              Výpredaj
            </Button>
          </div>
        </div>
      )}

      {/* Best in Category Section */}
      {!isSpecialPage && bestsellers.length > 0 && activeSection === 'all' && (
        <section className="py-12 md:py-16 bg-neutral-50">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-2xl md:text-3xl text-neutral-900">
                  To najlepšie z kategórie {title}
                </h2>
                <p className="mt-1 text-sm text-neutral-600">
                  Najobľúbenejšie kúsky podľa našich zákazníkov
                </p>
              </div>
              <Link
                href={`/${slug}`}
                className="hidden md:flex items-center gap-2 text-sm font-medium text-neutral-900 hover:text-neutral-700"
              >
                Zobraziť všetky
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
              {bestsellers.slice(0, 6).map(product => (
                <ProductCard key={product.id} product={product} showDiscount />
              ))}
            </div>
            <div className="mt-6 text-center md:hidden">
              <Link
                href={`/${slug}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900"
              >
                Zobraziť všetky
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Main Products Grid */}
      {displayProducts.length > 0 ? (
        <section className="py-12 md:py-16">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-2xl md:text-3xl text-neutral-900">
                  {activeSection === 'bestsellers' ? 'Najpredávanejšie' :
                   activeSection === 'sale' ? 'Výpredajové kúsky' :
                   'Všetky produkty'}
                </h2>
                <p className="mt-1 text-sm text-neutral-600">
                  {displayProducts.length} produktov
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
              {displayProducts.map(product => (
                <ProductCard key={product.id} product={product} showDiscount />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-16 md:py-24">
          <div className="container-custom">
            <div className="text-center">
              <h2 className="font-display text-2xl md:text-3xl text-neutral-900">
                Produkty sa pripravujú
              </h2>
              <p className="mt-3 text-neutral-600 max-w-md mx-auto">
                V tejto kategórii momentálne dopĺňame sortiment.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Brands Carousel */}
      <section className="py-12 md:py-16 border-t border-neutral-100">
        <div className="container-custom">
          <h2 className="font-display text-2xl md:text-3xl text-neutral-900 mb-8 text-center">
            Značky v tejto kategórii
          </h2>
          <BrandsCarousel />
        </div>
      </section>
    </div>
  );
}
