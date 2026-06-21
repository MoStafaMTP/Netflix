import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import type { Movie } from '@/types';
import Button from './Button';
import Modal from './Modal';
import { ROUTES } from '@/utils/constants';
import { formatYear } from '@/utils/helpers';

interface HeroBannerProps {
  movie: Movie;
}

const HeroBanner = ({ movie }: HeroBannerProps) => {
  const navigate = useNavigate();
  const [trailerOpen, setTrailerOpen] = useState(false);

  return (
    <section className="relative h-[60vh] min-h-[440px] w-full md:h-[85vh]">
      <img
        src={movie.backdrop}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-gradient-to-r from-netflix-black/80 via-netflix-black/20 to-transparent" />

      <motion.div
        className="absolute bottom-[16%] left-4 max-w-xl space-y-4 md:left-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-extrabold leading-tight text-shadow sm:text-5xl md:text-6xl">
          {movie.title}
        </h1>
        <div className="flex flex-wrap items-center gap-2 text-sm text-netflix-gray-light">
          <span className="font-semibold text-emerald-400">
            ★ {movie.rating.toFixed(1)}
          </span>
          <span>{formatYear(movie.releaseDate)}</span>
          <span>{movie.genres.join(' • ')}</span>
        </div>
        <p className="line-clamp-3 max-w-lg text-sm text-netflix-gray-light text-shadow sm:text-base">
          {movie.description}
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <Button
            size="lg"
            icon={FaPlay}
            onClick={() => navigate(ROUTES.movie(movie.id))}
            className="!bg-white !text-black hover:!bg-netflix-gray-light"
          >
            Play
          </Button>
          <Button size="lg" variant="secondary" icon={FaInfoCircle} onClick={() => setTrailerOpen(true)}>
            More Info
          </Button>
        </div>
      </motion.div>

      <Modal isOpen={trailerOpen} onClose={() => setTrailerOpen(false)} title={movie.title}>
        <div className="aspect-video w-full overflow-hidden rounded">
          <iframe
            className="h-full w-full"
            src={movie.trailerUrl}
            title={`${movie.title} trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="px-4 py-4 text-sm text-netflix-gray-light">{movie.description}</p>
      </Modal>
    </section>
  );
};

export default HeroBanner;
