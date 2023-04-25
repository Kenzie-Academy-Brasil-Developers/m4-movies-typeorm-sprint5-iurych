import { AppDataSource } from '../data-source';
import { Movie } from '../entities';
import { TMoviePagination } from '../interfaces/movie.inteface';

export const listMoviesPaginationService = async (
  queries: any
): Promise<TMoviePagination> => {
  const moviesRepo = AppDataSource.getRepository(Movie);

  const count: number = await moviesRepo.count();

  let page: number = queries.page ? Number(queries.page) : 1;
  let perPage: number = queries.perPage ? Number(queries.perPage) : 5;

  let sort: 'price' | 'duration' | 'id' =
    queries.sort === 'price' || queries.sort === 'duration'
      ? queries.sort
      : 'id';
  let order: 'asc' | 'desc' =
    queries.order === 'asc' || queries.order === 'desc' ? queries.order : 'asc';

  if (!perPage || perPage <= 0 || perPage >= 5) {
    perPage = 5;
  }

  if (!page || page <= 0) {
    page = 1;
  }

  if (sort === 'id') {
    order = 'asc';
  }

  const pagination: Movie[] = await moviesRepo.find({
    order: { [sort]: order },
    skip: perPage * (page - 1),
    take: perPage,
  });

  let prevPage: string | null = '';
  let nextPage: string | null = '';

  const baseUrl: string = 'http://localhost:3000'

  prevPage =
    page - 1 == 0
      ? null
      : `${baseUrl}/movies?page=${page - 1}&perPage=${perPage}`;
  nextPage =
    count > perPage * page
      ? `${baseUrl}/movies?page=${page + 1}&perPage=${perPage}`
      : null;

  return {
    prevPage: prevPage,
    nextPage: nextPage,
    count: count,
    data: pagination,
  };
};
