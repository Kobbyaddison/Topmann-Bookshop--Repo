# Topman Bookshop API

### Run Locally
1. Copy `.env.example` to `.env` and fill values.
2. `npm install`
3. `npm run dev`

### Render Deployment
- Create a new **Web Service**.
- Runtime: Node 18+.
- Build Command: `npm run build`
- Start Command: `npm start`
- Add Environment variables from `.env.example`.
- Add **MongoDB Atlas** connection string to `MONGO_URI`.
- Add a route for Stripe webhook: create another Render **Web Service** or **Background Worker** that points to the same codebase and exposes `/api/webhooks/stripe` with *raw body*; or configure in this service and allow Stripe to reach it.

### API Quick Map
- `POST /api/auth/register` → email verification link
- `GET /api/auth/verify-email?token=...`
- `POST /api/auth/login` (sets httpOnly cookies)
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `POST /api/auth/request-reset`
- `POST /api/auth/reset-password`

- `GET /api/users/me` (auth)
- `POST /api/users/addresses` (auth) — add/update address

- `GET /api/products` (q, page, limit, category)
- `GET /api/products/:id`
- `POST /api/products` (admin)
- `PATCH /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin)
- `POST /api/products/category` (admin)
- `GET /api/products/categories`

- `GET /api/cart` (auth)
- `POST /api/cart/item` (auth)
- `DELETE /api/cart/item/:productId` (auth)
- `DELETE /api/cart` (auth)

- `POST /api/orders/checkout` (auth)
- `GET /api/orders/mine` (auth)
- `GET /api/orders/:id` (auth)
- `POST /api/webhooks/stripe` (raw body)

### Notes
- Swap Stripe for Paystack easily in `order.controller.ts`.
- Add image upload endpoint using `multer` + `cloudinary.uploader.upload_stream` if you prefer uploading from admin UI.
- Adjust CORS `CLIENT_URL` to your deployed frontend.
```

---

> This codebase covers all pages in the design: registration/login/reset/verify flows, product list/detail & search, cart, checkout, account (addresses & orders), order confirmation, profile, and static pages (help/about/terms/privacy/contact). Hook the frontend forms directly to these endpoints.

