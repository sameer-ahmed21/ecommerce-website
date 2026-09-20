const connectDB = require('../config/db');
const app = require('../app');

module.exports = async (req, res) => {
  await connectDB({ exitOnFailure: false });
  return app(req, res);
};
