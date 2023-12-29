type CartStore = {
  totalCartItems: number;
  cartItems: ModelInCart[];
  setTotal: (total: number) => void;
  create: (model: ModelInCart) => void;
  update: (modelId: string, quantity: number) => void;
  delete: (modelId: string) => void;
};
