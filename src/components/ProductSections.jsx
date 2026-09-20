import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { API_BASE_URL } from '../config/api';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="group space-y-3 block">
      <Link to={`/product/${product.id}`} className="block">
        <div className="bg-[#F0EEED] rounded-3xl overflow-hidden h-64 sm:h-72 flex items-center justify-center p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
      </Link>

      <Link to={`/product/${product.id}`} className="block">
        <h3 className="font-bold text-base text-black group-hover:underline line-clamp-1">
          {product.name}
        </h3>
      </Link>

      <div className="flex items-center gap-2">
        <div className="flex text-amber-400 gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating)
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-slate-300'
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-slate-500 font-medium">
          {product.rating}/5
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-xl">${product.price}</span>
          {product.originalPrice && (
            <span className="text-slate-400 line-through font-bold text-sm">
              ${product.originalPrice}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => addToCart(product, 1)}
          className="bg-black text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-slate-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function ProductSections() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Express Server Request
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('API Fetch Error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 font-bold text-slate-500">
        Loading products from server...
      </div>
    );
  }

  const newArrivals = products.filter((p) => p.category === 'new-arrivals');
  const topSelling = products.filter((p) => p.category === 'top-selling');

  // HERE IS POINT 3 (RETURN STATEMENT)
  return (
    <div className="space-y-20 max-w-7xl mx-auto px-4 sm:px-8">
      {/* New Arrivals Section */}
      <section className="space-y-10 border-b border-slate-200 pb-16">
        <h2 className="text-3xl sm:text-5xl font-black uppercase text-center tracking-tight">
          NEW ARRIVALS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      {/* Top Selling Section */}
      <section className="space-y-10">
        <h2 className="text-3xl sm:text-5xl font-black uppercase text-center tracking-tight">
          TOP SELLING
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topSelling.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}