import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Building, Compass } from 'lucide-react';
import { cities, korutlaLocalities, LocalityInfo } from '../data/locations';
import { supabaseService } from '../services/supabaseService';
import SectionHeading from '../components/ui/SectionHeading';

export const LocationsPage: React.FC = () => {
  const [localities, setLocalities] = useState<LocalityInfo[]>(korutlaLocalities);

  useEffect(() => {
    supabaseService.getLocalities().then((data) => {
      if (data && data.length > 0) {
        setLocalities(data);
      }
    }).catch(() => {});
  }, []);

  return (
    <div className="pt-24 pb-20">
      {/* Hero Banner */}
      <div className="bg-forest text-white py-14 md:py-20 mb-12 border-b border-forest-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-gold font-bold mb-2 block">
            Korutla (505326) & Regional Intelligence
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Discover Real Estate by Area
          </h1>
          <p className="text-sm sm:text-base text-ivory-300 max-w-2xl mx-auto font-light leading-relaxed">
            Explore property hotspots, residential colonies, agricultural zones, and commercial corridors across Korutla (505326) and Telangana.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Korutla Localities Section */}
        <div>
          <SectionHeading
            title="Korutla Areas & Micro-Markets"
            subtitle="Explore high-growth residential colonies, prime market roads, and peaceful outskirts."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {localities.map((loc, idx) => (
              <motion.div
                key={loc.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="bg-white rounded-2xl overflow-hidden border border-neutral-200/80 shadow-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-xs font-bold text-gold">{loc.avgPrice}</span>
                    <h3 className="font-serif text-xl font-bold">{loc.name}</h3>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-charcoal/70 leading-relaxed mb-4 font-light">
                    {loc.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {loc.highlights.map((hl) => (
                      <span
                        key={hl}
                        className="text-[10px] bg-ivory-200 text-charcoal/80 px-2 py-0.5 rounded-md font-medium"
                      >
                        {hl}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/buy?locality=${encodeURIComponent(loc.name)}`}
                    className="pt-3 border-t border-neutral-100 text-xs font-bold text-forest hover:text-gold uppercase tracking-wider flex items-center justify-between"
                  >
                    <span>View {loc.propertyCount} Properties</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Major Cities Section */}
        <div>
          <SectionHeading
            title="Explore Major Indian Metro Cities"
            subtitle="Curated luxury residences and commercial assets across South and West India."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cities.map((city, idx) => (
              <motion.div
                key={city.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
              >
                <Link
                  to={`/locations/${city.slug}`}
                  className="group relative block aspect-[4/5] rounded-2xl overflow-hidden shadow-subtle hover:shadow-card-hover border border-neutral-200/80 transition-all duration-300"
                >
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep/95 via-deep/40 to-transparent group-hover:via-deep/50 transition-colors" />

                  <div className="absolute top-3 right-3 text-white">
                    <span className="text-[10px] font-bold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {city.propertyCount} Listings
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-bold text-gold uppercase tracking-widest block mb-0.5">
                      {city.state}
                    </span>
                    <h3 className="font-serif text-2xl font-bold leading-tight mb-1 group-hover:text-gold-light transition-colors">
                      {city.name}
                    </h3>
                    <p className="text-xs text-ivory-300 font-light line-clamp-2 leading-relaxed">
                      {city.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationsPage;

