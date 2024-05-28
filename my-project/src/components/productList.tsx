import React from 'react';
import { Product } from './types';
import ProductComponent from './product';
import "../styles.css";

interface ProductListProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, addToCart }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductComponent key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default ProductList;
