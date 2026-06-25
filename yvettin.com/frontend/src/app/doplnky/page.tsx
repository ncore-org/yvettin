import CategoryPageTemplate from '@/components/category/CategoryPageTemplate';
import type { Product } from '@/types';

export default function DoplnkyPage() {
  const products: Product[] = [
    { id: 'dop-1', slug: 'kozena-kabelka', name: 'Kožená Kabelka', brand: 'Tommy', categorySlug: 'doplnky', price: 120, discountPrice: null, images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80'], description: 'Leather bag', shortDescription: 'Leather Bag', variants: [{ id: 'v1', size: 'One', color: 'Brown', colorHex: '#8b4513', stock: 8, sku: 'leather-bag-1' }], attributes: { material: 'Koža', fit: 'One Size', style: 'Casual' }, featured: true, bestseller: true, isNew: false, inStock: true, stockQuantity: 15 },
    { id: 'dop-2', slug: 'minimalisticka-penazenka', name: 'Minimalistická Peňaženka', brand: 'Nike', categorySlug: 'doplnky', price: 45, discountPrice: null, images: ['https://images.unsplash.com/photo-1627123424574-18bd08331092?w=400&q=80'], description: 'Minimalist wallet', shortDescription: 'Min Wallet', variants: [{ id: 'v2', size: 'One', color: 'Black', colorHex: '#000', stock: 20, sku: 'min-wallet-1' }], attributes: { material: 'Koža', fit: 'Compact', style: 'Minimal' }, featured: true, bestseller: false, isNew: true, inStock: true, stockQuantity: 30 },
    { id: 'dop-3', slug: 'zlate-nausnice', name: 'Zlaté Náušnice', brand: 'Zara', categorySlug: 'doplnky', price: 35, discountPrice: null, images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80'], description: 'Gold earrings', shortDescription: 'Gold Earrings', variants: [{ id: 'v3', size: 'One', color: 'Gold', colorHex: '#ffd700', stock: 15, sku: 'gold-ear-1' }], attributes: { material: 'Kov', fit: 'One Size', style: 'Elegant' }, featured: false, bestseller: true, isNew: false, inStock: true, stockQuantity: 25 },
    { id: 'dop-4', slug: 'hodinky-classic', name: 'Hodinky Classic', brand: 'Adidas', categorySlug: 'doplnky', price: 150, discountPrice: null, images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&q=80'], description: 'Classic watch', shortDescription: 'Classic Watch', variants: [{ id: 'v4', size: 'One', color: 'Silver', colorHex: '#c0c0c0', stock: 5, sku: 'classic-watch-1' }], attributes: { material: 'Oceľ', fit: 'Adjustable', style: 'Classic' }, featured: true, bestseller: false, isNew: true, inStock: true, stockQuantity: 10 },
  ];

  return (
    <CategoryPageTemplate
      slug="doplnky"
      title="Doplnky"
      description="Dokonalé doplnky pre každý outfit. Kabelky, peňaženky, šperky a ďalšie módne doplnky."
      products={products}
      bannerSlides={[
        { id: '1', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1600&q=80', title: 'Doplnky', subtitle: 'Dokonalý Detail' },
        { id: '2', image: 'https://images.unsplash.com/photo-1566150905458-1bf1dad18563?w=1600&q=80', title: 'Kabelky', subtitle: 'Štýlové & Praktické' },
        { id: '3', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1600&q=80', title: 'Šperky', subtitle: 'Elegantné Doplnky' },
      ]}
    />
  );
}
