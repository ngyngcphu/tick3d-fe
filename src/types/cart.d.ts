type CartState = {
  cartItems: Record<string, number>; // Hoặc cartItems: Record<string, any>; nếu quantity có thể là một loại dữ liệu khác
  addToCart: (modelId: string, quantity: number) => void;
};
