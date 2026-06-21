import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { cn } from '@/utils/helpers';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/** Builds a compact page list with ellipses, e.g. 1 … 4 5 6 … 12. */
const buildPages = (current: number, total: number): (number | '...')[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | '...')[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push('...');
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push('...');
  pages.push(total);
  return pages;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;
  const pages = buildPages(currentPage, totalPages);

  const Btn = ({
    children,
    onClick,
    disabled,
    active,
    label,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    active?: boolean;
    label: string;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'grid h-9 min-w-9 place-items-center rounded px-2 text-sm font-medium transition',
        active
          ? 'bg-netflix-red text-white'
          : 'bg-netflix-gray-dark text-netflix-gray-light hover:bg-white/20 hover:text-white',
        disabled && 'cursor-not-allowed opacity-40 hover:bg-netflix-gray-dark',
      )}
    >
      {children}
    </button>
  );

  return (
    <nav className="flex items-center justify-center gap-1.5" aria-label="Pagination">
      <Btn
        label="Previous page"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FiChevronLeft size={18} />
      </Btn>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`e${i}`} className="px-1 text-netflix-gray">
            …
          </span>
        ) : (
          <Btn
            key={p}
            label={`Page ${p}`}
            active={p === currentPage}
            onClick={() => onPageChange(p)}
          >
            {p}
          </Btn>
        ),
      )}

      <Btn
        label="Next page"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FiChevronRight size={18} />
      </Btn>
    </nav>
  );
};

export default Pagination;
