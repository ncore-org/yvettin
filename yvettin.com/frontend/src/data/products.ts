import { DEMO_PRODUCTS } from './demo-data';
import { Product } from '@/types';

// Helper to determine gender from category
function getGenderFromCategory(categorySlug: string): 'women' | 'men' | 'unisex' {
  if (categorySlug.startsWith('zeny/')) return 'women';
  if (categorySlug.startsWith('muzi/')) return 'men';
  return 'unisex';
}

// Helper to calculate discount
function calculateDiscount(product: Product): number {
  if (product.discountPrice && product.discountPrice < product.price) {
    return Math.round(((product.price - product.discountPrice) / product.price) * 100);
  }
  return 0;
}

// Export enhanced products with gender and discount fields
export const products: Product[] = DEMO_PRODUCTS.map(product => ({
  ...product,
  gender: getGenderFromCategory(product.categorySlug),
  discount: calculateDiscount(product),
  isBestseller: product.bestseller,
}));

// Export for backward compatibility
export { DEMO_PRODUCTS };
export { DEMO_CATEGORIES } from './demo-data';
