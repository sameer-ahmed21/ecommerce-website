import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const context = useCart();
  const cartCount = context?.cartCount || 0;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="bg-black text-white text-xs text-center py-2 px-4">
        Sign up and get 20% off to your first order.{' '}
        <Link to="#" className="underline font-bold">
          Sign Up Now
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
          SHOP.CO
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-slate-600 transition">
            Shop
          </Link>
          <Link to="#" className="hover:text-slate-600 transition">
            On Sale
          </Link>
          <Link to="#" className="hover:text-slate-600 transition">
            New Arrivals
          </Link>
          <Link to="#" className="hover:text-slate-600 transition">
            Brands
          </Link>
        </div>

        <div className="hidden sm:flex items-center bg-[#F0F0F0] rounded-full px-4 py-2 w-1/3">
          <Search className="w-4 h-4 text-slate-400 mr-2" />
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full bg-transparent text-xs outline-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative p-2 hover:bg-slate-100 rounded-full transition">
            <ShoppingCart className="w-5 h-5 text-black" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button className="p-2 hover:bg-slate-100 rounded-full transition">
            <User className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>
    </nav>
  );
}