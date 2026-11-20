import React, { useState } from 'react';
import { Calendar, Clock, Phone, CheckCircle2, XCircle } from 'lucide-react';
import { visits } from '../../data/visits';
import { useToast } from '../../context/ToastContext';

export const DashboardVisits: React.FC = () => {
  const { addToast } = useToast();
  const [visitList, setVisitList] = useState(visits);

  const handleUpdateStatus = (id: string, newStatus: 'completed' | 'cancelled') => {
    setVisitList((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: newStatus } : v))
    );
    addToast(`Visit status updated to ${newStatus}`, 'info');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-forest">Scheduled Property Visits</h2>
        <p className="text-xs text-mutedGray mt-0.5">
          Confirmed and pending tours requested by potential buyers.
        </p>
      </div>

      <div className="space-y-4">
        {visitList.map((vis) => (
          <div
            key={vis.id}
            className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-forest">{vis.userName}</span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    vis.status === 'scheduled'
                      ? 'bg-purple-50 text-purple-700 border border-purple-200'
                      : vis.status === 'completed'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {vis.status}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal">
                <div className="flex items-center gap-1.5 text-forest font-semibold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{vis.scheduledDate}</span>
                </div>
                <div className="flex items-center gap-1.5 text-mutedGray">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{vis.scheduledTime}</span>
                </div>
                <div className="flex items-center gap-1.5 text-mutedGray">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{vis.userPhone}</span>
                </div>
              </div>

              {vis.notes && (
                <p className="text-xs text-mutedGray italic bg-ivory-100 p-2.5 rounded-lg max-w-lg">
                  "{vis.notes}"
                </p>
              )}
            </div>

            {vis.status === 'scheduled' && (
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleUpdateStatus(vis.id, 'completed')}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 flex items-center gap-1 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Completed</span>
                </button>
                <button
                  onClick={() => handleUpdateStatus(vis.id, 'cancelled')}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-100 text-red-600 hover:bg-red-50 flex items-center gap-1 cursor-pointer"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardVisits;

