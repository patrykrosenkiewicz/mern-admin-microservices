import { z } from 'zod';

export const createUserSchema = z
  .object({
    name: z.string(),
    surname: z.string(),
    email: z.string().email(),
    password: z.string().min(1),
    photo: z.string().nullable().optional(),
  })
  .required();
