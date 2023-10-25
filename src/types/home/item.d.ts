type ItemData = {
  image: string;
  name: string;
  price: number;
  description: string;
  numberBought: number;
};

type ItemStore = {
  itemStatus: StoreStatus;
  itemData: ItemData[];
  getItemData: () => void;
};
