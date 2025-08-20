import { z } from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    author: z.string().optional(),
    description: z.string().optional(),
    price: z.number().positive(),
    compareAtPrice: z.number().positive().optional(),
    stock: z.number().int().nonnegative(),
    sku: z.string().optional(),
    categories: z.array(z.string()).optional()
  })
});
