import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartUIState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useCartUIStore = create<CartUIState>()(
  persist(
    (set, get) => ({
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set({ isOpen: !get().isOpen }),
    }),
    {
      name: 'yvettin-cart-ui',
    }
  )
);
