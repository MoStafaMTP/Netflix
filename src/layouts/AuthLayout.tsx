import { Link, Outlet } from 'react-router-dom';
import { APP_NAME, ROUTES } from '@/utils/constants';

/** Full-bleed dark layout for the login / register screens. */
const AuthLayout = () => (
  <div className="relative flex min-h-screen flex-col">
    {/* Cinematic backdrop */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: 'url(https://picsum.photos/seed/back7/1600/900)' }}
      aria-hidden
    />
    <div className="absolute inset-0 bg-black/70" aria-hidden />

    <header className="relative z-10 px-6 py-5 md:px-12">
      <Link
        to={ROUTES.home}
        className="text-3xl font-extrabold tracking-tight text-netflix-red"
      >
        {APP_NAME}
      </Link>
    </header>

    <main className="relative z-10 flex flex-1 items-center justify-center px-4 pb-16">
      <Outlet />
    </main>
  </div>
);

export default AuthLayout;
