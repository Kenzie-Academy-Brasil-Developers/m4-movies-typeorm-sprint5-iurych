import { z } from 'zod';
import {
  createMovieSchema,
  movieResponseSchema,
} from '../schemas/movies.schema';
import { DeepPartial } from 'typeorm';

export type TMove = z.infer<typeof createMovieSchema>;
export type TMoveRequest = TMove;
export type TMoveResponse = z.infer<typeof movieResponseSchema>;
export type TMovieUpdatedRequest = DeepPartial<TMove>;

const transformArray = z.array(movieResponseSchema);
export type TMovieArray = z.infer<typeof transformArray>;

export type TMoviePagination = {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: TMovieArray;
};
