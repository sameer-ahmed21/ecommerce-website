const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

function serializeCart(cart) {
  return (cart?.items || []).map((item) => ({
    cartItemId: item._id.toString(),
    id: item.product.toString(),
    name: item.name,
    price: item.price,
    image: item.image,
    quantity: item.quantity,
    size: item.size,
    color: item.color,
  }));
}

async function getOrCreateCart(userId) {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  return cart;
}

// Every route below needs a logged-in user - the cart belongs to them.
router.use(requireAuth);

// GET: Fetch the current user's cart
router.get('/', async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user.id);
    res.json(serializeCart(cart));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
});

// POST: Add to cart (merges into an existing line if same product+size+color)
router.post('/', async (req, res) => {
  try {
    const { productId, size, color, quantity } = req.body;
    const qty = Number(quantity) || 1;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found', productId });
    }

    const cart = await getOrCreateCart(req.user.id);
    const resolvedSize = size || 'Medium';
    const resolvedColor = color || '#000000';

    const existing = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.size === resolvedSize &&
        item.color === resolvedColor
    );

    if (existing) {
      existing.quantity += qty;
    } else {
      cart.items.push({
        product: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: qty,
        size: resolvedSize,
        color: resolvedColor,
      });
    }

    await cart.save();
    res.status(201).json({ message: 'Item added to cart', cart: serializeCart(cart) });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ message: 'Product not found', productId: req.body.productId });
    }
    console.error(err);
    res.status(500).json({ message: 'Failed to add to cart' });
  }
});

// PUT: Update one line's quantity
router.put('/:cartItemId', async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    const cart = await getOrCreateCart(req.user.id);
    const item = cart.items.id(cartItemId);
    if (!item) return res.status(404).json({ message: 'Cart item not found' });

    item.quantity = Number(quantity);
    await cart.save();
    res.json({ message: 'Cart updated', cart: serializeCart(cart) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update cart' });
  }
});

// DELETE: Remove one line
router.delete('/:cartItemId', async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const cart = await getOrCreateCart(req.user.id);
    cart.items.pull({ _id: cartItemId });
    await cart.save();
    res.json({ message: 'Item deleted', cart: serializeCart(cart) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete cart item' });
  }
});

module.exports = router;
