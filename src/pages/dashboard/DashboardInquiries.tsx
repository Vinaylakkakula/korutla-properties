import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Check, ExternalLink } from 'lucide-react';
import { inquiries } from '../../data/inquiries';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/ui/Button';

export const DashboardInquiries: React.FC = () => {
  const { addToast } = useToast();
  const [inquiryList, setInquiryList] = useState(inquiries);

  const handleMarkResponded = (id: string) => {
    setInquiryList((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: 'responded' } : inq))
    );
    addToast('Inquiry marked as responded', 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-forest">Inquiries Received</h2>
        <p className="text-xs text-mutedGray mt-0.5">
          Messages and inquiries sent by prospective buyers and tenants for your properties.
        </p>
      </div>

      <div className="space-y-4">
        {inquiryList.map((inq) => (
          <div
            key={inq.id}
            className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-subtle space-y-3"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-sm text-forest">{inq.userName}</h4>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      inq.status === 'pending'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {inq.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-mutedGray">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-forest" />
                    {inq.userPhone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-forest" />
                    {inq.userEmail}
                  </span>
                </div>
              </div>

              {inq.status === 'pending' && (
                <button
                  onClick={() => handleMarkResponded(inq.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-forest text-white hover:bg-forest-900 cursor-pointer flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Mark Done</span>
                </button>
              )}
            </div>

            <p className="text-sm text-charcoal/85 bg-ivory-100 p-3.5 rounded-xl font-light leading-relaxed">
              "{inq.message}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardInquiries;

