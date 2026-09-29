const multer = require('multer');

// Memory storage (not disk) because the backend runs as a Vercel serverless
// function in production - there's no persistent/shared filesystem to save
// files to. The uploaded buffer is turned into a base64 data URI by the
// route handler and stored directly on the product document.
const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Only image files are allowed'));
  }
  cb(null, true);
}

// Kept well under Vercel's ~4.5MB serverless request body cap: a 2MB file
// becomes ~2.7MB once base64-encoded and wrapped in the product's JSON body.
module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});
