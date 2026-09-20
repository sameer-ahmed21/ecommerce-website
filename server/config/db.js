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

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error(
      '\n[DB] MONGODB_URI is not set. Copy server/.env.example to server/.env and paste your connection string.\n'
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log(`[DB] Connected to MongoDB (${mongoose.connection.name})`);
    return;
  } catch (err) {
    if (!isDnsSrvError(err)) {
      console.error('[DB] Connection failed:', err.message);
      process.exit(1);
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
    console.error('[DB] Connection failed:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
