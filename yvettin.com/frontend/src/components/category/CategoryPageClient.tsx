'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { FilterPanel, FilterGroup, FilterState } from '@/components/enterprise/FilterPanel';
import QuickView from '@/components/enterprise/QuickView';
import VirtualProductGrid from '@/components/enterprise/VirtualProductGrid';
import { Badge } from '@/components/ui/badge';
import { useBreakpoint } from '@/lib/hooks/use-enterprise';
import { Product } from '@/types';

interface CategoryPageClientProps {
  title: string;
  description: string;
  products: Product[];
}

type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'name-asc' | 'newest';

const PRICE_RANGES = [
  { id: '0-50', label: 'Do 50 EUR', min: 0, max: 50 },
  { id: '50-100', label: '50 - 100 EUR', min: 50, max: 100 },
  { id: '100-200', label: '100 - 200 EUR', min: 100, max: 200 },
  { id: '200+', label: 'Nad 200 EUR', min: 200, max: Number.POSITIVE_INFINITY },
];

const SORT_LABELS: Record<SortOption, string> = {
  relevance: 'Odporucane',
  'price-asc': 'Cena od najnizsej',
  'price-desc': 'Cena od najvyssej',
  'name-asc': 'Nazov A-Z',
  newest: 'Najnovsie',
};

function applyPriceFilter(product: Product, selectedRanges: string[]) {
  if (selectedRanges.length === 0) {
    return true;
  }

  const price = product.discountPrice ?? product.price;

  return selectedRanges.some(rangeId => {
    const range = PRICE_RANGES.find(candidate => candidate.id === rangeId);
    return range ? price >= range.min && price < range.max : false;
  });
}

export default function CategoryPageClient({
  title,
  description,
  products,
}: CategoryPageClientProps) {
  const { isMobile } = useBreakpoint();
  const [activeFilters, setActiveFilters] = useState<FilterState>({});
  const [sort, setSort] = useState<SortOption>('relevance');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const filterGroups = useMemo<FilterGroup[]>(() => {
    const brandCounts = products.reduce<Record<string, number>>((accumulator, product) => {
      accumulator[product.brand] = (accumulator[product.brand] || 0) + 1;
      return accumulator;
    }, {});

    const sizeCounts = products.reduce<Record<string, number>>((accumulator, product) => {
      product.variants.forEach(variant => {
        if (!variant.size) {
          return;
        }

        accumulator[variant.size] = (accumulator[variant.size] || 0) + 1;
      });

      return accumulator;
    }, {});

    return [
      {
        id: 'brand',
        label: 'Znacka',
        type: 'checkbox',
        options: Object.entries(brandCounts)
          .sort(([left], [right]) => left.localeCompare(right, 'sk'))
          .map(([brand, count]) => ({ id: brand, label: brand, count })),
      },
      {
        id: 'size',
        label: 'Velkost',
        type: 'checkbox',
        options: Object.entries(sizeCounts)
          .sort(([left], [right]) => left.localeCompare(right, 'sk'))
          .map(([size, count]) => ({ id: size, label: size, count })),
      },
      {
        id: 'price',
        label: 'Cena',
        type: 'checkbox',
        options: PRICE_RANGES.map(range => ({ id: range.id, label: range.label })),
      },
      {
        id: 'tags',
        label: 'Stitky',
        type: 'checkbox',
        options: [
          { id: 'new', label: 'Novinky' },
          { id: 'sale', label: 'Vypredaj' },
          { id: 'bestseller', label: 'Bestseller' },
          { id: 'in-stock', label: 'Skladom' },
        ],
      },
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let nextProducts = [...products];

    const brands = activeFilters.brand || [];
    const sizes = activeFilters.size || [];
    const prices = activeFilters.price || [];
    const tags = activeFilters.tags || [];

    if (brands.length > 0) {
      nextProducts = nextProducts.filter(product => brands.includes(product.brand));
    }

    if (sizes.length > 0) {
      nextProducts = nextProducts.filter(product =>
        product.variants.some(variant => sizes.includes(variant.size))
      );
    }

    nextProducts = nextProducts.filter(product => applyPriceFilter(product, prices));

    if (tags.length > 0) {
      nextProducts = nextProducts.filter(product => {
        return tags.every(tag => {
          if (tag === 'new') return product.isNew;
          if (tag === 'sale') return product.discountPrice !== null;
          if (tag === 'bestseller') return product.bestseller;
          if (tag === 'in-stock') return product.inStock;
          return true;
        });
      });
    }

    switch (sort) {
      case 'price-asc':
        nextProducts.sort(
          (left, right) => (left.discountPrice ?? left.price) - (right.discountPrice ?? right.price)
        );
        break;
      case 'price-desc':
        nextProducts.sort(
          (left, right) => (right.discountPrice ?? right.price) - (left.discountPrice ?? left.price)
        );
        break;
      case 'name-asc':
        nextProducts.sort((left, right) => left.name.localeCompare(right.name, 'sk'));
        break;
      case 'newest':
        nextProducts.sort((left, right) => Number(right.isNew) - Number(left.isNew));
        break;
      default:
        nextProducts.sort((left, right) => Number(right.featured) - Number(left.featured));
    }

    return nextProducts;
  }, [activeFilters, products, sort]);

  const activeFilterCount = useMemo(
    () => Object.values(activeFilters).reduce((total, values) => total + values.length, 0),
    [activeFilters]
  );

  return (
    <div className="container-custom py-8 md:py-12">
      <div className="rounded-2xl border border-neutral-200/70 bg-[linear-gradient(145deg,#faf9f7_0%,#f2efe8_100%)] p-6 md:p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Katalog</p>
        <h1 className="mt-3 font-display text-4xl text-neutral-900 md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-neutral-700 md:text-base">
          {description}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Badge variant="secondary" className="bg-neutral-900 text-white hover:bg-neutral-800">
            {filteredProducts.length} produktov
          </Badge>
          {activeFilterCount > 0 ? (
            <Badge variant="outline">Aktivne filtre: {activeFilterCount}</Badge>
          ) : null}
        </div>
      </div>

      {products.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-neutral-300 bg-white p-8 text-center">
          <h2 className="font-display text-3xl text-neutral-900">Produkty sa pripravuju</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-600">
            V tejto kategorii aktualne doplname sortiment. Pozrite si novinky alebo vypredaj.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/kategoria/novinky"
              className="rounded-md border border-neutral-900 bg-neutral-900 px-6 py-3 text-xs uppercase tracking-[0.16em] text-white transition-colors hover:bg-neutral-800"
            >
              Novinky
            </Link>
            <Link
              href="/kategoria/vypredaj"
              className="rounded-md border border-neutral-300 px-6 py-3 text-xs uppercase tracking-[0.16em] text-neutral-700 transition-colors hover:border-neutral-500"
            >
              Vypredaj
            </Link>
          </div>
        </div>
      ) : (
        <>
          {isMobile ? (
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <FilterPanel
                  filters={filterGroups}
                  activeFilters={activeFilters}
                  onFilterChange={(groupId, values) =>
                    setActiveFilters(currentState => ({ ...currentState, [groupId]: values }))
                  }
                  onClearFilters={() => setActiveFilters({})}
                  productCount={filteredProducts.length}
                />
                <label className="sr-only" htmlFor="sort-mobile">
                  Radenie
                </label>
                <select
                  id="sort-mobile"
                  value={sort}
                  onChange={event => setSort(event.target.value as SortOption)}
                  className="h-9 flex-1 rounded-md border border-neutral-200 bg-white px-3 text-sm text-neutral-700"
                >
                  {Object.entries(SORT_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <VirtualProductGrid
                products={filteredProducts}
                onQuickView={product => setQuickViewProduct(product)}
              />
            </div>
          ) : (
            <div className="mt-8 flex items-start gap-8">
              <FilterPanel
                filters={filterGroups}
                activeFilters={activeFilters}
                onFilterChange={(groupId, values) =>
                  setActiveFilters(currentState => ({ ...currentState, [groupId]: values }))
                }
                onClearFilters={() => setActiveFilters({})}
                productCount={filteredProducts.length}
              />

              <div className="min-w-0 flex-1">
                <div className="mb-4 flex justify-end">
                  <label className="sr-only" htmlFor="sort-desktop">
                    Radenie
                  </label>
                  <select
                    id="sort-desktop"
                    value={sort}
                    onChange={event => setSort(event.target.value as SortOption)}
                    className="h-9 rounded-md border border-neutral-200 bg-white px-3 text-sm text-neutral-700"
                  >
                    {Object.entries(SORT_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <VirtualProductGrid
                  products={filteredProducts}
                  onQuickView={product => setQuickViewProduct(product)}
                />
              </div>
            </div>
          )}
        </>
      )}

      <QuickView
        product={quickViewProduct}
        isOpen={quickViewProduct !== null}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
