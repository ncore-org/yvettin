import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import { searchProducts } from '@/lib/catalog';

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q?.trim() || '';
  const products = query ? searchProducts(query) : [];

  return (
    <div className="container-custom py-8 md:py-12">
      <header className="rounded-2xl border border-neutral-200/70 bg-[linear-gradient(150deg,#f9f8f6_0%,#efebe4_100%)] p-6 md:p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Vyhladavanie</p>
        <h1 className="mt-3 font-display text-4xl text-neutral-900 md:text-5xl">
          Najdite svoj styl
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-neutral-700 md:text-base">
          Vysledky pre vyhladavaci dotaz a rychly prechod na relevantne produkty.
        </p>
      </header>

      <section className="mt-8">
        <form action="/vyhladavanie" method="get" className="flex flex-col gap-3 sm:flex-row">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Napriklad saty, mikina, premium"
            className="h-11 flex-1 rounded-md border border-neutral-200 bg-white px-4 text-sm text-neutral-800"
          />
          <button
            type="submit"
            className="h-11 rounded-md border border-neutral-900 bg-neutral-900 px-6 text-xs uppercase tracking-[0.16em] text-white transition-colors hover:bg-neutral-800"
          >
            Hladat
          </button>
        </form>
      </section>

      {query ? (
        <section className="mt-8">
          <p className="mb-5 text-sm text-neutral-600">
            Dotaz: <strong className="text-neutral-900">{query}</strong> / najdene produkty:{' '}
            <strong className="text-neutral-900">{products.length}</strong>
          </p>

          {products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-8 text-center">
              <h2 className="font-display text-3xl text-neutral-900">Ziadne vysledky</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-600">
                Skuste iny dotaz alebo prejdite do kategorie noviniek a vypredaja.
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
          )}
        </section>
      ) : (
        <section className="mt-8 rounded-2xl border border-neutral-200 bg-white p-8">
          <h2 className="font-display text-3xl text-neutral-900">Spustite vyhladavanie</h2>
          <p className="mt-3 max-w-2xl text-sm text-neutral-600">
            Zadajte nazov produktu, typ oblecenia alebo znacku a my pripravime personalizovane
            vysledky.
          </p>
        </section>
      )}
    </div>
  );
}
