export const SORT_CRITERIA: Readonly<Record<OrderBy, string>> = Object.freeze({
  uploadedTime: 'Latest',
  numberBought: 'Most bought',
  likesNo: 'Most stars',
  price: 'Lowest Price',
  name: 'Name'
});

export const SORT_ORDER: Readonly<Record<OrderBy, Order>> = Object.freeze({
  uploadedTime: 'desc',
  numberBought: 'desc',
  likesNo: 'desc',
  price: 'asc',
  name: 'asc'
});
