import React from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { properties } from '../../data/properties';
import PropertyCard from '../../components/ui/PropertyCard';
import Button from '../../components/ui/Button';

export const DashboardSaved: React.FC = () => {
  const { favorites } = useFavorites();
  const savedProps = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-forest">Saved Properties</h2>
        <p className="text-xs text-mutedGray mt-0.5">
          Your shortlisted villas, apartments, and open plots.
        </p>
      </div>

      {savedProps.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedProps.map((p, idx) => (
            <PropertyCard key={p.id} property={p} index={idx} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200">
          <p className="text-sm text-mutedGray mb-4">No saved properties found in your account.</p>
          <Button to="/buy" variant="primary" size="sm">
            Browse Properties
          </Button>
        </div>
      )}
    </div>
  );
};

export default DashboardSaved;

