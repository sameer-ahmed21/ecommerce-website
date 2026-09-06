const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// Aap ka original data + Top Selling products add kar diye hain
const products = [
  // New Arrivals
  { id: '1', name: 'T-shirt with Tape Details', price: 120, rating: 4.5, image: '/products/arrival 1.png', category: 'new-arrivals' },
  { id: '2', name: 'Skinny Fit Jeans', price: 240, originalPrice: 260, discount: '-20%', rating: 3.5, image: '/products/arrival 2.png', category: 'new-arrivals' },
  { id: '3', name: 'Checkered Shirt', price: 180, rating: 4.5, image: '/products/arrival 3.png', category: 'new-arrivals' },
  { id: '4', name: 'Sleeve Striped T-shirt', price: 130, originalPrice: 160, discount: '-30%', rating: 4.5, image: '/products/arrival 4.png', category: 'new-arrivals' },
  
  // Top Selling (Naye Add kiye hain)
  { id: '5', name: 'Vertical Striped Shirt', price: 212, originalPrice: 232, discount: '-20%', rating: 5.0, image: '/products/topsellng1.png', category: 'top-selling' },
  { id: '6', name: 'Courage Graphic T-shirt', price: 145, rating: 4.0, image: '/products/topsellng2.png', category: 'top-selling' },
  { id: '7', name: 'Loose Fit Bermuda Shorts', price: 80, rating: 3.0, image: '/products/topsellng3.png', category: 'top-selling' },
  { id: '8', name: 'Faded Skinny Jeans', price: 210, rating: 4.5, image: '/products/topsellng4.png', category: 'top-selling' }
];

let cart = [];

// 1. GET: All Products API
app.get('/api/products', (req, res) => {
  res.json(products);
});

// 2. GET: Single Product API (Naya Endpoint Product Detail Page ke liye)
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => String(p.id) === String(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// 3. GET: Fetch Cart State
app.get('/api/cart', (req, res) => {
  res.json(cart);
});

// 4. POST: Add to Cart (Aap ka original code)
app.post('/api/cart', (req, res) => {
  const { productId, size, color } = req.body;
  
  const product = products.find(p => String(p.id) === String(productId));

  if (!product) {
    return res.status(404).json({ message: 'Product not found in backend list', productId });
  }

  const existingIndex = cart.findIndex(
    item => String(item.id) === String(productId) && item.size === size && item.color === color
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({
      cartItemId: Date.now().toString(),
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: size || 'Medium',
      color: color || '#000000'
    });
  }

  res.status(201).json({ message: 'Item added to cart', cart });
});

// 5. PUT: Update Cart Quantity (Aap ka original code)
app.put('/api/cart/:cartItemId', (req, res) => {
  const { cartItemId } = req.params;
  const { quantity } = req.body;

  const item = cart.find(i => i.cartItemId === cartItemId);
  if (item) {
    item.quantity = Number(quantity);
    return res.json({ message: 'Cart updated', cart });
  }

  res.status(404).json({ message: 'Cart item not found' });
});

// 6. DELETE: Remove Item (Aap ka original code)
app.delete('/api/cart/:cartItemId', (req, res) => {
  const { cartItemId } = req.params;
  cart = cart.filter(item => item.cartItemId !== cartItemId);
  res.json({ message: 'Item deleted', cart });
});

app.listen(PORT, () => {
  console.log(`Backend Server running on http://localhost:${PORT}`);
});~