import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 1000 });
export const generalLimiter = rateLimit({ windowMs: 1 * 60 * 1000, max: 1200 });
