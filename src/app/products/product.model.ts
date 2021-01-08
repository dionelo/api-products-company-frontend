export interface Product {
  _id?: string;
  name: string;
  category: string;
  price: number | undefined;
  imageURL: string;
  createdAt?: string;
  updatedAt?: string;
}
