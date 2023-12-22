import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: {},
      addToCart: (modelId: string, quantity: number) => {
        set((state) => {
          const currentQuantity = state.cartItems[modelId] || 0;
          return {
            cartItems: {
              ...state.cartItems,
              [modelId]: currentQuantity + quantity
            }
          };
        });
      }
    }),
    {
      name: 'cart-storage',
      getStorage: () => localStorage
    }
  )
);
