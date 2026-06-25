import { ReactNode } from 'react';

interface PageTemplateProps {
  eyebrow?: string;
  title: string;
  description: string;
  lastUpdated?: string;
  children: ReactNode;
}

interface PageSectionProps {
  title: string;
  children: ReactNode;
}

export function PageTemplate({
  eyebrow,
  title,
  description,
  lastUpdated,
  children,
}: PageTemplateProps) {
  return (
    <div className="bg-[linear-gradient(180deg,#fbfbfa_0%,#ffffff_30%)]">
      <section className="container-custom py-10 md:py-14">
        <div className="mx-auto max-w-4xl rounded-2xl border border-neutral-200/70 bg-white/90 p-8 shadow-sm md:p-12">
          {eyebrow ? (
            <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">{eyebrow}</p>
          ) : null}
          <h1 className="mt-3 font-display text-4xl text-neutral-900 md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-neutral-600 md:text-base">
            {description}
          </p>
          {lastUpdated ? (
            <p className="mt-4 text-xs uppercase tracking-[0.14em] text-neutral-500">
              Posledna aktualizacia: {lastUpdated}
            </p>
          ) : null}
        </div>
      </section>

      <section className="container-custom pb-14 md:pb-20">
        <div className="mx-auto max-w-4xl space-y-8">{children}</div>
      </section>
    </div>
  );
}

export function PageSection({ title, children }: PageSectionProps) {
  return (
    <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="font-display text-2xl text-neutral-900 md:text-3xl">{title}</h2>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-700 md:text-base">
        {children}
      </div>
    </article>
  );
}
