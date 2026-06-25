import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types';

interface CartStore {
  items: CartItem[];
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      get total() {
        const { items } = get();
        return items.reduce((total, item) => {
          const price = item.product?.discountPrice || item.product?.price || 0;
          return total + price * item.quantity;
        }, 0);
      },

      addItem: item =>
        set(state => {
          const existingItem = state.items.find(
            i => i.productId === item.productId && i.variantId === item.variantId
          );

          if (existingItem) {
            return {
              items: state.items.map(i =>
                i.productId === item.productId && i.variantId === item.variantId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

          return { items: [...state.items, item] };
        }),

      removeItem: (productId, variantId) =>
        set(state => ({
          items: state.items.filter(i => !(i.productId === productId && i.variantId === variantId)),
        })),

      updateQuantity: (productId, variantId, quantity) =>
        set(state => ({
          items: state.items.map(i =>
            i.productId === productId && i.variantId === variantId ? { ...i, quantity } : i
          ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'yvettin-cart',
    }
  )
);
