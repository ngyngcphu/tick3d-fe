type ItemData = {
  id: number;
  image: string;
  subImage1: string;
  subImage2: string;
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
