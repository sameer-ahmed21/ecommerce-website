require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');

async function run() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || 'Admin';

  if (!email || !password) {
    console.error('[Seed Admin] Set ADMIN_EMAIL and ADMIN_PASSWORD in .env first.');
    process.exit(1);
  }

  await connectDB();

  let user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (user) {
    user.role = 'admin';
    user.name = name;
    user.password = password;
    await user.save();
    console.log(`[Seed Admin] Promoted existing user to admin: ${user.email}`);
  } else {
    user = await User.create({ name, email, password, role: 'admin' });
    console.log(`[Seed Admin] Created admin: ${user.email}`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error('[Seed Admin] Failed:', err);
  process.exit(1);
});
