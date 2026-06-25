import CategoryPageTemplate from '@/components/category/CategoryPageTemplate';
import type { Product } from '@/types';

export default function StreetwearPage() {
  const products: Product[] = [
    { id: 'str-1', slug: 'oversized-hoodie', name: 'Oversized Hoodie Black', brand: 'Nike', categorySlug: 'streetwear', price: 85, discountPrice: null, images: ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&q=80'], description: 'Oversized hoodie', shortDescription: 'Oversized HD', variants: [{ id: 'v1', size: 'L', color: 'Black', colorHex: '#000', stock: 15, sku: 'over-hd-b-1' }], attributes: { material: 'Bavlna', fit: 'Oversized', style: 'Street' }, featured: true, bestseller: true, isNew: false, inStock: true, stockQuantity: 30 },
    { id: 'str-2', slug: 'cargo-nohavice', name: 'Cargo Nohavice', brand: "Levi's", categorySlug: 'streetwear', price: 95, discountPrice: null, images: ['https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&q=80'], description: 'Cargo pants', shortDescription: 'Cargo Pants', variants: [{ id: 'v2', size: '32', color: 'Green', colorHex: '#228b22', stock: 12, sku: 'cargo-g-1' }], attributes: { material: 'Bavlna', fit: 'Loose', style: 'Street' }, featured: true, bestseller: false, isNew: true, inStock: true, stockQuantity: 25 },
    { id: 'str-3', slug: 'graphic-tee', name: 'Graphic Tee', brand: 'Adidas', categorySlug: 'streetwear', price: 45, discountPrice: null, images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80'], description: 'Graphic t-shirt', shortDescription: 'Graphic Tee', variants: [{ id: 'v3', size: 'M', color: 'White', colorHex: '#fff', stock: 20, sku: 'graphic-w-1' }], attributes: { material: 'Bavlna', fit: 'Regular', style: 'Street' }, featured: false, bestseller: true, isNew: false, inStock: true, stockQuantity: 40 },
    { id: 'str-4', slug: 'bucket-hat', name: 'Bucket Hat', brand: 'Tommy', categorySlug: 'streetwear', price: 35, discountPrice: null, images: ['https://images.unsplash.com/photo-1576566588028-4147f3d42452?w=400&q=80'], description: 'Bucket hat', shortDescription: 'Bucket Hat', variants: [{ id: 'v4', size: 'One', color: 'Beige', colorHex: '#f5f5dc', stock: 18, sku: 'bucket-b-1' }], attributes: { material: 'Bavlna', fit: 'One Size', style: 'Street' }, featured: false, bestseller: false, isNew: true, inStock: true, stockQuantity: 35 },
  ];

  return (
    <CategoryPageTemplate
      slug="streetwear"
      title="Streetwear"
      description="Urbánny štýl a streetwear kultúra. Oversized strihy, grafické potlače a limitované edície."
      products={products}
      bannerSlides={[
        { id: '1', image: 'https://images.unsplash.com/photo-1523396870777-e914a7db91aa?w=1600&q=80', title: 'Streetwear', subtitle: 'Urbánny Štýl' },
        { id: '2', image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1600&q=80', title: 'Urban', subtitle: 'Mestský Štýl' },
        { id: '3', image: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=1600&q=80', title: 'Graphic', subtitle: 'Potlače & Dizajny' },
      ]}
    />
  );
}
