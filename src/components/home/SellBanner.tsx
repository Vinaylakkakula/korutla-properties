import React from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, ShieldCheck, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';

export const SellBanner: React.FC = () => {
  return (
    <section className="py-20 bg-forest text-white relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-forest-900/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-forest-900/80 rounded-3xl p-8 sm:p-14 border border-white/10 shadow-floating flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold bg-gold/15 px-3 py-1 rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              For Owners & Developers
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Sell or Rent Your Property to High-Net-Worth Buyers
            </h2>
            <p className="text-sm sm:text-base text-ivory-200 leading-relaxed font-light mb-6">
              Connect with serious buyers across Hyderabad and overseas NRIs. Get free property valuation, verified badge listing, and direct inquiry management.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-ivory-200 mb-8">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>Zero Listing Charges</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>Direct WhatsApp Inquiries</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>NRI Buyer Reach</span>
              </div>
            </div>

            <Button
              to="/sell"
              variant="gold"
              size="lg"
              leftIcon={<PlusCircle className="w-5 h-5" />}
              className="w-full sm:w-auto"
            >
              List Your Property Now
            </Button>
          </div>

          {/* Right Image/Badge Visual */}
          <div className="lg:w-1/3 flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gold/20 flex items-center justify-center text-gold mb-4">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div className="font-serif text-3xl font-bold text-white mb-1">
              ₹850+ Cr
            </div>
            <div className="text-xs text-ivory-300 uppercase tracking-widest font-semibold mb-3">
              Property Value Transacted
            </div>
            <p className="text-xs text-ivory-300 font-light">
              Over 2,400+ properties successfully sold or leased through our verified platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellBanner;

