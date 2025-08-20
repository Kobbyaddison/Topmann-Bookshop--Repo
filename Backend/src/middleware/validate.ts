import { AnyZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = schema.parse({ body: req.body, params: req.params, query: req.query });
    req.validated = data;
    return next();
  } catch (err: any) {
    return res.status(400).json({ error: 'ValidationError', details: err.errors });
  }
};
