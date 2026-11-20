import React from 'react';
import { X } from 'lucide-react';
import { SearchFilters } from '../../types/property';

interface FilterChipsProps {
  filters: SearchFilters;
  onRemove: (key: keyof SearchFilters) => void;
  onClearAll: () => void;
}

export const FilterChips: React.FC<FilterChipsProps> = ({ filters, onRemove, onClearAll }) => {
  const chips: { key: keyof SearchFilters; label: string }[] = [];

  if (filters.query) chips.push({ key: 'query', label: `Search: "${filters.query}"` });
  if (filters.city) chips.push({ key: 'city', label: `City: ${filters.city}` });
  if (filters.locality) chips.push({ key: 'locality', label: `Location: ${filters.locality}` });
  if (filters.propertyType) chips.push({ key: 'propertyType', label: `Type: ${filters.propertyType.replace(/-/g, ' ')}` });
  if (filters.listingType) chips.push({ key: 'listingType', label: `For ${filters.listingType}` });
  if (filters.minBedrooms) chips.push({ key: 'minBedrooms', label: `${filters.minBedrooms}+ BHK` });
  if (filters.furnishing) chips.push({ key: 'furnishing', label: `Furnishing: ${filters.furnishing}` });
  if (filters.facing) chips.push({ key: 'facing', label: `Facing: ${filters.facing}` });
  if (filters.isVerified) chips.push({ key: 'isVerified', label: 'Verified Only' });
  if (filters.maxPrice) {
    chips.push({
      key: 'maxPrice',
      label: `Max Price: ₹${(filters.maxPrice / 10000000).toFixed(2)} Cr`,
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-xs font-semibold text-mutedGray">Active Filters:</span>
      {chips.map((chip) => (
        <span
          key={chip.key}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-forest/10 text-forest border border-forest/20"
        >
          <span>{chip.label}</span>
          <button
            onClick={() => onRemove(chip.key)}
            className="p-0.5 hover:bg-forest/20 rounded-full cursor-pointer"
            aria-label={`Remove filter ${chip.label}`}
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <button
        onClick={onClearAll}
        className="text-xs font-semibold text-red-600 hover:text-red-700 underline underline-offset-2 ml-1 cursor-pointer"
      >
        Clear All
      </button>
    </div>
  );
};

export default FilterChips;

