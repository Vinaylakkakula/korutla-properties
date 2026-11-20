import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/format';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  to?: string;
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      to,
      href,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-forest-500/20 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none select-none cursor-pointer';

    const variants = {
      primary: 'bg-forest hover:bg-forest-900 text-white shadow-sm hover:shadow',
      secondary: 'bg-ivory-300 hover:bg-ivory-400 text-charcoal border border-neutral-200',
      outline: 'border border-forest text-forest hover:bg-forest hover:text-white',
      ghost: 'text-forest hover:bg-forest/5',
      gold: 'bg-gold hover:bg-gold-dark text-white font-semibold shadow-sm hover:shadow',
    };

    const sizes = {
      sm: 'text-xs px-3.5 py-1.5 gap-1.5',
      md: 'text-sm px-5 py-2.5 gap-2',
      lg: 'text-base px-6 py-3.5 gap-2.5',
    };

    const content = (
      <>
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </>
    );

    if (to) {
      return (
        <Link
          to={to}
          className={cn(baseStyles, variants[variant], sizes[size], className)}
        >
          {content}
        </Link>
      );
    }

    if (href) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(baseStyles, variants[variant], sizes[size], className)}
        >
          {content}
        </a>
      );
    }

    return (
      <motion.button
        ref={ref}
        disabled={disabled || isLoading}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...(props as any)}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
export default Button;

