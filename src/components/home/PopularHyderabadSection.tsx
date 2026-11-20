import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { korutlaLocalities, LocalityInfo } from '../../data/locations';
import { supabaseService } from '../../services/supabaseService';
import SectionHeading from '../ui/SectionHeading';

export const PopularKorutlaSection: React.FC = () => {
  const [localities, setLocalities] = useState<LocalityInfo[]>(korutlaLocalities);

  useEffect(() => {
    supabaseService.getLocalities().then((data) => {
      if (data && data.length > 0) {
        setLocalities(data);
      }
    }).catch(() => {});
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Popular Korutla & Nearby Areas"
          subtitle="From the heart of Korutla Town to the serene farmlands of Dharmapuri and Raikal — explore where your next property awaits."
          viewAllLink="/locations/korutla"
          viewAllText="Explore Korutla Hub"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {localities.map((loc, idx) => (
            <motion.div
              key={loc.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.03 }}
            >
              <Link
                to={`/buy?locality=${encodeURIComponent(loc.name)}`}
                className="group relative block aspect-[16/11] rounded-2xl overflow-hidden border border-neutral-200/80 shadow-subtle hover:shadow-card-hover transition-all duration-300"
              >
                <img
                  src={loc.image}
                  alt={loc.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/95 via-deep/40 to-transparent group-hover:via-deep/50 transition-colors" />

                <div className="absolute top-3 right-3 text-white">
                  <span className="text-[10px] font-bold bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-md">
                    {loc.propertyCount} Properties
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-1 text-gold text-xs font-semibold mb-0.5">
                    <MapPin className="w-3 h-3" />
                    <span>Avg: {loc.avgPrice}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold-light transition-colors leading-tight">
                    {loc.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularKorutlaSection;
