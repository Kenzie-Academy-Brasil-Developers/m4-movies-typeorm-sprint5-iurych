import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { ZodTypeAny } from 'zod';
import { TMoveResponse } from '../interfaces/movie.inteface';
import { Movie } from '../entities';
import { AppDataSource } from '../data-source';

export const validateBodyMiddleware =
  (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const moviesRepo: Repository<TMoveResponse> =
      AppDataSource.getRepository(Movie);

    const validate = schema.parse(req.body);
    req.body = validate;

    res.locals.moviesRepo = moviesRepo;

    return next();
  };
