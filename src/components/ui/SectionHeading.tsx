import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../utils/format';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  viewAllLink?: string;
  viewAllText?: string;
  align?: 'left' | 'center';
  className?: string;
  light?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  viewAllLink,
  viewAllText = 'View All',
  align = 'left',
  className,
  light = false,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-12',
        align === 'center' && 'text-center md:flex-col md:items-center',
        className
      )}
    >
      <div className={cn('space-y-2', align === 'center' && 'max-w-2xl mx-auto')}>
        <h2
          className={cn(
            'font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight',
            light ? 'text-white' : 'text-forest'
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={cn(
              'text-base sm:text-lg font-light leading-relaxed',
              light ? 'text-ivory-300' : 'text-mutedGray'
            )}
          >
            {subtitle}
          </p>
        )}
      </div>

      {viewAllLink && (
        <Link
          to={viewAllLink}
          className={cn(
            'inline-flex items-center gap-2 text-sm font-semibold transition-all group shrink-0',
            light
              ? 'text-gold hover:text-gold-light'
              : 'text-forest hover:text-gold'
          )}
        >
          <span>{viewAllText}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeading;

