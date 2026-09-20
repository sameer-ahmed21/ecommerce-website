import React, { useEffect, useState } from 'react';
import { SlidersHorizontal, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from './Footer.jsx';
import { API_BASE_URL } from '../config/api';

export default function CategoryPage() {
  const [selectedCategory, setSelectedCategory] = useState('Casual');
  const [priceRange, setPriceRange] = useState(200);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('API Fetch Error:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-16 font-sans text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 space-y-6">
        <div className="text-xs text-slate-500 flex items-center gap-2">
          <Link to="/" className="hover:underline">Home</Link> &gt; <span className="font-bold text-black">Casual</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Filters Sidebar (Figma Exact Styling) */}
          <div className="lg:col-span-3 border border-slate-200 rounded-3xl p-6 space-y-6 bg-white hidden lg:block">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="font-extrabold text-xl">Filters</h3>
              <SlidersHorizontal className="w-5 h-5 text-slate-400" />
            </div>

            <div className="space-y-3 border-b pb-6 text-slate-600 text-sm">
              {['T-shirts', 'Shorts', 'Shirts', 'Hoodies', 'Jeans'].map((item) => (
                <div key={item} className="flex justify-between items-center cursor-pointer hover:text-black">
                  <span>{item}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              ))}
            </div>

            <div className="space-y-3 border-b pb-6">
              <h4 className="font-bold text-base">Price</h4>
              <input
                type="range"
                min="50"
                max="300"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full accent-black cursor-pointer"
              />
              <div className="flex justify-between text-xs font-bold">${50} - ${priceRange}</div>
            </div>

            <div className="space-y-3 border-b pb-6">
              <h4 className="font-bold text-base">Colors</h4>
              <div className="flex flex-wrap gap-2">
                {['#00C9A7', '#FF8066', '#845EC2', '#D65DB1', '#FFC75F', '#F9F871', '#000000', '#FFFFFF'].map((color, idx) => (
                  <div key={idx} className="w-8 h-8 rounded-full border border-slate-300 cursor-pointer" style={{ backgroundColor: color }} />
                ))}
              </div>
            </div>

            <div className="space-y-3 border-b pb-6">
              <h4 className="font-bold text-base">Size</h4>
              <div className="flex flex-wrap gap-2">
                {['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large'].map((sz) => (
                  <button key={sz} className="px-4 py-2 bg-[#F0EEED] rounded-full text-xs font-semibold hover:bg-black hover:text-white transition">
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full bg-black text-white py-3.5 rounded-full text-sm font-bold hover:bg-slate-800 transition">
              Apply Filter
            </button>
          </div>

          {/* Product Listing */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex justify-between items-end">
              <h1 className="text-3xl font-extrabold">{selectedCategory}</h1>
              <span className="text-xs text-slate-500">
                {loading ? 'Loading...' : `Showing 1-${allProducts.length} of ${allProducts.length} Products`}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {allProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className="group space-y-3 block">
                  <div className="bg-[#F0EEED] rounded-3xl overflow-hidden h-64 sm:h-72 p-4">
                    <img src={product.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <h3 className="font-bold text-sm text-black group-hover:underline line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-1 text-amber-400 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-slate-300'}`} />
                    ))}
                    <span className="text-slate-500 font-semibold ml-1">{product.rating}/5</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-lg sm:text-xl">${product.price}</span>
                    {product.originalPrice && <span className="text-slate-400 line-through font-bold text-sm">${product.originalPrice}</span>}
                    {product.discount && <span className="bg-red-100 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded-full">{product.discount}</span>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}