import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Search,
  Phone,
  Mail,
  MessageCircle,
  Trash2,
  CheckCircle2,
  Clock,
  Send,
  User,
} from 'lucide-react';
import { supabaseService } from '../../services/supabaseService';
import { Inquiry, Property } from '../../types/property';
import { useToast } from '../../context/ToastContext';

export const AdminInquiries: React.FC = () => {
  const { addToast } = useToast();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [properties, setProperties] = useState<Record<string, Property>>({});
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [inqData, propData] = await Promise.all([
        supabaseService.getInquiries(),
        supabaseService.getProperties(),
      ]);
      setInquiries(inqData);
      const propMap: Record<string, Property> = {};
      propData.forEach((p) => {
        propMap[p.id] = p;
      });
      setProperties(propMap);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id: string, status: Inquiry['status']) => {
    await supabaseService.updateInquiryStatus(id, status);
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    addToast(`Inquiry marked as ${status}`, 'success');
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      await supabaseService.deleteInquiry(id);
      setInquiries((prev) => prev.filter((i) => i.id !== id));
      addToast('Inquiry deleted', 'info');
    }
  };

  const filtered = inquiries.filter((inq) => {
    const matchSearch =
      inq.userName.toLowerCase().includes(search.toLowerCase()) ||
      inq.userPhone.includes(search) ||
      inq.message.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || inq.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-forest">Inquiries & Buyer Leads</h2>
          <p className="text-xs text-mutedGray font-light">
            Customer inquiries submitted on properties across Korutla (505326).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://api.whatsapp.com/send?phone=919440150532&text=Hello%20Priya%20Reddy,%20please%20review%20pending%20buyer%20inquiries%20in%20Korutla."
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Notify Priya Reddy on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-subtle flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-mutedGray absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name, phone number, or inquiry message..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-forest"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-xl border border-neutral-200 text-xs bg-white focus:outline-none focus:border-forest"
        >
          <option value="all">All Inquiries ({inquiries.length})</option>
          <option value="pending">Pending Attention</option>
          <option value="responded">Responded</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Inquiries List Cards */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center text-mutedGray border border-neutral-200 text-xs">
            No inquiries match your search.
          </div>
        ) : (
          filtered.map((inq) => {
            const prop = properties[inq.propertyId];
            const agentName = prop?.agent?.name || 'Priya Reddy';
            const agentPhone = prop?.agent?.phone || '+91 94401 50532';

            return (
              <div
                key={inq.id}
                className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-subtle hover:shadow-md transition space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-forest/5 flex items-center justify-center text-forest font-bold font-serif text-sm">
                      {inq.userName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-forest text-sm">{inq.userName}</h4>
                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-mutedGray">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-gold" /> {inq.userPhone}
                        </span>
                        {inq.userEmail && (
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-gold" /> {inq.userEmail}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gold" />{' '}
                          {new Date(inq.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-mutedGray">Status:</span>
                    <select
                      value={inq.status}
                      onChange={(e) =>
                        handleStatusChange(inq.id, e.target.value as Inquiry['status'])
                      }
                      className={`text-xs font-bold rounded-lg border px-3 py-1 bg-white cursor-pointer ${
                        inq.status === 'pending'
                          ? 'border-amber-400 text-amber-700 bg-amber-50'
                          : inq.status === 'responded'
                          ? 'border-emerald-400 text-emerald-700 bg-emerald-50'
                          : 'border-neutral-300 text-neutral-600'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="responded">Responded</option>
                      <option value="closed">Closed</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => handleDelete(inq.id)}
                      className="p-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 cursor-pointer"
                      title="Delete inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Property & Inquiry details */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-8 space-y-2">
                    <div className="text-xs">
                      <span className="text-mutedGray">Target Property: </span>
                      <strong className="text-forest">
                        {prop?.title || 'Korutla Duplex Villa / Plot'}
                      </strong>
                      {prop?.location?.locality && (
                        <span className="text-mutedGray"> ({prop.location.locality})</span>
                      )}
                    </div>

                    <div className="p-3.5 rounded-2xl bg-ivory-50 border border-neutral-200/60 text-xs text-charcoal italic">
                      &ldquo;{inq.message}&rdquo;
                    </div>
                  </div>

                  {/* Actions / Dispatch */}
                  <div className="md:col-span-4 flex flex-col gap-2">
                    {/* Notify Priya Reddy */}
                    <a
                      href={`https://api.whatsapp.com/send?phone=${agentPhone.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(
                        `Hello ${agentName}, new inquiry lead from Korutla Properties:\n\nCustomer: ${inq.userName}\nPhone: ${inq.userPhone}\nProperty: ${prop?.title || 'Listing'}\nMessage: ${inq.message}`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-forest hover:bg-forest/90 text-white font-semibold text-xs shadow-sm transition"
                    >
                      <Send className="w-3.5 h-3.5 text-gold" />
                      <span>Notify {agentName}</span>
                    </a>

                    {/* WhatsApp Customer Directly */}
                    <a
                      href={`https://api.whatsapp.com/send?phone=${inq.userPhone.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(
                        `Hello ${inq.userName}, thank you for your inquiry on "${prop?.title || 'Korutla property'}". We would love to share photos, floor plans, and schedule a site visit for you.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Customer</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdminInquiries;
