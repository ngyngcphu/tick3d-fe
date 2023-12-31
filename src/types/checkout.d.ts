type CheckoutForm = {
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

type PaypalInfo = {
  intent: string;
  paypalOrderId: string;
};

type OrderInfo = {
  intent: string;
  orderId: string;
};

type PaypalOrderInfo = {
  orderInfo: CheckoutForm;
  intent: string;
};
