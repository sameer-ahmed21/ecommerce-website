const express = require('express');
const cors = require('cors');
const Product = require('./models/Product');
const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const uploadRouter = require('./routes/upload');

const app = express();

// Raised from Express's 100kb default so a product body carrying a
// base64-encoded uploaded image (see routes/upload.js) isn't rejected.
app.use(express.json({ limit: '4mb' }));
app.use(cors());

app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/upload', uploadRouter);

// NOTE: cart is still an in-memory array shared across all users — that's
// tracked separately as ISSUES.md #1/#9 and is out of scope for this change,
// which only moves the PRODUCT catalog onto the database.
let cart = [];

// 3. GET: Fetch Cart State
app.get('/api/cart', (req, res) => {
  res.json(cart);
});

// 4. POST: Add to Cart
app.post('/api/cart', async (req, res) => {
  try {
    const { productId, size, color } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found in backend list', productId });
    }

    const existingIndex = cart.findIndex(
      (item) => String(item.id) === String(productId) && item.size === size && item.color === color
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
        color: color || '#000000',
      });
    }

    res.status(201).json({ message: 'Item added to cart', cart });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ message: 'Product not found in backend list', productId: req.body.productId });
    }
    console.error(err);
    res.status(500).json({ message: 'Failed to add to cart' });
  }
});

// 5. PUT: Update Cart Quantity
app.put('/api/cart/:cartItemId', (req, res) => {
  const { cartItemId } = req.params;
  const { quantity } = req.body;

  const item = cart.find((i) => i.cartItemId === cartItemId);
  if (item) {
    item.quantity = Number(quantity);
    return res.json({ message: 'Cart updated', cart });
  }

  res.status(404).json({ message: 'Cart item not found' });
});

// 6. DELETE: Remove Item
app.delete('/api/cart/:cartItemId', (req, res) => {
  const { cartItemId } = req.params;
  cart = cart.filter((item) => item.cartItemId !== cartItemId);
  res.json({ message: 'Item deleted', cart });
});

module.exports = app;
