type CheckoutForm = {
  paymentMethod: PaymentMethod;
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

type OrderData = {
  id: string;
  image: string;
  name: string;
  discount: number;
  price: number;
  numberBought: number;
};

type CheckoutStore = {
  checkoutStatus: StoreStatus;
  allOrder: OrderData[];
  getAllOrder: () => Promise<void>;
  updateOrder: (order: OrderData) => Promise<void>;
};
