import CategoryPageTemplate from '@/components/category/CategoryPageTemplate';
import type { Product } from '@/types';

export default function PremiumPage() {
  const products: Product[] = [
    { id: 'prm-1', slug: 'designer-kabat', name: 'Designer Kabát', brand: 'Tommy', categorySlug: 'premium', price: 350, discountPrice: null, images: ['https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&q=80'], description: 'Designer coat', shortDescription: 'Designer Coat', variants: [{ id: 'v1', size: 'M', color: 'Black', colorHex: '#000', stock: 5, sku: 'designer-c-1' }], attributes: { material: 'Vlna', fit: 'Tailored', style: 'Luxury' }, featured: true, bestseller: true, isNew: false, inStock: true, stockQuantity: 10 },
    { id: 'prm-2', slug: 'luxury-watch', name: 'Luxury Watch', brand: 'Nike', categorySlug: 'premium', price: 450, discountPrice: null, images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&q=80'], description: 'Luxury timepiece', shortDescription: 'Luxury Watch', variants: [{ id: 'v2', size: 'One', color: 'Gold', colorHex: '#ffd700', stock: 3, sku: 'luxury-w-1' }], attributes: { material: 'Zlato', fit: 'Adjustable', style: 'Luxury' }, featured: true, bestseller: false, isNew: true, inStock: true, stockQuantity: 5 },
    { id: 'prm-3', slug: 'silk-scarf', name: 'Silk Scarf', brand: 'Zara', categorySlug: 'premium', price: 120, discountPrice: null, images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80'], description: 'Silk scarf', shortDescription: 'Silk Scarf', variants: [{ id: 'v3', size: 'One', color: 'Red', colorHex: '#f00', stock: 8, sku: 'silk-s-1' }], attributes: { material: 'Hodváb', fit: 'One Size', style: 'Luxury' }, featured: false, bestseller: true, isNew: false, inStock: true, stockQuantity: 15 },
    { id: 'prm-4', slug: 'leather-boots', name: 'Leather Boots', brand: "Levi's", categorySlug: 'premium', price: 280, discountPrice: null, images: ['https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80'], description: 'Leather boots', shortDescription: 'Leather Boots', variants: [{ id: 'v4', size: '42', color: 'Brown', colorHex: '#8b4513', stock: 6, sku: 'leather-b-1' }], attributes: { material: 'Koža', fit: 'Regular', style: 'Luxury' }, featured: true, bestseller: false, isNew: true, inStock: true, stockQuantity: 12 },
  ];

  return (
    <CategoryPageTemplate
      slug="premium"
      title="Premium"
      description="Luxusné kúsky od exkluzívnych značiek. Najvyššia kvalita materiálov a spracovania."
      products={products}
      bannerSlides={[
        { id: '1', image: 'https://images.unsplash.com/photo-1550614000-4b9519e02d48?w=1600&q=80', title: 'Premium', subtitle: 'Luxusná Móda' },
        { id: '2', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1600&q=80', title: 'Luxury', subtitle: 'Exkluzívne Značky' },
        { id: '3', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80', title: 'Designer', subtitle: 'Vysoká Móda' },
      ]}
    />
  );
}
