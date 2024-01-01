type CartStore = {
  totalCartItems: number;
  cartItems: ModelInCart[];
  listFlagIsModelAdded: Record<string, boolean>;
  setTotal: (total: number) => void;
  setListFlagIsModelAdded: (modelId: string, data: boolean) => void;
  removeItemInListFlag: (modelId: string) => void;
  resetCart: () => void;
  create: (model: ModelInCart) => void;
  update: (modelId: string, quantity: number) => void;
  delete: (modelId: string) => void;
};
