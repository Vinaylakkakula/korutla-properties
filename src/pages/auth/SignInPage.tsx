import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Logo from '../../components/ui/Logo';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const redirectTo = searchParams.get('redirect') || '/dashboard';

  const [email, setEmail] = useState('vinay@korutlaproperties.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      addToast('Please enter your email', 'error');
      return;
    }
    signIn(email, password);
    addToast('Welcome back to Korutla Properties!', 'success');
    navigate(redirectTo);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-ivory px-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200/80 shadow-floating text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Logo variant="dark" />
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest mb-1">
          Welcome Back
        </h2>
        <p className="text-xs text-mutedGray mb-8">
          Sign in to access your saved properties, inquiries, and dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <Input
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
          />

          <div>
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer text-mutedGray hover:text-charcoal"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />
            <div className="flex items-center justify-between mt-2 text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-forest"
                />
                <span className="text-mutedGray">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-forest hover:text-gold font-semibold">
                Forgot password?
              </Link>
            </div>
          </div>

          <Button type="submit" variant="primary" size="md" className="w-full mt-4">
            Sign In
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-neutral-100 text-xs text-mutedGray">
          Don't have an account yet?{' '}
          <Link
            to={redirectTo !== '/dashboard' ? `/signup?redirect=${encodeURIComponent(redirectTo)}` : '/signup'}
            className="text-forest font-bold hover:underline"
          >
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
