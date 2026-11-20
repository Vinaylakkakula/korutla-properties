import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  KeyRound,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Eye,
  EyeOff,
  Home,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Logo from '../../components/ui/Logo';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { adminSignIn, isAdmin } = useAuth();
  const { addToast } = useToast();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in as admin, redirect
  if (isAdmin) {
    navigate('/admin', { replace: true });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = adminSignIn(password);
    if (success) {
      addToast('Welcome back Admin! Access granted.', 'success');
      navigate('/admin', { replace: true });
    } else {
      setError('Invalid admin credentials. Use PIN "505326" or password "admin123"');
      addToast('Authentication failed. Check your admin credentials.', 'error');
      setLoading(false);
    }
  };

  const handleQuickDemoAccess = () => {
    const success = adminSignIn('505326');
    if (success) {
      addToast('Demo Admin Access Granted!', 'success');
      navigate('/admin', { replace: true });
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-gradient-to-br from-forest-900 via-forest to-neutral-900 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-floating border border-neutral-100 space-y-6 relative overflow-hidden"
      >
        {/* Top Gold Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-gold via-amber-400 to-gold" />

        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-forest/10 border border-forest/20 text-forest flex items-center justify-center mx-auto shadow-sm">
            <ShieldCheck className="w-8 h-8 text-gold" />
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
            Admin Access Portal
          </h1>
          <p className="text-xs text-mutedGray max-w-xs mx-auto">
            Protected area for Korutla Properties (505326) Administrators & Lead Managers.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">
              Admin Email / Account
            </label>
            <input
              type="text"
              readOnly
              value="admin@korutlaproperties.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-100/70 text-xs text-charcoal font-medium cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">
              Admin Password or Master PIN
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter PIN (e.g. 505326) or admin123"
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-forest text-charcoal"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-mutedGray hover:text-charcoal cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-mutedGray mt-1">
              Hint: Korutla Pincode <strong className="text-forest">505326</strong> or <strong className="text-forest">admin123</strong>
            </p>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full"
            disabled={loading}
            leftIcon={<KeyRound className="w-4 h-4 text-gold" />}
          >
            Authenticate Admin Access
          </Button>
        </form>

        {/* 1-Click Demo Shortcut */}
        <div className="pt-2 border-t border-neutral-100 text-center space-y-3">
          <button
            type="button"
            onClick={handleQuickDemoAccess}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-ivory-100 hover:bg-ivory-200 text-forest text-xs font-bold border border-gold/30 transition shadow-sm cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-gold" />
            <span>1-Click Instant Admin Sign In (Demo)</span>
          </button>

          <Link
            to="/"
            className="inline-flex items-center gap-1 text-xs text-mutedGray hover:text-forest transition"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
