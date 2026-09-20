// Loads server/data/products.js into MongoDB.
// Usage:
//   node seed.js          -> replaces the products collection with the seed data
//   node seed.js --clear  -> just empties the products collection
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const products = require('./data/products');

async function run() {
  await connectDB();

  await Product.deleteMany({});
  console.log('[Seed] Cleared existing products.');

  if (!process.argv.includes('--clear')) {
    const inserted = await Product.insertMany(products);
    console.log(`[Seed] Inserted ${inserted.length} products.`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error('[Seed] Failed:', err);
  process.exit(1);
});
