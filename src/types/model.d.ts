type ModelStore = {
  modelStatus: StoreStatus;
  modelData: ItemData;
  getModelById: (modelId: string) => Promise<void>;
};

type CartItem = {
  id: string;
  quantity: number;
};

type DefaultModel = {
  name: 'string';
  price: 0;
  gcode: 'string';
  imageUrl: 'string';
  category_id: 'string';
  description: 'string';
  subImageUrls: ['string'];
  discount: 0;
};

type UserModel = {
  name: 'string';
  gcode: 'string';
  description: 'string';
};
