import type { Category } from '@/types';
import { cn } from '@/utils/helpers';

interface CategoryFilterProps {
  categories: Category[];
  /** Active category slug, or '' for "All". */
  selected: string;
  onSelect: (slug: string) => void;
}

const CategoryFilter = ({ categories, selected, onSelect }: CategoryFilterProps) => {
  const Chip = ({ label, slug }: { label: string; slug: string }) => (
    <button
      onClick={() => onSelect(slug)}
      aria-pressed={selected === slug}
      className={cn(
        'whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition',
        selected === slug
          ? 'border-netflix-red bg-netflix-red text-white'
          : 'border-netflix-gray-dark text-netflix-gray-light hover:border-white hover:text-white',
      )}
    >
      {label}
    </button>
  );

  return (
    <div className="slider-track" role="group" aria-label="Filter by category">
      <Chip label="All" slug="" />
      {categories.map((c) => (
        <Chip key={c.id} label={c.name} slug={c.slug} />
      ))}
    </div>
  );
};

export default CategoryFilter;
