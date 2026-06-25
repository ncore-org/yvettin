'use client';

import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { DEMO_PRODUCTS } from '@/data/demo-data';
import { useWishlistStore } from '@/lib/store/wishlist';

export default function WishlistPageClient() {
  const wishlistIds = useWishlistStore(state => state.items);
  const clearWishlist = useWishlistStore(state => state.clearWishlist);

  const wishlistProducts = DEMO_PRODUCTS.filter(product => wishlistIds.includes(product.id));

  return (
    <div className="container-custom py-8 md:py-12">
      <header className="rounded-2xl border border-neutral-200/70 bg-[linear-gradient(160deg,#f8f7f4_0%,#efebe4_100%)] p-6 md:p-9">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Wishlist</p>
        <h1 className="mt-3 font-display text-4xl text-neutral-900 md:text-5xl">
          Vase oblubene kusy
        </h1>
        <p className="mt-3 max-w-3xl text-sm text-neutral-700 md:text-base">
          Uchovajte si produkty, ku ktorym sa chcete vratit, porovnajte si ich a pridajte ich do
          kosika.
        </p>
      </header>

      {wishlistProducts.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-neutral-300 bg-white p-8 text-center">
          <h2 className="font-display text-3xl text-neutral-900">Wishlist je prazdny</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-600">
            Zatial ste si neulozili ziadny produkt. Objavte novinky alebo najpredavanejsie kusy.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/kategoria/novinky"
              className="rounded-md border border-neutral-900 bg-neutral-900 px-6 py-3 text-xs uppercase tracking-[0.16em] text-white transition-colors hover:bg-neutral-800"
            >
              Pozriet novinky
            </Link>
            <Link
              href="/kategoria/bestsellery"
              className="rounded-md border border-neutral-300 px-6 py-3 text-xs uppercase tracking-[0.16em] text-neutral-700 transition-colors hover:border-neutral-500"
            >
              Bestseller
            </Link>
          </div>
        </div>
      ) : (
        <section className="mt-8">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-neutral-600">
              Pocet ulozenych produktov:{' '}
              <strong className="text-neutral-900">{wishlistProducts.length}</strong>
            </p>
            <Button variant="outline" onClick={clearWishlist}>
              Vymazat wishlist
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {wishlistProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
