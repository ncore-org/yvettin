import CategoryPage from '@/components/category/CategoryPage';
import { Product } from '@/types';

export default function ObuvPage() {
  const category = {
    title: 'Obuv',
    description: 'Kvalitná obuv pre každý krok. Športové tenisky, elegantné topánky aj casual štýly od svetových značiek.',
    banners: [
      { image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&q=80', title: 'Obuv', subtitle: 'Pre Každý Krok' },
      { image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1600&q=80', title: 'Tenisky', subtitle: 'Športový Štýl' },
      { image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=1600&q=80', title: 'Topánky', subtitle: 'Elegancia & Komfort' },
    ],
  };

  const products: Product[] = [
    { id: 'obuv-1', slug: 'nike-air-max-90', name: 'Nike Air Max 90', brand: 'Nike', categorySlug: 'obuv', price: 129, discountPrice: null, images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80'], description: 'Klasické tenisky', shortDescription: 'Air Max 90', variants: [{ id: 'v1', size: '42', color: 'White', colorHex: '#fff', stock: 10, sku: 'nike-am90-1' }], attributes: { material: 'Koža', fit: 'Regular', style: 'Sport' }, featured: true, bestseller: true, isNew: false, inStock: true, stockQuantity: 25 },
    { id: 'obuv-2', slug: 'adidas-stan-smith', name: 'Adidas Stan Smith', brand: 'Adidas', categorySlug: 'obuv', price: 89, discountPrice: null, images: ['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80'], description: 'Tenisky', shortDescription: 'Stan Smith', variants: [{ id: 'v2', size: '41', color: 'White', colorHex: '#fff', stock: 15, sku: 'adidas-ss-1' }], attributes: { material: 'Koža', fit: 'Slim', style: 'Casual' }, featured: true, bestseller: false, isNew: true, inStock: true, stockQuantity: 30 },
    { id: 'obuv-3', slug: 'vans-old-skool', name: 'Vans Old Skool', brand: 'Vans', categorySlug: 'obuv', price: 69, discountPrice: null, images: ['https://images.unsplash.com/photo-1525966222134-fcfa9ba81e6e?w=400&q=80'], description: 'Skate tenisky', shortDescription: 'Old Skool', variants: [{ id: 'v3', size: '40', color: 'Black', colorHex: '#000', stock: 8, sku: 'vans-os-1' }], attributes: { material: 'Plátno', fit: 'Regular', style: 'Skate' }, featured: false, bestseller: true, isNew: false, inStock: true, stockQuantity: 15 },
    { id: 'obuv-4', slug: 'converse-chuck-taylor', name: 'Converse Chuck Taylor', brand: 'Converse', categorySlug: 'obuv', price: 59, discountPrice: null, images: ['https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&q=80'], description: 'High-top tenisky', shortDescription: 'Chuck Taylor', variants: [{ id: 'v4', size: '39', color: 'Red', colorHex: '#f00', stock: 5, sku: 'converse-ct-1' }], attributes: { material: 'Plátno', fit: 'High', style: 'Classic' }, featured: false, bestseller: false, isNew: false, inStock: true, stockQuantity: 10 },
  ];

  return (
    <CategoryPage
      slug="obuv"
      title={category.title}
      description={category.description}
      products={products}
      bannerSlides={category.banners.map(b => ({ id: b.image, image: b.image, title: b.title, subtitle: b.subtitle }))}
    />
  );
}
