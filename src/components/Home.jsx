import React from 'react';
import { Link } from 'react-router-dom';
import { Star, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import Hero from './hero.jsx';
import ProductSections from './ProductSections.jsx';
import Footer from './Footer.jsx';

// Updated Dress Styles with correct public image paths
const dressStyles = [
  { name: 'Casual', image: '/products/casual.png', span: 'md:col-span-4' },
  { name: 'Formal', image: '/products/formal.png', span: 'md:col-span-8' },
  { name: 'Party', image: '/products/party.png', span: 'md:col-span-8' },
  { name: 'Gym', image: '/products/gym.png', span: 'md:col-span-4' }
];

const reviews = [
  {
    id: 1,
    name: 'Sarah M.',
    rating: 5,
    comment: `"I'm blown away by the quality and style of the clothes I received from SHOP.CO. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."`
  },
  {
    id: 2,
    name: 'Alex K.',
    rating: 5,
    comment: `"Finding clothes that fit my personal style used to be a challenge until I discovered SHOP.CO. The range of options they offer is truly remarkable, catering to a variety of tastes."`
  },
  {
    id: 3,
    name: 'James L.',
    rating: 5,
    comment: `"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon SHOP.CO. The selection of clothes is not only diverse but also on-trend."`
  }
];

export default function Home() {
  return (
    <div className="space-y-16 font-sans text-black pb-12 overflow-x-hidden bg-white">
      {/* 1. Hero Banner */}
      <Hero />

      {/* 2. Brand Logos Bar */}
      <section className="bg-black py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-6 text-white font-serif text-2xl sm:text-3xl tracking-wider opacity-90">
          <span className="font-extrabold tracking-widest">VERSACE</span>
          <span className="font-bold">ZARA</span>
          <span className="font-bold tracking-wider">GUCCI</span>
          <span className="font-extrabold">PRADA</span>
          <span className="font-semibold">Calvin Klein</span>
        </div>
      </section>

      {/* 3. New Arrivals & Top Selling Sections */}
      <ProductSections />

      {/* 4. Browse By Dress Style Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-[#F0F0F0] rounded-[40px] p-6 sm:p-16 space-y-10">
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-center tracking-tight">
            BROWSE BY DRESS STYLE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {dressStyles.map((style, idx) => (
              <Link
                key={idx}
                to={`/category/${style.name.toLowerCase()}`}
                className={`${style.span} h-64 sm:h-72 rounded-3xl overflow-hidden relative group bg-white shadow-sm hover:shadow-md transition`}
              >
                <span className="absolute top-6 left-6 font-bold text-2xl sm:text-3xl text-black z-10">
                  {style.name}
                </span>
                <img
                  src={style.image}
                  alt={style.name}
                  className="w-full h-full object-cover object-right-top group-hover:scale-105 transition duration-500"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Customer Reviews Slider/Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex justify-between items-end">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            OUR HAPPY CUSTOMERS
          </h2>
          <div className="flex gap-3">
            <button className="p-3 border border-slate-200 rounded-full hover:bg-slate-100 transition">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button className="p-3 border border-slate-200 rounded-full hover:bg-slate-100 transition">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="border border-slate-200 rounded-3xl p-8 space-y-4 shadow-sm bg-white">
              <div className="flex text-amber-400 gap-1">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="flex items-center gap-2 font-bold text-lg">
                <span>{rev.name}</span>
                <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-600 text-white" />
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{rev.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Footer Section */}
      <Footer />
    </div>
  );
}