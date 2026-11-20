import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Upload,
  X,
  MapPin,
  Home,
  IndianRupee,
  Image as ImageIcon,
  User,
  Eye,
  CheckCircle2,
  Building,
  Castle,
  Building2,
  ShieldCheck,
  Trees,
  Briefcase,
  Compass,
} from 'lucide-react';
import { PropertyCategory } from '../types/property';
import { formatPrice } from '../utils/format';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';

const DRAFT_KEY = 'korutla_properties_sell_draft';

export const SellPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();

  // Redirect to sign-in if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/signin?redirect=/sell" replace />;
  }

  const steps = [
    'Purpose',
    'Category',
    'Location',
    'Details',
    'Pricing',
    'Photos',
    'Contact',
    'Preview',
    'Submit',
  ];

  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [listingPurpose, setListingPurpose] = useState<'sale' | 'rent'>('sale');
  const [propertyCategory, setPropertyCategory] = useState<PropertyCategory>('villa');

  // Location
  const [state, setState] = useState('Telangana');
  const [city, setCity] = useState('Korutla');
  const [locality, setLocality] = useState('Korutla Town');
  const [address, setAddress] = useState('');

  // Details
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bedrooms, setBedrooms] = useState('3');
  const [bathrooms, setBathrooms] = useState('3');
  const [area, setArea] = useState('2400');
  const [areaUnit, setAreaUnit] = useState('sqft');
  const [facing, setFacing] = useState('east');
  const [floor, setFloor] = useState('5');
  const [totalFloors, setTotalFloors] = useState('18');
  const [furnishing, setFurnishing] = useState('semi-furnished');
  const [parking, setParking] = useState('2');
  const [amenities, setAmenities] = useState<string[]>([
    'Clubhouse',
    'Swimming Pool',
    'Power Backup',
    '24/7 Security',
  ]);

  // Land specific details
  const [dimensions, setDimensions] = useState('40 x 60 ft');
  const [roadWidth, setRoadWidth] = useState('40');
  const [layoutApproval, setLayoutApproval] = useState(true);
  const [cornerPlot, setCornerPlot] = useState(false);
  const [boundaryWall, setBoundaryWall] = useState(true);
  const [waterAvailable, setWaterAvailable] = useState(true);
  const [electricityAvailable, setElectricityAvailable] = useState(true);

  // Pricing
  const [price, setPrice] = useState('18500000');
  const [rentPrice, setRentPrice] = useState('45000');
  const [deposit, setDeposit] = useState('90000');
  const [isNegotiable, setIsNegotiable] = useState(true);

  // Photos
  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80',
  ]);

  // Contact
  const [sellerName, setSellerName] = useState('Vinay Kumar');
  const [sellerPhone, setSellerPhone] = useState('+91 98765 43210');
  const [sellerEmail, setSellerEmail] = useState('vinay@example.com');
  const [preferredContact, setPreferredContact] = useState('whatsapp');

  const [submittedPropertyId, setSubmittedPropertyId] = useState('');

  const isPlot = [
    'residential-plot',
    'open-plot',
    'apartment-development-plot',
    'commercial-plot',
    'farm-land',
    'agricultural-land',
  ].includes(propertyCategory);

  const handleNext = () => {
    if (currentStep === 3 && (!locality || !city)) {
      addToast('Please enter your city and locality', 'error');
      return;
    }
    if (currentStep === 4 && (!title || !description)) {
      addToast('Please enter property title and description', 'error');
      return;
    }
    if (currentStep === 7 && (!sellerName || !sellerPhone)) {
      addToast('Please provide your name and phone number', 'error');
      return;
    }

    if (currentStep === 8) {
      // Submit action
      const newId = `prop-${Date.now()}`;
      setSubmittedPropertyId(newId);
      setCurrentStep(9);
      addToast('Property listing created successfully!', 'success');
      return;
    }

    setCurrentStep((prev) => Math.min(steps.length, prev + 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const saveDraft = () => {
    const draftData = {
      title,
      description,
      price,
      locality,
      propertyCategory,
      listingPurpose,
    };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draftData));
    addToast('Listing progress saved to draft!', 'info');
  };

  const toggleAmenity = (name: string) => {
    setAmenities((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
    );
  };

  const addSimulatedPhoto = () => {
    const samplePhotos = [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
      'https://images.unsplash.com/photo-1560440021016-11148af33886?w=1200&q=80',
    ];
    const nextPhoto = samplePhotos[photos.length % samplePhotos.length];
    setPhotos((prev) => [...prev, nextPhoto]);
    addToast('Photo uploaded successfully', 'success');
  };

  const removePhoto = (idx: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="pt-24 pb-24">
      {/* Hero Bar */}
      <div className="bg-forest text-white py-10 md:py-14 mb-10 border-b border-forest-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold mb-1 block">
              Direct Owner & Developer Portal
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
              List Your Property on Korutla Properties
            </h1>
            <p className="text-xs sm:text-sm text-ivory-300 font-light mt-1">
              Reach thousands of high-intent buyers, NRIs, and tenants with verified prominence.
            </p>
          </div>

          {currentStep < 9 && (
            <Button
              onClick={saveDraft}
              variant="outline"
              size="sm"
              className="border-white/30 text-white hover:bg-white/10 shrink-0"
            >
              Save Draft
            </Button>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Progress Bar */}
        {currentStep < 9 && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3 overflow-x-auto pb-2 scrollbar-none">
              {steps.slice(0, 8).map((stepName, i) => {
                const stepNum = i + 1;
                const isCurrent = currentStep === stepNum;
                const isDone = currentStep > stepNum;

                return (
                  <div
                    key={stepName}
                    onClick={() => {
                      if (isDone) setCurrentStep(stepNum);
                    }}
                    className={`flex items-center gap-2 cursor-pointer shrink-0 ${
                      isDone ? 'cursor-pointer' : ''
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                        isCurrent
                          ? 'bg-gold text-white ring-4 ring-gold/20'
                          : isDone
                          ? 'bg-forest text-white'
                          : 'bg-neutral-200 text-mutedGray'
                      }`}
                    >
                      {isDone ? <Check className="w-3.5 h-3.5" /> : stepNum}
                    </div>
                    <span
                      className={`text-xs font-semibold hidden md:inline ${
                        isCurrent ? 'text-forest font-bold' : isDone ? 'text-charcoal' : 'text-mutedGray'
                      }`}
                    >
                      {stepName}
                    </span>
                    {i < 7 && <div className="w-6 h-0.5 bg-neutral-200 mx-2 hidden sm:block" />}
                  </div>
                );
              })}
            </div>
            {/* Progress bar line */}
            <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gold h-full transition-all duration-300"
                style={{ width: `${(currentStep / 8) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Wizard Step Forms Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/80 shadow-subtle">
          <AnimatePresence mode="wait">
            {/* STEP 1: PURPOSE */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest mb-2">
                    What is your listing purpose?
                  </h2>
                  <p className="text-sm text-mutedGray font-light">
                    Select whether you want to sell your asset or put it up for monthly rental lease.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div
                    onClick={() => setListingPurpose('sale')}
                    className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      listingPurpose === 'sale'
                        ? 'border-forest bg-forest/5 shadow-sm'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-forest text-white flex items-center justify-center mb-4">
                        <Home className="w-6 h-6 text-gold" />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-forest mb-1">
                        Sell Property
                      </h3>
                      <p className="text-xs text-mutedGray leading-relaxed font-light">
                        Find verified direct buyers for villas, apartments, independent houses, open plots, and farm lands.
                      </p>
                    </div>
                    <div className="mt-6 flex items-center gap-1 text-xs font-bold text-forest">
                      <span>Selected</span>
                      <Check className="w-4 h-4 text-gold" />
                    </div>
                  </div>

                  <div
                    onClick={() => setListingPurpose('rent')}
                    className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      listingPurpose === 'rent'
                        ? 'border-forest bg-forest/5 shadow-sm'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-forest text-white flex items-center justify-center mb-4">
                        <Building2 className="w-6 h-6 text-gold" />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-forest mb-1">
                        Rent Property
                      </h3>
                      <p className="text-xs text-mutedGray leading-relaxed font-light">
                        Lease out your apartment, standalone house, or commercial office to verified tenants.
                      </p>
                    </div>
                    <div className="mt-6 flex items-center gap-1 text-xs font-bold text-forest">
                      <span>{listingPurpose === 'rent' ? 'Selected' : 'Select'}</span>
                      {listingPurpose === 'rent' && <Check className="w-4 h-4 text-gold" />}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: CATEGORY */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest mb-2">
                    What category best describes your property?
                  </h2>
                  <p className="text-sm text-mutedGray font-light">
                    Accurate categorization ensures your listing shows up in front of high-intent searchers.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
                  {[
                    { id: 'villa', label: 'Luxury Villa', icon: <Castle className="w-4 h-4" /> },
                    { id: 'apartment', label: 'Apartment / Flat', icon: <Building2 className="w-4 h-4" /> },
                    { id: 'gated-community-apartment', label: 'Gated Apartment', icon: <ShieldCheck className="w-4 h-4" /> },
                    { id: 'independent-house', label: 'Independent House', icon: <Home className="w-4 h-4" /> },
                    { id: 'home', label: 'Duplex Home', icon: <Home className="w-4 h-4" /> },
                    { id: 'residential-plot', label: 'Residential Plot', icon: <Compass className="w-4 h-4" /> },
                    { id: 'open-plot', label: 'Open Plot', icon: <Compass className="w-4 h-4" /> },
                    { id: 'apartment-development-plot', label: 'Development Plot', icon: <Building className="w-4 h-4" /> },
                    { id: 'commercial-property', label: 'Commercial Space', icon: <Briefcase className="w-4 h-4" /> },
                    { id: 'commercial-plot', label: 'Commercial Plot', icon: <Compass className="w-4 h-4" /> },
                    { id: 'farm-land', label: 'Farm Land', icon: <Trees className="w-4 h-4" /> },
                    { id: 'agricultural-land', label: 'Agricultural Land', icon: <Trees className="w-4 h-4" /> },
                  ].map((cat) => {
                    const isSelected = propertyCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setPropertyCategory(cat.id as PropertyCategory)}
                        className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'border-forest bg-forest text-white shadow-sm'
                            : 'border-neutral-200 bg-ivory-100 text-charcoal hover:border-forest/40'
                        }`}
                      >
                        <div className={`p-2 rounded-xl mb-3 w-fit ${isSelected ? 'bg-white/20 text-gold' : 'bg-white text-forest'}`}>
                          {cat.icon}
                        </div>
                        <span className="text-xs font-bold leading-snug">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 3: LOCATION */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest mb-2">
                    Where is your property located?
                  </h2>
                  <p className="text-sm text-mutedGray font-light">
                    Specify city, micro-market, and precise address for verification and map indexing.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="Telangana">Telangana</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                  </Select>

                  <Select
                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value="Korutla">Korutla</option>
                    <option value="Jagtial">Jagtial</option>
                    <option value="Karimnagar">Karimnagar</option>
                    <option value="Hyderabad">Hyderabad</option>
                  </Select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Locality / Neighborhood"
                    required
                    placeholder="e.g. Korutla Town, Dharmapuri, Raikal"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                  />
                  <Input
                    label="Pincode"
                    placeholder="e.g. 500075"
                  />
                </div>

                <Textarea
                  label="Complete Address / Project Landmark"
                  placeholder="e.g. Villa 42, Golden Mile Boulevard, Near Exit 1 ORR"
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </motion.div>
            )}

            {/* STEP 4: PROPERTY DETAILS */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest mb-2">
                    Property Details & Specifications
                  </h2>
                  <p className="text-sm text-mutedGray font-light">
                    Provide title, description, dimensions, and amenities.
                  </p>
                </div>

                <Input
                  label="Property Headline Title"
                  required
                  placeholder="e.g. 4 BHK Contemporary Triplex Villa with Private Garden"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <Textarea
                  label="Detailed Property Description"
                  required
                  placeholder="Describe key features, architectural highlights, neighborhood advantages, and unique selling points..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                {/* Conditional Fields based on whether property is Land/Plot or Residential Building */}
                {isPlot ? (
                  <div className="p-5 rounded-2xl bg-ivory-100 border border-neutral-200/80 space-y-4">
                    <h4 className="font-serif text-base font-bold text-forest">
                      Plot & Land Dimensions
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Input
                        label="Plot Area"
                        type="number"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                      />
                      <Select
                        label="Area Unit"
                        value={areaUnit}
                        onChange={(e) => setAreaUnit(e.target.value)}
                      >
                        <option value="sqyd">Square Yards (Sq.Yd)</option>
                        <option value="sqft">Square Feet (Sq.Ft)</option>
                        <option value="acres">Acres</option>
                        <option value="guntas">Guntas</option>
                      </Select>
                      <Input
                        label="Road Width (Feet)"
                        type="number"
                        value={roadWidth}
                        onChange={(e) => setRoadWidth(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                        <input
                          type="checkbox"
                          checked={layoutApproval}
                          onChange={(e) => setLayoutApproval(e.target.checked)}
                          className="rounded text-forest"
                        />
                        <span>HMDA / DTCP Approved</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                        <input
                          type="checkbox"
                          checked={cornerPlot}
                          onChange={(e) => setCornerPlot(e.target.checked)}
                          className="rounded text-forest"
                        />
                        <span>Corner Plot</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                        <input
                          type="checkbox"
                          checked={boundaryWall}
                          onChange={(e) => setBoundaryWall(e.target.checked)}
                          className="rounded text-forest"
                        />
                        <span>Boundary Wall</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                        <input
                          type="checkbox"
                          checked={waterAvailable}
                          onChange={(e) => setWaterAvailable(e.target.checked)}
                          className="rounded text-forest"
                        />
                        <span>Sweet Water / Borewell</span>
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <Select
                        label="Bedrooms (BHK)"
                        value={bedrooms}
                        onChange={(e) => setBedrooms(e.target.value)}
                      >
                        <option value="1">1 BHK</option>
                        <option value="2">2 BHK</option>
                        <option value="3">3 BHK</option>
                        <option value="4">4 BHK</option>
                        <option value="5">5+ BHK</option>
                      </Select>

                      <Select
                        label="Bathrooms"
                        value={bathrooms}
                        onChange={(e) => setBathrooms(e.target.value)}
                      >
                        <option value="1">1 Bath</option>
                        <option value="2">2 Baths</option>
                        <option value="3">3 Baths</option>
                        <option value="4">4 Baths</option>
                        <option value="5">5+ Baths</option>
                      </Select>

                      <Input
                        label="Super Area (Sq.Ft)"
                        type="number"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                      />

                      <Select
                        label="Facing"
                        value={facing}
                        onChange={(e) => setFacing(e.target.value)}
                      >
                        <option value="east">East</option>
                        <option value="north">North</option>
                        <option value="north-east">North-East</option>
                        <option value="west">West</option>
                        <option value="south">South</option>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Select
                        label="Furnishing Status"
                        value={furnishing}
                        onChange={(e) => setFurnishing(e.target.value)}
                      >
                        <option value="furnished">Furnished</option>
                        <option value="semi-furnished">Semi-Furnished</option>
                        <option value="unfurnished">Unfurnished</option>
                      </Select>

                      <Input
                        label="Floor Number"
                        type="number"
                        value={floor}
                        onChange={(e) => setFloor(e.target.value)}
                      />

                      <Input
                        label="Total Floors in Building"
                        type="number"
                        value={totalFloors}
                        onChange={(e) => setTotalFloors(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* Amenities Selection */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-charcoal mb-2.5 block">
                    Key Amenities Included
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {[
                      'Clubhouse',
                      'Swimming Pool',
                      'Gymnasium',
                      'Power Backup',
                      '24/7 Security',
                      'Covered Car Parking',
                      'Children Play Area',
                      'Private Garden',
                      'Solar Geyser',
                      'EV Charging',
                      'Rainwater Harvesting',
                      'Piped Gas',
                    ].map((item) => {
                      const isSelected = amenities.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleAmenity(item)}
                          className={`p-2.5 rounded-xl text-xs font-semibold border text-left transition-colors cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-forest/10 border-forest text-forest'
                              : 'bg-white border-neutral-200 text-charcoal/80 hover:border-forest/50'
                          }`}
                        >
                          <span>{item}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-forest" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 5: PRICING */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest mb-2">
                    Set Your Pricing
                  </h2>
                  <p className="text-sm text-mutedGray font-light">
                    Transparent and realistic pricing attracts faster inquiries.
                  </p>
                </div>

                {listingPurpose === 'sale' ? (
                  <div className="space-y-4">
                    <Input
                      label="Expected Total Sale Price (in INR)"
                      type="number"
                      required
                      placeholder="e.g. 18500000"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      leftIcon={<IndianRupee className="w-4 h-4" />}
                    />
                    <div className="p-4 rounded-xl bg-ivory-100 flex items-center justify-between border border-neutral-200">
                      <span className="text-xs text-mutedGray">Formatted Price Display:</span>
                      <span className="font-serif text-2xl font-bold text-forest">
                        {formatPrice(Number(price) || 0)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Monthly Rent (INR)"
                      type="number"
                      required
                      value={rentPrice}
                      onChange={(e) => setRentPrice(e.target.value)}
                      leftIcon={<IndianRupee className="w-4 h-4" />}
                    />
                    <Input
                      label="Security Deposit (INR)"
                      type="number"
                      value={deposit}
                      onChange={(e) => setDeposit(e.target.value)}
                      leftIcon={<IndianRupee className="w-4 h-4" />}
                    />
                  </div>
                )}

                <label className="flex items-center gap-3 cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    checked={isNegotiable}
                    onChange={(e) => setIsNegotiable(e.target.checked)}
                    className="w-4 h-4 rounded text-forest focus:ring-forest"
                  />
                  <span className="text-sm font-semibold text-charcoal">
                    Price is slightly negotiable for serious buyers
                  </span>
                </label>
              </motion.div>
            )}

            {/* STEP 6: PHOTOS */}
            {currentStep === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest mb-2">
                    Upload Property Photographs
                  </h2>
                  <p className="text-sm text-mutedGray font-light">
                    High quality photos increase buyer inquiries by over 300%. Add at least 3 photos.
                  </p>
                </div>

                {/* Upload Drag & Drop Simulated Box */}
                <div
                  onClick={addSimulatedPhoto}
                  className="border-2 border-dashed border-neutral-300 rounded-3xl p-8 text-center bg-ivory-50/60 hover:bg-ivory-100/80 transition-colors cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-2xl bg-forest/5 flex items-center justify-center text-forest mx-auto mb-3">
                    <Upload className="w-6 h-6 text-gold" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-forest mb-1">
                    Click to Upload Sample Property Image
                  </h4>
                  <p className="text-xs text-mutedGray font-light max-w-sm mx-auto">
                    Supports high-resolution JPG, PNG, WEBP. First image will be used as the hero cover photo.
                  </p>
                </div>

                {/* Photo Previews */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-charcoal mb-3 block">
                    Uploaded Photos ({photos.length})
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {photos.map((src, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-[16/10] rounded-xl overflow-hidden border border-neutral-200 group"
                      >
                        <img src={src} alt="Uploaded" className="w-full h-full object-cover" />
                        {idx === 0 && (
                          <span className="absolute top-2 left-2 bg-gold text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                            Cover Photo
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => removePhoto(idx)}
                          className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white hover:bg-black/80 cursor-pointer"
                          title="Remove image"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 7: CONTACT */}
            {currentStep === 7 && (
              <motion.div
                key="step7"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest mb-2">
                    Your Contact Details
                  </h2>
                  <p className="text-sm text-mutedGray font-light">
                    Interested buyers will reach out to you directly through these contact channels.
                  </p>
                </div>

                <Input
                  label="Your Full Name"
                  required
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Phone Number (for Calls & WhatsApp)"
                    type="tel"
                    required
                    value={sellerPhone}
                    onChange={(e) => setSellerPhone(e.target.value)}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    required
                    value={sellerEmail}
                    onChange={(e) => setSellerEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-charcoal mb-2 block">
                    Preferred Contact Method
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'whatsapp', label: 'WhatsApp Only' },
                      { id: 'phone', label: 'Phone Call Only' },
                      { id: 'both', label: 'Both WhatsApp & Call' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPreferredContact(opt.id)}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          preferredContact === opt.id
                            ? 'bg-forest text-white border-forest'
                            : 'bg-ivory-100 text-charcoal border-neutral-200 hover:border-forest'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 8: PREVIEW */}
            {currentStep === 8 && (
              <motion.div
                key="step8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest mb-2">
                    Review Your Listing
                  </h2>
                  <p className="text-sm text-mutedGray font-light">
                    This is how your property card and listing will be presented to buyers across Telangana.
                  </p>
                </div>

                {/* Live Preview Card */}
                <div className="bg-ivory-50 rounded-3xl p-6 border border-neutral-200">
                  <div className="max-w-md mx-auto bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-card">
                    <div className="relative aspect-[16/10] bg-neutral-900">
                      <img
                        src={photos[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="bg-forest text-white text-[11px] font-bold px-2 py-0.5 rounded">
                          For {listingPurpose === 'sale' ? 'Sale' : 'Rent'}
                        </span>
                        <span className="bg-white/90 text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded">
                          Verified
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 text-white">
                        <span className="font-serif text-2xl font-bold drop-shadow">
                          {listingPurpose === 'sale'
                            ? formatPrice(Number(price) || 0)
                            : `₹${Number(rentPrice).toLocaleString('en-IN')}/mo`}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <h4 className="font-bold text-base text-forest">
                        {title || 'Luxury Modern Property'}
                      </h4>
                      <p className="text-xs text-mutedGray flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-forest" />
                        {locality}, {city}
                      </p>
                      <p className="text-xs text-charcoal/70 line-clamp-2">
                        {description || 'Exceptional property in prime growth corridor.'}
                      </p>

                      <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-mutedGray">
                        <span>{area} {areaUnit}</span>
                        <span>{sellerName}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 9: SUBMIT SUCCESS */}
            {currentStep === 9 && (
              <motion.div
                key="step9"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-12 text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2 max-w-lg mx-auto">
                  <h2 className="font-serif text-3xl font-bold text-forest">
                    Property Listed Successfully!
                  </h2>
                  <p className="text-sm text-mutedGray font-light leading-relaxed">
                    Your property listing has been recorded and is now undergoing instant title and document check. Reference ID: <strong className="text-forest">{submittedPropertyId}</strong>.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <Button to="/dashboard/properties" variant="primary" size="md">
                    Go to My Dashboard
                  </Button>
                  <Button
                    onClick={() => {
                      setCurrentStep(1);
                      setTitle('');
                      setDescription('');
                    }}
                    variant="outline"
                    size="md"
                  >
                    List Another Property
                  </Button>
                  <Button to="/" variant="ghost" size="md">
                    Return to Homepage
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls (Steps 1 to 8) */}
          {currentStep < 9 && (
            <div className="pt-8 mt-8 border-t border-neutral-100 flex items-center justify-between">
              {currentStep > 1 ? (
                <Button
                  onClick={handleBack}
                  variant="secondary"
                  size="md"
                  leftIcon={<ChevronLeft className="w-4 h-4" />}
                >
                  Previous
                </Button>
              ) : (
                <div />
              )}

              <Button
                onClick={handleNext}
                variant={currentStep === 8 ? 'gold' : 'primary'}
                size="md"
                rightIcon={<ChevronRight className="w-4 h-4" />}
              >
                {currentStep === 8 ? 'Submit Property Listing' : 'Next Step'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellPage;

