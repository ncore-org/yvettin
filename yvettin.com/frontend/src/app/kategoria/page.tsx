import Link from 'next/link';
import { DEMO_CATEGORIES } from '@/data/demo-data';

export default function CategoriesPage() {
  return (
    <div className="container-custom py-8 md:py-12">
      <header className="rounded-2xl border border-neutral-200/70 bg-[linear-gradient(150deg,#f9f8f6_0%,#efebe4_100%)] p-6 md:p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Katalog</p>
        <h1 className="mt-3 font-display text-4xl text-neutral-900 md:text-5xl">
          Vsetky kategorie
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-neutral-700 md:text-base">
          Kompletny prehlad struktur fashion katalogu Yvettin pre rychlu orientaciu v sortimente.
        </p>
      </header>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        {DEMO_CATEGORIES.map(category => (
          <article
            key={category.id}
            className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
          >
            <h2 className="font-display text-3xl text-neutral-900">{category.name}</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Pocet produktov: {category.productCount ?? 0}
            </p>

            <div className="mt-5 space-y-2">
              {category.children?.map(subCategory => (
                <Link
                  key={subCategory.id}
                  href={`/kategoria/${subCategory.slug}`}
                  className="block rounded-md border border-neutral-200 px-4 py-3 text-sm text-neutral-700 transition-colors hover:border-neutral-500 hover:text-neutral-900"
                >
                  {subCategory.name}
                </Link>
              ))}
            </div>

            <Link
              href={`/kategoria/${category.slug}`}
              className="mt-6 inline-block rounded-md border border-neutral-900 bg-neutral-900 px-5 py-2 text-xs uppercase tracking-[0.16em] text-white transition-colors hover:bg-neutral-800"
            >
              Otvorit kategoriu
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
