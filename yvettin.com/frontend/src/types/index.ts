export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  categorySlug: string;
  price: number;
  discountPrice: number | null;
  images: string[];
  description: string;
  shortDescription: string;
  variants: ProductVariant[];
  attributes: ProductAttributes;
  featured: boolean;
  bestseller: boolean;
  isNew: boolean;
  sustainable?: boolean;
  inStock: boolean;
  // Extended fields for gender support
  gender?: 'women' | 'men' | 'unisex';
  discount?: number;
  isBestseller?: boolean;
}

export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  colorHex: string;
  stock: number;
  sku: string;
}

export interface ProductAttributes {
  material: string;
  fit: string;
  style: string;
  season?: string;
  care?: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  level: number;
  parentId: string | null;
  image?: string;
  children?: Category[];
  productCount?: number;
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  product?: Product;
  variant?: ProductVariant;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
}

export interface Order {
  id: string;
  userId: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  total: number;
  shippingAddress: Address;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  variantId: string;
  quantity: number;
  price: number;
}

export interface Address {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  zip: string;
  country: string;
}
