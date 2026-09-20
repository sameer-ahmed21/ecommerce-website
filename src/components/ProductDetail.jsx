import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Check, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { API_BASE_URL } from '../config/api';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);

    fetch(`${API_BASE_URL}/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setSelectedImage((data.images && data.images[0]) || data.image);
        setSelectedColor((data.colors && data.colors[0]) || null);
        setSelectedSize((data.sizes && data.sizes[0]) || null);
        setQuantity(1);
        setLoading(false);
      })
      .catch((err) => {
        console.error('API Fetch Error:', err);
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 font-bold text-slate-500">Loading product...</div>;
  }

  if (notFound || !product) {
    return (
      <div className="text-center py-20 space-y-4">
        <p className="font-bold text-slate-500">Product not found.</p>
        <Link to="/category" className="underline text-sm">Back to shop</Link>
      </div>
    );
  }

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const gallery = (product.images && product.images.length > 0) ? product.images : [product.image];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12 font-sans text-black">
      <div className="text-xs text-slate-500 flex items-center gap-2">
        <Link to="/" className="hover:underline">Home</Link> &gt;
        <Link to="/category" className="hover:underline">Shop</Link> &gt;
        <span className="font-bold text-black">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          <div className="flex sm:flex-col gap-3">
            {gallery.map((img, idx) => (
              <button key={idx} type="button" onClick={() => setSelectedImage(img)} className={`w-20 h-20 rounded-2xl overflow-hidden bg-[#F0EEED] border-2 ${selectedImage === img ? 'border-black' : 'border-transparent'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1 bg-[#F0EEED] rounded-3xl overflow-hidden h-[380px] sm:h-[500px]">
            <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <h1 className="text-3xl font-black uppercase">{product.name}</h1>
          <span className="font-extrabold text-3xl block">${product.price}</span>
          <p className="text-slate-500 text-sm">{product.description}</p>

          {product.colors && product.colors.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs text-slate-500 font-medium">Select Colors</span>
              <div className="flex gap-3">
                {product.colors.map((color, idx) => (
                  <button key={idx} type="button" onClick={() => setSelectedColor(color)} className="w-8 h-8 rounded-full flex items-center justify-center border" style={{ backgroundColor: color }}>
                    {selectedColor === color && <Check className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs text-slate-500 font-medium">Choose Size</span>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button key={size} type="button" onClick={() => setSelectedSize(size)} className={`px-4 py-2 rounded-full text-xs font-semibold ${selectedSize === size ? 'bg-black text-white' : 'bg-[#F0EEED]'}`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-2">
            <div className="flex items-center justify-between bg-[#F0EEED] rounded-full px-4 py-3 w-32">
              <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))}><Minus className="w-4 h-4" /></button>
              <span className="font-bold text-sm">{quantity}</span>
              <button type="button" onClick={() => setQuantity((q) => q + 1)}><Plus className="w-4 h-4" /></button>
            </div>
            <button type="button" onClick={handleAddToCart} className="flex-1 bg-black text-white rounded-full py-3.5 text-sm font-bold hover:bg-slate-800 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
