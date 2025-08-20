import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export interface JwtUser { _id: string; role: 'user' | 'admin'; }

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.accessToken || (req.headers.authorization?.split(' ')[1]);
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtUser;
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  next();
}
