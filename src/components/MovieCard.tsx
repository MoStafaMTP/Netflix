import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlay, FaPlus, FaCheck, FaStar } from 'react-icons/fa';
import type { Movie } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleFavorite } from '@/redux/slices/favoritesSlice';
import { formatYear, ratingToMatch } from '@/utils/helpers';
import { ROUTES } from '@/utils/constants';

interface MovieCardProps {
  movie: Movie;
  /** When true, show the "Continue Watching" progress bar. */
  showProgress?: boolean;
}

const MovieCard = ({ movie, showProgress }: MovieCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((s) => s.favorites.ids.includes(movie.id));
  const [loaded, setLoaded] = useState(false);

  const open = () => navigate(ROUTES.movie(movie.id));

  return (
    <motion.div
      className="group relative cursor-pointer"
      whileHover={{ scale: 1.06, zIndex: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      onClick={open}
      role="button"
      tabIndex={0}
      aria-label={`Open ${movie.title}`}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && open()}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-netflix-gray-dark">
        {!loaded && <div className="skeleton absolute inset-0" />}
        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex flex-col justify-end bg-card-gradient p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <h3 className="mb-2 line-clamp-2 text-sm font-bold text-shadow">
            {movie.title}
          </h3>
          <div className="mb-2 flex items-center gap-2 text-xs text-netflix-gray-light">
            <span className="flex items-center gap-1 text-emerald-400">
              <FaStar size={10} /> {ratingToMatch(movie.rating)}% Match
            </span>
            <span>{formatYear(movie.releaseDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                open();
              }}
              aria-label={`Play ${movie.title}`}
              className="grid h-9 w-9 place-items-center rounded-full bg-white text-black transition hover:bg-netflix-gray-light"
            >
              <FaPlay size={12} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(toggleFavorite(movie.id));
              }}
              aria-label={
                isFavorite ? `Remove ${movie.title} from My List` : `Add ${movie.title} to My List`
              }
              aria-pressed={isFavorite}
              className="grid h-9 w-9 place-items-center rounded-full border-2 border-white/60 text-white transition hover:border-white"
            >
              {isFavorite ? <FaCheck size={12} /> : <FaPlus size={12} />}
            </button>
          </div>
        </div>

        {/* Continue-watching progress bar */}
        {showProgress && typeof movie.progress === 'number' && (
          <div className="absolute bottom-0 left-0 h-1 w-full bg-white/30">
            <div
              className="h-full bg-netflix-red"
              style={{ width: `${movie.progress}%` }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default memo(MovieCard);
