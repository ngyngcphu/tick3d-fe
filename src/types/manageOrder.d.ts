type ProductInOrder = {
  image: string;
  name: string;
  number: number;
  cost: number;
};

type ManageOrder = {
  idOrder: string;
  dateOrder: Date;
  customerName: string;
  typeOrder: string;
  totalCost: number;
  listProduct: ProductInOrder[];
};
