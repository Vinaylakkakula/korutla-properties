import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { cities } from '../../data/locations';
import SectionHeading from '../ui/SectionHeading';

export const ExploreCitiesSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Explore by City"
          subtitle="Discover premium properties and investment corridors across premier South and West Indian metros."
          viewAllLink="/locations"
          viewAllText="View All Cities"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cities.slice(0, 8).map((city, idx) => (
            <motion.div
              key={city.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <Link
                to={`/locations/${city.slug}`}
                className="group relative block aspect-[16/11] rounded-2xl overflow-hidden shadow-subtle hover:shadow-card-hover border border-neutral-200/80 transition-all duration-300"
              >
                <img
                  src={city.image}
                  alt={city.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/95 via-deep/40 to-transparent group-hover:via-deep/50 transition-colors" />

                <div className="absolute top-3 right-3 text-white z-10">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-gold transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold block mb-1">
                    {city.state}
                  </span>
                  <h3 className="font-serif text-xl font-bold leading-tight group-hover:text-gold-light transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-xs text-ivory-300 font-light mt-1 line-clamp-1">
                    {city.propertyCount}+ Verified Properties
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreCitiesSection;

