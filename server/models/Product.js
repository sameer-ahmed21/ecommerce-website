const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    // Set only when the product is on sale; must stay >= price.
    originalPrice: { type: Number, min: 0, default: null },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    description: { type: String, default: '' },
    image: { type: String, required: true },
    // Extra gallery images for the product detail page (falls back to [image] if empty).
    images: { type: [String], default: [] },
    // 'new-arrivals' / 'top-selling' drive the Home page sections; CategoryPage/Home
    // "Browse by Dress Style" cards use free-form values like 'casual', 'formal', etc.
    category: { type: String, required: true, trim: true, index: true },
    colors: { type: [String], default: [] },
    sizes: { type: [String], default: [] },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Frontend everywhere reads `product.id` (string) rather than Mongo's `_id`.
productSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Discount is derived, never stored, so it can never drift out of sync with
// price/originalPrice (this was issue #2 in ISSUES.md with the old hardcoded arrays).
productSchema.virtual('discount').get(function () {
  if (!this.originalPrice || this.originalPrice <= this.price) return undefined;
  const pct = Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  return `-${pct}%`;
});

productSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    delete ret._id;
    delete ret.__v;
    if (ret.discount === undefined) delete ret.discount;
    if (!ret.images || ret.images.length === 0) ret.images = [ret.image];
    return ret;
  },
});

module.exports = mongoose.model('Product', productSchema);
