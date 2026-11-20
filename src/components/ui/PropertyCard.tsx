import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  CheckCircle2,
  Compass,
  Scale,
  Sparkles,
} from 'lucide-react';
import { Property } from '../../types/property';
import { formatArea, cn } from '../../utils/format';
import { useFavorites } from '../../context/FavoritesContext';
import { Badge } from './Badge';

interface PropertyCardProps {
  property: Property;
  index?: number;
  variant?: 'grid' | 'list';
  className?: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  index = 0,
  variant = 'grid',
  className,
}) => {
  const { isFavorite, toggleFavorite, isInCompare, addToCompare } = useFavorites();
  const favorite = isFavorite(property.id);
  const inCompare = isInCompare(property.id);

  const isPlotOrLand = [
    'residential-plot',
    'open-plot',
    'apartment-development-plot',
    'commercial-plot',
    'farm-land',
    'agricultural-land',
  ].includes(property.category);

  if (variant === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: index * 0.05 }}
        className={cn(
          'group bg-white rounded-2xl overflow-hidden border border-neutral-200/80 shadow-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col md:flex-row',
          className
        )}
      >
        {/* Image Box */}
        <div className="relative md:w-2/5 aspect-[16/10] md:aspect-auto overflow-hidden bg-neutral-100">
          <img
            src={property.coverImage}
            alt={property.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            <Badge variant={property.listingType === 'sale' ? 'sale' : 'rent'} size="sm">
              For {property.listingType === 'sale' ? 'Sale' : 'Rent'}
            </Badge>
            {property.isVerified && (
              <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-md text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Verified
              </span>
            )}
            {property.isPremium && (
              <span className="inline-flex items-center gap-1 bg-gold text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                <Sparkles className="w-3 h-3" />
                Premium
              </span>
            )}
          </div>

          {/* Actions on Image */}
          <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCompare(property.id);
              }}
              title={inCompare ? 'Remove from compare' : 'Compare property'}
              className={cn(
                'p-2 rounded-full backdrop-blur-md transition-all',
                inCompare
                  ? 'bg-gold text-white shadow-md'
                  : 'bg-black/30 hover:bg-black/60 text-white'
              )}
            >
              <Scale className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(property.id);
              }}
              title={favorite ? 'Remove from saved' : 'Save property'}
              className={cn(
                'p-2 rounded-full backdrop-blur-md transition-all',
                favorite
                  ? 'bg-red-500 text-white shadow-md'
                  : 'bg-black/30 hover:bg-black/60 text-white'
              )}
            >
              <Heart className={cn('w-4 h-4', favorite && 'fill-current')} />
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="p-5 md:p-6 md:w-3/5 flex flex-col justify-between">
          <div>
            <div className="flex items-baseline justify-between gap-2 mb-2">
              <span className="text-2xl font-bold font-serif text-forest">
                {property.priceFormatted}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-dark bg-gold/10 px-2.5 py-1 rounded-md">
                {property.category.replace(/-/g, ' ')}
              </span>
            </div>

            <Link to={`/property/${property.id}`} className="block group-hover:text-gold transition-colors">
              <h3 className="text-lg font-bold text-charcoal line-clamp-1 mb-1.5">
                {property.title}
              </h3>
            </Link>

            <div className="flex items-center gap-1.5 text-mutedGray text-xs mb-3">
              <MapPin className="w-3.5 h-3.5 text-forest shrink-0" />
              <span className="line-clamp-1">
                {property.location.locality}, {property.location.city}
              </span>
            </div>

            <p className="text-sm text-charcoal/70 line-clamp-2 mb-4 leading-relaxed">
              {property.description}
            </p>
          </div>

          <div>
            {/* Features Row */}
            <div className="flex items-center gap-4 py-3 border-t border-neutral-100 text-xs font-medium text-charcoal/80">
              {isPlotOrLand ? (
                <>
                  <div className="flex items-center gap-1.5">
                    <Maximize2 className="w-4 h-4 text-forest" />
                    <span>{formatArea(property.area, property.areaUnit)}</span>
                  </div>
                  {property.facing && (
                    <div className="flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-forest" />
                      <span className="capitalize">{property.facing} Facing</span>
                    </div>
                  )}
                  {property.plotDetails?.roadWidth && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-forest font-bold">🛣</span>
                      <span>{property.plotDetails.roadWidth} ft Road</span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {property.bedrooms && (
                    <div className="flex items-center gap-1.5">
                      <Bed className="w-4 h-4 text-forest" />
                      <span>{property.bedrooms} Beds</span>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex items-center gap-1.5">
                      <Bath className="w-4 h-4 text-forest" />
                      <span>{property.bathrooms} Baths</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Maximize2 className="w-4 h-4 text-forest" />
                    <span>{formatArea(property.area, property.areaUnit)}</span>
                  </div>
                </>
              )}
            </div>

            {/* Bottom Row */}
            <div className="pt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={property.agent.photo}
                  alt={property.agent.name}
                  className="w-7 h-7 rounded-full object-cover border border-neutral-200"
                />
                <span className="text-xs text-mutedGray font-medium">
                  {property.agent.name}
                </span>
              </div>
              <Link
                to={`/property/${property.id}`}
                className="text-xs font-bold text-forest hover:text-gold uppercase tracking-wider transition-colors inline-flex items-center gap-1"
              >
                View Details &rarr;
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid Variant (Default)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={cn(
        'group bg-white rounded-2xl overflow-hidden border border-neutral-200/80 shadow-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col',
        className
      )}
    >
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
        <img
          src={property.coverImage}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none" />

        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <Badge variant={property.listingType === 'sale' ? 'sale' : 'rent'} size="sm">
            For {property.listingType === 'sale' ? 'Sale' : 'Rent'}
          </Badge>
          {property.isVerified && (
            <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-md text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded-md shadow-sm">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Verified
            </span>
          )}
          {property.isPremium && (
            <span className="inline-flex items-center gap-1 bg-gold text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-sm">
              <Sparkles className="w-3 h-3" />
              Premium
            </span>
          )}
        </div>

        {/* Favorite & Compare Buttons */}
        <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCompare(property.id);
            }}
            title={inCompare ? 'Remove from compare' : 'Compare property'}
            className={cn(
              'p-2 rounded-full backdrop-blur-md transition-all',
              inCompare
                ? 'bg-gold text-white shadow-md'
                : 'bg-black/35 hover:bg-black/60 text-white'
            )}
          >
            <Scale className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(property.id);
            }}
            title={favorite ? 'Remove from saved' : 'Save property'}
            className={cn(
              'p-2 rounded-full backdrop-blur-md transition-all',
              favorite
                ? 'bg-red-500 text-white shadow-md'
                : 'bg-black/35 hover:bg-black/60 text-white'
            )}
          >
            <Heart className={cn('w-4 h-4', favorite && 'fill-current')} />
          </button>
        </div>

        {/* Price Tag over image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between z-10 text-white">
          <span className="text-xl sm:text-2xl font-bold font-serif tracking-tight drop-shadow-sm text-ivory">
            {property.priceFormatted}
          </span>
          <span className="text-[11px] font-medium uppercase tracking-wider bg-black/40 backdrop-blur-md px-2 py-0.5 rounded text-white/90">
            {property.category.replace(/-/g, ' ')}
          </span>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <Link to={`/property/${property.id}`} className="block group-hover:text-gold transition-colors">
            <h3 className="font-bold text-base sm:text-lg text-charcoal line-clamp-1 mb-1.5">
              {property.title}
            </h3>
          </Link>

          <div className="flex items-center gap-1.5 text-mutedGray text-xs mb-3">
            <MapPin className="w-3.5 h-3.5 text-forest shrink-0" />
            <span className="line-clamp-1">
              {property.location.locality}, {property.location.city}
            </span>
          </div>

          <p className="text-xs text-charcoal/70 line-clamp-2 leading-relaxed mb-4">
            {property.description}
          </p>
        </div>

        <div>
          {/* Key Metrics Row */}
          <div className="flex items-center justify-between py-2.5 px-3 bg-ivory-100 rounded-xl text-xs font-semibold text-charcoal/80 mb-3 border border-neutral-100">
            {isPlotOrLand ? (
              <>
                <div className="flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-forest" />
                  <span>{formatArea(property.area, property.areaUnit)}</span>
                </div>
                {property.facing && (
                  <div className="flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-forest" />
                    <span className="capitalize">{property.facing}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <span className="text-emerald-700 font-bold text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    Approved
                  </span>
                </div>
              </>
            ) : (
              <>
                {property.bedrooms ? (
                  <div className="flex items-center gap-1.5">
                    <Bed className="w-3.5 h-3.5 text-forest" />
                    <span>{property.bedrooms} BHK</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-forest" />
                    <span>{formatArea(property.area, property.areaUnit)}</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center gap-1.5">
                    <Bath className="w-3.5 h-3.5 text-forest" />
                    <span>{property.bathrooms} Baths</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-forest" />
                  <span>{formatArea(property.area, property.areaUnit)}</span>
                </div>
              </>
            )}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
            <div className="flex items-center gap-2">
              <img
                src={property.agent.photo}
                alt={property.agent.name}
                className="w-6 h-6 rounded-full object-cover border border-neutral-200"
              />
              <span className="text-[11px] text-mutedGray font-medium truncate max-w-[100px]">
                {property.agent.name}
              </span>
            </div>
            <Link
              to={`/property/${property.id}`}
              className="text-xs font-bold text-forest hover:text-gold uppercase tracking-wider transition-colors inline-flex items-center gap-1"
            >
              Details &rarr;
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;

