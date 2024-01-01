type OrderStatus =
  | 'ORDER_PENDING'
  | 'ORDER_PROCESSED'
  | 'PRINT_PENDING'
  | 'PRINTED'
  | 'DELIVERING'
  | 'DELIVERED'
  | 'REJECTED';

type OrderOption = {
  /**
   * The date after which the order was created, specified in ISO format
   */
  created_after?: string;
  /**
   * The date before which the order was created, specified in ISO format
   */
  created_before?: string;
  /**
   * Filter on paid statud
   */
  isPaid?: boolean;
  /**
   * Filter on order status
   */
  status?: OrderStatus;
  /**
   * Filter on user id, only meaningful for managers
   */
  userId?: string;
  /**
   * For pagination purpose - the index of the start item, starting at 0
   */
  start?: number;
  /**
   * For pagination purpose - the number of items to return
   */
  noItems?: number;
  /**
   * The name of the field to order on
   */
  orderBy?: 'totalPrice' | 'shippingFee' | 'creationTime';
  /**
   * Sort ascending or descending
   */
  order?: 'asc' | 'desc';
};
