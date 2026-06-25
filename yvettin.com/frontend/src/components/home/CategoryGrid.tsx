import Link from 'next/link';
import { DEMO_CATEGORIES } from '@/data/demo-data';

export default function CategoryGrid() {
  const mainCategories = DEMO_CATEGORIES.filter(cat => cat.level === 0);

  return (
    <section className="container-custom py-16">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-medium tracking-wide text-neutral-900 font-display">
          Nakupujte podľa kategórie
        </h2>
        <p className="mt-3 text-sm text-neutral-500">Objavte našu širokú ponuku módy</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {mainCategories.map(category => (
          <Link
            key={category.id}
            href={`/kategoria/${category.slug}`}
            className="group relative aspect-[4/5] overflow-hidden border border-neutral-200/70"
          >
            <div className="absolute inset-0 bg-[linear-gradient(145deg,#f8f8f8_0%,#ececec_100%)] transition-colors group-hover:bg-[linear-gradient(145deg,#f4f4f4_0%,#e5e5e5_100%)]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <h3 className="text-2xl font-medium tracking-wide text-neutral-900 transition-transform group-hover:scale-105 font-display">
                {category.name}
              </h3>
              <p className="mt-2 text-[11px] tracking-[0.16em] text-neutral-500 uppercase">
                {category.productCount} produktov
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Subcategories */}
      <div className="mt-12 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {DEMO_CATEGORIES[0]?.children?.[0]?.children?.slice(0, 6).map(subcat => (
          <Link
            key={subcat.id}
            href={`/kategoria/${subcat.slug}`}
            className="border border-neutral-200 p-4 text-center transition-colors hover:border-neutral-400"
          >
            <p className="text-sm font-medium text-neutral-700">{subcat.name}</p>
            <p className="mt-1 text-xs text-neutral-400">{subcat.productCount} ks</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
