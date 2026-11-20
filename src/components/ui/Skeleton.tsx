import React from 'react';
import { cn } from '../../utils/format';

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return <div className={cn('animate-pulse bg-neutral-200/80 rounded-lg', className)} />;
};

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-subtle p-4 flex flex-col gap-4">
      <Skeleton className="w-full h-56 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="w-2/3 h-5" />
        <Skeleton className="w-1/2 h-4" />
      </div>
      <div className="flex gap-4 pt-2">
        <Skeleton className="w-16 h-4" />
        <Skeleton className="w-16 h-4" />
        <Skeleton className="w-16 h-4" />
      </div>
      <div className="pt-4 border-t border-neutral-100 flex justify-between items-center">
        <Skeleton className="w-24 h-6" />
        <Skeleton className="w-20 h-8 rounded-lg" />
      </div>
    </div>
  );
};

export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({
  lines = 3,
  className,
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`} />
      ))}
    </div>
  );
};

