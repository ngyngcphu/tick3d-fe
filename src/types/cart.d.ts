type CartState = {
  cartItems: Record<string, number>; // Hoặc cartItems: Record<string, any>; nếu quantity có thể là một loại dữ liệu khác
  addToCart: (modelId: string, quantity: number) => void;
  setCartItems: (modelList: ModelItem[]) => void;
};

type ModelItem = {
  model_id: string;
  quantity: number;
  model: ModelItemInfo;
};

type ModelItemInfo = {
  id: string;
  name: string;
  price: number;
};
