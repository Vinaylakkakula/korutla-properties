import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '../../data/categories';
import SectionHeading from '../ui/SectionHeading';

export const CategorySection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Explore Property Categories"
          subtitle="Discover curated residential, commercial, open plot, and agricultural assets across Telangana."
          viewAllLink="/buy"
          viewAllText="Explore All Categories"
        />

        {/* 12 Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, idx) => {
            const getRoute = () => {
              if (cat.id.includes('plot')) return `/plots?type=${cat.id}`;
              if (cat.id.includes('farm') || cat.id.includes('agri')) return `/farm-land`;
              if (cat.id.includes('commercial')) return `/commercial`;
              if (cat.id.includes('apartment')) return `/apartments`;
              return `/buy?type=${cat.id}`;
            };

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
              >
                <Link
                  to={getRoute()}
                  className="group relative block aspect-[4/5] rounded-2xl overflow-hidden shadow-subtle hover:shadow-card-hover border border-neutral-200/80 transition-all duration-300"
                >
                  {/* Image */}
                  <img
                    src={cat.image}
                    alt={cat.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-deep/95 via-deep/40 to-transparent group-hover:via-deep/50 transition-colors" />

                  {/* Top Count Badge & Arrow */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between text-white z-10">
                    <span className="text-[11px] font-bold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {cat.count}+ Listed
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-gold group-hover:scale-110 transition-all">
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                    <h3 className="font-serif text-lg sm:text-xl font-bold leading-tight mb-1 text-ivory group-hover:text-gold-light transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-ivory-300 line-clamp-2 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;

