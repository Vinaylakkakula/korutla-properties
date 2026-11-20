import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Search,
  SlidersHorizontal,
  X,
  Layers,
  ZoomIn,
  ZoomOut,
  Navigation,
  CheckCircle2,
  List,
  Map as MapIcon,
} from 'lucide-react';
import { properties } from '../data/properties';
import { Property } from '../types/property';
import PropertyCard from '../components/ui/PropertyCard';
import Button from '../components/ui/Button';

export const MapSearchPage: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(properties[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileTab, setMobileTab] = useState<'map' | 'list'>('map');
  const [zoomLevel, setZoomLevel] = useState(13);

  const filteredProperties = properties.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.location.locality.toLowerCase().includes(q) ||
      p.location.city.toLowerCase().includes(q)
    );
  });

  return (
    <div className="pt-20 h-screen flex flex-col bg-ivory overflow-hidden">
      {/* Top Search & Filter Bar */}
      <div className="bg-white border-b border-neutral-200 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 z-20 shrink-0">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-mutedGray absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by Korutla area (Gandhi Nagar, Shivaji Nagar, Dharmapuri, Raikal)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-ivory-100 border border-neutral-200 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-charcoal focus:outline-none focus:border-forest"
          />
        </div>

        {/* Mobile Map / List Toggle */}
        <div className="flex sm:hidden items-center bg-ivory-200 rounded-xl p-1">
          <button
            onClick={() => setMobileTab('map')}
            className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 ${
              mobileTab === 'map' ? 'bg-forest text-white' : 'text-charcoal'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>Map</span>
          </button>
          <button
            onClick={() => setMobileTab('list')}
            className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 ${
              mobileTab === 'list' ? 'bg-forest text-white' : 'text-charcoal'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>List ({filteredProperties.length})</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-mutedGray">
          <span>{filteredProperties.length} Properties in View</span>
        </div>
      </div>

      {/* Main Split Layout: Map (60%) + Property List (40%) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Side: Map Canvas */}
        <div
          className={`flex-1 relative bg-neutral-200 overflow-hidden ${
            mobileTab === 'list' ? 'hidden sm:block' : 'block'
          }`}
        >
          {/* Simulated Satellite/Streets Map Graphic */}
          <div className="absolute inset-0 bg-[#E8ECE9] bg-[radial-gradient(#BFDAD1_1px,transparent_1px)] [background-size:32px_32px]">
            {/* Simulated Road Grids */}
            <svg className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="30%" x2="100%" y2="40%" stroke="#183D34" strokeWidth="8" />
              <line x1="20%" y1="0" x2="40%" y2="100%" stroke="#183D34" strokeWidth="6" />
              <line x1="0" y1="70%" x2="100%" y2="65%" stroke="#B79A68" strokeWidth="10" />
              <line x1="75%" y1="0" x2="65%" y2="100%" stroke="#183D34" strokeWidth="6" />
              <circle cx="40%" cy="45%" r="120" fill="#3D816E" fillOpacity="0.1" />
              <circle cx="70%" cy="65%" r="180" fill="#3D816E" fillOpacity="0.1" />
            </svg>
          </div>

          {/* Interactive Property Markers */}
          <div className="absolute inset-0 p-8 pointer-events-auto">
            {filteredProperties.slice(0, 12).map((prop, idx) => {
              // Distribute pseudo positions deterministically
              const top = 18 + ((idx * 37) % 65);
              const left = 12 + ((idx * 43) % 75);
              const isSelected = selectedProperty?.id === prop.id;

              return (
                <button
                  key={prop.id}
                  onClick={() => setSelectedProperty(prop)}
                  style={{ top: `${top}%`, left: `${left}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-full text-xs font-bold shadow-floating transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-forest text-white ring-4 ring-gold/40 scale-110 z-30'
                      : 'bg-white text-forest hover:bg-forest hover:text-white border border-forest/20 z-10'
                  }`}
                >
                  <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-gold' : 'text-forest'}`} />
                  <span>{prop.priceFormatted}</span>
                </button>
              );
            })}
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
            <button
              onClick={() => setZoomLevel((z) => Math.min(18, z + 1))}
              className="w-10 h-10 rounded-xl bg-white shadow-floating border border-neutral-200 flex items-center justify-center text-charcoal hover:bg-neutral-50 cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(10, z - 1))}
              className="w-10 h-10 rounded-xl bg-white shadow-floating border border-neutral-200 flex items-center justify-center text-charcoal hover:bg-neutral-50 cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedProperty(properties[0])}
              className="w-10 h-10 rounded-xl bg-white shadow-floating border border-neutral-200 flex items-center justify-center text-forest hover:bg-neutral-50 cursor-pointer"
              title="Reset View"
            >
              <Navigation className="w-4 h-4" />
            </button>
          </div>

          {/* Floating Selected Property Drawer (Overlay on Map) */}
          <AnimatePresence>
            {selectedProperty && (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-80 z-20 bg-white rounded-2xl shadow-floating border border-neutral-200 p-3"
              >
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-2">
                  <img
                    src={selectedProperty.coverImage}
                    alt={selectedProperty.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setSelectedProperty(null)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <div className="absolute bottom-2 left-2">
                    <span className="text-xs font-bold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded">
                      {selectedProperty.priceFormatted}
                    </span>
                  </div>
                </div>

                <h4 className="font-bold text-sm text-forest truncate mb-0.5">
                  {selectedProperty.title}
                </h4>
                <div className="flex items-center gap-1 text-[11px] text-mutedGray mb-3">
                  <MapPin className="w-3 h-3 text-forest shrink-0" />
                  <span className="truncate">
                    {selectedProperty.location.locality}, {selectedProperty.location.city}
                  </span>
                </div>

                <Button
                  to={`/property/${selectedProperty.id}`}
                  variant="primary"
                  size="sm"
                  className="w-full text-xs"
                >
                  View Details &rarr;
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Scrollable Listing Cards */}
        <div
          className={`w-full sm:w-[420px] lg:w-[480px] bg-white border-l border-neutral-200 overflow-y-auto p-4 sm:p-6 shrink-0 ${
            mobileTab === 'map' ? 'hidden sm:block' : 'block'
          }`}
        >
          <div className="space-y-4">
            {filteredProperties.map((prop) => {
              const isSelected = selectedProperty?.id === prop.id;
              return (
                <div
                  key={prop.id}
                  onClick={() => setSelectedProperty(prop)}
                  className={`rounded-2xl transition-all cursor-pointer ${
                    isSelected ? 'ring-2 ring-forest shadow-md' : ''
                  }`}
                >
                  <PropertyCard property={prop} variant="grid" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSearchPage;

