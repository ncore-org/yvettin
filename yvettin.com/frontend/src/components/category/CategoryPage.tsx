'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import CategoryBannerSlider, { BannerSlide } from './CategoryBannerSlider';
import ProductCard from '@/components/ui/ProductCard';
import BrandsCarousel from '@/components/sections/BrandsCarousel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';
import { cn } from '@/lib/utils';
import { TrendingUp, Star, Clock, ArrowRight } from 'lucide-react';

interface CategoryPageProps {
  slug: string;
  title: string;
  description: string;
  products: Product[];
  bannerSlides: BannerSlide[];
  isSpecialPage?: boolean; // for VÝPREDAJ, Novinky
  specialPageType?: 'sale' | 'new';
}

export default function CategoryPage({
  slug,
  title,
  description,
  products,
  bannerSlides,
  isSpecialPage = false,
  specialPageType,
}: CategoryPageProps) {
  const [activeSection, setActiveSection] = useState<'all' | 'bestsellers' | 'sale'>('all');

  // Filter products for different sections
  const bestsellers = useMemo(
    () => products.filter(p => p.bestseller).slice(0, 12),
    [products]
  );

  const saleProducts = useMemo(
    () => products.filter(p => p.discountPrice !== null).slice(0, 12),
    [products]
  );

  const lastChance = useMemo(
    () => products.filter(p => p.inStock && p.stockQuantity && p.stockQuantity < 10).slice(0, 8),
    [products]
  );

  // Get display products based on active section
  const displayProducts = useMemo(() => {
    if (activeSection === 'bestsellers') return bestsellers;
    if (activeSection === 'sale') return saleProducts;
    return products;
  }, [activeSection, products, bestsellers, saleProducts]);

  return (
    <div className="min-h-screen bg-white">
      {/* Banner Slider */}
      <CategoryBannerSlider slides={bannerSlides} autoPlayInterval={15000} />

      {/* Category Info */}
      {!isSpecialPage && (
        <div className="container-custom py-8 md:py-10">
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Kategória</p>
            <h1 className="mt-2 font-display text-3xl md:text-4xl lg:text-5xl text-neutral-900">
              {title}
            </h1>
            <p className="mt-3 text-sm md:text-base text-neutral-600 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      )}

      {/* Special Page Header */}
      {isSpecialPage && specialPageType === 'sale' && (
        <div className="container-custom py-8 md:py-10">
          <div className="max-w-4xl">
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
          </div>
        </div>
      )}

      {isSpecialPage && specialPageType === 'new' && (
        <div className="container-custom py-8 md:py-10">
          <div className="max-w-4xl">
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
          </div>
        </div>
      )}

      {/* Section Tabs */}
      {!isSpecialPage && products.length > 0 && (
        <div className="container-custom pb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Button
              variant={activeSection === 'all' ? 'default' : 'ghost'}
              onClick={() => setActiveSection('all')}
              className={cn(
                "h-10 px-4 rounded-full whitespace-nowrap",
                activeSection === 'all' ? "bg-neutral-900 hover:bg-neutral-800" : ""
              )}
            >
              Všetky produkty
            </Button>
            <Button
              variant={activeSection === 'bestsellers' ? 'default' : 'ghost'}
              onClick={() => setActiveSection('bestsellers')}
              className={cn(
                "h-10 px-4 rounded-full whitespace-nowrap",
                activeSection === 'bestsellers' ? "bg-neutral-900 hover:bg-neutral-800" : ""
              )}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Najpredávanejšie
            </Button>
            <Button
              variant={activeSection === 'sale' ? 'default' : 'ghost'}
              onClick={() => setActiveSection('sale')}
              className={cn(
                "h-10 px-4 rounded-full whitespace-nowrap",
                activeSection === 'sale' ? "bg-neutral-900 hover:bg-neutral-800" : ""
              )}
            >
              <Clock className="w-4 h-4 mr-2" />
              Výpredaj
            </Button>
          </div>
        </div>
      )}

      {/* Best in Category / Featured Section */}
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
                href={`/kategoria/${slug}`}
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
                href={`/kategoria/${slug}`}
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
                V tejto kategórii momentálne dopĺňame sortiment. Pozrite si naše ďalšie kategórie.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/novinky">
                  <Button className="bg-neutral-900 hover:bg-neutral-800 rounded-full">
                    Novinky
                  </Button>
                </Link>
                <Link href="/vypredaj">
                  <Button variant="outline" className="rounded-full">
                    Výpredaj
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Last Chance Section */}
      {!isSpecialPage && lastChance.length > 0 && activeSection === 'all' && (
        <section className="py-12 md:py-16 bg-gradient-to-r from-orange-50 to-red-50">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <h2 className="font-display text-2xl md:text-3xl text-neutral-900">
                    Posledné kusy
                  </h2>
                </div>
                <p className="mt-1 text-sm text-neutral-600">
                  Rýchlo, kým sú ešte dostupné!
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {lastChance.map(product => (
                <ProductCard key={product.id} product={product} showDiscount />
              ))}
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

      {/* Unique Element - Category Features */}
      <section className="py-12 md:py-16 bg-neutral-900 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <div className="w-12 h-12 mx-auto md:mx-0 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Prémiová kvalita</h3>
              <p className="text-neutral-300 text-sm">
                Starostlivo vybrané produkty od overených značiek
              </p>
            </div>
            <div className="text-center md:text-left">
              <div className="w-12 h-12 mx-auto md:mx-0 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Aktuálne trendy</h3>
              <p className="text-neutral-300 text-sm">
                Najnovšie módne kúsky pre túto sezónu
              </p>
            </div>
            <div className="text-center md:text-left">
              <div className="w-12 h-12 mx-auto md:mx-0 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <ArrowRight className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Rýchle dodanie</h3>
              <p className="text-neutral-300 text-sm">
                Doručenie do 2-3 pracovných dní zdarma
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
