'use client';

import EnterpriseCarousel from './EnterpriseCarousel';
import { Product } from '@/types';

interface BestsellerCarouselProps {
  products: Product[];
  title: string;
  subtitle: string;
  onQuickView?: (product: Product) => void;
}

export default function BestsellerCarousel({ products, title, subtitle }: BestsellerCarouselProps) {
  return (
    <EnterpriseCarousel
      products={products}
      title={title}
      subtitle={subtitle}
      viewAllHref="/bestseller"
      viewAllLabel="Zobraziť všetky"
      itemsPerView={{ mobile: 1.5, tablet: 3, desktop: 4 }}
      gap={24}
      light={false}
      showProgress={true}
    />
  );
}
