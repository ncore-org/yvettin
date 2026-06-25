'use client';

import { useState } from 'react';
import { ResetGender } from '@/components/reset-gender';
import HeroBanner, { HeroSlide } from '@/components/sections/HeroBanner';
import TrustBanner from '@/components/sections/TrustBanner';
import BrandLogos from '@/components/sections/BrandLogos';
import NovinkySection from '@/components/sections/NovinkySection';
import BestsellerCarousel from '@/components/sections/BestsellerCarousel';
import SaleSection from '@/components/sections/SaleSection';
import CategoryGrid from '@/components/sections/CategoryGrid';
import NewsletterSection from '@/components/sections/NewsletterSection';
import ProductQuickView from '@/components/product/ProductQuickView';
import { products } from '@/data/products';
import { Product } from '@/types';

export default function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };
  // Get products for mixed homepage
  const newProducts = products.filter(p => p.isNew).slice(0, 3);
  const womenBestsellers = products
    .filter(p => (p.gender === 'women' || p.gender === 'unisex') && p.isBestseller)
    .slice(0, 6);
  const menBestsellers = products
    .filter(p => (p.gender === 'men' || p.gender === 'unisex') && p.isBestseller)
    .slice(0, 6);

  const mainCategories = [
    {
      name: 'Kabelky',
      href: '/kategoria/kabelky',
      image: '/images/categories/bags.jpg',
      size: 'large' as const,
    },
    {
      name: 'Doplnky',
      href: '/kategoria/doplnky',
      image: '/images/categories/accessories.jpg',
      size: 'medium' as const,
    },
    {
      name: 'Topánky',
      href: '/kategoria/topanky',
      image: '/images/categories/shoes.jpg',
      size: 'medium' as const,
    },
  ];

  // Hero slides configuration
  const heroSlides: HeroSlide[] = [
    {
      id: '1',
      title: 'YVETTIN',
      subtitle: 'Jar/Leto 2025',
      description:
        'Objavte novú kolekciu pre ženy a mužov. Elegantné kúsky pre váš jedinečný štýl.',
      ctaText: 'Objaviť kolekciu',
      ctaLink: '/novinky',
      ctaSecondaryText: 'Zobraziť výpredaj',
      ctaSecondaryLink: '/vypredaj',
      image: '/images/hero/mixed-collection.jpg',
      badge: 'Nová kolekcia',
      gender: 'mixed',
    },
    {
      id: '2',
      title: 'DÁMSKA MÓDA',
      subtitle: 'Elegancia a štýl',
      description:
        'Najnovšie trendy v dámskej móde. Šaty, topy, nohavice a doplnky pre každú príležitosť.',
      ctaText: 'Prezerať ženy',
      ctaLink: '/zeny',
      image: '/images/hero/women-collection.jpg',
      badge: 'Trendy 2025',
      gender: 'women',
    },
    {
      id: '3',
      title: 'PÁNSKA MÓDA',
      subtitle: 'Sebavedomý vzhľad',
      description: 'Klasické aj moderné kúsky pre mužov. Košele, nohavice, bundy a doplnky.',
      ctaText: 'Prezerať muži',
      ctaLink: '/muzi',
      image: '/images/hero/men-collection.jpg',
      badge: 'Novinky',
      gender: 'men',
    },
  ];

  return (
    <ResetGender>
      <div className="flex flex-col">
      {/* Hero Banner - Carousel */}
      <HeroBanner
        slides={heroSlides}
        autoPlay={true}
        autoPlayInterval={8000}
        showIndicators={true}
        showArrows={true}
      />

      {/* Trust Banner */}
      <TrustBanner />

      {/* Brand Logos */}
      <BrandLogos />

      {/* Novinky Section - Mixed */}
      <NovinkySection
        products={newProducts}
        title="NOVINKY"
        subtitle="Najnovšie kúsky v našej kolekcii"
        onQuickView={handleQuickView}
      />

      {/* Bestsellers Women */}
      <BestsellerCarousel
        products={womenBestsellers}
        title="BESTSELLER ŽENY"
        subtitle="Najpopulárnejšie produkty pre ženy"
        onQuickView={handleQuickView}
      />

      {/* Bestsellers Men */}
      <BestsellerCarousel
        products={menBestsellers}
        title="BESTSELLER MUŽI"
        subtitle="Najpopulárnejšie produkty pre mužov"
        onQuickView={handleQuickView}
      />

      {/* Sale Sections - Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 container-custom py-8">
        <SaleSection
          products={products.filter(p => p.gender === 'women' && p.discount > 0).slice(0, 2)}
          title="SALE"
          subtitle="ŽENY"
          gender="women"
          compact
        />
        <SaleSection
          products={products.filter(p => p.gender === 'men' && p.discount > 0).slice(0, 2)}
          title="SALE"
          subtitle="MUŽI"
          gender="men"
          compact
        />
      </div>

      {/* Categories Grid */}
      <CategoryGrid
        categories={mainCategories}
        title="KATEGÓRIE"
        subtitle="Prehliadajte podľa kategórie"
      />

      {/* Newsletter */}
      <NewsletterSection />

      {/* Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </div>
    </ResetGender>
  );
}
