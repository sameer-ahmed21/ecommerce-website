const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  quantity: { type: Number, required: true, min: 1 },
  size: { type: String, default: 'Medium' },
  color: { type: String, default: '#000000' },
});

const cartSchema = new mongoose.Schema(
  {
    // One cart per user - this is what makes the cart per-user instead of a
    // single array shared across every visitor (ISSUES.md #9).
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: { type: [cartItemSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
