import { Repository } from 'typeorm';
import { TMoveResponse, TMoveRequest } from '../interfaces/movie.inteface';
import { AppDataSource } from '../data-source';
import { Movie } from '../entities';

export const createMovieService = async (
  payload: TMoveRequest
): Promise<TMoveResponse> => {
  const moviesRepo: Repository<TMoveResponse> =
    AppDataSource.getRepository(Movie);

  const movie: TMoveResponse = moviesRepo.create(payload);

  await moviesRepo.save(movie);

  return movie;
};
