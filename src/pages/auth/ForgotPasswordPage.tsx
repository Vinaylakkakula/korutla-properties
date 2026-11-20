import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import Logo from '../../components/ui/Logo';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export const ForgotPasswordPage: React.FC = () => {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      addToast('Please enter your email', 'error');
      return;
    }
    setIsSent(true);
    addToast('Password reset link sent to your email!', 'success');
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-ivory px-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200/80 shadow-floating text-center">
        <div className="flex justify-center mb-6">
          <Logo variant="dark" />
        </div>

        {isSent ? (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-forest">Reset Link Sent</h2>
            <p className="text-xs text-mutedGray leading-relaxed font-light">
              We have dispatched a password recovery link to <strong className="text-charcoal">{email}</strong>. Please check your inbox and spam folder.
            </p>
            <div className="pt-4">
              <Button to="/signin" variant="primary" size="md" className="w-full">
                Back to Sign In
              </Button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest mb-1">
              Reset Your Password
            </h2>
            <p className="text-xs text-mutedGray mb-8">
              Enter the email associated with your account and we'll send you a recovery link.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <Input
                label="Registered Email Address"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
              />

              <Button type="submit" variant="primary" size="md" className="w-full mt-4">
                Send Recovery Link
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-neutral-100 text-xs">
              <Link
                to="/signin"
                className="text-mutedGray hover:text-forest inline-flex items-center gap-1 font-semibold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Sign In</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
