# Backend Setup

1. Copy `.env.example` to `.env`:
   ```
   copy .env.example .env
   ```
2. Fill in `.env`: `MONGODB_URI` (MongoDB Atlas connection string) and `JWT_SECRET` (any long random string).
3. Install dependencies (already done once, re-run after pulling changes):
   ```
   npm install
   ```
4. Seed the database with the product catalog (run once, or again any time you
   want to reset the products collection back to the defaults):
   ```
   npm run seed
   ```
5. Create the first admin account (set `ADMIN_EMAIL`/`ADMIN_PASSWORD` in `.env` first):
   ```
   npm run seed:admin
   ```
6. Start the server:
   ```
   npm run dev
   ```
   You should see:
   ```
   [DB] Connected to MongoDB (<your-db-name>)
   Backend Server running on http://localhost:5000
   ```

## API

- `GET/POST/PUT/DELETE /api/products` — product catalog (write routes require an admin token)
- `POST /api/auth/signup`, `POST /api/auth/login`, `GET /api/auth/me`
- `GET/PATCH/DELETE /api/users` — admin only
- `POST /api/upload` — admin only, multipart image upload (Multer), returns a base64 data URI
- `GET/POST/PUT/DELETE /api/cart` — requires login; each user has their own cart, stored in MongoDB
