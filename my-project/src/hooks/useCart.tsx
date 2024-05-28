import { useState, useEffect } from 'react';
import { CartItem, Product } from '../components/types';

const useCart = (updateProductStock: (product: Product, quantity: number) => void) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'warning' | 'error' } | null>(null);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    if (product.quantity <= 0) {
      setNotification({ message: 'Product out of stock', type: 'error' });
      return;
    }

    const existingProduct = cart.find((item) => item.product.id === product.id);
    if (existingProduct) {
      if (existingProduct.quantity === 0) {
        setNotification({ message: 'Cannot add more than available stock', type: 'error' });
        return;
      }
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    updateProductStock(product, -1); 
    setNotification({ message: 'Added to cart successfully', type: 'success' });
  };

  const updateQuantity = (product: Product, quantity: number) => {
    if (quantity > product.quantity) {
      setNotification({ message: 'Cannot add more than available stock', type: 'error' });
      return;
    }

    const existingProduct = cart.find((item) => item.product.id === product.id);
    if (existingProduct) {
      const quantityChange = quantity - existingProduct.quantity;
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity }
            : item
        )
      );
      updateProductStock(product, -quantityChange); // Update the product quantity in the product list
      setNotification({ message: 'Updated successfully', type: 'warning' });
    }
  };

  const removeFromCart = (product: Product) => {
    const existingProduct = cart.find((item) => item.product.id === product.id);
    if (existingProduct) {
      updateProductStock(product, existingProduct.quantity); // Increase the product quantity when removing from the cart
    }
    setCart(cart.filter((item) => item.product.id !== product.id));
    setNotification({ message: 'Deleted successfully', type: 'error' });
  };

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    notification,
    setNotification,
  };
};

export default useCart;
