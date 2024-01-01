import { apiClient, invoke } from './common';

export const orderService = {
  getAll: (option?: OrderOption) =>
    invoke(apiClient.GET('/api/order', { params: { query: option } })),
  getById: (id: string) => invoke(apiClient.GET('/api/order/{id}', { params: { path: { id } } })),
  update: (id: string, status: OrderStatus) =>
    invoke(apiClient.PUT('/api/order/{id}', { params: { path: { id } }, body: { status } })),
  cancel: (id: string) => invoke(apiClient.PATCH('/api/order/{id}', { params: { path: { id } } }))
};
