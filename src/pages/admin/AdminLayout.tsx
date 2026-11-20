import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Building,
  MessageSquare,
  Calendar,
  Users,
  Bell,
  Database,
  PlusCircle,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { supabaseService } from '../../services/supabaseService';
import { isSupabaseConfigured } from '../../lib/supabase';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [unreadNotifs, setUnreadNotifs] = useState(0);
  const [pendingInquiries, setPendingInquiries] = useState(0);
  const [scheduledVisits, setScheduledVisits] = useState(0);
  const isLiveDb = isSupabaseConfigured();

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const notifs = await supabaseService.getNotifications();
        setUnreadNotifs(notifs.filter((n) => !n.isRead).length);

        const inqs = await supabaseService.getInquiries();
        setPendingInquiries(inqs.filter((i) => i.status === 'pending').length);

        const visits = await supabaseService.getVisits();
        setScheduledVisits(visits.filter((v) => v.status === 'scheduled').length);
      } catch {}
    };

    loadCounts();
    const interval = setInterval(loadCounts, 8000);
    return () => clearInterval(interval);
  }, [location.pathname]);

  const navItems = [
    {
      to: '/admin',
      label: 'Dashboard Overview',
      icon: <LayoutDashboard className="w-4 h-4" />,
      end: true,
    },
    {
      to: '/admin/properties',
      label: 'Properties Control',
      icon: <Building className="w-4 h-4" />,
    },
    {
      to: '/admin/inquiries',
      label: 'Inquiries & Leads',
      icon: <MessageSquare className="w-4 h-4" />,
      badge: pendingInquiries > 0 ? pendingInquiries : undefined,
    },
    {
      to: '/admin/visits',
      label: 'Site Visits',
      icon: <Calendar className="w-4 h-4" />,
      badge: scheduledVisits > 0 ? scheduledVisits : undefined,
    },
    {
      to: '/admin/agents',
      label: 'Agents & Priya Reddy',
      icon: <Users className="w-4 h-4" />,
    },
    {
      to: '/admin/notifications',
      label: 'Notification Center',
      icon: <Bell className="w-4 h-4" />,
      badge: unreadNotifs > 0 ? unreadNotifs : undefined,
      badgeColor: 'bg-red-500 text-white',
    },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-neutral-50/70">
      {/* Top Admin Header Bar */}
      <div className="bg-forest text-white border-b border-forest-800 py-3.5 mb-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="bg-gold text-forest font-bold px-2.5 py-1 rounded-md uppercase tracking-wider text-[11px] flex items-center gap-1 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" /> Admin Panel
            </span>
            <span className="text-ivory-300 hidden sm:inline">|</span>
            <span className="text-ivory-200 font-medium">
              Korutla (505326) Master Operations Hub
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-forest-800 text-ivory-300 text-[11px] border border-forest-700">
              <Database className="w-3 h-3 text-gold" />
              <span>Database: </span>
              <strong className={isLiveDb ? 'text-emerald-400' : 'text-amber-300'}>
                {isLiveDb ? 'Supabase Live' : 'Local Storage Engine'}
              </strong>
            </div>

            <Link
              to="/sell"
              className="px-3 py-1.5 rounded-full bg-gold hover:bg-gold-dark text-forest font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ Add Property</span>
            </Link>

            <Link
              to="/"
              className="text-ivory-300 hover:text-white flex items-center gap-1 font-medium transition"
            >
              <span>View Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Admin Sidebar */}
          <aside className="lg:col-span-3 bg-white rounded-3xl p-5 border border-neutral-200/80 shadow-subtle space-y-6 lg:sticky lg:top-28">
            {/* Agent / Admin Identity Card */}
            <div className="p-4 rounded-2xl bg-ivory-50 border border-neutral-200/70 flex items-center gap-3.5">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80"
                  alt="Admin Controller"
                  className="w-12 h-12 rounded-xl object-cover border-2 border-forest"
                />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <h4 className="font-serif text-sm font-bold text-forest truncate">
                    Priya Reddy & Admin
                  </h4>
                </div>
                <span className="text-[11px] text-mutedGray block">Korutla Lead Manager</span>
                <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Active Online
                </span>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-forest text-white shadow-sm'
                        : 'text-charcoal hover:bg-neutral-100/80'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.badgeColor || 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Quick WhatsApp Alert Widget */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Priya Reddy WhatsApp</span>
              </div>
              <p className="text-[11px] text-emerald-800/80 leading-relaxed font-light">
                Direct mobile alert line for Priya Reddy in Korutla:
              </p>
              <a
                href="https://api.whatsapp.com/send?phone=919440150532&text=Hello%20Priya%20Reddy,%20Admin%20ping%20from%20Korutla%20Properties."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition shadow-sm"
              >
                <Phone className="w-3 h-3" />
                <span>+91 94401 50532</span>
              </a>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9 space-y-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
