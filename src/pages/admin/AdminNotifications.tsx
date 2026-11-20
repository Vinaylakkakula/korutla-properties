import React, { useState, useEffect } from 'react';
import {
  Bell,
  CheckCircle2,
  Phone,
  MessageCircle,
  Calendar,
  MessageSquare,
  Clock,
  Sparkles,
  Send,
  Check,
  ShieldCheck,
  Info,
} from 'lucide-react';
import { supabaseService } from '../../services/supabaseService';
import { AgentNotification } from '../../types/property';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/ui/Button';

export const AdminNotifications: React.FC = () => {
  const { addToast } = useToast();
  const [notifications, setNotifications] = useState<AgentNotification[]>([]);
  const [filterAgent, setFilterAgent] = useState<'all' | 'priya'>('all');

  const fetchNotifications = async () => {
    try {
      const data = await supabaseService.getNotifications();
      setNotifications(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkAsRead = async (id: string) => {
    await supabaseService.markNotificationAsRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
    addToast('Notification marked as read', 'success');
  };

  const handleMarkAllRead = async () => {
    await supabaseService.markAllNotificationsAsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    addToast('All notifications marked as read', 'success');
  };

  const displayedNotifs = notifications.filter((n) => {
    if (filterAgent === 'priya') {
      return n.agentName.includes('Priya') || n.agentId === 'agent-2';
    }
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-6">
      {/* HOW NOTIFICATIONS WORK EXPLANATION BANNER */}
      <div className="bg-gradient-to-r from-forest to-forest-900 text-white rounded-3xl p-6 sm:p-7 shadow-subtle space-y-3">
        <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-wider">
          <Info className="w-4 h-4" />
          <span>How Priya Reddy Receives Inquiry & Site Visit Notifications</span>
        </div>

        <h2 className="font-serif text-xl sm:text-2xl font-bold">
          Multi-Channel Instant Lead Notification System
        </h2>

        <p className="text-xs sm:text-sm text-ivory-300 font-light max-w-3xl leading-relaxed">
          When a buyer clicks <strong className="text-white">&ldquo;Send Inquiry&rdquo;</strong> or{' '}
          <strong className="text-white">&ldquo;Schedule Site Visit&rdquo;</strong>, three notification triggers fire:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 space-y-1">
            <span className="font-bold text-gold flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              1. 1-Tap WhatsApp Alert
            </span>
            <p className="text-ivory-200 text-[11px] leading-relaxed">
              Customer or Admin triggers a pre-filled WhatsApp alert directly to Priya Reddy (+91 94401 50532) with property & visitor details.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 space-y-1">
            <span className="font-bold text-gold flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-amber-300" />
              2. Real-time In-App Inbox
            </span>
            <p className="text-ivory-200 text-[11px] leading-relaxed">
              Logged instantly into Supabase database & this Admin notification dashboard with unread counters and badge indicators.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 space-y-1">
            <span className="font-bold text-gold flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-emerald-400" />
              3. Instant Direct Call
            </span>
            <p className="text-ivory-200 text-[11px] leading-relaxed">
              Direct dialer buttons link customer to Priya Reddy and admin to the prospective buyer with one tap.
            </p>
          </div>
        </div>
      </div>

      {/* Action and Filter Controls */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-subtle flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilterAgent('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              filterAgent === 'all'
                ? 'bg-forest text-white'
                : 'bg-neutral-100 text-charcoal hover:bg-neutral-200'
            }`}
          >
            All Notifications ({notifications.length})
          </button>

          <button
            type="button"
            onClick={() => setFilterAgent('priya')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              filterAgent === 'priya'
                ? 'bg-gold text-forest'
                : 'bg-neutral-100 text-charcoal hover:bg-neutral-200'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Priya Reddy Only ({notifications.filter((n) => n.agentName.includes('Priya')).length})</span>
          </button>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={handleMarkAllRead}
            className="text-xs font-bold text-forest hover:text-gold flex items-center gap-1 cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Mark All as Read ({unreadCount})</span>
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {displayedNotifs.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center text-mutedGray border border-neutral-200 text-xs">
            No notifications available.
          </div>
        ) : (
          displayedNotifs.map((notif) => {
            const isPriya = notif.agentName.includes('Priya');
            const agentPhone = isPriya ? '+91 94401 50532' : '+91 98490 50532';

            return (
              <div
                key={notif.id}
                className={`rounded-3xl p-5 border shadow-subtle transition space-y-3 ${
                  !notif.isRead
                    ? 'bg-white border-gold/50 shadow-md ring-1 ring-gold/20'
                    : 'bg-white/70 border-neutral-200/80'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                        notif.type === 'visit'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {notif.type === 'visit' ? (
                        <Calendar className="w-5 h-5" />
                      ) : (
                        <MessageSquare className="w-5 h-5" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-forest text-sm">
                          {notif.title}
                        </span>
                        {!notif.isRead && (
                          <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold">
                            NEW LEAD
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-mutedGray flex items-center gap-2 mt-0.5">
                        <span>Assigned Agent: <strong className="text-forest">{notif.agentName}</strong></span>
                        <span>•</span>
                        <span>{new Date(notif.createdAt).toLocaleString()}</span>
                      </span>
                    </div>
                  </div>

                  {!notif.isRead && (
                    <button
                      type="button"
                      onClick={() => handleMarkAsRead(notif.id)}
                      className="px-3 py-1 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-100 text-xs font-medium cursor-pointer self-start sm:self-auto"
                    >
                      Mark Read
                    </button>
                  )}
                </div>

                {/* Message body */}
                <div className="p-3.5 rounded-2xl bg-neutral-50/80 border border-neutral-200/60 text-xs space-y-1.5">
                  <p className="text-charcoal font-medium">{notif.message}</p>
                  <div className="text-[11px] text-mutedGray flex flex-wrap gap-4 pt-1">
                    <span>
                      Property: <strong className="text-forest">{notif.propertyTitle}</strong>
                    </span>
                    <span>
                      Customer: <strong className="text-charcoal">{notif.customerName}</strong> (
                      {notif.customerPhone})
                    </span>
                    {notif.scheduledDate && (
                      <span className="text-amber-700 font-semibold">
                        Scheduled: {notif.scheduledDate} ({notif.scheduledTime})
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Dispatch Buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {/* WhatsApp Priya Reddy */}
                  <a
                    href={`https://api.whatsapp.com/send?phone=${agentPhone.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(
                      `Hello ${notif.agentName}, lead alert from Korutla Properties:\n\nType: ${notif.title}\nProperty: ${notif.propertyTitle}\nCustomer: ${notif.customerName}\nPhone: ${notif.customerPhone}\nDetails: ${notif.message}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-forest hover:bg-forest/90 text-white font-semibold text-xs shadow-sm transition"
                  >
                    <Send className="w-3.5 h-3.5 text-gold" />
                    <span>Send WhatsApp Alert to {notif.agentName}</span>
                  </a>

                  {/* WhatsApp Customer */}
                  <a
                    href={`https://api.whatsapp.com/send?phone=${notif.customerPhone.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(
                      `Hello ${notif.customerName}, Priya Reddy from Korutla Properties here regarding your inquiry for "${notif.propertyTitle}". When is a good time to talk?`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Customer</span>
                  </a>

                  <a
                    href={`tel:${notif.customerPhone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-300 text-charcoal hover:bg-neutral-50 font-semibold text-xs transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-forest" />
                    <span>Call Customer</span>
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdminNotifications;
