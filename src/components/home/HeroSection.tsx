import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  MapPin,
  Home as HomeIcon,
  IndianRupee,
  ChevronDown,
  Layers,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import Button from '../ui/Button';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'plots'>('buy');

  // Search form state
  const [locality, setLocality] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [budget, setBudget] = useState('');
  const [bedrooms, setBedrooms] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (activeTab === 'rent') {
      params.set('type', 'rent');
    } else if (activeTab === 'plots') {
      params.set('category', 'plots');
    }

    if (locality) params.set('locality', locality);
    if (propertyType) params.set('propertyType', propertyType);
    if (budget) params.set('maxPrice', budget);
    if (bedrooms) params.set('minBedrooms', bedrooms);

    const targetRoute = activeTab === 'rent' ? '/rent' : activeTab === 'plots' ? '/plots' : '/buy';
    navigate(`${targetRoute}?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background with Cinematic Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: 'easeOut' }}
          className="w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85"
            alt="Luxury modern villa in Kokapet, Hyderabad"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
        {/* Cinematic Multi-Layer Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/60 to-deep/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep/80 via-transparent to-deep/50" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center">
        {/* Subtle Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium text-ivory mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>Telangana's Premier Luxury Real Estate Marketplace</span>
        </motion.div>

        {/* Primary Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] max-w-4xl drop-shadow-md mb-6"
        >
          Discover the place where your{' '}
          <span className="italic font-normal text-gold-light">future begins.</span>
        </motion.h1>

        {/* Supporting Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-ivory-200 max-w-2xl font-light leading-relaxed mb-10"
        >
          Explore exceptional homes, apartments, villas, residential plots, and farm land across Hyderabad and Telangana.
        </motion.p>

        {/* Search Interface Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="w-full max-w-4xl bg-white/95 backdrop-blur-xl rounded-3xl p-3 sm:p-5 shadow-floating border border-white/40 text-charcoal"
        >
          {/* Tabs: Buy / Rent / Plots */}
          <div className="flex items-center gap-2 border-b border-neutral-100 pb-3 mb-4 overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveTab('buy')}
              className={`px-5 py-2 rounded-xl text-sm font-bold tracking-wide transition-all cursor-pointer ${
                activeTab === 'buy'
                  ? 'bg-forest text-white shadow-sm'
                  : 'text-charcoal/70 hover:text-forest hover:bg-forest/5'
              }`}
            >
              Buy Property
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('rent')}
              className={`px-5 py-2 rounded-xl text-sm font-bold tracking-wide transition-all cursor-pointer ${
                activeTab === 'rent'
                  ? 'bg-forest text-white shadow-sm'
                  : 'text-charcoal/70 hover:text-forest hover:bg-forest/5'
              }`}
            >
              Rent Property
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('plots')}
              className={`px-5 py-2 rounded-xl text-sm font-bold tracking-wide transition-all cursor-pointer ${
                activeTab === 'plots'
                  ? 'bg-forest text-white shadow-sm'
                  : 'text-charcoal/70 hover:text-forest hover:bg-forest/5'
              }`}
            >
              Plots & Land
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
            {/* Field 1: Location */}
            <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-ivory-100 border border-neutral-200/60 focus-within:border-forest transition-colors">
              <label className="text-[10px] font-bold uppercase tracking-wider text-mutedGray flex items-center gap-1">
                <MapPin className="w-3 h-3 text-forest" />
                Location / City
              </label>
              <select
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="bg-transparent text-sm font-semibold text-charcoal focus:outline-none cursor-pointer"
              >
                <option value="">All Hyderabad Locations</option>
                <option value="Kokapet">Kokapet</option>
                <option value="Gachibowli">Gachibowli</option>
                <option value="Tellapur">Tellapur</option>
                <option value="Kondapur">Kondapur</option>
                <option value="Nallagandla">Nallagandla</option>
                <option value="Manikonda">Manikonda</option>
                <option value="Shankarpally">Shankarpally</option>
                <option value="Shamshabad">Shamshabad</option>
                <option value="Bachupally">Bachupally</option>
                <option value="Miyapur">Miyapur</option>
                <option value="Kukatpally">Kukatpally</option>
                <option value="Uppal">Uppal</option>
              </select>
            </div>

            {/* Field 2: Property Type */}
            <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-ivory-100 border border-neutral-200/60 focus-within:border-forest transition-colors">
              <label className="text-[10px] font-bold uppercase tracking-wider text-mutedGray flex items-center gap-1">
                <HomeIcon className="w-3 h-3 text-forest" />
                Property Type
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="bg-transparent text-sm font-semibold text-charcoal focus:outline-none cursor-pointer"
              >
                <option value="">Any Category</option>
                {activeTab === 'plots' ? (
                  <>
                    <option value="residential-plot">Residential Plot</option>
                    <option value="open-plot">Open Plot</option>
                    <option value="apartment-development-plot">Development Plot</option>
                    <option value="commercial-plot">Commercial Plot</option>
                    <option value="farm-land">Farm Land</option>
                    <option value="agricultural-land">Agricultural Land</option>
                  </>
                ) : (
                  <>
                    <option value="villa">Luxury Villa</option>
                    <option value="apartment">Apartment / Flat</option>
                    <option value="gated-community-apartment">Gated Community Flat</option>
                    <option value="independent-house">Independent House</option>
                    <option value="home">Residential Home</option>
                    <option value="commercial-property">Commercial Space</option>
                  </>
                )}
              </select>
            </div>

            {/* Field 3: Budget Range */}
            <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-ivory-100 border border-neutral-200/60 focus-within:border-forest transition-colors">
              <label className="text-[10px] font-bold uppercase tracking-wider text-mutedGray flex items-center gap-1">
                <IndianRupee className="w-3 h-3 text-forest" />
                Budget
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="bg-transparent text-sm font-semibold text-charcoal focus:outline-none cursor-pointer"
              >
                <option value="">Any Budget</option>
                {activeTab === 'rent' ? (
                  <>
                    <option value="30000">Up to ₹30,000/mo</option>
                    <option value="50000">Up to ₹50,000/mo</option>
                    <option value="100000">Up to ₹1.0 Lakh/mo</option>
                    <option value="200000">Up to ₹2.0 Lakhs/mo</option>
                  </>
                ) : (
                  <>
                    <option value="5000000">Up to ₹50 Lakhs</option>
                    <option value="10000000">Up to ₹1.0 Crore</option>
                    <option value="20000000">Up to ₹2.0 Crores</option>
                    <option value="50000000">Up to ₹5.0 Crores</option>
                    <option value="100000000">₹5.0+ Crores</option>
                  </>
                )}
              </select>
            </div>

            {/* Field 4 / Search Action */}
            <div className="flex items-center gap-2">
              {activeTab !== 'plots' ? (
                <div className="flex-1 flex flex-col gap-1 p-2.5 rounded-xl bg-ivory-100 border border-neutral-200/60 focus-within:border-forest transition-colors">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-mutedGray">
                    Bedrooms
                  </label>
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="bg-transparent text-sm font-semibold text-charcoal focus:outline-none cursor-pointer"
                  >
                    <option value="">Any BHK</option>
                    <option value="2">2+ BHK</option>
                    <option value="3">3+ BHK</option>
                    <option value="4">4+ BHK</option>
                    <option value="5">5+ BHK</option>
                  </select>
                </div>
              ) : null}

              <button
                type="submit"
                className="flex-1 bg-gold hover:bg-gold-dark text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer h-full"
              >
                <Search className="w-4 h-4" />
                <span className="text-sm">Search</span>
              </button>
            </div>
          </form>

          {/* Quick Filter Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 pt-3 border-t border-neutral-100 text-xs text-mutedGray">
            <span className="font-semibold text-charcoal">Trending Searches:</span>
            <button
              onClick={() => navigate('/buy?locality=Kokapet&type=villa')}
              className="hover:text-forest underline underline-offset-2"
            >
              Villas in Kokapet
            </button>
            <span>•</span>
            <button
              onClick={() => navigate('/apartments?locality=Gachibowli')}
              className="hover:text-forest underline underline-offset-2"
            >
              Apartments in Gachibowli
            </button>
            <span>•</span>
            <button
              onClick={() => navigate('/plots?locality=Tellapur')}
              className="hover:text-forest underline underline-offset-2"
            >
              Plots in Tellapur
            </button>
            <span>•</span>
            <button
              onClick={() => navigate('/farm-land?locality=Shankarpally')}
              className="hover:text-forest underline underline-offset-2"
            >
              Farm Land in Shankarpally
            </button>
          </div>
        </motion.div>

        {/* Action Buttons below Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
        >
          <Button
            to="/buy"
            variant="outline"
            size="md"
            className="border-white/40 text-white hover:bg-white/10"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Explore All Properties
          </Button>
          <Button
            to="/sell"
            variant="gold"
            size="md"
            leftIcon={<ShieldCheck className="w-4 h-4" />}
          >
            List Your Property (Free)
          </Button>
        </motion.div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-white/50 text-[11px] font-medium tracking-widest uppercase">
        <span className="mb-1">Scroll to explore</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-gold" />
      </div>
    </section>
  );
};

export default HeroSection;

