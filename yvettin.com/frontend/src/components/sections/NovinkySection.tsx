'use client';

import EnterpriseCarousel from './EnterpriseCarousel';
import { Product } from '@/types';

interface NovinkySectionProps {
  products: Product[];
  title: string;
  subtitle: string;
  onQuickView?: (product: Product) => void;
}

export default function NovinkySection({ products, title, subtitle, onQuickView }: NovinkySectionProps) {
  return (
    <EnterpriseCarousel
      products={products}
      title={title}
      subtitle={subtitle}
      viewAllHref="/novinky"
      viewAllLabel="Zobraziť všetky novinky"
      itemsPerView={{ mobile: 1.5, tablet: 3, desktop: 4 }}
      gap={24}
      light={false}
      showProgress={true}
    />
  );
}
