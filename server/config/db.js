const dns = require('dns');
const mongoose = require('mongoose');

// mongodb+srv:// URIs need a DNS SRV lookup before Mongoose can even attempt a
// connection. On some networks the machine's configured DNS resolver (e.g. a
// local VPN/router stub) refuses SRV queries even though it resolves normal
// A records fine, which makes mongoose.connect() fail before it ever reaches
// Atlas. If that happens, retry once with public DNS resolvers.
function isDnsSrvError(err) {
  return err && err.syscall === 'querySrv';
}

// On serverless platforms (Vercel) there's no long-lived process to exit out
// of, and a warm function instance should reuse its existing connection
// instead of reconnecting on every invocation - so exitOnFailure is
// opt-out-able and an already-open connection short-circuits the function.
async function connectDB({ exitOnFailure = true } = {}) {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  const uri = process.env.MONGODB_URI;

  function fail(message, err) {
    console.error(message, err ? err.message : '');
    if (exitOnFailure) process.exit(1);
    throw err || new Error(message);
  }

  if (!uri) {
    fail(
      '\n[DB] MONGODB_URI is not set. Copy server/.env.example to server/.env and paste your connection string.\n'
    );
  }

  try {
    await mongoose.connect(uri);
    console.log(`[DB] Connected to MongoDB (${mongoose.connection.name})`);
    return;
  } catch (err) {
    if (!isDnsSrvError(err)) {
      fail('[DB] Connection failed:', err);
    }
  }

  console.warn(
    `[DB] Local DNS resolver (${dns.getServers().join(', ')}) refused the mongodb+srv SRV lookup. Retrying with public DNS (8.8.8.8, 1.1.1.1)...`
  );
  dns.setServers(['8.8.8.8', '1.1.1.1']);

  try {
    await mongoose.connect(uri);
    console.log(`[DB] Connected to MongoDB (${mongoose.connection.name})`);
  } catch (err) {
    fail('[DB] Connection failed:', err);
  }
}

module.exports = connectDB;
