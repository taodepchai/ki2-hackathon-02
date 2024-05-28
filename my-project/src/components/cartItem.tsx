import React from 'react';
import { CartItem, Product } from './types';

interface CartItemProps {
  index: number;
  item: CartItem;
  updateQuantity: (product: Product, quantity: number) => void;
  removeFromCart: (product: Product) => void;
}

const CartItemComponent: React.FC<CartItemProps> = ({ index, item, updateQuantity, removeFromCart }) => {
  return (
    <tr>
      <td>{index}</td>
      <td>{item.product.name}</td>
      <td>{item.product.price} USD</td>
      <td>
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => updateQuantity(item.product, parseInt(e.target.value))}
          required
        />
      </td>
      <td>
        <button style={{ backgroundColor: "cyan", border: "none", borderRadius: "7px" }} onClick={() => updateQuantity(item.product, item.quantity)}>Update</button>
        <button style={{ backgroundColor: "red", border: "none", borderRadius: "7px" }} onClick={() => removeFromCart(item.product)}>Delete</button>
      </td>
    </tr>
  );
};

export default CartItemComponent;
