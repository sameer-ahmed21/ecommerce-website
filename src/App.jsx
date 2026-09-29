import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PublicLayout from './components/PublicLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import Home from './components/Home.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import Category from './components/CategoryPage.jsx';
import Cart from './components/CartPage.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category" element={<Category />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
