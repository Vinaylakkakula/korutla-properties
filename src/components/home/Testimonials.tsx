import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { reviews } from '../../data/reviews';
import SectionHeading from '../ui/SectionHeading';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Customer Testimonials"
          subtitle="Real stories from families, land investors, and NRIs who found their future with Korutla Properties."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(rev.rating) ? 'fill-current' : 'text-neutral-300'
                        }`}
                      />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-forest/20" />
                </div>

                <p className="text-sm text-charcoal/80 leading-relaxed font-light italic mb-6">
                  "{rev.comment}"
                </p>
              </div>

              {/* User Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                <img
                  src={rev.userPhoto}
                  alt={rev.userName}
                  className="w-10 h-10 rounded-full object-cover border border-neutral-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-forest">{rev.userName}</h4>
                  <span className="text-xs text-mutedGray">Verified Buyer</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

