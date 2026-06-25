'use client';

import HeroBanner from '@/components/sections/HeroBanner';
import TrustBanner from '@/components/sections/TrustBanner';
import NovinkySection from '@/components/sections/NovinkySection';
import BestsellerCarousel from '@/components/sections/BestsellerCarousel';
import SaleSection from '@/components/sections/SaleSection';
import CategoryGrid from '@/components/sections/CategoryGrid';
import NewsletterSection from '@/components/sections/NewsletterSection';
import { products } from '@/data/products';

export default function WomenHomeContent() {
  // Filter products for women
  const womenProducts = products.filter(p => p.gender === 'women' || p.gender === 'unisex');
  const newProducts = womenProducts.filter(p => p.isNew).slice(0, 4);
  const bestsellerProducts = womenProducts.filter(p => p.isBestseller).slice(0, 8);
  const saleProducts = womenProducts.filter(p => p.discount > 0).slice(0, 4);

  const womenCategories = [
    { name: 'Šaty', href: '/kategoria/zeny/saty', image: '/images/categories/dresses.jpg' },
    { name: 'Topy', href: '/kategoria/zeny/topy', image: '/images/categories/tops.jpg' },
    { name: 'Nohavice', href: '/kategoria/zeny/nohavice', image: '/images/categories/pants.jpg' },
    { name: 'Bundy', href: '/kategoria/zeny/bundy', image: '/images/categories/jackets.jpg' },
    { name: 'Topánky', href: '/kategoria/zeny/topanky', image: '/images/categories/shoes.jpg' },
    {
      name: 'Doplnky',
      href: '/kategoria/zeny/doplnky',
      image: '/images/categories/accessories.jpg',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Banner - Women Focus */}
      <HeroBanner
        slides={[
          {
            id: 'women-hero',
            title: 'NOVÁ KOLEKCIA',
            subtitle: 'Jar/Leto 2025',
            description: 'Objavte najnovšie trendy v dámskej móde',
            ctaText: 'Objaviť kolekciu',
            ctaLink: '/kategoria/zeny',
            image: '/images/hero/women-collection.jpg',
            gender: 'women',
          },
        ]}
      />

      {/* Trust Banner */}
      <TrustBanner />

      {/* Novinky Section */}
      <NovinkySection products={newProducts} title="NOVINKY" subtitle="Najnovšie kúsky pre ženy" />

      {/* Bestsellers */}
      <BestsellerCarousel
        products={bestsellerProducts}
        title="BESTSELLER ŽENY"
        subtitle="Najpopulárnejšie produkty"
      />

      {/* Sale Section */}
      <SaleSection products={saleProducts} title="SALE" subtitle="ŽENY" gender="women" />

      {/* Categories */}
      <CategoryGrid
        categories={womenCategories}
        title="KATEGÓRIE"
        subtitle="Prehliadajte podľa kategórie"
      />

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );
}
