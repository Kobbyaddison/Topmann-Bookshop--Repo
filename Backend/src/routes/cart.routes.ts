import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { upsertItemSchema } from '../schemas/cart.schema.js';
import { clearCart, getCart, removeItem, upsertItem } from '../controllers/cart.controller.js';

const r = Router();

r.get('/', requireAuth, getCart);
r.post('/item', requireAuth, validate(upsertItemSchema), upsertItem);
r.delete('/item/:productId', requireAuth, removeItem);
r.delete('/', requireAuth, clearCart);

export default r;
