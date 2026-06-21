import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaRegHeart } from 'react-icons/fa';
import type { Movie } from '@/types';
import movieService from '@/services/movieService';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearFavorites, removeFavorite } from '@/redux/slices/favoritesSlice';
import MovieCard from '@/components/MovieCard';
import Button from '@/components/Button';
import { CardSkeleton } from '@/components/LoadingSkeleton';
import { ROUTES } from '@/utils/constants';

const Favorites = () => {
  const dispatch = useAppDispatch();
  const ids = useAppSelector((s) => s.favorites.ids);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    movieService.getByIds(ids).then((m) => {
      if (active) {
        setMovies(m);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [ids]);

  return (
    <div className="mx-auto max-w-[1600px] px-4 pb-16 pt-24 md:px-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold md:text-4xl">My List</h1>
        {ids.length > 0 && (
          <Button variant="outline" size="sm" icon={FaTrash} onClick={() => dispatch(clearFavorites())}>
            Clear all
          </Button>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : movies.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-24 text-center">
          <FaRegHeart size={56} className="text-netflix-gray-dark" />
          <p className="text-lg text-netflix-gray-light">
            Your list is empty. Add titles to watch them later.
          </p>
          <Link to={ROUTES.home}>
            <Button>Browse titles</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <AnimatePresence>
            {movies.map((movie) => (
              <motion.div
                key={movie.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                className="group relative"
              >
                <MovieCard movie={movie} />
                <button
                  onClick={() => dispatch(removeFavorite(movie.id))}
                  aria-label={`Remove ${movie.title} from My List`}
                  className="absolute right-2 top-2 z-30 grid h-8 w-8 place-items-center rounded-full bg-black/70 text-white opacity-0 transition hover:bg-netflix-red focus:opacity-100 group-hover:opacity-100"
                >
                  <FaTrash size={12} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Favorites;
