import moviesData from '@/data/movies.json';
import categoriesData from '@/data/categories.json';
import type { Category, Movie } from '@/types';
import { MOCK_LATENCY } from '@/utils/constants';

const movies = moviesData as Movie[];
const categories = categoriesData as Category[];

/** Resolve `value` after a short delay to mimic a network round-trip. */
const withLatency = <T>(value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), MOCK_LATENCY));

export const movieService = {
  getAll: (): Promise<Movie[]> => withLatency([...movies]),

  getById: (id: number): Promise<Movie | undefined> =>
    withLatency(movies.find((m) => m.id === id)),

  getByIds: (ids: number[]): Promise<Movie[]> =>
    withLatency(movies.filter((m) => ids.includes(m.id))),

  getTrending: (): Promise<Movie[]> =>
    withLatency(movies.filter((m) => m.trending)),

  getPopular: (): Promise<Movie[]> =>
    withLatency(movies.filter((m) => m.popular)),

  getTopRated: (): Promise<Movie[]> =>
    withLatency(
      [...movies].filter((m) => m.topRated).sort((a, b) => b.rating - a.rating),
    ),

  getNewReleases: (): Promise<Movie[]> =>
    withLatency(movies.filter((m) => m.newRelease)),

  getContinueWatching: (): Promise<Movie[]> =>
    withLatency(movies.filter((m) => typeof m.progress === 'number')),

  getCategories: (): Promise<Category[]> => withLatency([...categories]),

  /** Title / genre / cast / director full-text search. */
  search: (query: string): Promise<Movie[]> => {
    const q = query.trim().toLowerCase();
    if (!q) return withLatency([]);
    return withLatency(
      movies.filter((m) => {
        const haystack = [
          m.title,
          m.director,
          ...m.genres,
          ...m.cast.map((c) => c.name),
        ]
          .join(' ')
          .toLowerCase();
        return haystack.includes(q);
      }),
    );
  },
};

export default movieService;
