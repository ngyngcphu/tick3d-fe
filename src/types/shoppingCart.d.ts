type ShoppingCartStore = {
  itemStatus: StoreStatus;
  itemData: ItemData[];
  summaryPrice: number;
  getCardItems: () => void;
  updateItem: (item: ItemData) => void;
};
