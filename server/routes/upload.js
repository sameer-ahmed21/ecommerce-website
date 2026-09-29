const express = require('express');
const upload = require('../middleware/upload');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// POST /api/upload - admin only. Accepts multipart/form-data with a single
// "image" field and returns a data URI the client can store directly on a
// product's image/images field.
router.post('/', requireAuth, requireAdmin, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image file provided' });
  }

  const base64 = req.file.buffer.toString('base64');
  const url = `data:${req.file.mimetype};base64,${base64}`;

  res.status(201).json({ url });
});

// Multer errors (oversized file, wrong mime type) reach here instead of
// crashing the request with a raw stack trace.
router.use((err, req, res, next) => {
  if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
});

module.exports = router;
