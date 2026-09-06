import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Check, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const productsData = [
  { id: '1', name: 'T-shirt with Tape Details', price: 120, rating: 4.5, image: '/products/arrival 1.png', description: 'Crafted from soft fabric.', colors: ['#4F46E5', '#312E81'], sizes: ['Small', 'Medium', 'Large'] },
  { id: '2', name: 'Skinny Fit Jeans', price: 240, originalPrice: 260, discount: '-20%', rating: 3.5, image: '/products/arrival 2.png', description: 'Stretch denim jeans.', colors: ['#1E293B', '#0F172A'], sizes: ['Medium', 'Large'] },
  { id: '3', name: 'Checkered Shirt', price: 180, rating: 4.5, image: '/products/arrival 3.png', description: 'Casual checkered shirt.', colors: ['#EF4444', '#1E293B'], sizes: ['Small', 'Medium', 'Large'] },
  { id: '4', name: 'Sleeve Striped T-shirt', price: 130, originalPrice: 160, discount: '-30%', rating: 4.5, image: '/products/arrival 4.png', description: 'Sporty t-shirt.', colors: ['#000000', '#FFFFFF'], sizes: ['Small', 'Medium', 'Large'] },
  { id: '5', name: 'Vertical Striped Shirt', price: 212, originalPrice: 232, discount: '-20%', rating: 5.0, image: '/products/topsellng1.png', description: 'Stylish vertical shirt.', colors: ['#3B82F6', '#1E293B'], sizes: ['Medium', 'Large'] },
  { id: '6', name: 'Courage Graphic T-shirt', price: 145, rating: 4.0, image: '/products/topsellng2.png', description: 'Bold graphic tee.', colors: ['#000000', '#64748B'], sizes: ['Small', 'Medium', 'Large'] },
  { id: '7', name: 'Loose Fit Bermuda Shorts', price: 80, rating: 3.0, image: '/products/topsellng3.png', description: 'Relaxed Bermuda shorts.', colors: ['#D97706', '#1E293B'], sizes: ['Medium', 'Large'] },
  { id: '8', name: 'Faded Skinny Jeans', price: 210, rating: 4.5, image: '/products/topsellng4.png', description: 'Vintage faded jeans.', colors: ['#475569', '#0F172A'], sizes: ['Small', 'Medium', 'Large'] },
];

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = productsData.find((p) => String(p.id) === String(id)) || productsData[0];

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image);

  useEffect(() => {
    setSelectedImage(product.image);
    setSelectedColor(product.colors[0]);
    setSelectedSize(product.sizes[0]);
  }, [product]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, quantity, selectedSize, selectedColor);
  };

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
            {[product.image, product.image, product.image].map((img, idx) => (
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