import CategoryPageTemplate from '@/components/category/CategoryPageTemplate';
import type { Product } from '@/types';

export default function DropyPage() {
  const products: Product[] = [
    {
      id: 'dropy-1',
      slug: 'limitovana-edicia-nike',
      name: 'Limitovaná Edícia Nike',
      brand: 'Nike',
      categorySlug: 'dropy',
      price: 149,
      discountPrice: null,
      images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80'],
      description: 'Limitovaná edícia',
      shortDescription: 'Nike Limited',
      variants: [{ id: 'v1', size: 'M', color: 'White', colorHex: '#fff', stock: 10, sku: 'nike-ltd-1' }],
      attributes: { material: 'Textil', fit: 'Regular', style: 'Street' },
      featured: true,
      bestseller: true,
      isNew: true,
      inStock: true,
      stockQuantity: 25,
    },
    {
      id: 'dropy-2',
      slug: 'adidas-yeezy',
      name: 'Adidas Yeezy Boost',
      brand: 'Adidas',
      categorySlug: 'dropy',
      price: 220,
      discountPrice: null,
      images: ['https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=400&q=80'],
      description: 'Yeezy collection',
      shortDescription: 'Yeezy Boost',
      variants: [{ id: 'v2', size: 'M', color: 'Grey', colorHex: '#888', stock: 5, sku: 'yeezy-1' }],
      attributes: { material: 'Prémium', fit: 'Slim', style: 'Urban' },
      featured: true,
      bestseller: false,
      isNew: true,
      inStock: true,
      stockQuantity: 8,
    },
    {
      id: 'dropy-3',
      slug: 'tommy-drop',
      name: 'Tommy Hilfiger Drop',
      brand: 'Tommy',
      categorySlug: 'dropy',
      price: 95,
      discountPrice: null,
      images: ['https://images.unsplash.com/photo-1576566588028-4147f3d42452?w=400&q=80'],
      description: 'Tommy new drop',
      shortDescription: 'Tommy Drop',
      variants: [{ id: 'v3', size: 'L', color: 'Navy', colorHex: '#000080', stock: 15, sku: 'tommy-1' }],
      attributes: { material: 'Bavlna', fit: 'Classic', style: 'Casual' },
      featured: false,
      bestseller: true,
      isNew: true,
      inStock: true,
      stockQuantity: 30,
    },
    {
      id: 'dropy-4',
      slug: 'levis-vintage',
      name: "Levi's Vintage Collection",
      brand: "Levi's",
      categorySlug: 'dropy',
      price: 180,
      discountPrice: null,
      images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80'],
      description: 'Vintage collection',
      shortDescription: 'Levi Vintage',
      variants: [{ id: 'v4', size: '32', color: 'Blue', colorHex: '#00f', stock: 7, sku: 'levis-1' }],
      attributes: { material: 'Denim', fit: 'Vintage', style: 'Retro' },
      featured: true,
      bestseller: false,
      isNew: false,
      inStock: true,
      stockQuantity: 12,
    },
  ];

  return (
    <CategoryPageTemplate
      slug="dropy"
      title="Dropy"
      description="Exkluzívne limitované edície a nové kolekcie od top značiek. Buďte prví, kto získa najnovšie kúsky."
      products={products}
      bannerSlides={[
        { id: '1', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80', title: 'Nové Dropy', subtitle: 'Limitované Edície' },
        { id: '2', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80', title: 'Exclusive', subtitle: 'Práve Dorazené' },
        { id: '3', image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80', title: 'Kolekcie', subtitle: 'Pre Túto Sezónu' },
      ]}
    />
  );
}
