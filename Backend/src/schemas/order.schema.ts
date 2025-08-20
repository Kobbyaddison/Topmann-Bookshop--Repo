import { z } from 'zod';

export const checkoutSchema = z.object({
  body: z.object({
    addressId: z.string(),
    shipping: z.number().nonnegative().default(0),
    currency: z.string().default('usd')
  })
});
