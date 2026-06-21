import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout } from '@/redux/slices/userSlice';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { APP_NAME, ROUTES } from '@/utils/constants';
import { cn } from '@/utils/helpers';

const links = [
  { to: ROUTES.home, label: 'Home' },
  { to: ROUTES.search, label: 'Search' },
  { to: ROUTES.favorites, label: 'My List' },
];

const Navbar = () => {
  const scrolled = useScrollPosition(40);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.user.current);
  const favCount = useAppSelector((s) => s.favorites.ids.length);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
    navigate(ROUTES.login);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'text-sm font-medium transition hover:text-white',
      isActive ? 'text-white' : 'text-netflix-gray-light',
    );

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled ? 'bg-netflix-black shadow-lg' : 'bg-nav-gradient',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 md:px-12">
        <div className="flex items-center gap-8">
          <Link
            to={ROUTES.home}
            className="text-2xl font-extrabold tracking-tight text-netflix-red md:text-3xl"
            aria-label="Netflix Clone home"
          >
            {APP_NAME}
          </Link>
          <ul className="hidden items-center gap-5 md:flex">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.to === ROUTES.home} className={navLinkClass}>
                  {l.label}
                  {l.to === ROUTES.favorites && favCount > 0 && (
                    <span className="ml-1 rounded-full bg-netflix-red px-1.5 py-0.5 text-[10px] font-bold text-white">
                      {favCount}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(ROUTES.search)}
            aria-label="Search"
            className="text-white transition hover:text-netflix-gray-light"
          >
            <FiSearch size={22} />
          </button>

          {/* Profile menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Account menu"
              aria-expanded={menuOpen}
              className="flex items-center gap-2"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt=""
                  className="h-8 w-8 rounded object-cover"
                />
              ) : (
                <FaUserCircle size={28} className="text-white" />
              )}
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 mt-2 w-48 overflow-hidden rounded-md border border-netflix-gray-dark bg-netflix-black py-2 shadow-xl"
                >
                  {user ? (
                    <>
                      <div className="px-4 py-2 text-sm">
                        <p className="font-semibold text-white">{user.name}</p>
                        <p className="truncate text-xs text-netflix-gray">{user.email}</p>
                      </div>
                      <hr className="my-1 border-netflix-gray-dark" />
                      <Link
                        to={ROUTES.profile}
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-netflix-gray-light hover:bg-white/10 hover:text-white"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left text-sm text-netflix-gray-light hover:bg-white/10 hover:text-white"
                      >
                        Sign out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to={ROUTES.login}
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-netflix-gray-light hover:bg-white/10 hover:text-white"
                      >
                        Sign in
                      </Link>
                      <Link
                        to={ROUTES.register}
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-netflix-gray-light hover:bg-white/10 hover:text-white"
                      >
                        Sign up
                      </Link>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle navigation"
            className="text-white md:hidden"
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-netflix-gray-dark bg-netflix-black md:hidden"
          >
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === ROUTES.home}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'block px-6 py-3 text-base',
                      isActive ? 'text-white' : 'text-netflix-gray-light',
                    )
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
