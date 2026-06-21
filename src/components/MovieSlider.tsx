import { useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import type { Movie } from '@/types';
import MovieCard from './MovieCard';

interface MovieSliderProps {
  title: string;
  movies: Movie[];
  showProgress?: boolean;
}

const MovieSlider = ({ title, movies, showProgress }: MovieSliderProps) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  if (movies.length === 0) return null;

  return (
    <section className="group/slider relative space-y-2" aria-label={title}>
      <h2 className="px-4 text-lg font-bold text-white md:px-12 md:text-2xl">
        {title}
      </h2>

      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll left"
          className="absolute left-0 top-0 z-30 hidden h-full w-12 items-center justify-center bg-gradient-to-r from-netflix-black/80 to-transparent text-white opacity-0 transition group-hover/slider:opacity-100 md:flex"
        >
          <FiChevronLeft size={40} />
        </button>

        <div ref={trackRef} className="slider-track px-4 md:px-12">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="w-36 shrink-0 sm:w-44 md:w-48 lg:w-52"
            >
              <MovieCard movie={movie} showProgress={showProgress} />
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          aria-label="Scroll right"
          className="absolute right-0 top-0 z-30 hidden h-full w-12 items-center justify-center bg-gradient-to-l from-netflix-black/80 to-transparent text-white opacity-0 transition group-hover/slider:opacity-100 md:flex"
        >
          <FiChevronRight size={40} />
        </button>
      </div>
    </section>
  );
};

export default MovieSlider;
