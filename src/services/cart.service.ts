import { apiClient, invoke } from './common';

export const cartService = {
  getCart: () => invoke(apiClient.GET('/api/cart')),
  addCartItem: (data: { models: CartItem[] }) => invoke(apiClient.POST('/api/cart', { body: data }))
};
