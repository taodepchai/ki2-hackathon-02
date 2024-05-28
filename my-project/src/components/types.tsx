export interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
  image: string;
  quantity: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
