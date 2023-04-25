import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors';

export const verifyNameExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const movieRepo = res.locals.moviesRepo;
  const movieName = req.body.name;

  if (movieName) {
    const exist = await movieRepo.exist({
      where: { name: movieName },
    });

    if (exist) {
      throw new AppError('Movie already exists.', 409);
    }
  }

  return next();
};
