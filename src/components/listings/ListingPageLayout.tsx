import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, ChevronRight, SlidersHorizontal, Map } from 'lucide-react';
import { Property, SearchFilters, PropertyCategory } from '../../types/property';
import { propertyService } from '../../services/propertyService';
import FilterSidebar from './FilterSidebar';
import FilterChips from './FilterChips';
import SortDropdown from './SortDropdown';
import ViewToggle from './ViewToggle';
import PropertyGrid from './PropertyGrid';
import Button from '../ui/Button';

interface ListingPageLayoutProps {
  title: string;
  subtitle: string;
  defaultListingType?: 'sale' | 'rent';
  categoryFilter?: PropertyCategory | 'all';
  showPlotFilters?: boolean;
}

export const ListingPageLayout: React.FC<ListingPageLayoutProps> = ({
  title,
  subtitle,
  defaultListingType,
  categoryFilter,
  showPlotFilters = false,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Initialize filters from searchParams or defaults
  const [filters, setFilters] = useState<SearchFilters>(() => {
    return {
      query: searchParams.get('q') || undefined,
      city: searchParams.get('city') || undefined,
      locality: searchParams.get('locality') || undefined,
      propertyType: (searchParams.get('type') as any) || (categoryFilter !== 'all' ? categoryFilter : undefined),
      listingType: (searchParams.get('listingType') as any) || defaultListingType,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      minBedrooms: searchParams.get('minBedrooms') ? Number(searchParams.get('minBedrooms')) : undefined,
      furnishing: (searchParams.get('furnishing') as any) || undefined,
      facing: (searchParams.get('facing') as any) || undefined,
      isVerified: searchParams.get('verified') === 'true' || undefined,
      isFeatured: searchParams.get('featured') === 'true' || undefined,
      sortBy: (searchParams.get('sort') as any) || 'newest',
    };
  });

  // Keep state in sync with URL
  useEffect(() => {
    const newFilters: SearchFilters = {
      query: searchParams.get('q') || undefined,
      city: searchParams.get('city') || undefined,
      locality: searchParams.get('locality') || undefined,
      propertyType: (searchParams.get('type') as any) || (categoryFilter !== 'all' ? categoryFilter : undefined),
      listingType: (searchParams.get('listingType') as any) || defaultListingType,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      minBedrooms: searchParams.get('minBedrooms') ? Number(searchParams.get('minBedrooms')) : undefined,
      furnishing: (searchParams.get('furnishing') as any) || undefined,
      facing: (searchParams.get('facing') as any) || undefined,
      isVerified: searchParams.get('verified') === 'true' || undefined,
      isFeatured: searchParams.get('featured') === 'true' || undefined,
      sortBy: (searchParams.get('sort') as any) || 'newest',
    };
    setFilters(newFilters);
    setCurrentPage(1);
  }, [searchParams, categoryFilter, defaultListingType]);

  const handleFilterChange = (updated: Partial<SearchFilters>) => {
    const combined = { ...filters, ...updated };
    setFilters(combined);

    const newParams = new URLSearchParams();
    if (combined.query) newParams.set('q', combined.query);
    if (combined.city) newParams.set('city', combined.city);
    if (combined.locality) newParams.set('locality', combined.locality);
    if (combined.propertyType) newParams.set('type', combined.propertyType);
    if (combined.listingType) newParams.set('listingType', combined.listingType);
    if (combined.maxPrice) newParams.set('maxPrice', combined.maxPrice.toString());
    if (combined.minBedrooms) newParams.set('minBedrooms', combined.minBedrooms.toString());
    if (combined.furnishing) newParams.set('furnishing', combined.furnishing);
    if (combined.facing) newParams.set('facing', combined.facing);
    if (combined.isVerified) newParams.set('verified', 'true');
    if (combined.isFeatured) newParams.set('featured', 'true');
    if (combined.sortBy) newParams.set('sort', combined.sortBy);

    setSearchParams(newParams);
    setCurrentPage(1);
  };

  const handleRemoveChip = (key: keyof SearchFilters) => {
    handleFilterChange({ [key]: undefined });
  };

  const handleClearAll = () => {
    setFilters({
      listingType: defaultListingType,
      propertyType: categoryFilter !== 'all' ? categoryFilter : undefined,
      sortBy: 'newest',
    });
    setSearchParams(new URLSearchParams());
    setCurrentPage(1);
  };

  // Filter properties
  const filteredProperties = propertyService.filterProperties(filters);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="pt-24 pb-20">
      {/* Hero Banner with Breadcrumbs */}
      <div className="bg-forest text-white py-12 md:py-16 mb-8 border-b border-forest-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-ivory-300 mb-3">
            <Link to="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-white">{title}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-ivory-200 max-w-2xl font-light leading-relaxed">
            {subtitle}
          </p>

          {/* Search Input in Hero */}
          <div className="mt-8 max-w-xl">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-mutedGray absolute left-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by locality, project name, or keywords (e.g. Korutla house, Dharmapuri plot)..."
                value={filters.query || ''}
                onChange={(e) => handleFilterChange({ query: e.target.value || undefined })}
                className="w-full bg-white text-charcoal pl-12 pr-4 py-3.5 rounded-2xl text-sm shadow-floating focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Active Filter Chips */}
        <FilterChips
          filters={filters}
          onRemove={handleRemoveChip}
          onClearAll={handleClearAll}
        />

        {/* Toolbar: Counter, Mobile Filter Button, Sort & View Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-neutral-200/80">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-charcoal">
              Showing <span className="text-forest font-bold">{filteredProperties.length}</span> properties
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-white border border-neutral-200 rounded-xl px-3.5 py-2 text-xs font-bold text-forest shadow-subtle cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <SortDropdown
              value={filters.sortBy || 'newest'}
              onChange={(sort) => handleFilterChange({ sortBy: sort })}
            />

            {/* View Mode Toggle */}
            <ViewToggle
              view={viewMode}
              onChange={(vm) => setViewMode(vm as any)}
              onMapClick={() => navigate('/map')}
            />
          </div>
        </div>

        {/* Content Area: Sidebar + Grid */}
        <div className="flex items-start gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              onChange={handleFilterChange}
              onClear={handleClearAll}
              showPlotFilters={showPlotFilters}
            />
          </div>

          {/* Properties Grid Area */}
          <div className="flex-1 min-w-0">
            <PropertyGrid
              properties={paginatedProperties}
              viewMode={viewMode}
              onResetFilters={handleClearAll}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12 pt-8 border-t border-neutral-200">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-neutral-200 bg-white hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      currentPage === i + 1
                        ? 'bg-forest text-white'
                        : 'bg-white border border-neutral-200 text-charcoal hover:bg-neutral-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-neutral-200 bg-white hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex justify-end"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-md h-full bg-white overflow-y-auto"
            >
              <FilterSidebar
                filters={filters}
                onChange={handleFilterChange}
                onClear={handleClearAll}
                isMobile={true}
                onCloseMobile={() => setMobileFilterOpen(false)}
                showPlotFilters={showPlotFilters}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ListingPageLayout;

