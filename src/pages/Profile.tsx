import { useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSignOutAlt, FaCrown } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout } from '@/redux/slices/userSlice';
import { fetchHomeData } from '@/redux/slices/moviesSlice';
import Button from '@/components/Button';
import MovieCard from '@/components/MovieCard';
import { ROUTES } from '@/utils/constants';
import { formatDate } from '@/utils/helpers';

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.user.current);
  const all = useAppSelector((s) => s.movies.all);

  useEffect(() => {
    if (all.length === 0) dispatch(fetchHomeData());
  }, [dispatch, all.length]);

  // Map the user's watch-history ids to full movie objects.
  const history = useMemo(() => {
    if (!user) return [];
    return user.watchHistory
      .map((h) => ({ movie: all.find((m) => m.id === h.movieId), watchedAt: h.watchedAt }))
      .filter((x): x is { movie: NonNullable<typeof x.movie>; watchedAt: string } =>
        Boolean(x.movie),
      );
  }, [user, all]);

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.login);
  };

  if (!user) return null; // ProtectedRoute guards this, but stay safe.

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto max-w-5xl px-4 pb-16 pt-24 md:px-12"
    >
      {/* Header card */}
      <div className="flex flex-col items-center gap-6 rounded-xl bg-gradient-to-br from-netflix-gray-dark to-black p-6 sm:flex-row sm:items-start md:p-8">
        <img
          src={user.avatar}
          alt={`${user.name}'s avatar`}
          className="h-28 w-28 rounded-lg object-cover shadow-xl"
        />
        <div className="flex-1 space-y-2 text-center sm:text-left">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-netflix-gray-light">{user.email}</p>
          <span className="inline-flex items-center gap-2 rounded-full bg-netflix-red px-3 py-1 text-sm font-semibold">
            <FaCrown size={13} /> {user.membership} Member
          </span>
        </div>
        <Button variant="outline" icon={FaSignOutAlt} onClick={handleLogout}>
          Sign out
        </Button>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { label: 'Watched', value: user.watchHistory.length },
          { label: 'Plan', value: user.membership },
          { label: 'Member ID', value: `#${user.id.toString().slice(-4)}` },
        ].map((s) => (
          <div key={s.label} className="rounded-lg bg-netflix-gray-dark/60 p-4 text-center">
            <p className="text-xl font-bold md:text-2xl">{s.value}</p>
            <p className="text-xs text-netflix-gray-light">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Watch history */}
      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold md:text-2xl">Watch History</h2>
        {history.length === 0 ? (
          <p className="text-netflix-gray-light">
            You haven't watched anything yet.{' '}
            <Link to={ROUTES.home} className="text-white hover:underline">
              Start browsing
            </Link>
            .
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {history.map(({ movie, watchedAt }) => (
              <div key={movie.id} className="space-y-1">
                <MovieCard movie={movie} />
                <p className="text-xs text-netflix-gray">Watched {formatDate(watchedAt)}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </motion.div>
  );
};

export default Profile;
