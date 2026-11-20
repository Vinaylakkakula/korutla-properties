import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Building,
  MessageSquare,
  Calendar,
  Users,
  Bell,
  CheckCircle2,
  Clock,
  ArrowRight,
  Phone,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { supabaseService } from '../../services/supabaseService';
import { Property, Inquiry, Visit, AgentNotification } from '../../types/property';
import { formatPrice } from '../../utils/format';
import Button from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';

export const AdminOverview: React.FC = () => {
  const { addToast } = useToast();
  const [properties, setProperties] = useState<Property[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [notifications, setNotifications] = useState<AgentNotification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [props, inqs, vsts, notifs] = await Promise.all([
          supabaseService.getProperties(),
          supabaseService.getInquiries(),
          supabaseService.getVisits(),
          supabaseService.getNotifications(),
        ]);
        setProperties(props);
        setInquiries(inqs);
        setVisits(vsts);
        setNotifications(notifs);
      } catch (e) {
        console.error('Error fetching admin overview:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUpdateInquiryStatus = async (id: string, status: Inquiry['status']) => {
    await supabaseService.updateInquiryStatus(id, status);
    setInquiries((prev) => prev.map((inq) => (inq.id === id ? { ...inq, status } : inq)));
    addToast('Inquiry status updated', 'success');
  };

  const handleUpdateVisitStatus = async (id: string, status: Visit['status']) => {
    await supabaseService.updateVisitStatus(id, status);
    setVisits((prev) => prev.map((v) => (v.id === id ? { ...v, status } : v)));
    addToast('Site visit status updated', 'success');
  };

  const pendingInquiriesCount = inquiries.filter((i) => i.status === 'pending').length;
  const scheduledVisitsCount = visits.filter((v) => v.status === 'scheduled').length;
  const priyaNotifications = notifications.filter(
    (n) => n.agentName.includes('Priya') || n.agentId === 'agent-2'
  );

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-forest/10 text-forest text-xs font-bold uppercase tracking-wider">
              Korutla 505326 Command Center
            </span>
            <span className="flex items-center gap-1 text-emerald-600 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live System
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
            Administrator & Agent Operations
          </h1>
          <p className="text-xs sm:text-sm text-mutedGray font-light mt-1">
            Control properties, view customer inquiries, manage site visits, and dispatch notifications to Priya Reddy.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/sell"
            className="px-4 py-2.5 rounded-xl bg-forest hover:bg-forest/90 text-white font-semibold text-xs transition shadow-sm flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>List New Property</span>
          </Link>
          <Link
            to="/admin/notifications"
            className="px-4 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-charcoal font-semibold text-xs transition flex items-center gap-1.5"
          >
            <Bell className="w-3.5 h-3.5 text-forest" />
            <span>Notifications ({notifications.filter((n) => !n.isRead).length})</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-mutedGray">
            <span className="text-xs font-medium">Total Listings</span>
            <Building className="w-4 h-4 text-forest" />
          </div>
          <div className="text-2xl font-serif font-bold text-forest">{properties.length}</div>
          <div className="text-[11px] text-mutedGray">
            {properties.filter((p) => p.isVerified).length} verified in Korutla
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-mutedGray">
            <span className="text-xs font-medium">Inquiries & Leads</span>
            <MessageSquare className="w-4 h-4 text-gold" />
          </div>
          <div className="text-2xl font-serif font-bold text-forest">{inquiries.length}</div>
          <div className="text-[11px] text-amber-600 font-semibold">
            {pendingInquiriesCount} pending attention
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-mutedGray">
            <span className="text-xs font-medium">Scheduled Site Visits</span>
            <Calendar className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-serif font-bold text-forest">{visits.length}</div>
          <div className="text-[11px] text-emerald-600 font-semibold">
            {scheduledVisitsCount} upcoming tours
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-mutedGray">
            <span className="text-xs font-medium">Exclusive Agents</span>
            <Users className="w-4 h-4 text-forest" />
          </div>
          <div className="text-2xl font-serif font-bold text-forest">6</div>
          <div className="text-[11px] text-mutedGray">
            Priya Reddy & Korutla Team
          </div>
        </div>
      </div>

      {/* PRIYA REDDY NOTIFICATION DISPATCH CENTER */}
      <div className="bg-gradient-to-br from-forest-900 to-forest text-white rounded-3xl p-6 sm:p-7 shadow-floating space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-forest-700">
          <div className="flex items-center gap-3.5">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80"
              alt="Priya Reddy"
              className="w-13 h-13 rounded-2xl object-cover border-2 border-gold shadow-sm"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-serif text-lg font-bold text-white">
                  Priya Reddy Notification Dispatch
                </h3>
                <span className="text-[10px] bg-gold text-forest font-bold px-2 py-0.5 rounded-full">
                  Lead Agent
                </span>
              </div>
              <p className="text-xs text-ivory-300">
                Phone: <strong className="text-white">+91 94401 50532</strong> • Venkateshwara Colony, Shantinagar, Korutla
              </p>
            </div>
          </div>

          <a
            href="https://api.whatsapp.com/send?phone=919440150532&text=Hello%20Priya%20Reddy,%20please%20check%20your%20new%20leads%20in%20Korutla%20Properties%20Admin."
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition flex items-center gap-2 shadow"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Open Priya Reddy WhatsApp</span>
          </a>
        </div>

        {/* Recent Alerts for Priya Reddy */}
        <div>
          <span className="text-xs uppercase tracking-wider text-gold font-bold mb-3 block">
            Recent Leads Assigned to Priya Reddy ({priyaNotifications.length})
          </span>

          <div className="space-y-2.5">
            {priyaNotifications.slice(0, 3).map((notif) => (
              <div
                key={notif.id}
                className="p-3.5 rounded-2xl bg-forest-800/80 border border-forest-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        notif.type === 'visit'
                          ? 'bg-amber-400 text-amber-950'
                          : 'bg-emerald-400 text-emerald-950'
                      }`}
                    >
                      {notif.type === 'visit' ? 'Site Visit' : 'Property Inquiry'}
                    </span>
                    <span className="font-bold text-white">{notif.title}</span>
                    <span className="text-ivory-400 text-[10px]">
                      {new Date(notif.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-ivory-200 text-xs">{notif.message}</p>
                  <p className="text-gold text-[11px]">
                    Customer: <strong>{notif.customerName}</strong> ({notif.customerPhone})
                    {notif.scheduledDate && ` • Slot: ${notif.scheduledDate} ${notif.scheduledTime}`}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`https://api.whatsapp.com/send?phone=919440150532&text=${encodeURIComponent(
                      `Hello Priya Reddy, new lead for "${notif.propertyTitle}". Customer: ${notif.customerName} (${notif.customerPhone}). Message: ${notif.message}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Priya</span>
                  </a>

                  <a
                    href={`https://api.whatsapp.com/send?phone=${notif.customerPhone.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(
                      `Hello ${notif.customerName}, this is Priya Reddy from Korutla Properties regarding "${notif.propertyTitle}". How can I help you today?`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-[11px] transition flex items-center gap-1"
                  >
                    <span>Ping Customer</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TWO COLUMN RECENT TABLES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-forest" />
              <h3 className="font-serif text-lg font-bold text-forest">Recent Inquiries</h3>
            </div>
            <Link
              to="/admin/inquiries"
              className="text-xs font-bold text-forest hover:text-gold flex items-center gap-1"
            >
              <span>View All ({inquiries.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {inquiries.slice(0, 4).map((inq) => (
              <div
                key={inq.id}
                className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/70 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="font-bold text-forest">{inq.userName}</div>
                  <select
                    value={inq.status}
                    onChange={(e) =>
                      handleUpdateInquiryStatus(inq.id, e.target.value as Inquiry['status'])
                    }
                    className="text-[11px] font-semibold rounded-lg border border-neutral-300 px-2 py-0.5 bg-white cursor-pointer"
                  >
                    <option value="pending">Pending</option>
                    <option value="responded">Responded</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <p className="text-charcoal/80 text-xs italic">&ldquo;{inq.message}&rdquo;</p>

                <div className="flex items-center justify-between pt-1 border-t border-neutral-200/60 text-[11px] text-mutedGray">
                  <span>{inq.userPhone}</span>
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://api.whatsapp.com/send?phone=${inq.userPhone.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(
                        `Hello ${inq.userName}, thank you for inquiring on Korutla Properties. How may we assist you?`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
                    >
                      <MessageCircle className="w-3 h-3" /> WhatsApp
                    </a>
                    <a
                      href={`tel:${inq.userPhone}`}
                      className="text-forest hover:text-gold font-bold flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" /> Call
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Site Visits */}
        <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-forest" />
              <h3 className="font-serif text-lg font-bold text-forest">Upcoming Site Visits</h3>
            </div>
            <Link
              to="/admin/visits"
              className="text-xs font-bold text-forest hover:text-gold flex items-center gap-1"
            >
              <span>View All ({visits.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {visits.slice(0, 4).map((v) => (
              <div
                key={v.id}
                className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/70 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="font-bold text-forest">{v.userName}</div>
                  <select
                    value={v.status}
                    onChange={(e) =>
                      handleUpdateVisitStatus(v.id, e.target.value as Visit['status'])
                    }
                    className="text-[11px] font-semibold rounded-lg border border-neutral-300 px-2 py-0.5 bg-white cursor-pointer"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 text-charcoal font-medium text-xs">
                  <Clock className="w-3.5 h-3.5 text-gold" />
                  <span>
                    {v.scheduledDate} at {v.scheduledTime}
                  </span>
                </div>

                {v.notes && <p className="text-mutedGray text-[11px] italic">{v.notes}</p>}

                <div className="flex items-center justify-between pt-1 border-t border-neutral-200/60 text-[11px] text-mutedGray">
                  <span>Phone: {v.userPhone}</span>
                  <a
                    href={`https://api.whatsapp.com/send?phone=${v.userPhone.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(
                      `Hello ${v.userName}, this is Korutla Properties confirming your site visit on ${v.scheduledDate} at ${v.scheduledTime}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
                  >
                    <MessageCircle className="w-3 h-3" /> WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
