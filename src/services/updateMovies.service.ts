import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Movie } from '../entities';
import {
  TMoveResponse,
  TMovieUpdatedRequest,
} from '../interfaces/movie.inteface';


export const updateMovieService = async (
  foundMovie: TMoveResponse,
  payload: TMovieUpdatedRequest
): Promise<TMoveResponse> => {
  const moviesRepo: Repository<TMoveResponse> =
    AppDataSource.getRepository(Movie);

  const updatedMovie: TMoveResponse = await moviesRepo.save({
    ...foundMovie,
    ...payload,
  });

  return updatedMovie;
};
