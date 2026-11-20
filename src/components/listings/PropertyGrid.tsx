import React from 'react';
import { Property } from '../../types/property';
import PropertyCard from '../ui/PropertyCard';
import { SearchX, Home } from 'lucide-react';
import Button from '../ui/Button';

interface PropertyGridProps {
  properties: Property[];
  viewMode: 'grid' | 'list';
  onResetFilters?: () => void;
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  viewMode,
  onResetFilters,
}) => {
  if (properties.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200/80 shadow-subtle flex flex-col items-center justify-center my-8">
        <div className="w-16 h-16 rounded-2xl bg-forest/5 flex items-center justify-center text-forest mb-4">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-forest mb-2">No Matching Properties Found</h3>
        <p className="text-sm text-mutedGray max-w-md leading-relaxed mb-6 font-light">
          We couldn't find any properties matching your exact search filters. Try clearing some criteria or expanding your budget or location.
        </p>
        {onResetFilters && (
          <Button variant="primary" size="md" onClick={onResetFilters}>
            Clear All Filters
          </Button>
        )}
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="flex flex-col gap-6">
        {properties.map((prop, idx) => (
          <PropertyCard key={prop.id} property={prop} index={idx} variant="list" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {properties.map((prop, idx) => (
        <PropertyCard key={prop.id} property={prop} index={idx} variant="grid" />
      ))}
    </div>
  );
};

export default PropertyGrid;

