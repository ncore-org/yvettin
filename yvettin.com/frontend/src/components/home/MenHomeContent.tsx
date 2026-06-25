'use client';

import HeroBanner from '@/components/sections/HeroBanner';
import TrustBanner from '@/components/sections/TrustBanner';
import NovinkySection from '@/components/sections/NovinkySection';
import BestsellerCarousel from '@/components/sections/BestsellerCarousel';
import SaleSection from '@/components/sections/SaleSection';
import CategoryGrid from '@/components/sections/CategoryGrid';
import NewsletterSection from '@/components/sections/NewsletterSection';
import { products } from '@/data/products';

export default function MenHomeContent() {
  // Filter products for men
  const menProducts = products.filter(p => p.gender === 'men' || p.gender === 'unisex');
  const newProducts = menProducts.filter(p => p.isNew).slice(0, 4);
  const bestsellerProducts = menProducts.filter(p => p.isBestseller).slice(0, 8);
  const saleProducts = menProducts.filter(p => p.discount > 0).slice(0, 4);

  const menCategories = [
    { name: 'Tričká', href: '/kategoria/muzi/tricka', image: '/images/categories/tshirts.jpg' },
    {
      name: 'Nohavice',
      href: '/kategoria/muzi/nohavice',
      image: '/images/categories/pants-men.jpg',
    },
    { name: 'Bundy', href: '/kategoria/muzi/bundy', image: '/images/categories/jackets-men.jpg' },
    { name: 'Mikiny', href: '/kategoria/muzi/mikiny', image: '/images/categories/hoodies.jpg' },
    { name: 'Topánky', href: '/kategoria/muzi/topanky', image: '/images/categories/shoes-men.jpg' },
    {
      name: 'Doplnky',
      href: '/kategoria/muzi/doplnky',
      image: '/images/categories/accessories-men.jpg',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Banner - Men Focus */}
      <HeroBanner
        slides={[
          {
            id: 'men-hero',
            title: 'NOVÁ KOLEKCIA',
            subtitle: 'Jar/Leto 2025',
            description: 'Objavte najnovšie trendy v pánskej móde',
            ctaText: 'Objaviť kolekciu',
            ctaLink: '/kategoria/muzi',
            image: '/images/hero/men-collection.jpg',
            gender: 'men',
          },
        ]}
      />

      {/* Trust Banner */}
      <TrustBanner />

      {/* Novinky Section */}
      <NovinkySection products={newProducts} title="NOVINKY" subtitle="Najnovšie kúsky pre mužov" />

      {/* Bestsellers */}
      <BestsellerCarousel
        products={bestsellerProducts}
        title="BESTSELLER MUŽI"
        subtitle="Najpopulárnejšie produkty"
      />

      {/* Sale Section */}
      <SaleSection products={saleProducts} title="SALE" subtitle="MUŽI" gender="men" />

      {/* Categories */}
      <CategoryGrid
        categories={menCategories}
        title="KATEGÓRIE"
        subtitle="Prehliadajte podľa kategórie"
      />

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );
}
