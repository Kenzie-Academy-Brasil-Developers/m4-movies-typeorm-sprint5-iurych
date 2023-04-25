import { Router } from 'express';
import { validateBodyMiddleware } from '../midlewares/validateBody.middleware';
import { createMovieSchema, updateMovieSchema } from '../schemas/movies.schema';
import { verifyNameExistsMiddleware } from '../midlewares/verifyName.middleware';
import {
  createMovieController,
  deleteMovieController,
  listMoviesPaginationController,
  updateMovieController,
} from '../controllers/movies.controller';
import { verifyIdExistMiddleware } from '../midlewares/verifyId.middleware';

export const moviesRoutes = Router();

moviesRoutes.post(
  '',
  validateBodyMiddleware(createMovieSchema),
  verifyNameExistsMiddleware,
  createMovieController
);

moviesRoutes.get('', listMoviesPaginationController);

moviesRoutes.patch(
  '/:id',
  validateBodyMiddleware(updateMovieSchema),
  verifyIdExistMiddleware,
  verifyNameExistsMiddleware,
  updateMovieController
);

moviesRoutes.delete('/:id', verifyIdExistMiddleware, deleteMovieController);
