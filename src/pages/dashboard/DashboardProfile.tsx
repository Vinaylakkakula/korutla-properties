import React, { useState } from 'react';
import { Camera, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Button from '../../components/ui/Button';

export const DashboardProfile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { addToast } = useToast();

  const [name, setName] = useState(user?.name || 'Vinay Kumar');
  const [email, setEmail] = useState(user?.email || 'vinay@korutlaproperties.com');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 00112');
  const [address, setAddress] = useState('Kokapet, Hyderabad, Telangana');
  const [bio, setBio] = useState('Real estate investor and property owner looking for high-appreciation villa assets in Hyderabad.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, phone });
    addToast('Profile details updated successfully!', 'success');
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/80 shadow-subtle space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-forest">Edit Profile</h2>
        <p className="text-xs text-mutedGray mt-0.5">
          Update your public profile, contact info, and investor bio.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Photo Upload Simulation */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={user?.photo || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80'}
              alt={name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-forest"
            />
            <button
              type="button"
              onClick={() => addToast('Photo updated', 'info')}
              className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-forest text-white hover:bg-forest-900 shadow cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <div>
            <h4 className="font-bold text-sm text-charcoal">{name}</h4>
            <span className="text-xs text-mutedGray capitalize">{user?.role || 'Verified Buyer / Investor'}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            required
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
          <Input
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            type="tel"
            required
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
          />
          <Input
            label="Location / City"
            value={address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
          />
        </div>

        <Textarea
          label="About You / Investor Profile"
          rows={3}
          value={bio}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBio(e.target.value)}
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          leftIcon={<Save className="w-4 h-4" />}
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default DashboardProfile;

