type ModelStore = {
  modelStatus: StoreStatus;
  modelData: ItemData;
  getModelById: (modelId: string) => Promise<void>;
};

type ModelInfoBuyer = {
  fullName: string;
  buyDate: Date;
  number: number;
  totalCost: number;
};
