import CategoryPage from '@/components/category/CategoryPage';
import { Product } from '@/types';

export default function NovinkyPage() {
  return (
    <CategoryPage
      slug="novinky"
      title="Novinky"
      description="Úplne nové kúsky v našej ponuke. Buďte prví, kto objaví najnovšie trendy."
      products={[
        { id: 'nk-1', slug: 'nove-tricko-ss24', name: 'Nové Tričko SS24', brand: 'Nike', categorySlug: 'novinky', price: 35, discountPrice: null, images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80'], description: 'New', shortDescription: 'Tričko SS24', variants: [{ id: 'v1', size: 'M', color: 'White', colorHex: '#fff', stock: 20, sku: 'nk-1' }], attributes: { material: 'Bavlna', fit: 'Regular', style: 'Casual' }, featured: true, bestseller: false, isNew: true, inStock: true, stockQuantity: 20 },
        { id: 'nk-2', slug: 'nova-kolekcia-dzinsy', name: 'Nová Kolekcia Džínsy', brand: 'Levis', categorySlug: 'novinky', price: 89, discountPrice: null, images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80'], description: 'New', shortDescription: 'Džínsy 2024', variants: [{ id: 'v2', size: '32', color: 'Blue', colorHex: '#00f', stock: 15, sku: 'nk-2' }], attributes: { material: 'Denim', fit: 'Slim', style: 'Modern' }, featured: true, bestseller: true, isNew: true, inStock: true, stockQuantity: 15 },
        { id: 'nk-3', slug: 'jarna-mikina', name: 'Jarná Mikina', brand: 'Adidas', categorySlug: 'novinky', price: 65, discountPrice: null, images: ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&q=80'], description: 'New', shortDescription: 'Mikina Jar', variants: [{ id: 'v3', size: 'L', color: 'Green', colorHex: '#0f0', stock: 12, sku: 'nk-3' }], attributes: { material: 'Bavlna', fit: 'Regular', style: 'Sport' }, featured: false, bestseller: false, isNew: true, inStock: true, stockQuantity: 12 },
        { id: 'nk-4', slug: 'nove-topanky', name: 'Nové Topánky', brand: 'Puma', categorySlug: 'novinky', price: 110, discountPrice: null, images: ['https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80'], description: 'New', shortDescription: 'Topánky 2024', variants: [{ id: 'v4', size: '42', color: 'Black', colorHex: '#000', stock: 8, sku: 'nk-4' }], attributes: { material: 'Koža', fit: 'Sport', style: 'Running' }, featured: true, bestseller: false, isNew: true, inStock: true, stockQuantity: 8 },
      ]}
      bannerSlides={[
        { id: '1', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80', title: 'NOVINKY', subtitle: 'Práve Dorazené' },
        { id: '2', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80', title: 'New In', subtitle: 'Nová Kolekcia' },
        { id: '3', image: 'https://images.unsplash.com/photo-1472851294608-41531268f719?w=1600&q=80', title: 'Fresh', subtitle: 'Trendy Sezóny' },
      ]}
      isSpecialPage
      specialPageType="new"
    />
  );
}
