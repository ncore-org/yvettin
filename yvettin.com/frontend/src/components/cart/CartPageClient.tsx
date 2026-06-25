'use client';

import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/lib/store/cart';
import { formatPrice } from '@/lib/utils';

export default function CartPageClient() {
  const items = useCartStore(state => state.items);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const removeItem = useCartStore(state => state.removeItem);
  const clearCart = useCartStore(state => state.clearCart);

  const subtotal = items.reduce((total, item) => {
    const price = item.product?.discountPrice ?? item.product?.price ?? 0;
    return total + price * item.quantity;
  }, 0);

  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 3.9;
  const grandTotal = subtotal + shipping;

  return (
    <div className="container-custom py-8 md:py-12">
      <header className="rounded-2xl border border-neutral-200/70 bg-[linear-gradient(160deg,#f8f7f4_0%,#efebe4_100%)] p-6 md:p-9">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Kosik</p>
        <h1 className="mt-3 font-display text-4xl text-neutral-900 md:text-5xl">
          Dokoncenie objednavky
        </h1>
        <p className="mt-3 max-w-3xl text-sm text-neutral-700 md:text-base">
          Skontrolujte obsah kosika, upravte mnozstva a pokracujte do bezpecneho checkoutu.
        </p>
      </header>

      {items.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-neutral-300 bg-white p-8 text-center">
          <h2 className="font-display text-3xl text-neutral-900">Kosik je prazdny</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-600">
            Zatial ste nepridali ziadny produkt. Prejdite do katalogu a vyberte si svoje fashion
            kusy.
          </p>
          <Link
            href="/kategoria/novinky"
            className="mt-6 inline-block rounded-md border border-neutral-900 bg-neutral-900 px-6 py-3 text-xs uppercase tracking-[0.16em] text-white transition-colors hover:bg-neutral-800"
          >
            Pokracovat v nakupovani
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <section className="space-y-4">
            {items.map(item => {
              const unitPrice = item.product?.discountPrice ?? item.product?.price ?? 0;

              return (
                <article
                  key={`${item.productId}-${item.variantId}`}
                  className="rounded-xl border border-neutral-200 bg-white p-4 md:p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="h-24 w-20 overflow-hidden rounded-md bg-neutral-100">
                      {item.product?.images?.[0] ? (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>

                    <div className="flex-1">
                      <h2 className="text-sm font-medium text-neutral-900 md:text-base">
                        {item.product?.name}
                      </h2>
                      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-neutral-500">
                        {item.variant?.size} / {item.variant?.color}
                      </p>
                      <p className="mt-2 text-sm text-neutral-700">
                        Cena za kus: {formatPrice(unitPrice)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={event => {
                          const value = Number(event.target.value);
                          if (Number.isNaN(value) || value < 1) {
                            return;
                          }
                          updateQuantity(item.productId, item.variantId, value);
                        }}
                        className="h-9 w-20"
                      />

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.productId, item.variantId)}
                        aria-label="Odstranit produkt"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-3 border-t border-neutral-100 pt-3 text-right text-sm font-medium text-neutral-900">
                    Spolu: {formatPrice(unitPrice * item.quantity)}
                  </div>
                </article>
              );
            })}

            <div className="flex justify-end">
              <Button variant="outline" onClick={clearCart}>
                Vymazat kosik
              </Button>
            </div>
          </section>

          <aside className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="font-display text-2xl text-neutral-900">Sumar objednavky</h2>

            <div className="mt-5 space-y-3 text-sm text-neutral-700">
              <div className="flex items-center justify-between">
                <span>Medzisucet</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Doprava</span>
                <span>{shipping === 0 ? 'Zdarma' : formatPrice(shipping)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-neutral-200 pt-3 text-base font-semibold text-neutral-900">
                <span>Celkom</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <Button className="mt-6 h-11 w-full bg-neutral-900 text-white hover:bg-neutral-800">
              Pokracovat do pokladne
            </Button>

            <p className="mt-3 text-xs text-neutral-500">
              Platba je zabezpecena. Doprava zdarma pri objednavke nad 50 EUR.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
