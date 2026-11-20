import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Logo from '../../components/ui/Logo';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signUp } = useAuth();
  const { addToast } = useToast();

  const redirectTo = searchParams.get('redirect') || '/dashboard';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !password) {
      addToast('Please fill out all required fields', 'error');
      return;
    }
    if (password !== confirmPassword) {
      addToast('Passwords do not match', 'error');
      return;
    }
    if (!agreeTerms) {
      addToast('Please accept terms and conditions', 'error');
      return;
    }

    await signUp({ name, email, phone, password });
    addToast('Account created successfully! Welcome to Korutla Properties.', 'success');
    navigate(redirectTo);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-ivory px-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200/80 shadow-floating text-center">
        <div className="flex justify-center mb-6">
          <Logo variant="dark" />
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest mb-1">
          Create Your Account
        </h2>
        <p className="text-xs text-mutedGray mb-8">
          Join Telangana's premier real estate community.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <Input
            label="Full Name"
            required
            placeholder="Vinay Kumar"
            value={name}
            onChange={(e) => setName(e.target.value)}
            leftIcon={<User className="w-4 h-4" />}
          />

          <Input
            label="Email Address"
            type="email"
            required
            placeholder="vinay@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
          />

          <Input
            label="Phone Number"
            type="tel"
            required
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            leftIcon={<Phone className="w-4 h-4" />}
          />

          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            required
            placeholder="••••••••"
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

          <Input
            label="Confirm Password"
            type="password"
            required
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
          />

          <label className="flex items-center gap-2 cursor-pointer pt-2 text-xs text-mutedGray">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="rounded text-forest"
            />
            <span>I agree to the Terms of Service & Privacy Policy</span>
          </label>

          <Button type="submit" variant="primary" size="md" className="w-full mt-4">
            Create Account
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-neutral-100 text-xs text-mutedGray">
          Already registered?{' '}
          <Link
            to={redirectTo !== '/dashboard' ? `/signin?redirect=${encodeURIComponent(redirectTo)}` : '/signin'}
            className="text-forest font-bold hover:underline"
          >
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
