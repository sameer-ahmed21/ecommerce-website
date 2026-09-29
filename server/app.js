const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const uploadRouter = require('./routes/upload');
const cartRouter = require('./routes/cart');

const app = express();

// Raised from Express's 100kb default so a product body carrying a
// base64-encoded uploaded image (see routes/upload.js) isn't rejected.
app.use(express.json({ limit: '4mb' }));
app.use(cors());

app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/cart', cartRouter);

module.exports = app;
