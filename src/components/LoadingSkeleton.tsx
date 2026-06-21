import { cn } from '@/utils/helpers';

interface SkeletonProps {
  className?: string;
}

/** A single shimmering block. */
export const Skeleton = ({ className }: SkeletonProps) => (
  <div className={cn('skeleton rounded', className)} />
);

/** Placeholder shaped like a poster card. */
export const CardSkeleton = () => (
  <Skeleton className="aspect-[2/3] w-full" />
);

/** A row of poster placeholders used while a slider loads. */
export const SliderSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="space-y-3">
    <Skeleton className="h-6 w-48" />
    <div className="flex gap-2 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-36 shrink-0 sm:w-44 md:w-48">
          <CardSkeleton />
        </div>
      ))}
    </div>
  </div>
);

/** Full-width hero placeholder. */
export const HeroSkeleton = () => (
  <div className="relative h-[56vh] min-h-[420px] w-full md:h-[80vh]">
    <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
    <div className="absolute bottom-[18%] left-4 space-y-4 md:left-12">
      <Skeleton className="h-12 w-64 md:w-96" />
      <Skeleton className="h-4 w-72 md:w-[28rem]" />
      <Skeleton className="h-4 w-56 md:w-80" />
      <div className="flex gap-3 pt-2">
        <Skeleton className="h-11 w-32" />
        <Skeleton className="h-11 w-32" />
      </div>
    </div>
  </div>
);

export default Skeleton;
