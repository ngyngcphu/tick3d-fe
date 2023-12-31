import { apiClient, invoke } from './common';

export const cartService = {
  getAll: () => invoke(apiClient.GET('/api/cart')),
  create: (data: { models: CartCreationPayload[] }) =>
    invoke(apiClient.POST('/api/cart', { body: data })),
  deleteUserModel: (data: { models: string[] }) =>
    invoke(apiClient.POST('/api/cart/delete', { body: data }))
};
