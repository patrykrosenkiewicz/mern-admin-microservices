import { z } from 'zod';

export const createLeadSchema = z.object({
  date: z.coerce.date(),
  client: z.string(),
  phone: z.string(),
  email: z.string(),
  budget: z.string(),
  request: z.string(),
  status: z.string().default('pending'),
});
