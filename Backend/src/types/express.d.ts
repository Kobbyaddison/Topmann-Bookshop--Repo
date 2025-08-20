import 'express';
import { AnyZodObject } from 'zod';
import { JwtUser } from '../middleware/auth.js';

declare module 'express-serve-static-core' {
  interface Request {
    validated?: any;
    user?: JwtUser;
  }
}
