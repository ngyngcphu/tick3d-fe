import { mockServer, invoke } from './common';

export const checkoutService = {
  getAll: () => invoke<OrderData[]>(mockServer.get('/orders')),
  update: (order: OrderData) => invoke<OrderData>(mockServer.put(`/orders/${order.id}`, order))
};
