import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { me, upsertAddress } from '../controllers/user.controller.js';

const r = Router();

r.get('/me', requireAuth, me);
r.post('/addresses', requireAuth, upsertAddress);

export default r;
