import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const context = useCart();
  const cart = context?.cart || [];
  const removeFromCart = context?.removeFromCart || (() => {});
  const updateQuantity = context?.updateQuantity || (() => {});

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal * 0.2; // 20% discount
  const deliveryFee = subtotal > 0 ? 15 : 0;
  const total = subtotal - discount + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <h2 className="text-3xl font-black uppercase">Your Cart is Empty</h2>
        <p className="text-slate-500">Looks like you haven't added anything to your cart yet.</p>
        <Link
          to="/"
          className="inline-block bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-slate-800 transition"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">YOUR CART</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-7 border border-slate-200 rounded-3xl p-4 sm:p-6 space-y-6 bg-white">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 pb-6 border-b border-slate-100 last:border-none last:pb-0">
              <div className="w-24 h-24 bg-[#F0EEED] rounded-2xl overflow-hidden flex-shrink-0 p-2">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-black text-base sm:text-lg">{item.name}</h3>
                    {item.size && <p className="text-xs text-slate-500">Size: <span className="text-black">{item.size}</span></p>}
                    {item.color && <p className="text-xs text-slate-500">Color: <span className="text-black">{item.color}</span></p>}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition p-1"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <span className="font-extrabold text-xl">${item.price}</span>

                  <div className="flex items-center bg-[#F0F0F0] rounded-full px-3 py-1 gap-4">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-black hover:opacity-60"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-black hover:opacity-60"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5 border border-slate-200 rounded-3xl p-6 space-y-6 bg-white">
          <h2 className="text-xl font-bold text-black">Order Summary</h2>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-bold text-black">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Discount (-20%)</span>
              <span className="font-bold text-red-500">-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery Fee</span>
              <span className="font-bold text-black">${deliveryFee}</span>
            </div>
            <hr className="border-slate-200" />
            <div className="flex justify-between text-base font-extrabold text-black">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button className="w-full bg-black text-white py-4 rounded-full font-medium hover:bg-slate-800 transition flex items-center justify-center gap-2">
            Go to Checkout <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}