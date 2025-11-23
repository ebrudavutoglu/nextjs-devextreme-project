export interface IOrder {
  id: number;
  userId: number;
  date: Date;
  products: IProduct[];
}

export interface IProduct {
  productId: number;
  quantity: number;
}
