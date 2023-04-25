import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors';
import { Repository } from 'typeorm';
import { Movie } from '../entities';
import { TMoveResponse } from '../interfaces/movie.inteface';
import { AppDataSource } from '../data-source';

export const verifyIdExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const movieRepo: Repository<TMoveResponse> =
    AppDataSource.getRepository(Movie);

  const movieId = Number(req.params.id);

  const foundMovie: TMoveResponse | null = await movieRepo.findOne({
    where: { id: movieId },
  });

  if (!foundMovie) {
    throw new AppError('Movie not found', 404);
  }

  res.locals.foundMovie = foundMovie;

  return next();
};
