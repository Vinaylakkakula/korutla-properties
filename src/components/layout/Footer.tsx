import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import Logo from '../ui/Logo';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useToast();
  const { isAuthenticated } = useAuth();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    addToast('Thank you for subscribing to Korutla Properties newsletter!', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-deep text-ivory-200 border-t border-forest-800">
      {/* Top Banner / Newsletter */}
      <div className="border-b border-white/10 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-forest-800/60 rounded-3xl p-8 sm:p-12 border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8 backdrop-blur-sm">
            <div className="max-w-xl text-center lg:text-left">
              <span className="text-xs uppercase tracking-widest text-gold font-bold mb-2 block">
                Exclusive Updates
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                Stay Ahead of Telangana's Property Market
              </h3>
              <p className="text-sm text-ivory-300 leading-relaxed">
                Receive weekly off-market deals, HMDA pre-launch layouts, and high-appreciation investment insights.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 max-w-md"
            >
              {subscribed ? (
                <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 px-6 py-3.5 rounded-xl text-sm font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Subscribed Successfully</span>
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-ivory-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent flex-1"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-gold hover:bg-gold-dark text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-sm hover:shadow active:scale-95 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="col-span-2 space-y-5">
            <Logo variant="light" />
            <p className="text-sm text-ivory-300 max-w-sm leading-relaxed">
              Find a place. Build your future. Korutla Properties is Korutla and Jagtial district's premier digital real estate marketplace connecting buyers, investors, and developers with verified properties.
            </p>

            <div className="space-y-2.5 text-xs text-ivory-300 pt-2">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gold shrink-0" />
                <span>Main Road, Korutla, Jagtial District, Telangana 505326</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>+91 98765 43210 / +91 40 2938 4721</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>contact@korutlaproperties.com</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold flex items-center justify-center text-white transition-colors text-xs font-bold"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold flex items-center justify-center text-white transition-colors text-xs font-bold"
                aria-label="LinkedIn"
              >
                IN
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold flex items-center justify-center text-white transition-colors text-xs font-bold"
                aria-label="Twitter"
              >
                X
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold flex items-center justify-center text-white transition-colors text-xs font-bold"
                aria-label="YouTube"
              >
                YT
              </a>
            </div>
          </div>

          {/* Explore Properties */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold font-bold mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-ivory-300">
              <li>
                <Link to="/buy" className="hover:text-white transition-colors">
                  Buy Properties
                </Link>
              </li>
              <li>
                <Link to="/rent" className="hover:text-white transition-colors">
                  Rent Properties
                </Link>
              </li>
              <li>
                <Link to="/apartments" className="hover:text-white transition-colors">
                  Apartments & Flats
                </Link>
              </li>
              <li>
                <Link to="/buy?type=villa" className="hover:text-white transition-colors">
                  Luxury Villas
                </Link>
              </li>
              <li>
                <Link to="/plots" className="hover:text-white transition-colors">
                  Plots & Land
                </Link>
              </li>
              <li>
                <Link to="/commercial" className="hover:text-white transition-colors">
                  Commercial Space
                </Link>
              </li>
              <li>
                <Link to="/farm-land" className="hover:text-white transition-colors">
                  Farm Lands
                </Link>
              </li>
              <li>
                <Link
                  to={isAuthenticated ? '/sell' : '/signin?redirect=/sell'}
                  className="text-gold font-semibold hover:underline"
                >
                  List Your Property &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Locations */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold font-bold mb-4">
              Top Locations
            </h4>
            <ul className="space-y-2.5 text-xs text-ivory-300">
              <li>
                <Link to="/locations/korutla" className="hover:text-white transition-colors">
                  Korutla
                </Link>
              </li>
              <li>
                <Link to="/buy?locality=Korutla Town" className="hover:text-white transition-colors">
                  Korutla Town
                </Link>
              </li>
              <li>
                <Link to="/buy?locality=Dharmapuri" className="hover:text-white transition-colors">
                  Dharmapuri
                </Link>
              </li>
              <li>
                <Link to="/buy?locality=Raikal" className="hover:text-white transition-colors">
                  Raikal
                </Link>
              </li>
              <li>
                <Link to="/buy?locality=Metpally" className="hover:text-white transition-colors">
                  Metpally
                </Link>
              </li>
              <li>
                <Link to="/buy?locality=Jagtial" className="hover:text-white transition-colors">
                  Jagtial
                </Link>
              </li>
              <li>
                <Link to="/locations/karimnagar" className="hover:text-white transition-colors">
                  Karimnagar
                </Link>
              </li>
              <li>
                <Link to="/locations" className="text-gold font-semibold hover:underline">
                  All Locations &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Legal */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold font-bold mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs text-ivory-300">
              <li>
                <Link to="/admin" className="text-gold font-bold hover:underline flex items-center gap-1">
                  <span>★ Admin Panel (Priya Reddy)</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  User Dashboard
                </Link>
              </li>
              <li>
                <Link to="/saved" className="hover:text-white transition-colors">
                  Saved Properties
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-white transition-colors">
                  Map Search
                </Link>
              </li>
              <li>
                <Link to="/signin" className="hover:text-white transition-colors">
                  Sign In / Sign Up
                </Link>
              </li>
              <li>
                <span className="text-neutral-400 cursor-not-allowed">
                  HMDA & RERA Guides
                </span>
              </li>
              <li>
                <span className="text-neutral-400 cursor-not-allowed">
                  Terms & Conditions
                </span>
              </li>
              <li>
                <span className="text-neutral-400 cursor-not-allowed">
                  Privacy Policy
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory-400">
          <p>© {new Date().getFullYear()} Korutla Properties. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-gold">
              <ShieldCheck className="w-4 h-4" />
              Verified & RERA Compliant
            </span>
            <span>•</span>
            <span>Designed for Telangana & Beyond</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

