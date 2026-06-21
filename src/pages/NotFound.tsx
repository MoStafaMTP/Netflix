import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/Button';
import { ROUTES } from '@/utils/constants';

const NotFound = () => (
  <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center">
    <div
      className="absolute inset-0 bg-cover bg-center opacity-40"
      style={{ backgroundImage: 'url(https://picsum.photos/seed/back3/1600/900)' }}
      aria-hidden
    />
    <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/80 to-netflix-black/40" />

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 max-w-lg space-y-5"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-netflix-gray-light">
        Lost your way?
      </p>
      <h1 className="text-7xl font-extrabold text-netflix-red md:text-9xl">404</h1>
      <h2 className="text-2xl font-bold md:text-3xl">
        We can't find that page.
      </h2>
      <p className="text-netflix-gray-light">
        Sorry, we can't find the page you're looking for. You'll find loads to explore on the
        home page.
      </p>
      <div className="flex justify-center gap-3 pt-2">
        <Link to={ROUTES.home}>
          <Button size="lg">Netflix Home</Button>
        </Link>
        <Link to={ROUTES.search}>
          <Button size="lg" variant="outline">
            Search
          </Button>
        </Link>
      </div>
      <p className="pt-6 text-sm text-netflix-gray">Error Code: NSES-404</p>
    </motion.div>
  </div>
);

export default NotFound;
