import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { apiRequest } from '../utils/apiClient';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshCart = useCallback(() => {
    if (!isAuthenticated) {
      setCart([]);
      return;
    }
    setLoading(true);
    apiRequest('/api/cart')
      .then(setCart)
      .catch((err) => console.error('Failed to load cart:', err))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addToCart = async (product, count = 1, size, color) => {
    const data = await apiRequest('/api/cart', {
      method: 'POST',
      body: { productId: product.id, size, color, quantity: count },
    });
    setCart(data.cart);
  };

  const removeFromCart = async (cartItemId) => {
    const data = await apiRequest(`/api/cart/${cartItemId}`, { method: 'DELETE' });
    setCart(data.cart);
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    const data = await apiRequest(`/api/cart/${cartItemId}`, {
      method: 'PUT',
      body: { quantity: newQuantity },
    });
    setCart(data.cart);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartCount, loading }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
