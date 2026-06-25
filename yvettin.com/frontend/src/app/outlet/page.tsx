'use client';

import { motion } from 'framer-motion';
import { products } from '@/data/products';
import { Percent } from 'lucide-react';
import Link from 'next/link';

export default function OutletPage() {
  const outletProducts = products.filter(p => p.discount > 0);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <div className="relative bg-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/categories/outlet.jpg"
            alt="Outlet"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative container-custom py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <Percent className="h-6 w-6 text-red-500" />
              <span className="text-red-400 font-medium">Výpredaj až -50%</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-light mb-4">OUTLET</h1>
            <p className="text-lg text-neutral-300 mb-6">
              Prémiové kúsky za zlomok ceny. Limitované množstvá.
            </p>
            <p className="text-white font-medium">{outletProducts.length} produktov v zľave</p>
          </motion.div>
        </div>
      </div>

      {/* Products */}
      <div className="container-custom py-12">
        {outletProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {outletProducts.map((product) => (
              <Link
                key={product.id}
                href={`/produkt/${product.id}`}
                className="group bg-white rounded-lg overflow-hidden border border-neutral-100 hover:shadow-md transition-shadow"
              >
                <div className="aspect-[3/4] bg-neutral-100 relative overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.discount > 0 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      -{product.discount}%
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs text-neutral-500">{product.brand}</p>
                  <h3 className="font-medium text-sm truncate">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-red-600">
                      {(product.price * (1 - product.discount / 100)).toFixed(2)} €
                    </span>
                    <span className="text-xs text-neutral-400 line-through">
                      {product.price.toFixed(2)} €
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center py-20 text-neutral-500">Žiadne zľavnené produkty</p>
        )}
      </div>
    </div>
  );
}
