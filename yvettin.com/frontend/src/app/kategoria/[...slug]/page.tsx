import CategoryPageClient from '@/components/category/CategoryPageClient';
import { getCategoryMeta, getProductsForCategorySegments } from '@/lib/catalog';

interface CategoryRoutePageProps {
  params: {
    slug: string[];
  };
}

export default function CategoryRoutePage({ params }: CategoryRoutePageProps) {
  const segments = params.slug || [];
  const products = getProductsForCategorySegments(segments);
  const meta = getCategoryMeta(segments);

  return (
    <CategoryPageClient title={meta.title} description={meta.description} products={products} />
  );
}
