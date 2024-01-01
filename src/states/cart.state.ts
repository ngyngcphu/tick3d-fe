import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      totalCartItems: 0,
      cartItems: [],
      listFlagIsModelAdded: {},
      setTotal: (total) => {
        set({ totalCartItems: total });
      },
      setListFlagIsModelAdded: (modelId, data) => {
        set((state) => {
          const result = { ...state.listFlagIsModelAdded };
          result[modelId] = data;
          return { listFlagIsModelAdded: result };
        });
      },
      removeItemInListFlag: (modelId) => {
        set((state) => {
          const result = { ...state.listFlagIsModelAdded };
          delete result[modelId];
          return { listFlagIsModelAdded: result };
        });
      },
      resetCart: () => {
        set({ totalCartItems: 0, cartItems: [], listFlagIsModelAdded: {} });
      },
      create: (model) => {
        set((state) => {
          const newCartItems = [...state.cartItems];
          const existingModelIndex = newCartItems.findIndex((item) => item.id === model.id);
          if (existingModelIndex !== -1) {
            newCartItems[existingModelIndex].quantity = model.quantity;
          } else {
            newCartItems.push(model);
            get().setTotal(state.totalCartItems + 1);
          }
          return { cartItems: newCartItems };
        });
      },
      update: (modelId, quantity) => {
        set((state) => {
          const newCartItems = [...state.cartItems];
          const existingModelIndex = newCartItems.findIndex((item) => item.id === modelId);
          if (existingModelIndex === -1) throw new Error('Model not found !');
          newCartItems[existingModelIndex].quantity = quantity;
          return { cartItems: newCartItems };
        });
      },
      delete: (modelId) => {
        set((state) => {
          const newCartItems = [...state.cartItems];
          const existingModelIndex = newCartItems.findIndex((item) => item.id === modelId);
          if (existingModelIndex === -1) throw new Error('Model not found !');
          newCartItems.splice(existingModelIndex, 1);
          get().setTotal(state.totalCartItems - 1);
          return { cartItems: newCartItems };
        });
      }
    }),
    {
      name: 'cartLocalStorage'
    }
  )
);
