import { type ChangeEvent } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

const SearchBar = ({
  value,
  onChange,
  placeholder = 'Search titles, genres, people...',
  autoFocus,
}: SearchBarProps) => (
  <div className="flex items-center gap-3 rounded-md border border-netflix-gray-dark bg-netflix-black/80 px-4 py-3 focus-within:border-white">
    <FiSearch className="shrink-0 text-netflix-gray-light" size={20} aria-hidden />
    <input
      type="search"
      value={value}
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={autoFocus}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label="Search movies"
      className="w-full bg-transparent text-base text-white placeholder:text-netflix-gray outline-none"
    />
    {value && (
      <button
        onClick={() => onChange('')}
        aria-label="Clear search"
        className="shrink-0 text-netflix-gray-light transition hover:text-white"
      >
        <FiX size={20} />
      </button>
    )}
  </div>
);

export default SearchBar;
