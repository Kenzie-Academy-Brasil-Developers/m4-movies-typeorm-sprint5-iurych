import { Repository } from 'typeorm';
import { TMoveResponse } from '../interfaces/movie.inteface';
import { AppDataSource } from '../data-source';
import { Movie } from '../entities';

export const deleteMovieService = async (
  movie: TMoveResponse
): Promise<void> => {
  const moviesRepo: Repository<TMoveResponse> =
    AppDataSource.getRepository(Movie);

  await moviesRepo.remove(movie!);
};
