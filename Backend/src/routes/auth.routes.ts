import { Router } from 'express';
import { authLimiter } from '../middleware/rateLimit.js';
import { validate } from '../middleware/validate.js';
import { loginSchema, registerSchema, requestResetSchema, resetPasswordSchema } from '../schemas/auth.schema.js';
import { login, logout, refresh, register, requestPasswordReset, resetPassword, verifyEmail } from '../controllers/auth.controller.js';

const r = Router();

r.post('/register', authLimiter, validate(registerSchema), register);
r.get('/verify-email', verifyEmail);
r.post('/login', authLimiter, validate(loginSchema), login);
r.post('/refresh', refresh);
r.post('/logout', logout);

r.post('/request-reset', validate(requestResetSchema), requestPasswordReset);
r.post('/reset-password', validate(resetPasswordSchema), resetPassword);

export default r;
