import React, { useState, useEffect } from 'react';
import ProductList from './components/productList';
import Cart from './components/cart';
import Notification from './components/notificantion';
import useCart from './hooks/useCart';
import { Product } from './components/types';
import { v4 as uuidv4 } from "uuid";
import './styles.css';

const App: React.FC = () => {
  // const product: Product[] = [
  //   { id: uuidv4(), name: 'Pizza', price: 30, inStock: true, image: 'https://i.pinimg.com/originals/c3/39/bd/c339bdacce0f4f356f2380f5a0c19b9d.jpg', quantity: 4 },
  //   { id: uuidv4(), name: 'Hamburger', price: 15, inStock: true, image: 'https://i.pinimg.com/originals/5a/bf/cf/5abfcf24d1ea5f1b9744f9e522bd2f47.jpg', quantity: 10 },
  //   { id: uuidv4(), name: 'Bread', price: 20, inStock: true, image: 'https://i.pinimg.com/originals/e8/03/e4/e803e4963e0c0f9f338001c36b5ff4ea.jpg', quantity: 7 },
  //   { id: uuidv4(), name: 'Cake', price: 10, inStock: false, image: 'https://i.pinimg.com/originals/bf/3e/39/bf3e391920a074d8974283fafaab4f2f.jpg', quantity: 0 },
  // ];

  // useEffect(() => {
  //   localStorage.setItem('products', JSON.stringify(product));
  // }, [product]);

  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });


  const updateProductStock = (product: Product, quantityChange: number) => {
    setProducts(products.map(p =>
      p.id === product.id
        ? { ...p, quantity: p.quantity + quantityChange, inStock: p.quantity + quantityChange > 0 }
        : p
    ));
  };

  const { cart, addToCart, updateQuantity, removeFromCart, notification, setNotification } = useCart(updateProductStock);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <div className="app">
      <h1>Shopping Cart</h1>
      {notification && <Notification message={notification.message} type={notification.type} />}
      <div className="container">
        <div className="product-section">
          <h2>List Products</h2>
          <ProductList products={products} addToCart={handleAddToCart} />
        </div>
        <div className="cart-section">
          <Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
        </div>
      </div>
    </div>
  );
};

export default App;
