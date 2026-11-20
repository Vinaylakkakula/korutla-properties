import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, Scale, ArrowRight, Building } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { properties } from '../data/properties';
import PropertyCard from '../components/ui/PropertyCard';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';

export const SavedPage: React.FC = () => {
  const { favorites, clearFavorites, compareList } = useFavorites();

  const savedProperties = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="pt-24 pb-20">
      {/* Hero Header */}
      <div className="bg-forest text-white py-12 md:py-16 mb-10 border-b border-forest-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold mb-2">
              <Heart className="w-4 h-4 fill-current text-red-400" />
              <span>Saved Listings</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              My Saved Properties
            </h1>
            <p className="text-sm sm:text-base text-ivory-300 font-light mt-2">
              Review, compare, and manage the homes, villas, and plots you have bookmarked.
            </p>
          </div>

          {savedProperties.length > 0 && (
            <div className="flex items-center gap-3">
              {compareList.length > 1 && (
                <Button
                  to={`/compare?ids=${compareList.join(',')}`}
                  variant="gold"
                  size="sm"
                  leftIcon={<Scale className="w-4 h-4" />}
                >
                  Compare ({compareList.length})
                </Button>
              )}
              <Button
                onClick={clearFavorites}
                variant="outline"
                size="sm"
                className="border-white/30 text-white hover:bg-white/10"
                leftIcon={<Trash2 className="w-4 h-4" />}
              >
                Clear All
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {savedProperties.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
              <span className="text-sm font-semibold text-charcoal">
                You have <span className="text-forest font-bold">{savedProperties.length}</span> saved properties
              </span>
              <span className="text-xs text-mutedGray">
                Click the scale icon on any card to select for side-by-side comparison
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {savedProperties.map((prop, idx) => (
                <PropertyCard key={prop.id} property={prop} index={idx} />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 sm:p-20 text-center border border-neutral-200/80 shadow-subtle max-w-2xl mx-auto my-12">
            <div className="w-20 h-20 rounded-3xl bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest mb-3">
              No Saved Properties Yet
            </h3>
            <p className="text-sm sm:text-base text-mutedGray leading-relaxed font-light mb-8">
              Click the heart icon on any villa, apartment, or plot to save it here for easy review and side-by-side comparison.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button to="/buy" variant="primary" size="md">
                Browse Properties for Sale
              </Button>
              <Button to="/plots" variant="outline" size="md">
                Explore Plots & Land
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPage;

