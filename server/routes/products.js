const express = require('express');
const Product = require('../models/Product');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// 1. GET: All products, optionally filtered by category (?category=new-arrivals)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;

    const products = await Product.find(filter).sort({ createdAt: 1 });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// 2. GET: Single product by id (Mongo ObjectId)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    // Malformed ObjectId throws a CastError - treat it as "not found", not a 500.
    if (err.name === 'CastError') return res.status(404).json({ message: 'Product not found' });
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch product' });
  }
});

// 3. POST: Create product (admin only)
router.post('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    console.error(err);
    res.status(500).json({ message: 'Failed to create product' });
  }
});

// 4. PUT: Update product (admin only)
router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    if (err.name === 'CastError') return res.status(404).json({ message: 'Product not found' });
    console.error(err);
    res.status(500).json({ message: 'Failed to update product' });
  }
});

// 5. DELETE: Remove product (admin only)
router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    if (err.name === 'CastError') return res.status(404).json({ message: 'Product not found' });
    console.error(err);
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

module.exports = router;
