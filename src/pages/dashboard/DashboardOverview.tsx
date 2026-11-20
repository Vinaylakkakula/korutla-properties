import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building,
  CheckCircle2,
  Clock,
  MessageSquare,
  Calendar,
  Eye,
  PlusCircle,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { inquiries } from '../../data/inquiries';
import { visits } from '../../data/visits';
import Button from '../../components/ui/Button';

export const DashboardOverview: React.FC = () => {
  const stats = [
    { label: 'Total Listings', count: 6, icon: <Building className="w-5 h-5 text-forest" />, change: '+2 this month' },
    { label: 'Active / Published', count: 4, icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />, change: 'All verified' },
    { label: 'Pending Approvals', count: 1, icon: <Clock className="w-5 h-5 text-amber-600" />, change: 'Under review' },
    { label: 'Total Inquiries', count: 18, icon: <MessageSquare className="w-5 h-5 text-blue-600" />, change: '+5 new' },
    { label: 'Scheduled Visits', count: 4, icon: <Calendar className="w-5 h-5 text-purple-600" />, change: 'Upcoming' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-forest to-forest-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-card">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
            Overview Dashboard
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            Welcome back, Vinay
          </h2>
          <p className="text-xs sm:text-sm text-ivory-300 font-light mt-1">
            Track inquiries, manage your properties, and monitor upcoming site visits.
          </p>
        </div>

        <Button
          to="/sell"
          variant="gold"
          size="md"
          leftIcon={<PlusCircle className="w-4 h-4" />}
          className="shrink-0"
        >
          Add New Listing
        </Button>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((st) => (
          <div
            key={st.label}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/80 shadow-subtle flex flex-col justify-between"
          >
            <div className="p-2 rounded-xl bg-ivory-100 w-fit mb-3">{st.icon}</div>
            <div>
              <div className="text-2xl font-bold text-forest">{st.count}</div>
              <h4 className="text-xs font-semibold text-charcoal mt-0.5">{st.label}</h4>
              <span className="text-[10px] text-mutedGray block mt-1">{st.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 2-Columns: Recent Inquiries & Upcoming Visits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <h3 className="font-serif text-lg font-bold text-forest">Recent Inquiries</h3>
            <Link to="/dashboard/inquiries" className="text-xs font-bold text-forest hover:text-gold">
              View All &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {inquiries.slice(0, 3).map((inq) => (
              <div
                key={inq.id}
                className="p-3.5 rounded-xl bg-ivory-100 border border-neutral-200/60 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-forest">{inq.userName}</span>
                  <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 uppercase">
                    {inq.status}
                  </span>
                </div>
                <p className="text-xs text-charcoal/80 line-clamp-2 font-light">
                  "{inq.message}"
                </p>
                <div className="text-[10px] text-mutedGray">{inq.userPhone}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Scheduled Visits */}
        <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <h3 className="font-serif text-lg font-bold text-forest">Upcoming Visits</h3>
            <Link to="/dashboard/visits" className="text-xs font-bold text-forest hover:text-gold">
              View All &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {visits.slice(0, 3).map((vis) => (
              <div
                key={vis.id}
                className="p-3.5 rounded-xl bg-ivory-100 border border-neutral-200/60 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-forest">{vis.userName}</span>
                  <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                    {vis.scheduledDate}
                  </span>
                </div>
                <div className="text-xs font-medium text-charcoal flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-forest" />
                  <span>{vis.scheduledTime}</span>
                </div>
                {vis.notes && (
                  <p className="text-[11px] text-mutedGray font-light line-clamp-1 italic">
                    Note: {vis.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;

