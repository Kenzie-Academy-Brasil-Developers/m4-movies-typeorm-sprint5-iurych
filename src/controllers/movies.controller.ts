import { Request, Response } from 'express';
import { TMoveResponse, TMoviePagination } from '../interfaces/movie.inteface';
import { createMovieService } from '../services/createMovies.service';
import { updateMovieService } from '../services/updateMovies.service';
import { deleteMovieService } from '../services/deleteMovies.service';
import { listMoviesPaginationService } from '../services/listMoviesPagination.service';

export const createMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newMovie: TMoveResponse = await createMovieService(req.body);

  return res.status(201).json(newMovie);
};

export const updateMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const foundMovie = res.locals.foundMovie;
  const payload = req.body;
  const updatedMovie: TMoveResponse = await updateMovieService(
    foundMovie,
    payload
  );

  return res.json(updatedMovie);
};

export const deleteMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movie = res.locals.foundMovie;

  await deleteMovieService(movie);

  return res.status(204).send();
};

export const listMoviesPaginationController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const queries = req.query;
  const moviePagination: TMoviePagination = await listMoviesPaginationService(queries);

  return res.json(moviePagination);
};
