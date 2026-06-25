import CategoryPage from '@/components/category/CategoryPage';
import { Product } from '@/types';

export default function VypredajPage() {
  return (
    <CategoryPage
      slug="vypredaj"
      title="VÝPREDAJ"
      description="Zľavy až do 70% na vybrané kúsky. Rýchlo, kým zásoby vystačia!"
      products={[
        { id: 'vp-1', slug: 'vypredaj-tricko', name: 'Výpredaj Tričko', brand: 'Nike', categorySlug: 'vypredaj', price: 40, discountPrice: 19, images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80'], description: 'Sale', shortDescription: 'Tričko -70%', variants: [{ id: 'v1', size: 'M', color: 'White', colorHex: '#fff', stock: 3, sku: 'vp-1' }], attributes: { material: 'Bavlna', fit: 'Regular', style: 'Casual' }, featured: false, bestseller: false, isNew: false, inStock: true, stockQuantity: 3 },
        { id: 'vp-2', slug: 'vypredaj-dzinsy', name: 'Výpredaj Džínsy', brand: 'Levis', categorySlug: 'vypredaj', price: 80, discountPrice: 39, images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80'], description: 'Sale', shortDescription: 'Džínsy -50%', variants: [{ id: 'v2', size: '32', color: 'Blue', colorHex: '#00f', stock: 2, sku: 'vp-2' }], attributes: { material: 'Denim', fit: 'Slim', style: 'Casual' }, featured: true, bestseller: false, isNew: false, inStock: true, stockQuantity: 2 },
        { id: 'vp-3', slug: 'vypredaj-mikina', name: 'Výpredaj Mikina', brand: 'Adidas', categorySlug: 'vypredaj', price: 60, discountPrice: 29, images: ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&q=80'], description: 'Sale', shortDescription: 'Mikina -55%', variants: [{ id: 'v3', size: 'L', color: 'Grey', colorHex: '#888', stock: 5, sku: 'vp-3' }], attributes: { material: 'Bavlna', fit: 'Oversized', style: 'Sport' }, featured: false, bestseller: true, isNew: false, inStock: true, stockQuantity: 5 },
        { id: 'vp-4', slug: 'vypredaj-topanky', name: 'Výpredaj Topánky', brand: 'Puma', categorySlug: 'vypredaj', price: 100, discountPrice: 49, images: ['https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80'], description: 'Sale', shortDescription: 'Topánky -50%', variants: [{ id: 'v4', size: '42', color: 'Black', colorHex: '#000', stock: 1, sku: 'vp-4' }], attributes: { material: 'Syntetika', fit: 'Sport', style: 'Running' }, featured: true, bestseller: false, isNew: false, inStock: true, stockQuantity: 1 },
      ]}
      bannerSlides={[
        { id: '1', image: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=1600&q=80', title: 'VÝPREDAJ', subtitle: 'Až -70%' },
        { id: '2', image: 'https://images.unsplash.com/photo-1472851294608-41531268f719?w=1600&q=80', title: 'Sale', subtitle: 'Obmedzená Ponuka' },
        { id: '3', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80', title: 'Last Chance', subtitle: 'Posledné Kusy' },
      ]}
      isSpecialPage
      specialPageType="sale"
    />
  );
}
