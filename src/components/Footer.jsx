import React from 'react';
import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#F0F0F0] pt-32 pb-12 mt-40">
      {/* Floating Newsletter Banner */}
      <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl bg-black rounded-[32px] p-8 sm:p-12 text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl">
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight max-w-md leading-tight">
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </h2>
        <div className="w-full md:w-80 space-y-3">
          <div className="flex items-center bg-white rounded-full px-4 py-3 text-black">
            <Mail className="w-5 h-5 text-slate-400 mr-2" />
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full text-xs outline-none bg-transparent"
            />
          </div>
          <button className="w-full bg-white text-black font-bold rounded-full py-3 text-xs hover:bg-slate-200 transition">
            Subscribe to Newsletter
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-2 md:grid-cols-5 gap-8 text-slate-600 text-sm">
        <div className="col-span-2 space-y-4">
          <h3 className="text-3xl font-black text-black">SHOP.CO</h3>
          <p className="text-xs max-w-xs leading-relaxed">
            We have clothes that suits your style and which you're proud to wear. From women to men.
          </p>
          
          {/* Social Icons (Pure Clean SVGs) */}
          <div className="flex gap-3 pt-2">
            {/* Twitter / X */}
            <span className="p-2.5 bg-white rounded-full border hover:bg-black hover:text-white transition cursor-pointer flex items-center justify-center">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </span>
            {/* Facebook */}
            <span className="p-2.5 bg-black text-white rounded-full border hover:bg-slate-800 transition cursor-pointer flex items-center justify-center">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </span>
            {/* Instagram */}
            <span className="p-2.5 bg-white rounded-full border hover:bg-black hover:text-white transition cursor-pointer flex items-center justify-center">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </span>
            {/* GitHub */}
            <span className="p-2.5 bg-white rounded-full border hover:bg-black hover:text-white transition cursor-pointer flex items-center justify-center">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-black uppercase text-xs tracking-wider">COMPANY</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Features</a></li>
            <li><a href="#" className="hover:underline">Works</a></li>
            <li><a href="#" className="hover:underline">Career</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-black uppercase text-xs tracking-wider">HELP</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:underline">Customer Support</a></li>
            <li><a href="#" className="hover:underline">Delivery Details</a></li>
            <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-black uppercase text-xs tracking-wider">FAQ</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:underline">Account</a></li>
            <li><a href="#" className="hover:underline">Manage Deliveries</a></li>
            <li><a href="#" className="hover:underline">Orders</a></li>
            <li><a href="#" className="hover:underline">Payments</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-12 pt-6 border-t border-slate-300 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
        <p>Shop.co © 2000-2023, All Rights Reserved</p>
        <div className="flex gap-2 font-bold text-slate-700">
          <span className="px-2 py-1 bg-white border rounded">Visa</span>
          <span className="px-2 py-1 bg-white border rounded">Mastercard</span>
          <span className="px-2 py-1 bg-white border rounded">PayPal</span>
          <span className="px-2 py-1 bg-white border rounded">Apple Pay</span>
          <span className="px-2 py-1 bg-white border rounded">Google Pay</span>
        </div>
      </div>
    </footer>
  );
}