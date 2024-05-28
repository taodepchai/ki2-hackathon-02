import React from "react";
import CartItemComponent from "./cartItem";
import { CartItem, Product } from "./types";

interface CartProps {
  cart: CartItem[];
  updateQuantity: (product: Product, quantity: number) => void;
  removeFromCart: (product: Product) => void;
}

const Cart: React.FC<CartProps> = ({
  cart,
  updateQuantity,
  removeFromCart,
}) => {
  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <CartItemComponent
              key={item.product.id}
              index={index + 1}
              item={item}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          ))}
        </tbody>
      </table>
      {cart.length === 0 ? (
        <p>không có sản phẩm nào trong giỏ hàng</p>
      ) : (
        <>
          <p>có {cart.length} sản phẩm trong giỏ hàng</p>
          <p>Total: {total} USD</p>
        </>
      )}
    </div>
  );
};

export default Cart;
