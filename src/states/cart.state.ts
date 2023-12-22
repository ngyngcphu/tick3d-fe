import { create } from 'zustand';

export const useCartStore = create<CartState>()((set) => ({
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
  },
  setCartItems: (modelList: ModelItem[]) => {
    const updatedCartItems: { [key: string]: number } = {};

    modelList.forEach((item) => {
      updatedCartItems[item.model_id] = item.quantity;
    });
    set({ cartItems: updatedCartItems });
  }
}));
