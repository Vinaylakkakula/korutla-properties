import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Phone,
  MessageCircle,
  Search,
  CheckCircle2,
  Trash2,
  Send,
  User,
  MapPin,
} from 'lucide-react';
import { supabaseService } from '../../services/supabaseService';
import { Visit, Property } from '../../types/property';
import { useToast } from '../../context/ToastContext';

export const AdminVisits: React.FC = () => {
  const { addToast } = useToast();
  const [visits, setVisits] = useState<Visit[]>([]);
  const [properties, setProperties] = useState<Record<string, Property>>({});
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [visitData, propData] = await Promise.all([
        supabaseService.getVisits(),
        supabaseService.getProperties(),
      ]);
      setVisits(visitData);
      const map: Record<string, Property> = {};
      propData.forEach((p) => {
        map[p.id] = p;
      });
      setProperties(map);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id: string, status: Visit['status']) => {
    await supabaseService.updateVisitStatus(id, status);
    setVisits((prev) => prev.map((v) => (v.id === id ? { ...v, status } : v)));
    addToast(`Visit status updated to ${status}`, 'success');
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this site visit record?')) {
      await supabaseService.deleteVisit(id);
      setVisits((prev) => prev.filter((v) => v.id !== id));
      addToast('Visit deleted', 'info');
    }
  };

  const filtered = visits.filter((v) => {
    const matchSearch =
      v.userName.toLowerCase().includes(search.toLowerCase()) ||
      v.userPhone.includes(search) ||
      (v.notes && v.notes.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = statusFilter === 'all' || v.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-forest">Scheduled Site Visits</h2>
          <p className="text-xs text-mutedGray font-light">
            Manage buyer inspections and video tours across Korutla town and nearby layouts.
          </p>
        </div>

        <a
          href="https://api.whatsapp.com/send?phone=919440150532&text=Hello%20Priya%20Reddy,%20here%20is%20the%20schedule%20for%20upcoming%20Korutla%20site%20visits."
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-sm"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Dispatch Schedule to Priya Reddy</span>
        </a>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-subtle flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-mutedGray absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by visitor name, phone, or notes..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-forest"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-xl border border-neutral-200 text-xs bg-white focus:outline-none focus:border-forest"
        >
          <option value="all">All Visits ({visits.length})</option>
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Visits Table */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50/80 border-b border-neutral-200/80 text-[11px] font-bold text-mutedGray uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Visitor & Contact</th>
                <th className="py-3.5 px-3">Date & Slot</th>
                <th className="py-3.5 px-4">Property</th>
                <th className="py-3.5 px-3">Assigned Agent</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200/70">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-mutedGray">
                    No site visits scheduled.
                  </td>
                </tr>
              ) : (
                filtered.map((v) => {
                  const prop = properties[v.propertyId];
                  const agentName = prop?.agent?.name || 'Priya Reddy';
                  const agentPhone = prop?.agent?.phone || '+91 94401 50532';

                  return (
                    <tr key={v.id} className="hover:bg-neutral-50/60 transition">
                      {/* Visitor */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-forest">{v.userName}</div>
                        <div className="text-[11px] text-mutedGray flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-gold" /> {v.userPhone}
                        </div>
                      </td>

                      {/* Date & Time */}
                      <td className="py-4 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 font-semibold text-charcoal">
                          <Calendar className="w-3.5 h-3.5 text-forest" />
                          <span>{v.scheduledDate}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-mutedGray mt-0.5">
                          <Clock className="w-3 h-3 text-gold" />
                          <span>{v.scheduledTime}</span>
                        </div>
                      </td>

                      {/* Property */}
                      <td className="py-4 px-4 max-w-xs">
                        <div className="font-medium text-forest truncate">
                          {prop?.title || 'Korutla Duplex / Land Layout'}
                        </div>
                        {prop?.location?.locality && (
                          <div className="text-[10px] text-mutedGray flex items-center gap-1 mt-0.5">
                            <MapPin className="w-2.5 h-2.5 text-gold" />
                            <span>{prop.location.locality}</span>
                          </div>
                        )}
                        {v.notes && (
                          <div className="text-[10px] text-charcoal/70 italic mt-1 line-clamp-1">
                            Note: {v.notes}
                          </div>
                        )}
                      </td>

                      {/* Agent */}
                      <td className="py-4 px-3 whitespace-nowrap">
                        <span className="font-semibold text-forest">{agentName}</span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-3">
                        <select
                          value={v.status}
                          onChange={(e) =>
                            handleStatusChange(v.id, e.target.value as Visit['status'])
                          }
                          className={`text-[11px] font-bold rounded-lg border px-2.5 py-1 bg-white cursor-pointer ${
                            v.status === 'scheduled'
                              ? 'border-emerald-300 text-emerald-800 bg-emerald-50'
                              : v.status === 'completed'
                              ? 'border-neutral-300 text-neutral-700'
                              : 'border-red-300 text-red-700 bg-red-50'
                          }`}
                        >
                          <option value="scheduled">Scheduled</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right whitespace-nowrap space-x-1.5">
                        {/* Notify Priya Reddy */}
                        <a
                          href={`https://api.whatsapp.com/send?phone=${agentPhone.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(
                            `Hello ${agentName}, upcoming site visit reminder on Korutla Properties:\n\nProperty: ${prop?.title || 'Listing'}\nDate: ${v.scheduledDate} at ${v.scheduledTime}\nVisitor: ${v.userName} (${v.userPhone})`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-forest hover:bg-forest/90 text-white font-semibold text-[11px] inline-flex items-center gap-1 shadow-sm"
                          title={`WhatsApp Agent ${agentName}`}
                        >
                          <Send className="w-3 h-3 text-gold" />
                          <span>WhatsApp {agentName.split(' ')[0]}</span>
                        </a>

                        {/* WhatsApp Visitor */}
                        <a
                          href={`https://api.whatsapp.com/send?phone=${v.userPhone.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(
                            `Hello ${v.userName}, confirming your site visit for "${prop?.title || 'the property'}" on ${v.scheduledDate} at ${v.scheduledTime}. Agent ${agentName} will guide you at the location.`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white inline-block shadow-sm"
                          title="WhatsApp Visitor"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>

                        <button
                          type="button"
                          onClick={() => handleDelete(v.id)}
                          className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 inline-block cursor-pointer"
                          title="Delete visit"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminVisits;
