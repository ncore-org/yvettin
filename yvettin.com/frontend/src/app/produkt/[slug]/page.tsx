import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/product/ProductDetailClient';
import { getProductBySlug, getRelatedProducts } from '@/lib/catalog';

interface ProductRoutePageProps {
  params: {
    slug: string;
  };
}

export default function ProductRoutePage({ params }: ProductRoutePageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
