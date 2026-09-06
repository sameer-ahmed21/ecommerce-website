import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// Corrected Imports (pointing to src/components/)
import Home from './components/Home.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import Category from './components/CategoryPage.jsx';
import Cart from './components/CartPage.jsx';
import Navbar from './components/navbar.jsx';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}