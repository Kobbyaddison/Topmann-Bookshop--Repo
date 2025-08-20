import { Router } from 'express';
import { requireAdmin } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createProductSchema } from '../schemas/product.schema.js';
import { categories, create, detail, list, remove, update, upsertCategory } from '../controllers/product.controller.js';

const r = Router();

r.get('/', list);
r.get('/categories', categories);
r.get('/:id', detail);

// Admin
r.post('/', requireAdmin as any, validate(createProductSchema), create);
r.patch('/:id', requireAdmin as any, update);
r.delete('/:id', requireAdmin as any, remove);

r.post('/category', requireAdmin as any, upsertCategory);

export default r;
