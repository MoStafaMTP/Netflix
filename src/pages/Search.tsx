import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { searchMovies, setCategory, setQuery } from '@/redux/slices/searchSlice';
import { fetchHomeData } from '@/redux/slices/moviesSlice';
import { useDebounce } from '@/hooks/useDebounce';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import MovieCard from '@/components/MovieCard';
import Pagination from '@/components/Pagination';
import { CardSkeleton } from '@/components/LoadingSkeleton';

const PAGE_SIZE = 18;

const Search = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { query, category, results, loading } = useAppSelector((s) => s.search);
  const { categories, all } = useAppSelector((s) => s.movies);

  const debounced = useDebounce(query, 350);
  const [page, setPage] = useState(1);

  // Ensure catalogue + categories are available even on a direct visit.
  useEffect(() => {
    if (all.length === 0) dispatch(fetchHomeData());
  }, [dispatch, all.length]);

  // Sync the ?category= param into state on first load.
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) dispatch(setCategory(cat));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Run the (debounced) text search.
  useEffect(() => {
    dispatch(searchMovies(debounced));
    setPage(1);
  }, [debounced, dispatch]);

  // The base set: search results when a query exists, otherwise the full catalogue.
  const base = query.trim() ? results : all;

  // Apply the category filter on top of the base set.
  const filtered = useMemo(() => {
    if (!category) return base;
    const name = categories.find((c) => c.slug === category)?.name;
    return base.filter((m) => name && m.genres.includes(name));
  }, [base, category, categories]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const onCategory = (slug: string) => {
    dispatch(setCategory(slug));
    setPage(1);
    setSearchParams(slug ? { category: slug } : {});
  };

  return (
    <div className="mx-auto max-w-[1600px] px-4 pb-16 pt-24 md:px-12">
      <div className="mx-auto max-w-3xl space-y-4">
        <SearchBar value={query} onChange={(v) => dispatch(setQuery(v))} autoFocus />
        {categories.length > 0 && (
          <CategoryFilter categories={categories} selected={category} onSelect={onCategory} />
        )}
      </div>

      <div className="mt-8">
        <p className="mb-4 text-sm text-netflix-gray-light">
          {loading
            ? 'Searching…'
            : `${filtered.length} ${filtered.length === 1 ? 'title' : 'titles'} ${
                query.trim() ? `for "${query.trim()}"` : ''
              }`}
        </p>

        {loading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <FiSearch size={56} className="text-netflix-gray-dark" />
            <p className="text-lg text-netflix-gray-light">
              No titles found. Try a different keyword or category.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {paged.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            <div className="mt-10">
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
