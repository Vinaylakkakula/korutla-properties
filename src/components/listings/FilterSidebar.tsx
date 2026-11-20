import React from 'react';
import {
  X,
  Filter,
  Check,
  RotateCcw,
  MapPin,
  Home,
  IndianRupee,
  Bed,
  CheckCircle2,
} from 'lucide-react';
import { SearchFilters, PropertyCategory } from '../../types/property';
import Button from '../ui/Button';

interface FilterSidebarProps {
  filters: SearchFilters;
  onChange: (updated: Partial<SearchFilters>) => void;
  onClear: () => void;
  isMobile?: boolean;
  onCloseMobile?: () => void;
  showPlotFilters?: boolean;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  onClear,
  isMobile = false,
  onCloseMobile,
  showPlotFilters = false,
}) => {
  const localities = [
    'Kokapet',
    'Gachibowli',
    'Tellapur',
    'Kondapur',
    'Nallagandla',
    'Manikonda',
    'Shankarpally',
    'Shamshabad',
    'Bachupally',
    'Miyapur',
    'Kukatpally',
    'Uppal',
  ];

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-forest" />
          <h3 className="font-serif text-lg font-bold text-forest">Filter Properties</h3>
        </div>
        <button
          onClick={onClear}
          className="text-xs font-semibold text-mutedGray hover:text-red-600 flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Location Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-forest" />
          Hyderabad Locality
        </label>
        <select
          value={filters.locality || ''}
          onChange={(e) => onChange({ locality: e.target.value || undefined })}
          className="w-full bg-ivory-100 border border-neutral-200 rounded-xl px-3 py-2 text-sm text-charcoal focus:outline-none focus:border-forest cursor-pointer"
        >
          <option value="">All Localities</option>
          {localities.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Property Category */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
          <Home className="w-3.5 h-3.5 text-forest" />
          Property Type
        </label>
        <select
          value={filters.propertyType || ''}
          onChange={(e) => onChange({ propertyType: (e.target.value as PropertyCategory) || undefined })}
          className="w-full bg-ivory-100 border border-neutral-200 rounded-xl px-3 py-2 text-sm text-charcoal focus:outline-none focus:border-forest cursor-pointer"
        >
          <option value="">All Types</option>
          <option value="villa">Luxury Villa</option>
          <option value="apartment">Apartment / Flat</option>
          <option value="gated-community-apartment">Gated Community Apartment</option>
          <option value="independent-house">Independent House</option>
          <option value="home">Residential Home</option>
          <option value="residential-plot">Residential Plot</option>
          <option value="open-plot">Open Plot</option>
          <option value="apartment-development-plot">Development Plot</option>
          <option value="commercial-property">Commercial Property</option>
          <option value="commercial-plot">Commercial Plot</option>
          <option value="farm-land">Farm Land</option>
          <option value="agricultural-land">Agricultural Land</option>
        </select>
      </div>

      {/* Bedrooms (BHK) if not plots */}
      {!showPlotFilters && (
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
            <Bed className="w-3.5 h-3.5 text-forest" />
            Bedrooms (BHK)
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {[1, 2, 3, 4, 5].map((bhk) => {
              const isSelected = filters.minBedrooms === bhk;
              return (
                <button
                  key={bhk}
                  type="button"
                  onClick={() => onChange({ minBedrooms: isSelected ? undefined : bhk })}
                  className={`py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-forest text-white border-forest shadow-sm'
                      : 'bg-white text-charcoal/80 border-neutral-200 hover:border-forest/50'
                  }`}
                >
                  {bhk}{bhk === 5 ? '+' : ''}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
          <IndianRupee className="w-3.5 h-3.5 text-forest" />
          Max Price Budget
        </label>
        <select
          value={filters.maxPrice || ''}
          onChange={(e) =>
            onChange({ maxPrice: e.target.value ? Number(e.target.value) : undefined })
          }
          className="w-full bg-ivory-100 border border-neutral-200 rounded-xl px-3 py-2 text-sm text-charcoal focus:outline-none focus:border-forest cursor-pointer"
        >
          <option value="">Any Budget</option>
          <option value="35000">₹35,000 / month (Rent)</option>
          <option value="75000">₹75,000 / month (Rent)</option>
          <option value="150000">₹1.5 Lakhs / month (Rent)</option>
          <option value="5000000">₹50 Lakhs</option>
          <option value="10000000">₹1.00 Crore</option>
          <option value="20000000">₹2.00 Crores</option>
          <option value="35000000">₹3.50 Crores</option>
          <option value="50000000">₹5.00 Crores</option>
        </select>
      </div>

      {/* Furnishing Filter */}
      {!showPlotFilters && (
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-charcoal">
            Furnishing
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'furnished', label: 'Furnished' },
              { id: 'semi-furnished', label: 'Semi' },
              { id: 'unfurnished', label: 'Unfurnished' },
            ].map((f) => {
              const isSelected = filters.furnishing === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => onChange({ furnishing: isSelected ? undefined : (f.id as any) })}
                  className={`py-1.5 px-2 text-[11px] font-semibold rounded-lg border transition-all truncate cursor-pointer ${
                    isSelected
                      ? 'bg-forest text-white border-forest'
                      : 'bg-white text-charcoal border-neutral-200 hover:border-forest'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Facing Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-charcoal">
          Vastu Facing
        </label>
        <select
          value={filters.facing || ''}
          onChange={(e) => onChange({ facing: (e.target.value as any) || undefined })}
          className="w-full bg-ivory-100 border border-neutral-200 rounded-xl px-3 py-2 text-sm text-charcoal focus:outline-none focus:border-forest cursor-pointer"
        >
          <option value="">Any Facing</option>
          <option value="east">East Facing</option>
          <option value="north">North Facing</option>
          <option value="north-east">North-East Facing</option>
          <option value="west">West Facing</option>
          <option value="south">South Facing</option>
        </select>
      </div>

      {/* Verified Only Toggle */}
      <div className="pt-2 border-t border-neutral-100">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={!!filters.isVerified}
            onChange={(e) => onChange({ isVerified: e.target.checked || undefined })}
            className="w-4 h-4 rounded text-forest focus:ring-forest border-neutral-300 cursor-pointer"
          />
          <div className="flex items-center gap-1.5 text-sm font-semibold text-charcoal group-hover:text-forest">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Verified Properties Only</span>
          </div>
        </label>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="p-6 bg-white h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-6">
            <h3 className="font-serif text-xl font-bold text-forest">Filters</h3>
            <button
              onClick={onCloseMobile}
              className="p-2 rounded-lg text-mutedGray hover:text-charcoal"
              aria-label="Close filters"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          {content}
        </div>
        <div className="pt-6 border-t border-neutral-100 mt-6">
          <Button variant="primary" size="md" className="w-full" onClick={onCloseMobile}>
            Apply Filters
          </Button>
        </div>
      </div>
    );
  }

  return (
    <aside className="w-72 bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-subtle shrink-0 sticky top-28 self-start">
      {content}
    </aside>
  );
};

export default FilterSidebar;

