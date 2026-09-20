# Backend Setup

1. Copy `.env.example` to `.env`:
   ```
   copy .env.example .env
   ```
2. Paste your MongoDB connection string into `.env` as `MONGODB_URI`.
3. Install dependencies (already done once, re-run after pulling changes):
   ```
   npm install
   ```
4. Seed the database with the product catalog (run once, or again any time you
   want to reset the products collection back to the defaults):
   ```
   npm run seed
   ```
5. Start the server:
   ```
   npm run dev
   ```
   You should see:
   ```
   [DB] Connected to MongoDB (<your-db-name>)
   Backend Server running on http://localhost:5000
   ```

## API

- `GET /api/products` — all products (optional `?category=new-arrivals` filter)
- `GET /api/products/:id` — one product by its Mongo id
- `GET /api/cart`, `POST /api/cart`, `PUT /api/cart/:cartItemId`, `DELETE /api/cart/:cartItemId`
  — unchanged for now; cart is still an in-memory array (see project ISSUES.md).
