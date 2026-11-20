import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Heart,
  Share2,
  Calendar,
  Phone,
  MessageCircle,
  Mail,
  CheckCircle2,
  Bed,
  Bath,
  Maximize2,
  Compass,
  Layers,
  Car,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  Info,
  Scale,
  Flag,
} from 'lucide-react';
import { propertyService } from '../services/propertyService';
import {
  formatArea,
  generateWhatsAppLink,
  generateCallLink,
  copyToClipboard,
} from '../utils/format';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import PropertyCard from '../components/ui/PropertyCard';
import SectionHeading from '../components/ui/SectionHeading';

export const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite, isInCompare, addToCompare } = useFavorites();
  const { addToast } = useToast();

  const property = propertyService.getPropertyById(id || '');

  // Active gallery image
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Inquiry modal state
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState(
    property ? `Hello, I am interested in "${property.title}". Please share more details.` : ''
  );

  if (!property) {
    return (
      <div className="pt-32 pb-24 max-w-xl mx-auto px-4 text-center">
        <h2 className="font-serif text-3xl font-bold text-forest mb-3">Property Not Found</h2>
        <p className="text-sm text-mutedGray mb-6">
          The property listing you are looking for may have been sold, rented, or removed.
        </p>
        <Button to="/buy" variant="primary" size="md">
          Browse Available Properties
        </Button>
      </div>
    );
  }

  const favorite = isFavorite(property.id);
  const inCompare = isInCompare(property.id);
  const relatedProperties = propertyService.getRelatedProperties(property, 3);

  const isPlotOrLand = [
    'residential-plot',
    'open-plot',
    'apartment-development-plot',
    'commercial-plot',
    'farm-land',
    'agricultural-land',
  ].includes(property.category);

  const handleShare = async () => {
    const success = await copyToClipboard(window.location.href);
    if (success) {
      addToast('Property URL copied to clipboard!', 'success');
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) {
      addToast('Please provide your name and phone number', 'error');
      return;
    }
    setInquiryModalOpen(false);
    addToast('Your inquiry has been submitted! The agent will contact you shortly.', 'success');
  };

  return (
    <div className="pt-24 pb-24">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-neutral-100 py-3.5 mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-mutedGray truncate">
            <Link to="/" className="hover:text-forest">
              Home
            </Link>
            <span>/</span>
            <Link to={property.listingType === 'sale' ? '/buy' : '/rent'} className="hover:text-forest capitalize">
              {property.listingType}
            </Link>
            <span>/</span>
            <Link to={`/locations/${property.location.city.toLowerCase()}`} className="hover:text-forest">
              {property.location.city}
            </Link>
            <span>/</span>
            <span className="text-charcoal font-semibold truncate max-w-[200px] sm:max-w-xs">
              {property.title}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg border border-neutral-200 text-charcoal hover:bg-neutral-50 flex items-center gap-1.5 cursor-pointer"
              title="Share Property"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <button
              onClick={() => addToCompare(property.id)}
              className={`p-1.5 rounded-lg border flex items-center gap-1.5 transition-colors cursor-pointer ${
                inCompare
                  ? 'bg-gold border-gold text-white'
                  : 'border-neutral-200 text-charcoal hover:bg-neutral-50'
              }`}
              title="Compare"
            >
              <Scale className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{inCompare ? 'Comparing' : 'Compare'}</span>
            </button>
            <button
              onClick={() => toggleFavorite(property.id)}
              className={`p-1.5 rounded-lg border flex items-center gap-1.5 transition-colors cursor-pointer ${
                favorite
                  ? 'bg-red-500 border-red-500 text-white'
                  : 'border-neutral-200 text-charcoal hover:bg-neutral-50'
              }`}
              title="Save"
            >
              <Heart className={`w-3.5 h-3.5 ${favorite ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{favorite ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title & Price Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant={property.listingType === 'sale' ? 'sale' : 'rent'}>
                For {property.listingType === 'sale' ? 'Sale' : 'Rent'}
              </Badge>
              {property.isVerified && (
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-md border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Title & Approval
                </span>
              )}
              {property.isPremium && (
                <span className="inline-flex items-center gap-1 bg-gold text-white text-xs font-bold px-2.5 py-1 rounded-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  Exclusive Listing
                </span>
              )}
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-forest mb-2 leading-tight">
              {property.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-mutedGray">
              <MapPin className="w-4 h-4 text-forest shrink-0" />
              <span>{property.location.address}, {property.location.locality}, {property.location.city}</span>
            </div>
          </div>

          <div className="text-left md:text-right shrink-0">
            <span className="text-xs uppercase tracking-wider text-mutedGray block mb-0.5">
              {property.listingType === 'sale' ? 'Expected Price' : 'Monthly Rent'}
            </span>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-forest">
              {property.priceFormatted}
            </div>
            {property.deposit && (
              <span className="text-xs text-mutedGray block">
                Security Deposit: ₹{property.deposit.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        {/* Image Gallery Showcase */}
        <div className="space-y-3 mb-10">
          {/* Main Large Image */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-neutral-900 shadow-card cursor-pointer group">
            <img
              src={property.images[activeImageIndex] || property.coverImage}
              alt={property.title}
              onClick={() => setLightboxOpen(true)}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

            {/* View Fullscreen Pill */}
            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-charcoal backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <span>View All {property.images.length} Photos</span>
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative aspect-[16/10] w-24 sm:w-32 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  activeImageIndex === idx ? 'border-forest ring-2 ring-forest/20' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Content Layout: 2 Columns (Details 65% | Sticky Contact 35%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Details Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* Quick Specs Grid */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-subtle">
              <h3 className="font-serif text-xl font-bold text-forest mb-6">Property Overview</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-charcoal">
                <div className="space-y-1">
                  <span className="text-xs text-mutedGray flex items-center gap-1.5">
                    <Maximize2 className="w-4 h-4 text-forest" />
                    Area
                  </span>
                  <div className="font-bold text-base">{formatArea(property.area, property.areaUnit)}</div>
                </div>

                {isPlotOrLand ? (
                  <>
                    <div className="space-y-1">
                      <span className="text-xs text-mutedGray flex items-center gap-1.5">
                        <Compass className="w-4 h-4 text-forest" />
                        Facing
                      </span>
                      <div className="font-bold text-base capitalize">{property.facing || 'East'}</div>
                    </div>
                    {property.plotDetails?.roadWidth && (
                      <div className="space-y-1">
                        <span className="text-xs text-mutedGray">Road Width</span>
                        <div className="font-bold text-base">{property.plotDetails.roadWidth} Feet</div>
                      </div>
                    )}
                    <div className="space-y-1">
                      <span className="text-xs text-mutedGray">Approval</span>
                      <div className="font-bold text-base text-emerald-700">HMDA / DTCP</div>
                    </div>
                  </>
                ) : (
                  <>
                    {property.bedrooms && (
                      <div className="space-y-1">
                        <span className="text-xs text-mutedGray flex items-center gap-1.5">
                          <Bed className="w-4 h-4 text-forest" />
                          Bedrooms
                        </span>
                        <div className="font-bold text-base">{property.bedrooms} BHK</div>
                      </div>
                    )}
                    {property.bathrooms && (
                      <div className="space-y-1">
                        <span className="text-xs text-mutedGray flex items-center gap-1.5">
                          <Bath className="w-4 h-4 text-forest" />
                          Bathrooms
                        </span>
                        <div className="font-bold text-base">{property.bathrooms} Baths</div>
                      </div>
                    )}
                    {property.facing && (
                      <div className="space-y-1">
                        <span className="text-xs text-mutedGray flex items-center gap-1.5">
                          <Compass className="w-4 h-4 text-forest" />
                          Facing
                        </span>
                        <div className="font-bold text-base capitalize">{property.facing}</div>
                      </div>
                    )}
                    {property.floor && (
                      <div className="space-y-1">
                        <span className="text-xs text-mutedGray flex items-center gap-1.5">
                          <Layers className="w-4 h-4 text-forest" />
                          Floor
                        </span>
                        <div className="font-bold text-base">
                          {property.floor} of {property.totalFloors || property.floor}
                        </div>
                      </div>
                    )}
                    {property.parking && (
                      <div className="space-y-1">
                        <span className="text-xs text-mutedGray flex items-center gap-1.5">
                          <Car className="w-4 h-4 text-forest" />
                          Parking
                        </span>
                        <div className="font-bold text-base">{property.parking} Covered</div>
                      </div>
                    )}
                    {property.furnishing && (
                      <div className="space-y-1">
                        <span className="text-xs text-mutedGray">Furnishing</span>
                        <div className="font-bold text-base capitalize">{property.furnishing}</div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-subtle">
              <h3 className="font-serif text-xl font-bold text-forest mb-4">About this Property</h3>
              <p className="text-charcoal/80 leading-relaxed font-light text-base mb-4">
                {property.description}
              </p>
              <p className="text-charcoal/80 leading-relaxed font-light text-base">
                Positioned in a premier micro-market with superb connectivity to the Outer Ring Road (ORR), regional expressways, and high-frequency transit lines. Ideal both for luxury lifestyle living and solid capital appreciation.
              </p>
            </div>

            {/* Plot/Land Specifications (conditional) */}
            {property.plotDetails && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-subtle">
                <h3 className="font-serif text-xl font-bold text-forest mb-4">Plot & Land Specifications</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                  {property.plotDetails.dimensions && (
                    <div className="p-3 rounded-xl bg-ivory-100">
                      <span className="text-xs text-mutedGray block">Dimensions</span>
                      <span className="font-semibold text-charcoal">{property.plotDetails.dimensions}</span>
                    </div>
                  )}
                  {property.plotDetails.roadWidth && (
                    <div className="p-3 rounded-xl bg-ivory-100">
                      <span className="text-xs text-mutedGray block">Road Width</span>
                      <span className="font-semibold text-charcoal">{property.plotDetails.roadWidth} Feet</span>
                    </div>
                  )}
                  {property.plotDetails.ownershipType && (
                    <div className="p-3 rounded-xl bg-ivory-100">
                      <span className="text-xs text-mutedGray block">Ownership</span>
                      <span className="font-semibold text-charcoal">{property.plotDetails.ownershipType}</span>
                    </div>
                  )}
                  {property.plotDetails.soilType && (
                    <div className="p-3 rounded-xl bg-ivory-100">
                      <span className="text-xs text-mutedGray block">Soil Type</span>
                      <span className="font-semibold text-charcoal">{property.plotDetails.soilType}</span>
                    </div>
                  )}
                  {property.plotDetails.irrigationDetails && (
                    <div className="p-3 rounded-xl bg-ivory-100 col-span-2">
                      <span className="text-xs text-mutedGray block">Water & Irrigation</span>
                      <span className="font-semibold text-charcoal">{property.plotDetails.irrigationDetails}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Amenities & Features */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-subtle">
              <h3 className="font-serif text-xl font-bold text-forest mb-6">Amenities & Infrastructure</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                {property.amenities.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-ivory-100 text-sm font-medium text-charcoal"
                  >
                    <CheckCircle2 className="w-4 h-4 text-forest shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Map Area */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-subtle">
              <h3 className="font-serif text-xl font-bold text-forest mb-2">Location & Neighborhood</h3>
              <p className="text-xs text-mutedGray mb-6">
                {property.location.address}, {property.location.locality}, {property.location.city}
              </p>

              {/* Styled Map Container */}
              <div className="relative aspect-[16/8] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 flex items-center justify-center text-center p-6">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-full bg-forest text-white flex items-center justify-center mx-auto shadow-md">
                    <MapPin className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal">{property.location.locality}, {property.location.city}</h4>
                    <p className="text-xs text-mutedGray max-w-sm mt-1">
                      Coordinates: {property.location.lat ?? 17.4}, {property.location.lng ?? 78.3}
                    </p>
                  </div>
                  <Button
                    to={`/map?lat=${property.location.lat || 17.4}&lng=${property.location.lng || 78.3}&zoom=14`}
                    variant="outline"
                    size="sm"
                  >
                    Open in Interactive Map Search
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Agent & Contact Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-floating">
              <span className="text-xs uppercase tracking-widest text-gold font-bold mb-3 block">
                Exclusive Listing Agent
              </span>

              {/* Agent Profile Box */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-neutral-100">
                <img
                  src={property.agent.photo}
                  alt={property.agent.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-forest"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-serif text-lg font-bold text-forest leading-tight">
                      {property.agent.name}
                    </h4>
                    {property.agent.isVerified && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                  </div>
                  <span className="text-xs text-mutedGray block">{property.agent.experience} Experience</span>
                  <Link
                    to={`/agent/${property.agent.id}`}
                    className="text-xs font-bold text-forest hover:text-gold uppercase tracking-wider inline-block mt-1"
                  >
                    View Agent Profile &rarr;
                  </Link>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <Button
                  onClick={() => setInquiryModalOpen(true)}
                  variant="primary"
                  size="md"
                  className="w-full"
                  leftIcon={<Mail className="w-4 h-4" />}
                >
                  Send Inquiry
                </Button>

                <Button
                  to={`/schedule-visit/${property.id}`}
                  variant="gold"
                  size="md"
                  className="w-full"
                  leftIcon={<Calendar className="w-4 h-4" />}
                >
                  Schedule Site Visit
                </Button>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <a
                    href={generateCallLink(property.agent.phone)}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-neutral-200 text-charcoal hover:bg-neutral-50 text-xs font-bold transition-colors"
                  >
                    <Phone className="w-4 h-4 text-forest" />
                    <span>Call Agent</span>
                  </a>
                  <a
                    href={generateWhatsAppLink(
                      property.agent.phone,
                      `Hello ${property.agent.name}, I am interested in "${property.title}" listed on Korutla Properties.`
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-ivory-100 border border-neutral-200/60 text-xs text-charcoal/70 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-forest">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Buyer Protection Guarantee</span>
                </div>
                <p className="font-light">
                  Direct communication. No spam calls. Your contact info is shared only with this verified agent.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties Section */}
        {relatedProperties.length > 0 && (
          <div className="mt-20 pt-16 border-t border-neutral-200">
            <SectionHeading
              title="Similar Properties You May Like"
              subtitle="Explore comparable homes and plots in the same neighborhood."
              viewAllLink="/buy"
              viewAllText="View All Properties"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedProperties.map((p, idx) => (
                <PropertyCard key={p.id} property={p} index={idx} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Image Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8">
            <div className="flex items-center justify-between text-white pb-4 border-b border-white/10">
              <span className="text-sm font-semibold">
                Photo {activeImageIndex + 1} of {property.images.length}
              </span>
              <button
                onClick={() => setLightboxOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                aria-label="Close fullscreen gallery"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="relative flex-1 flex items-center justify-center max-h-[80vh]">
              <button
                onClick={() =>
                  setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : property.images.length - 1))
                }
                className="absolute left-2 sm:left-6 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white cursor-pointer z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <img
                src={property.images[activeImageIndex]}
                alt={`Photo ${activeImageIndex + 1}`}
                className="max-w-full max-h-[75vh] object-contain rounded-xl"
              />

              <button
                onClick={() =>
                  setActiveImageIndex((prev) => (prev < property.images.length - 1 ? prev + 1 : 0))
                }
                className="absolute right-2 sm:right-6 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white cursor-pointer z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-10 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-gold' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Inquiry Modal */}
      <Modal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        title="Send Property Inquiry"
        size="md"
      >
        <form onSubmit={handleInquirySubmit} className="space-y-4">
          <p className="text-xs text-mutedGray">
            Inquire about <strong className="text-charcoal">{property.title}</strong> directly with agent{' '}
            <strong className="text-forest">{property.agent.name}</strong>.
          </p>

          <Input
            label="Full Name"
            required
            value={inquiryName}
            onChange={(e) => setInquiryName(e.target.value)}
            placeholder="Your name"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Phone Number"
              type="tel"
              required
              value={inquiryPhone}
              onChange={(e) => setInquiryPhone(e.target.value)}
              placeholder="+91 98765 43210"
            />
            <Input
              label="Email Address"
              type="email"
              value={inquiryEmail}
              onChange={(e) => setInquiryEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <Textarea
            label="Message"
            required
            value={inquiryMessage}
            onChange={(e) => setInquiryMessage(e.target.value)}
            rows={4}
          />

          <div className="pt-2 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              size="md"
              onClick={() => setInquiryModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              Submit Inquiry
            </Button>
          </div>
        </form>
      </Modal>

      {/* Mobile Sticky Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-200 p-3 sm:hidden shadow-floating flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-mutedGray block">Price</span>
          <span className="text-lg font-bold font-serif text-forest">{property.priceFormatted}</span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={generateWhatsAppLink(property.agent.phone)}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-emerald-600 text-white"
            title="WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
          <Button
            to={`/schedule-visit/${property.id}`}
            variant="gold"
            size="sm"
          >
            Schedule Visit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;

