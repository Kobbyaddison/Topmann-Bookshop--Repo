import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { checkoutSchema } from '../schemas/order.schema.js';
import { checkout, detail, myOrders, webhook } from '../controllers/order.controller.js';

const r = Router();

r.post('/checkout', requireAuth, validate(checkoutSchema), checkout);
r.get('/mine', requireAuth, myOrders);
r.get('/:id', requireAuth, detail);

// Stripe webhook (must use raw body) – mount separately in server.ts
export const webhookRouter = Router();
webhookRouter.post('/stripe', webhook);

export default r;
