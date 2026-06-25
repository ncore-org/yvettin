'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { X, Check, ShoppingCart, ArrowRight, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';

// Demo compare items - in real app would come from store
const DEMO_COMPARE_IDS = ['prod-001', 'prod-002', 'prod-003'];

export default function ComparePage() {
  const [compareIds, setCompareIds] = useState(DEMO_COMPARE_IDS);
  const compareProducts = compareIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const removeFromCompare = (id: string) => {
    setCompareIds((prev) => prev.filter((pid) => pid !== id));
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-100 py-4">
        <div className="container-custom flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            YVETTIN<span className="text-neutral-400">®</span>
          </Link>
        </div>
      </header>

      <main className="container-custom py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <Scale className="h-8 w-8" />
            <div>
              <h1 className="text-3xl font-semibold">Porovnanie produktov</h1>
              <p className="text-neutral-500">
                {compareProducts.length} {compareProducts.length === 1 ? 'produkt' : 'produkty'}
              </p>
            </div>
          </div>

          {compareProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
              <Scale className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
              <h2 className="text-xl font-medium mb-2">Žiadne produkty na porovnanie</h2>
              <Button asChild className="rounded-full mt-4">
                <Link href="/">
                  Prezerať produkty
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Vlastnosť</TableHead>
                      {compareProducts.map((product) => (
                        <TableHead key={product!.id} className="min-w-[250px]">
                          <div className="relative">
                            <button
                              onClick={() => removeFromCompare(product!.id)}
                              className="absolute -top-2 -right-2 p-1 hover:bg-neutral-100 rounded-full"
                            >
                              <X className="h-4 w-4" />
                            </button>
                            <Link href={`/produkt/${product!.slug}`} className="block">
                              <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3">
                                <Image
                                  src={product!.images[0]}
                                  alt={product!.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <p className="text-xs text-neutral-400">{product!.brand}</p>
                              <h3 className="font-medium">{product!.name}</h3>
                              <p className="font-semibold mt-1">
                                {formatPrice(product!.discountPrice || product!.price)}
                              </p>
                            </Link>
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Materiál</TableCell>
                      {compareProducts.map((p) => (
                        <TableCell key={p!.id}>{p!.attributes.material}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Strih</TableCell>
                      {compareProducts.map((p) => (
                        <TableCell key={p!.id}>{p!.attributes.fit}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Štýl</TableCell>
                      {compareProducts.map((p) => (
                        <TableCell key={p!.id}>{p!.attributes.style}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Sezóna</TableCell>
                      {compareProducts.map((p) => (
                        <TableCell key={p!.id}>{p!.attributes.season}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Dostupnosť</TableCell>
                      {compareProducts.map((p) => (
                        <TableCell key={p!.id}>
                          {p!.inStock ? (
                            <span className="flex items-center text-green-600">
                              <Check className="h-4 w-4 mr-1" /> Skladom
                            </span>
                          ) : (
                            'Nedostupné'
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Akcia</TableCell>
                      {compareProducts.map((p) => (
                        <TableCell key={p!.id}>
                          <Button size="sm" className="rounded-full">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Do košíka
                          </Button>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
