import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import { errorHandler, notFound } from './middleware/error.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import orderRoutes, { webhookRouter } from './routes/order.routes.js';
import contentRoutes from './routes/content.routes.js';
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Stripe webhook needs raw body
app.use('/api/webhooks', express.raw({ type: 'application/json' }), webhookRouter);

app.use(helmet());
app.use(cors({ origin: env.CLIENT_URL || 'http://localhost:3000', credentials: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/content', contentRoutes);

// Serve product images
app.use('/images', express.static(path.join(__dirname, '../public/images')));

app.use(notFound);
app.use(errorHandler);

connectDB().then(() => {
  app.listen(env.PORT, () => console.log(`🚀 API on :${env.PORT}`));
});
