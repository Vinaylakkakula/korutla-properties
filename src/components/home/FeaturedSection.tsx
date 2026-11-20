import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { properties } from '../../data/properties';
import PropertyCard from '../ui/PropertyCard';
import SectionHeading from '../ui/SectionHeading';

export const FeaturedSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'villa' | 'apartment' | 'plot' | 'farm'>('all');

  const filteredProperties = properties
    .filter((p) => p.isFeatured)
    .filter((p) => {
      if (filter === 'all') return true;
      if (filter === 'villa') return p.category === 'villa' || p.category === 'independent-house' || p.category === 'home';
      if (filter === 'apartment') return p.category === 'apartment' || p.category === 'gated-community-apartment';
      if (filter === 'plot') return p.category.includes('plot');
      if (filter === 'farm') return p.category.includes('farm') || p.category.includes('agri');
      return true;
    })
    .slice(0, 6);

  return (
    <section className="py-20 lg:py-28 bg-white border-y border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Featured Properties"
          subtitle="Hand-picked verified luxury homes, sky residences, and premium plots with high appreciation potential."
          viewAllLink="/buy?featured=true"
          viewAllText="View All Featured"
        />

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-forest text-white shadow-sm'
                : 'bg-ivory-200 text-charcoal/80 hover:bg-ivory-300'
            }`}
          >
            All Featured
          </button>
          <button
            onClick={() => setFilter('villa')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              filter === 'villa'
                ? 'bg-forest text-white shadow-sm'
                : 'bg-ivory-200 text-charcoal/80 hover:bg-ivory-300'
            }`}
          >
            Luxury Villas & Homes
          </button>
          <button
            onClick={() => setFilter('apartment')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              filter === 'apartment'
                ? 'bg-forest text-white shadow-sm'
                : 'bg-ivory-200 text-charcoal/80 hover:bg-ivory-300'
            }`}
          >
            Apartments & Flats
          </button>
          <button
            onClick={() => setFilter('plot')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              filter === 'plot'
                ? 'bg-forest text-white shadow-sm'
                : 'bg-ivory-200 text-charcoal/80 hover:bg-ivory-300'
            }`}
          >
            Residential & Open Plots
          </button>
          <button
            onClick={() => setFilter('farm')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              filter === 'farm'
                ? 'bg-forest text-white shadow-sm'
                : 'bg-ivory-200 text-charcoal/80 hover:bg-ivory-300'
            }`}
          >
            Farm & Agri Lands
          </button>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((prop, idx) => (
              <PropertyCard key={prop.id} property={prop} index={idx} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;

