import { z } from 'zod';

export const createMovieSchema = z.object({
  name: z.string().max(50),
  description: z.string().nullish(),
  duration: z.number().positive(),
  price: z.number().int(),
});

export const movieResponseSchema = createMovieSchema.extend({
  id: z.number(),
});

export const updateMovieSchema = createMovieSchema.partial();
