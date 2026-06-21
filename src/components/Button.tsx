import { type ButtonHTMLAttributes, forwardRef } from 'react';
import type { IconType } from 'react-icons';
import { cn } from '@/utils/helpers';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: IconType;
  fullWidth?: boolean;
  loading?: boolean;
}

const variants: Record<Variant, string> = {
  primary: 'bg-netflix-red hover:bg-netflix-red-dark text-white',
  secondary: 'bg-white/20 hover:bg-white/30 text-white backdrop-blur',
  ghost: 'bg-transparent hover:bg-white/10 text-white',
  outline: 'border border-white/40 hover:border-white text-white bg-transparent',
};

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-base gap-2',
  lg: 'px-7 py-3 text-lg gap-2.5',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon: Icon,
      fullWidth,
      loading,
      className,
      children,
      disabled,
      ...rest
    },
    ref,
  ) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center rounded font-semibold transition-colors duration-200',
        'disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    >
      {loading ? (
        <span
          className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white"
          aria-hidden
        />
      ) : (
        Icon && <Icon className="text-[1.15em]" aria-hidden />
      )}
      {children}
    </button>
  ),
);

Button.displayName = 'Button';
export default Button;
