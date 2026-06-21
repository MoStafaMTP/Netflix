import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlay, FaPlus, FaCheck, FaStar, FaArrowLeft } from 'react-icons/fa';
import { MdLocalMovies } from 'react-icons/md';
import type { Movie } from '@/types';
import movieService from '@/services/movieService';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleFavorite } from '@/redux/slices/favoritesSlice';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { HeroSkeleton } from '@/components/LoadingSkeleton';
import { formatDate, formatDuration } from '@/utils/helpers';

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((s) =>
    s.favorites.ids.includes(Number(id)),
  );

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [trailerOpen, setTrailerOpen] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setNotFound(false);
    movieService.getById(Number(id)).then((m) => {
      if (!active) return;
      if (m) setMovie(m);
      else setNotFound(true);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) return <HeroSkeleton />;

  if (notFound || !movie) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <MdLocalMovies size={64} className="text-netflix-red" />
        <p className="text-xl text-netflix-gray-light">This title is no longer available.</p>
        <Button onClick={() => navigate(-1)} icon={FaArrowLeft}>
          Go back
        </Button>
      </div>
    );
  }

  return (
    <article className="pb-16">
      {/* Backdrop banner */}
      <div className="relative h-[55vh] min-h-[360px] w-full md:h-[70vh]">
        <img
          src={movie.backdrop}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-black/85 to-transparent" />

        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="absolute left-4 top-20 z-20 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white transition hover:bg-netflix-red md:left-12"
        >
          <FaArrowLeft />
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto -mt-40 max-w-6xl px-4 md:px-12">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Poster */}
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            src={movie.poster}
            alt={`${movie.title} poster`}
            className="mx-auto w-40 shrink-0 rounded-lg shadow-2xl sm:w-52 md:mx-0 md:w-64"
          />

          {/* Meta */}
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-extrabold text-shadow md:text-5xl">{movie.title}</h1>

            <div className="flex flex-wrap items-center gap-3 text-sm text-netflix-gray-light">
              <span className="flex items-center gap-1 font-semibold text-emerald-400">
                <FaStar size={14} /> {movie.rating.toFixed(1)}
              </span>
              <span>{formatDate(movie.releaseDate)}</span>
              <span>{formatDuration(movie.duration)}</span>
              <span className="rounded border border-netflix-gray px-1.5 py-0.5 text-xs">HD</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.genres.map((g) => (
                <span
                  key={g}
                  className="rounded-full bg-netflix-gray-dark px-3 py-1 text-xs font-medium"
                >
                  {g}
                </span>
              ))}
            </div>

            <p className="max-w-2xl leading-relaxed text-netflix-gray-light">
              {movie.description}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                size="lg"
                icon={FaPlay}
                onClick={() => setTrailerOpen(true)}
                className="!bg-white !text-black hover:!bg-netflix-gray-light"
              >
                Play
              </Button>
              <Button size="lg" variant="outline" onClick={() => setTrailerOpen(true)}>
                Watch Trailer
              </Button>
              <Button
                size="lg"
                variant="secondary"
                icon={isFavorite ? FaCheck : FaPlus}
                onClick={() => dispatch(toggleFavorite(movie.id))}
              >
                {isFavorite ? 'In My List' : 'My List'}
              </Button>
            </div>

            <dl className="grid grid-cols-1 gap-2 pt-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="inline text-netflix-gray">Director: </dt>
                <dd className="inline text-white">{movie.director}</dd>
              </div>
              <div>
                <dt className="inline text-netflix-gray">Genres: </dt>
                <dd className="inline text-white">{movie.genres.join(', ')}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="mb-1 text-netflix-gray">Cast:</dt>
                <dd className="flex flex-wrap gap-x-4 gap-y-1 text-white">
                  {movie.cast.map((c) => (
                    <span key={c.name}>
                      {c.name}{' '}
                      <span className="text-netflix-gray">as {c.character}</span>
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

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
      </Modal>
    </article>
  );
};

export default MovieDetails;
