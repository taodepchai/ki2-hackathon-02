import React from 'react';
import { Product } from './types';

interface ProductProps {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductComponent: React.FC<ProductProps> = ({ product, addToCart }) => {
  return (
    <div className="product">
      <img src={product.image} alt={product.name} />
      <div className="product-details">
        <h3>{product.name}</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>Quantity: {product.quantity}</p>
        <button style={{backgroundColor:"orange", border:"none",width:"60px",height:"30px"}} onClick={() => addToCart(product)} disabled={!product.inStock || product.quantity <= 0}>
          {product.inStock && product.quantity > 0 ? `${product.price} USD` : `${product.price} USD`}
        </button>
      </div>    
    </div>
  );
};

export default ProductComponent;
