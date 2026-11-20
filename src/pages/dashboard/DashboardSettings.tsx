import React, { useState } from 'react';
import { Bell, Lock, Shield, Check } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export const DashboardSettings: React.FC = () => {
  const { addToast } = useToast();

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [showPhone, setShowPhone] = useState(true);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSaveNotifications = () => {
    addToast('Notification preferences saved', 'success');
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      addToast('Please fill all password fields', 'error');
      return;
    }
    addToast('Password updated successfully', 'success');
    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/80 shadow-subtle space-y-10">
      <div>
        <h2 className="font-serif text-2xl font-bold text-forest">Account Settings</h2>
        <p className="text-xs text-mutedGray mt-0.5">
          Configure notification preferences, privacy, and security credentials.
        </p>
      </div>

      {/* Notifications */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
          <Bell className="w-4 h-4 text-forest" />
          <h3 className="font-serif text-lg font-bold text-forest">Notification Preferences</h3>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-ivory-100 cursor-pointer">
            <div>
              <span className="text-sm font-semibold text-charcoal block">WhatsApp Updates</span>
              <span className="text-xs text-mutedGray">Receive instant inquiry alerts on WhatsApp</span>
            </div>
            <input
              type="checkbox"
              checked={whatsappAlerts}
              onChange={(e) => setWhatsappAlerts(e.target.checked)}
              className="w-4 h-4 text-forest rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-ivory-100 cursor-pointer">
            <div>
              <span className="text-sm font-semibold text-charcoal block">Email Digests</span>
              <span className="text-xs text-mutedGray">Weekly off-market listings and price drops</span>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 text-forest rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-ivory-100 cursor-pointer">
            <div>
              <span className="text-sm font-semibold text-charcoal block">SMS Notifications</span>
              <span className="text-xs text-mutedGray">Scheduled visit reminders via SMS</span>
            </div>
            <input
              type="checkbox"
              checked={smsAlerts}
              onChange={(e) => setSmsAlerts(e.target.checked)}
              className="w-4 h-4 text-forest rounded"
            />
          </label>
        </div>

        <Button onClick={handleSaveNotifications} variant="secondary" size="sm">
          Save Preferences
        </Button>
      </div>

      {/* Security & Password */}
      <div className="space-y-4 pt-4 border-t border-neutral-100">
        <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
          <Lock className="w-4 h-4 text-forest" />
          <h3 className="font-serif text-lg font-bold text-forest">Change Password</h3>
        </div>

        <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-md">
          <Input
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentPassword(e.target.value)}
            placeholder="••••••••"
          />
          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
            placeholder="••••••••"
          />
          <Button type="submit" variant="primary" size="sm">
            Update Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DashboardSettings;

