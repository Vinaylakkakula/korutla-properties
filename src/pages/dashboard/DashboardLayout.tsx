import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Building,
  Heart,
  MessageSquare,
  Calendar,
  Mail,
  User,
  Settings,
  PlusCircle,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';

export const DashboardLayout: React.FC = () => {
  const { user, signOut } = useAuth();

  const navItems = [
    { to: '/dashboard', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" />, end: true },
    { to: '/dashboard/properties', label: 'My Properties', icon: <Building className="w-4 h-4" /> },
    { to: '/dashboard/saved', label: 'Saved Listings', icon: <Heart className="w-4 h-4" /> },
    { to: '/dashboard/inquiries', label: 'Inquiries', icon: <MessageSquare className="w-4 h-4" /> },
    { to: '/dashboard/visits', label: 'Scheduled Visits', icon: <Calendar className="w-4 h-4" /> },
    { to: '/dashboard/messages', label: 'Messages', icon: <Mail className="w-4 h-4" /> },
    { to: '/dashboard/profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { to: '/dashboard/settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-ivory">
      {/* Top Breadcrumb Bar */}
      <div className="bg-white border-b border-neutral-200 py-3 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-mutedGray">
            <Link to="/" className="hover:text-forest">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-charcoal font-semibold">User Dashboard</span>
          </div>

          <Link to="/sell" className="text-xs font-bold text-forest hover:text-gold flex items-center gap-1">
            <PlusCircle className="w-3.5 h-3.5" />
            <span>List New Property</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 bg-white rounded-3xl p-6 border border-neutral-200 shadow-subtle space-y-6">
            {/* User Mini Card */}
            <div className="flex items-center gap-3.5 pb-6 border-b border-neutral-100">
              <img
                src={user?.photo || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&q=80'}
                alt={user?.name || 'User'}
                className="w-12 h-12 rounded-2xl object-cover border-2 border-forest"
              />
              <div className="truncate">
                <h4 className="font-bold text-sm text-forest truncate">{user?.name || 'Vinay Kumar'}</h4>
                <span className="text-xs text-mutedGray truncate block">{user?.email || 'vinay@example.com'}</span>
              </div>
            </div>

            {/* Nav links */}
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-forest text-white shadow-sm'
                        : 'text-charcoal/80 hover:bg-forest/5 hover:text-forest'
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>

            <div className="pt-4 border-t border-neutral-100">
              <button
                onClick={signOut}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>

          {/* Main Dashboard Content View */}
          <main className="lg:col-span-9">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

