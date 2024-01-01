type CheckoutForm = {
  district: string;
  ward: string;
  street: string;
  streetNo: string;
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
