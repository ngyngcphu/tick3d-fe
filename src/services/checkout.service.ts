import { apiClient, invoke } from './common';
type infoOrder = {
  total_price: number;
  shipping_fee: number;
  est_deli_time: string;
  district: string;
  ward: string;
  street: string;
  streetNo: string;
  isPaid: boolean;
  extra_note: string;
};

export const checkoutService = {
  createOrder: (data: infoOrder) => invoke(apiClient.POST('/api/checkout', { body: data })),
  completePaypalOrder: (intent: string, paypalOrderId: string) =>
    invoke(apiClient.POST('/api/checkout/paypal/completing', { body: { intent, paypalOrderId } })),
  createPayPalOrder: (intent: string, orderId: string) =>
    invoke(apiClient.POST('/api/checkout/paypal/creating', { body: { intent, orderId } }))
};
