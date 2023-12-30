type OrderBy = 'likesNo' | 'uploadedTime' | 'price' | 'name' | 'numberBought';
type Order = 'asc' | 'desc';

type ModelOption = {
  /**
   * The substring that the model name should contain
   */
  keyword?: string;
  /**
   * The time after which the model was uploaded, specified in ISO format.
   * Example: `2023-12-18`
   */
  uploaded_after?: string;
  /**
   * The time before which the model was uploaded, specified in ISO format
   * Example: `2023-12-25`
   */
  uploaded_before?: string;
  /**
   * The category id
   */
  categoryId?: string;
  /**
   * The minimum threshold for number of likes
   */
  likes_ge?: number;
  /**
   * For pagination purpose - the index of the start item, starting at 0
   */
  start?: number;
  /**
   * For pagination purpose - the number of items to return
   */
  noItems?: number;
  /**
   * The name of the field to order on.
   * Include: `likesNo`, `uploadedTime`, `price`, `name`, `numberBought`.
   */
  orderBy?: OrderBy;
  /**
   * Sort ascending or descending.
   * Include: `asc` and `desc`.
   */
  order?: Order;
};

type ModelInCart = {
  id: string;
  image?: string;
  name: string;
  discount?: number;
  price: number;
  quantity: number;
};

type CartCreationPayload = {
  id: string;
  quantity: number;
};

type DefaultModel = {
  name: string;
  price: 0;
  gcode: string;
  imageUrl: string;
  category_id: string;
  description: string;
  subImageUrls: string[];
  discount: 0;
};

type UserModel = {
  name: string;
  gcode: string;
  description: string;
};
