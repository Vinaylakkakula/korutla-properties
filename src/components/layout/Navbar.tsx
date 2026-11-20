import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Heart,
  ChevronDown,
  User as UserIcon,
  PlusCircle,
  Home,
  Building,
  Castle,
  Building2,
  Trees,
  Briefcase,
  MapPin,
  Compass,
} from 'lucide-react';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import { useFavorites } from '../../context/FavoritesContext';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [buyDropdownOpen, setBuyDropdownOpen] = useState(false);
  const [plotsDropdownOpen, setPlotsDropdownOpen] = useState(false);
  const location = useLocation();
  const { favorites } = useFavorites();
  const { user, isAuthenticated } = useAuth();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setBuyDropdownOpen(false);
    setPlotsDropdownOpen(false);
  }, [location.pathname]);

  const navBackground = isHome
    ? isScrolled
      ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100 py-3.5 text-charcoal'
      : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent py-5 text-white'
    : 'bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100 py-3.5 text-charcoal';

  const linkTextColor = isHome && !isScrolled ? 'text-white/90 hover:text-white' : 'text-charcoal/80 hover:text-forest';
  const logoVariant = isHome && !isScrolled ? 'light' : 'dark';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${navBackground}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Logo variant={logoVariant} />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold tracking-wide">
            <Link
              to="/"
              className={`transition-colors ${linkTextColor} ${
                location.pathname === '/' ? 'text-gold font-bold' : ''
              }`}
            >
              Home
            </Link>

            {/* Buy Dropdown */}
            <div
              className="relative group py-2"
              onMouseEnter={() => setBuyDropdownOpen(true)}
              onMouseLeave={() => setBuyDropdownOpen(false)}
            >
              <Link
                to="/buy"
                className={`flex items-center gap-1 transition-colors ${linkTextColor} ${
                  location.pathname === '/buy' ? 'text-gold font-bold' : ''
                }`}
              >
                <span>Buy</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
              </Link>

              <AnimatePresence>
                {buyDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-floating border border-neutral-100 p-2.5 text-charcoal"
                  >
                    <Link
                      to="/buy?type=villa"
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-forest/5 text-xs font-semibold text-charcoal hover:text-forest transition-colors"
                    >
                      <Castle className="w-4 h-4 text-forest" />
                      <div>
                        <div>Luxury Villas</div>
                        <span className="text-[10px] text-mutedGray font-normal">Venkateshwara Colony & Shivaji Nagar</span>
                      </div>
                    </Link>
                    <Link
                      to="/buy?type=apartment"
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-forest/5 text-xs font-semibold text-charcoal hover:text-forest transition-colors"
                    >
                      <Building2 className="w-4 h-4 text-forest" />
                      <div>
                        <div>Apartments & Flats</div>
                        <span className="text-[10px] text-mutedGray font-normal">Gandhi Nagar & Metpally Road</span>
                      </div>
                    </Link>
                    <Link
                      to="/buy?type=independent-house"
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-forest/5 text-xs font-semibold text-charcoal hover:text-forest transition-colors"
                    >
                      <Home className="w-4 h-4 text-forest" />
                      <div>
                        <div>Independent Houses</div>
                        <span className="text-[10px] text-mutedGray font-normal">Korutla Town & Subash Nagar</span>
                      </div>
                    </Link>
                    <div className="pt-2 mt-1 border-t border-neutral-100">
                      <Link
                        to="/buy"
                        className="block text-center text-xs font-bold text-forest hover:text-gold uppercase tracking-wider py-1"
                      >
                        View All Properties &rarr;
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/rent"
              className={`transition-colors ${linkTextColor} ${
                location.pathname === '/rent' ? 'text-gold font-bold' : ''
              }`}
            >
              Rent
            </Link>

            <Link
              to="/apartments"
              className={`transition-colors ${linkTextColor} ${
                location.pathname === '/apartments' ? 'text-gold font-bold' : ''
              }`}
            >
              Apartments
            </Link>

            {/* Plots Dropdown */}
            <div
              className="relative group py-2"
              onMouseEnter={() => setPlotsDropdownOpen(true)}
              onMouseLeave={() => setPlotsDropdownOpen(false)}
            >
              <Link
                to="/plots"
                className={`flex items-center gap-1 transition-colors ${linkTextColor} ${
                  location.pathname === '/plots' ? 'text-gold font-bold' : ''
                }`}
              >
                <span>Plots & Land</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
              </Link>

              <AnimatePresence>
                {plotsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-floating border border-neutral-100 p-2.5 text-charcoal"
                  >
                    <Link
                      to="/plots?type=residential-plot"
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-forest/5 text-xs font-semibold text-charcoal hover:text-forest transition-colors"
                    >
                      <MapPin className="w-4 h-4 text-forest" />
                      <div>
                        <div>Residential Plots</div>
                        <span className="text-[10px] text-mutedGray font-normal">DTCP & Layout Approved</span>
                      </div>
                    </Link>
                    <Link
                      to="/plots?type=open-plot"
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-forest/5 text-xs font-semibold text-charcoal hover:text-forest transition-colors"
                    >
                      <Compass className="w-4 h-4 text-forest" />
                      <div>
                        <div>Open Plots</div>
                        <span className="text-[10px] text-mutedGray font-normal">Raikal Road & Jagtial Bypass</span>
                      </div>
                    </Link>
                    <Link
                      to="/plots?type=apartment-development-plot"
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-forest/5 text-xs font-semibold text-charcoal hover:text-forest transition-colors"
                    >
                      <Building className="w-4 h-4 text-forest" />
                      <div>
                        <div>Development Plots</div>
                        <span className="text-[10px] text-mutedGray font-normal">Ailapur Corridor & Town Plots</span>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/commercial"
              className={`transition-colors ${linkTextColor} ${
                location.pathname === '/commercial' ? 'text-gold font-bold' : ''
              }`}
            >
              Commercial
            </Link>

            <Link
              to="/farm-land"
              className={`transition-colors ${linkTextColor} ${
                location.pathname === '/farm-land' ? 'text-gold font-bold' : ''
              }`}
            >
              Farm Land
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Saved Properties */}
            <Link
              to="/saved"
              className={`relative p-2 rounded-full transition-colors ${
                isHome && !isScrolled
                  ? 'hover:bg-white/10 text-white'
                  : 'hover:bg-neutral-100 text-charcoal'
              }`}
              title="Saved Properties"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* User Profile / Sign In */}
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-neutral-100 transition-colors"
              >
                <img
                  src={user?.photo || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&q=80'}
                  alt={user?.name || 'Account'}
                  className="w-8 h-8 rounded-full object-cover border border-gold"
                />
              </Link>
            ) : (
              <Link
                to="/signin"
                className={`text-sm font-semibold transition-colors ${linkTextColor}`}
              >
                Sign In
              </Link>
            )}

            {/* List Your Property CTA */}
            <Button
              to={isAuthenticated ? '/sell' : '/signin?redirect=/sell'}
              variant={isHome && !isScrolled ? 'gold' : 'primary'}
              size="sm"
              leftIcon={<PlusCircle className="w-4 h-4" />}
            >
              List Property
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link to="/saved" className="relative p-2" title="Saved Properties">
              <Heart className={`w-5 h-5 ${isHome && !isScrolled ? 'text-white' : 'text-charcoal'}`} />
              {favorites.length > 0 && (
                <span className="absolute 0 right-0 w-4 h-4 bg-gold text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isHome && !isScrolled ? 'text-white hover:bg-white/10' : 'text-charcoal hover:bg-neutral-100'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-white lg:hidden flex flex-col justify-between overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
                <Logo variant="dark" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-charcoal hover:bg-neutral-100"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation list */}
              <div className="flex flex-col gap-4 py-6 text-base font-semibold text-charcoal">
                <Link
                  to="/"
                  className="flex items-center gap-3 py-2 text-forest hover:text-gold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Home className="w-5 h-5" />
                  Home
                </Link>
                <Link
                  to="/buy"
                  className="flex items-center gap-3 py-2 text-forest hover:text-gold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Castle className="w-5 h-5" />
                  Buy Properties
                </Link>
                <Link
                  to="/rent"
                  className="flex items-center gap-3 py-2 text-forest hover:text-gold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Building2 className="w-5 h-5" />
                  Rent Properties
                </Link>
                <Link
                  to="/apartments"
                  className="flex items-center gap-3 py-2 text-forest hover:text-gold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Building className="w-5 h-5" />
                  Apartments
                </Link>
                <Link
                  to="/plots"
                  className="flex items-center gap-3 py-2 text-forest hover:text-gold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Compass className="w-5 h-5" />
                  Plots & Land
                </Link>
                <Link
                  to="/commercial"
                  className="flex items-center gap-3 py-2 text-forest hover:text-gold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Briefcase className="w-5 h-5" />
                  Commercial
                </Link>
                <Link
                  to="/farm-land"
                  className="flex items-center gap-3 py-2 text-forest hover:text-gold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Trees className="w-5 h-5" />
                  Farm Land
                </Link>
                <Link
                  to="/locations"
                  className="flex items-center gap-3 py-2 text-forest hover:text-gold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <MapPin className="w-5 h-5" />
                  Explore Locations
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 py-2 text-forest hover:text-gold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <UserIcon className="w-5 h-5" />
                  Dashboard
                </Link>
              </div>
            </div>

            <div className="p-6 border-t border-neutral-100 bg-ivory-100 flex flex-col gap-3">
              <Button
                to={isAuthenticated ? '/sell' : '/signin?redirect=/sell'}
                variant="primary"
                size="md"
                className="w-full"
                leftIcon={<PlusCircle className="w-4 h-4" />}
                onClick={() => setMobileMenuOpen(false)}
              >
                List Your Property
              </Button>
              {isAuthenticated ? (
                <Button
                  to="/dashboard"
                  variant="outline"
                  size="md"
                  className="w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Dashboard
                </Button>
              ) : (
                <Button
                  to="/signin"
                  variant="outline"
                  size="md"
                  className="w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In / Sign Up
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

