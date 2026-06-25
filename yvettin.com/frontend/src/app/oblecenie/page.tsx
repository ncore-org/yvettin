import CategoryPageTemplate from '@/components/category/CategoryPageTemplate';
import type { Product } from '@/types';

export default function ObleceniePage() {
  const products: Product[] = [
    { id: 'obl-1', slug: 'basic-tricko', name: 'Basic Tričko White', brand: 'Nike', categorySlug: 'oblecenie', price: 35, discountPrice: null, images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80'], description: 'Basic tee', shortDescription: 'Basic White', variants: [{ id: 'v1', size: 'M', color: 'White', colorHex: '#fff', stock: 20, sku: 'basic-w-1' }], attributes: { material: 'Bavlna', fit: 'Regular', style: 'Casual' }, featured: true, bestseller: true, isNew: false, inStock: true, stockQuantity: 50 },
    { id: 'obl-2', slug: 'slim-dzinsy', name: 'Slim Fit Džínsy', brand: "Levi's", categorySlug: 'oblecenie', price: 89, discountPrice: null, images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80'], description: 'Slim jeans', shortDescription: 'Slim Fit', variants: [{ id: 'v2', size: '32', color: 'Blue', colorHex: '#00f', stock: 15, sku: 'slim-b-1' }], attributes: { material: 'Denim', fit: 'Slim', style: 'Casual' }, featured: true, bestseller: false, isNew: true, inStock: true, stockQuantity: 30 },
    { id: 'obl-3', slug: 'oversized-mikina', name: 'Oversized Mikina', brand: 'Adidas', categorySlug: 'oblecenie', price: 65, discountPrice: null, images: ['https://images.unsplash.com/photo-1576566588028-4147f3d42452?w=400&q=80'], description: 'Oversized hoodie', shortDescription: 'Oversized', variants: [{ id: 'v3', size: 'L', color: 'Grey', colorHex: '#888', stock: 12, sku: 'over-g-1' }], attributes: { material: 'Bavlna', fit: 'Oversized', style: 'Street' }, featured: false, bestseller: true, isNew: false, inStock: true, stockQuantity: 25 },
    { id: 'obl-4', slug: 'platene-nohavice', name: 'Plátené Nohavice', brand: 'Tommy', categorySlug: 'oblecenie', price: 75, discountPrice: null, images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80'], description: 'Canvas pants', shortDescription: 'Canvas', variants: [{ id: 'v4', size: 'M', color: 'Beige', colorHex: '#f5f5dc', stock: 10, sku: 'canvas-b-1' }], attributes: { material: 'Plátno', fit: 'Regular', style: 'Casual' }, featured: false, bestseller: false, isNew: true, inStock: true, stockQuantity: 20 },
  ];

  return (
    <CategoryPageTemplate
      slug="oblecenie"
      title="Oblečenie"
      description="Objavte našu rozsiahlu ponuku oblečenia pre každú príležitosť. Od každodenných outfitov po špeciálne udalosti."
      products={products}
      bannerSlides={[
        { id: '1', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1600&q=80', title: 'Oblečenie', subtitle: 'Pre Každú Príležitosť' },
        { id: '2', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1600&q=80', title: 'Štýl', subtitle: 'Najnovšie Trendy' },
        { id: '3', image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=1600&q=80', title: 'Móda', subtitle: 'Pre Neju' },
      ]}
    />
  );
}
