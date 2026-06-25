'use client';

import Link from 'next/link';
import { useMemo, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DEMO_PRODUCTS } from '@/data/demo-data';
import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';

const MIN_PRODUCTS_PER_SECTION = 5;

function ensureMinimumProducts(products: typeof DEMO_PRODUCTS) {
  if (products.length >= MIN_PRODUCTS_PER_SECTION) {
    return products;
  }

  const source = products.length > 0 ? products : DEMO_PRODUCTS;
  const filled = [...source];
  let cursor = 0;

  while (filled.length < MIN_PRODUCTS_PER_SECTION) {
    filled.push(source[cursor % source.length]);
    cursor += 1;
  }

  return filled;
}

interface ProductSectionCarouselProps {
  title: string;
  href: string;
  products: typeof DEMO_PRODUCTS;
}

function ProductSectionCarousel({ title, href, products }: ProductSectionCarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollByViewport = (direction: -1 | 1) => {
    if (!trackRef.current) {
      return;
    }

    const offset = trackRef.current.clientWidth * 0.82;

    trackRef.current.scrollBy({
      left: direction * offset,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="font-display text-3xl text-neutral-900 md:text-[2rem]">{title}</h2>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-9 w-9"
            onClick={() => scrollByViewport(-1)}
            aria-label={`Posunut ${title} dolava`}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-9 w-9"
            onClick={() => scrollByViewport(1)}
            aria-label={`Posunut ${title} doprava`}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Link
            href={href}
            className="ml-2 text-xs font-medium uppercase tracking-[0.15em] text-neutral-500 transition-colors hover:text-neutral-900"
          >
            Zobrazit vsetky
          </Link>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="w-full max-w-none flex-shrink-0 snap-start basis-[80%] sm:basis-[47%] lg:basis-[31%] xl:basis-[23%]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const featuredProducts = useMemo(
    () => ensureMinimumProducts(DEMO_PRODUCTS.filter(product => product.featured)),
    []
  );
  const newProducts = useMemo(
    () => ensureMinimumProducts(DEMO_PRODUCTS.filter(product => product.isNew)),
    []
  );
  const bestsellers = useMemo(
    () => ensureMinimumProducts(DEMO_PRODUCTS.filter(product => product.bestseller)),
    []
  );

  return (
    <section className="py-16">
      <div className="container-custom space-y-16">
        <div>
          <ProductSectionCarousel
            title="Vybrane produkty"
            href="/kategoria/novinky"
            products={featuredProducts}
          />
        </div>

        <div>
          <ProductSectionCarousel
            title="Novinky"
            href="/kategoria/novinky"
            products={newProducts}
          />
        </div>

        <div>
          <ProductSectionCarousel
            title="Bestsellery"
            href="/kategoria/bestsellery"
            products={bestsellers}
          />
        </div>
      </div>
    </section>
  );
}
