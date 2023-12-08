type ProductInOrder = {
  image: string;
  name: string;
  number: number;
  cost: number;
};

type Order = {
  idOrder: string;
  dateOrder: Date;
  customerName: string;
  typeOrder: string;
  totalCost: number;
  listProduct: ProductInOrder[];
};
