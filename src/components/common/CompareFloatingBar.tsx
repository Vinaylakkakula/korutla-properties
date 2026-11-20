import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, X, ArrowRight } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { properties } from '../../data/properties';
import Button from '../ui/Button';

export const CompareFloatingBar: React.FC = () => {
  const { compareList, removeFromCompare, clearCompare } = useFavorites();

  if (compareList.length === 0) return null;

  const compareProperties = properties.filter((p) => compareList.includes(p.id));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[94vw] max-w-3xl bg-forest-900/95 backdrop-blur-lg border border-gold/40 shadow-floating rounded-2xl p-3 sm:p-4 text-white"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-1 scrollbar-none">
            <div className="flex items-center gap-2 pr-2 border-r border-white/20 shrink-0">
              <Scale className="w-5 h-5 text-gold" />
              <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">
                Compare ({compareProperties.length}/4)
              </span>
            </div>

            {compareProperties.map((p) => (
              <div
                key={p.id}
                className="relative group shrink-0 flex items-center gap-2 bg-white/10 rounded-lg p-1.5 pr-2.5 border border-white/10"
              >
                <img
                  src={p.coverImage}
                  alt={p.title}
                  className="w-8 h-8 rounded-md object-cover"
                />
                <div className="max-w-[100px] sm:max-w-[130px]">
                  <p className="text-[11px] font-bold text-white truncate">{p.title}</p>
                  <p className="text-[10px] text-gold">{p.priceFormatted}</p>
                </div>
                <button
                  onClick={() => removeFromCompare(p.id)}
                  className="p-1 rounded-full hover:bg-white/20 text-white/70 hover:text-white"
                  title="Remove"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={clearCompare}
              className="text-xs text-white/60 hover:text-white underline underline-offset-2 hidden sm:inline"
            >
              Clear
            </button>
            <Button
              to={`/compare?ids=${compareList.join(',')}`}
              variant="gold"
              size="sm"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Compare
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CompareFloatingBar;

