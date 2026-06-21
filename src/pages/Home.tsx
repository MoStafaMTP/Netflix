import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchHomeData } from '@/redux/slices/moviesSlice';
import { setCategory } from '@/redux/slices/searchSlice';
import HeroBanner from '@/components/HeroBanner';
import MovieSlider from '@/components/MovieSlider';
import { HeroSkeleton, SliderSkeleton } from '@/components/LoadingSkeleton';
import { ROUTES } from '@/utils/constants';

const Home = () => {
  const dispatch = useAppDispatch();
  const {
    trending,
    popular,
    topRated,
    newReleases,
    continueWatching,
    categories,
    loading,
    error,
  } = useAppSelector((s) => s.movies);

  useEffect(() => {
    if (trending.length === 0) dispatch(fetchHomeData());
  }, [dispatch, trending.length]);

  // Pick a featured title for the hero (highest rated trending item).
  const featured = useMemo(
    () => [...trending].sort((a, b) => b.rating - a.rating)[0],
    [trending],
  );

  if (loading && trending.length === 0) {
    return (
      <div className="space-y-8 pb-12">
        <HeroSkeleton />
        <div className="space-y-8 px-4 md:px-12">
          <SliderSkeleton />
          <SliderSkeleton />
          <SliderSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-lg text-netflix-gray-light">{error}</p>
        <button
          onClick={() => dispatch(fetchHomeData())}
          className="rounded bg-netflix-red px-5 py-2 font-semibold"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="pb-12">
      {featured && <HeroBanner movie={featured} />}

      <div className="relative z-10 -mt-12 space-y-8 md:-mt-20">
        {continueWatching.length > 0 && (
          <MovieSlider title="Continue Watching" movies={continueWatching} showProgress />
        )}
        <MovieSlider title="Trending Now" movies={trending} />
        <MovieSlider title="Popular on Netflix" movies={popular} />
        <MovieSlider title="Top Rated" movies={topRated} />
        <MovieSlider title="New Releases" movies={newReleases} />

        {/* Categories section */}
        <section className="space-y-3 px-4 md:px-12" aria-label="Browse by category">
          <h2 className="text-lg font-bold md:text-2xl">Browse by Category</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.id}
                to={`${ROUTES.search}?category=${c.slug}`}
                onClick={() => dispatch(setCategory(c.slug))}
                className="group relative flex h-24 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-netflix-gray-dark to-black transition hover:from-netflix-red-dark hover:to-netflix-red"
              >
                <span className="text-base font-bold text-white">{c.name}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
