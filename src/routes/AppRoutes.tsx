import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import ProtectedRoute from './ProtectedRoute';
import { ROUTES } from '@/utils/constants';

// Lazy-load every page so each route ships as its own chunk (code splitting).
const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const MovieDetails = lazy(() => import('@/pages/MovieDetails'));
const Search = lazy(() => import('@/pages/Search'));
const Favorites = lazy(() => import('@/pages/Favorites'));
const Profile = lazy(() => import('@/pages/Profile'));
const NotFound = lazy(() => import('@/pages/NotFound'));

/** Fullscreen fallback shown while a lazy route chunk loads. */
const RouteFallback = () => (
  <div className="grid min-h-screen place-items-center bg-netflix-black">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-netflix-gray-dark border-t-netflix-red" />
  </div>
);

const AppRoutes = () => (
  <Suspense fallback={<RouteFallback />}>
    <Routes>
      {/* Pages that share the Navbar + Footer shell. */}
      <Route element={<MainLayout />}>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path={ROUTES.search} element={<Search />} />
        <Route path={ROUTES.favorites} element={<Favorites />} />
        <Route
          path={ROUTES.profile}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Auth pages use the standalone cinematic layout. */}
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.login} element={<Login />} />
        <Route path={ROUTES.register} element={<Register />} />
      </Route>

      {/* Catch-all 404. */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
