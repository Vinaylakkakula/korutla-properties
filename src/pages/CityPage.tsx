import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ChevronRight, Building, CheckCircle2, ArrowRight } from 'lucide-react';
import { cities, korutlaLocalities } from '../data/locations';
import { propertyService } from '../services/propertyService';
import { useAuth } from '../context/AuthContext';
import PropertyCard from '../components/ui/PropertyCard';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';

export const CityPage: React.FC = () => {
  const { city: cityParam } = useParams<{ city: string }>();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'all' | 'sale' | 'rent' | 'plot'>('all');

  const cityData = cities.find((c) => c.slug.toLowerCase() === cityParam?.toLowerCase()) || cities[0];

  // Fetch properties for this city
  const cityProperties = propertyService.getPropertiesByCity(cityData.name);

  const displayedProperties = cityProperties.filter((p) => {
    if (activeTab === 'sale') return p.listingType === 'sale';
    if (activeTab === 'rent') return p.listingType === 'rent';
    if (activeTab === 'plot') return p.category.includes('plot') || p.category.includes('land');
    return true;
  });

  return (
    <div className="pt-24 pb-20">
      {/* City Hero */}
      <div className="relative min-h-[45vh] flex items-center justify-center overflow-hidden mb-12">
        <div className="absolute inset-0">
          <img
            src={cityData.image}
            alt={cityData.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/60 to-deep/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-gold mb-3">
            <Link to="/locations" className="hover:underline">
              Locations
            </Link>
            <ChevronRight className="w-3 h-3 text-white" />
            <span className="text-white">{cityData.name}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            {cityData.name} Real Estate
          </h1>
          <p className="text-sm sm:text-base text-ivory-200 max-w-2xl mx-auto font-light leading-relaxed mb-6">
            {cityData.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button to={`/buy?city=${encodeURIComponent(cityData.name)}`} variant="gold" size="sm">
              View All in {cityData.name}
            </Button>
            <Button
              to={isAuthenticated ? '/sell' : '/signin?redirect=/sell'}
              variant="outline"
              size="sm"
              className="border-white text-white hover:bg-white/10"
            >
              List Property in {cityData.name}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Popular Localities in City */}
        <div>
          <SectionHeading
            title={`Key Micro-Markets in ${cityData.name}`}
            subtitle="Top performing localities for capital appreciation and rental yield."
          />

          <div className="flex flex-wrap gap-2.5">
            {cityData.popularLocalities.map((loc) => (
              <Link
                key={loc}
                to={`/buy?locality=${encodeURIComponent(loc)}`}
                className="px-4 py-2 rounded-xl bg-white border border-neutral-200 shadow-subtle hover:border-forest hover:text-forest text-sm font-semibold text-charcoal transition-all flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-forest" />
                <span>{loc}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Available Properties Section with Tabs */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <SectionHeading
              title={`Properties in ${cityData.name}`}
              subtitle={`Browse ${displayedProperties.length} verified listings in ${cityData.name}.`}
              className="mb-0"
            />

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-white border border-neutral-200 p-1 rounded-xl shadow-subtle shrink-0">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === 'all' ? 'bg-forest text-white' : 'text-charcoal hover:bg-neutral-50'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('sale')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === 'sale' ? 'bg-forest text-white' : 'text-charcoal hover:bg-neutral-50'
                }`}
              >
                For Sale
              </button>
              <button
                onClick={() => setActiveTab('rent')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === 'rent' ? 'bg-forest text-white' : 'text-charcoal hover:bg-neutral-50'
                }`}
              >
                For Rent
              </button>
              <button
                onClick={() => setActiveTab('plot')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === 'plot' ? 'bg-forest text-white' : 'text-charcoal hover:bg-neutral-50'
                }`}
              >
                Plots & Land
              </button>
            </div>
          </div>

          {displayedProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {displayedProperties.map((prop, idx) => (
                <PropertyCard key={prop.id} property={prop} index={idx} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-neutral-200 shadow-subtle">
              <Building className="w-10 h-10 text-mutedGray mx-auto mb-3" />
              <h3 className="font-serif text-xl font-bold text-forest mb-1">
                No Properties Under this Tab Currently
              </h3>
              <p className="text-sm text-mutedGray mb-6">
                Be the first to list a property in {cityData.name}!
              </p>
              <Button
                to={isAuthenticated ? '/sell' : '/signin?redirect=/sell'}
                variant="primary"
                size="md"
              >
                List Property in {cityData.name}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CityPage;

