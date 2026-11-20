import React from 'react';
import { cn } from '../../utils/format';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'forest' | 'gold' | 'verified' | 'neutral' | 'sale' | 'rent' | 'danger';
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'forest',
  className,
  size = 'md',
}) => {
  const variants = {
    forest: 'bg-forest/10 text-forest border border-forest/20',
    gold: 'bg-gold/15 text-gold-dark border border-gold/30 font-semibold',
    verified: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-semibold',
    neutral: 'bg-neutral-100 text-charcoal/80 border border-neutral-200',
    sale: 'bg-forest-800 text-white font-semibold',
    rent: 'bg-blue-600 text-white font-semibold',
    danger: 'bg-red-50 text-red-700 border border-red-200',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 rounded-md',
    md: 'text-xs px-2.5 py-1 rounded-lg',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 uppercase tracking-wider font-medium leading-none select-none',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;

