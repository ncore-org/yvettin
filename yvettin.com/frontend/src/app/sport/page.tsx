import CategoryPageTemplate from '@/components/category/CategoryPageTemplate';
import type { Product } from '@/types';

export default function SportPage() {
  const products: Product[] = [
    { id: 'spt-1', slug: 'nike-pro-tricko', name: 'Nike Pro Tričko', brand: 'Nike', categorySlug: 'sport', price: 45, discountPrice: null, images: ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80'], description: 'Pro training tee', shortDescription: 'Nike Pro', variants: [{ id: 'v1', size: 'M', color: 'Black', colorHex: '#000', stock: 20, sku: 'nike-pro-1' }], attributes: { material: 'Syntetika', fit: 'Athletic', style: 'Sport' }, featured: true, bestseller: true, isNew: false, inStock: true, stockQuantity: 40 },
    { id: 'spt-2', slug: 'adidas-training', name: 'Adidas Training Top', brand: 'Adidas', categorySlug: 'sport', price: 55, discountPrice: null, images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80'], description: 'Training top', shortDescription: 'Adidas Train', variants: [{ id: 'v2', size: 'L', color: 'Navy', colorHex: '#000080', stock: 15, sku: 'adi-train-1' }], attributes: { material: 'Syntetika', fit: 'Athletic', style: 'Sport' }, featured: true, bestseller: false, isNew: true, inStock: true, stockQuantity: 30 },
    { id: 'spt-3', slug: 'under-armour-leginy', name: 'Under Armour Legíny', brand: 'Under Armour', categorySlug: 'sport', price: 60, discountPrice: null, images: ['https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&q=80'], description: 'Compression leggings', shortDescription: 'UA Leggings', variants: [{ id: 'v3', size: 'M', color: 'Black', colorHex: '#000', stock: 12, sku: 'ua-leg-1' }], attributes: { material: 'Elastan', fit: 'Compression', style: 'Sport' }, featured: false, bestseller: true, isNew: false, inStock: true, stockQuantity: 25 },
    { id: 'spt-4', slug: 'puma-running', name: 'Puma Running Shorts', brand: 'Puma', categorySlug: 'sport', price: 35, discountPrice: null, images: ['https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80'], description: 'Running shorts', shortDescription: 'Puma Run', variants: [{ id: 'v4', size: 'L', color: 'Grey', colorHex: '#888', stock: 18, sku: 'puma-run-1' }], attributes: { material: 'Syntetika', fit: 'Athletic', style: 'Running' }, featured: false, bestseller: false, isNew: true, inStock: true, stockQuantity: 35 },
  ];

  return (
    <CategoryPageTemplate
      slug="sport"
      title="Šport"
      description="Športové oblečenie a doplnky pre maximálny výkon. Funkčné materiály a moderný dizajn."
      products={products}
      bannerSlides={[
        { id: '1', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1600&q=80', title: 'Šport', subtitle: 'Maximálny Výkon' },
        { id: '2', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&q=80', title: 'Fitness', subtitle: 'Tréningové Oblečenie' },
        { id: '3', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1600&q=80', title: 'Running', subtitle: 'Beh & Kardio' },
      ]}
    />
  );
}
