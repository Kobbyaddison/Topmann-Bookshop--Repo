import { z } from 'zod';

export const upsertItemSchema = z.object({
  body: z.object({ productId: z.string(), qty: z.number().int().positive() })
});
