import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="w-full bg-[#F2F0F1] pt-8 lg:pt-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        {/* Left Text */}
        <div className="lg:col-span-7 pb-8 lg:pb-16 space-y-6">
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none text-black">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl leading-relaxed">
            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
          </p>

          <Link
            to="/category"
            className="inline-block bg-black text-white px-14 py-4 rounded-full font-medium hover:bg-slate-800 transition text-center w-full sm:w-auto"
          >
            Shop Now
          </Link>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-6 max-w-lg border-t border-slate-200 lg:border-none">
            <div>
              <h3 className="text-2xl sm:text-4xl font-bold text-black">200+</h3>
              <p className="text-xs text-slate-500">International Brands</p>
            </div>
            <div className="border-l border-slate-300 pl-4">
              <h3 className="text-2xl sm:text-4xl font-bold text-black">2,000+</h3>
              <p className="text-xs text-slate-500">High Quality Products</p>
            </div>
            <div className="border-l border-slate-300 pl-4">
              <h3 className="text-2xl sm:text-4xl font-bold text-black">30,000+</h3>
              <p className="text-xs text-slate-500">Happy Customers</p>
            </div>
          </div>
        </div>

        {/* Right Hero Image */}
        <div className="lg:col-span-5 relative flex justify-center items-end min-h-[380px] lg:min-h-[500px]">
          <span className="absolute top-8 right-6 text-black text-4xl lg:text-5xl select-none pointer-events-none">✦</span>
          <span className="absolute top-1/2 left-4 text-black text-2xl lg:text-3xl select-none pointer-events-none">✦</span>

          <img
            src="/products/hero-banner.png" 
            alt="Hero Banner"
            className="w-full h-auto max-h-[480px] lg:max-h-[560px] object-contain object-bottom block z-10"
          />
        </div>
      </div>
    </section>
  );
}