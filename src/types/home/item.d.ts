type ItemData = {
  image: string;
  name: string;
  price: number;
  description: string;
  numberBought: number;
};

type ItemStore = {
  itemData: ItemData[];
  getItemData: () => void;
};
