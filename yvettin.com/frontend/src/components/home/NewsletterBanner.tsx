import { Mail } from 'lucide-react';

export default function NewsletterBanner() {
  return (
    <section className="border-t border-neutral-100 bg-[linear-gradient(165deg,#f6f5f3_0%,#eeebe6_100%)] py-16">
      <div className="container-custom">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-medium tracking-[0.3em] text-neutral-500 uppercase">
            Newsletter
          </p>
          <h2 className="mt-4 text-4xl font-medium tracking-wide text-neutral-900 font-display">
            Prihláste sa na odber
          </h2>
          <p className="mt-3 text-sm text-neutral-500">
            Získajte 10% zľavu na prvý nákup a buďte informovaní o novinkách.
          </p>
          <form className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Váš email"
              className="flex-1 border border-neutral-200 bg-white px-4 py-3 text-sm placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none"
            />
            <button
              type="submit"
              className="border border-neutral-900 bg-neutral-900 px-8 py-3 text-sm font-medium tracking-wider text-white transition-colors hover:bg-neutral-800"
            >
              Prihlásiť
            </button>
          </form>
          <p className="mt-4 text-xs text-neutral-400">
            Odhlásenie kedykoľvek. Vaše údaje sú v bezpečí.
          </p>
        </div>
      </div>
    </section>
  );
}
