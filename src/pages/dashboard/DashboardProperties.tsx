import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building,
  CheckCircle2,
  Clock,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  PlusCircle,
  ExternalLink,
} from 'lucide-react';
import { properties } from '../../data/properties';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/ui/Button';

interface MyPropertyItem {
  id: string;
  title: string;
  priceFormatted: string;
  category: string;
  status: 'published' | 'pending' | 'draft' | 'sold' | 'rented';
  views: number;
  inquiries: number;
  coverImage: string;
  locality: string;
}

export const DashboardProperties: React.FC = () => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'pending' | 'draft' | 'sold' | 'rented'>('all');

  const [myProperties, setMyProperties] = useState<MyPropertyItem[]>([
    {
      id: properties[0].id,
      title: properties[0].title,
      priceFormatted: properties[0].priceFormatted,
      category: properties[0].category,
      status: 'published',
      views: 1240,
      inquiries: 14,
      coverImage: properties[0].coverImage,
      locality: properties[0].location.locality,
    },
    {
      id: properties[2].id,
      title: properties[2].title,
      priceFormatted: properties[2].priceFormatted,
      category: properties[2].category,
      status: 'published',
      views: 890,
      inquiries: 8,
      coverImage: properties[2].coverImage,
      locality: properties[2].location.locality,
    },
    {
      id: properties[5].id,
      title: properties[5].title,
      priceFormatted: properties[5].priceFormatted,
      category: properties[5].category,
      status: 'pending',
      views: 120,
      inquiries: 2,
      coverImage: properties[5].coverImage,
      locality: properties[5].location.locality,
    },
    {
      id: 'prop-draft-1',
      title: '3 BHK Lake View Apartment in Kondapur',
      priceFormatted: '₹95 Lakhs',
      category: 'apartment',
      status: 'draft',
      views: 0,
      inquiries: 0,
      coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      locality: 'Kondapur',
    },
    {
      id: properties[7].id,
      title: properties[7].title,
      priceFormatted: properties[7].priceFormatted,
      category: properties[7].category,
      status: 'sold',
      views: 3100,
      inquiries: 32,
      coverImage: properties[7].coverImage,
      locality: properties[7].location.locality,
    },
  ]);

  const handleStatusChange = (id: string, newStatus: MyPropertyItem['status']) => {
    setMyProperties((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    addToast(`Property marked as ${newStatus.toUpperCase()}`, 'success');
  };

  const handleDelete = (id: string) => {
    setMyProperties((prev) => prev.filter((item) => item.id !== id));
    addToast('Property listing removed', 'info');
  };

  const filtered = myProperties.filter((p) => {
    if (activeTab === 'all') return true;
    return p.status === activeTab;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-forest">My Property Listings</h2>
          <p className="text-xs text-mutedGray mt-0.5">
            Manage your active advertisements, view analytics, and update availability status.
          </p>
        </div>

        <Button
          to="/sell"
          variant="primary"
          size="sm"
          leftIcon={<PlusCircle className="w-4 h-4" />}
        >
          Add Listing
        </Button>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-neutral-200">
        {[
          { id: 'all', label: 'All Listings' },
          { id: 'published', label: 'Published' },
          { id: 'pending', label: 'Pending Review' },
          { id: 'draft', label: 'Drafts' },
          { id: 'sold', label: 'Sold' },
          { id: 'rented', label: 'Rented' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-forest text-white'
                : 'text-charcoal/70 hover:bg-neutral-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Properties Table / List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.coverImage}
                alt={item.title}
                className="w-20 h-16 rounded-xl object-cover"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      item.status === 'published'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : item.status === 'pending'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : item.status === 'sold'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : item.status === 'rented'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    {item.status}
                  </span>
                  <span className="text-xs font-bold text-forest">{item.priceFormatted}</span>
                </div>
                <h4 className="font-serif text-base font-bold text-forest leading-snug">
                  {item.title}
                </h4>
                <div className="text-xs text-mutedGray mt-0.5">{item.locality}</div>
              </div>
            </div>

            {/* Metrics & Actions */}
            <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
              <div className="text-left sm:text-right text-xs">
                <div className="font-semibold text-charcoal">{item.views} views</div>
                <span className="text-[10px] text-mutedGray">{item.inquiries} inquiries</span>
              </div>

              {/* Status Action Dropdown */}
              <div className="flex items-center gap-2">
                {item.status === 'published' ? (
                  <>
                    <button
                      onClick={() => handleStatusChange(item.id, 'sold')}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-ivory-200 hover:bg-ivory-300 text-charcoal cursor-pointer"
                    >
                      Mark Sold
                    </button>
                    <button
                      onClick={() => handleStatusChange(item.id, 'rented')}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-ivory-200 hover:bg-ivory-300 text-charcoal cursor-pointer"
                    >
                      Mark Rented
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleStatusChange(item.id, 'published')}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-forest text-white hover:bg-forest-900 cursor-pointer"
                  >
                    Publish
                  </button>
                )}

                <Link
                  to={`/property/${item.id}`}
                  className="p-2 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-charcoal"
                  title="View Public Page"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-lg text-red-500 hover:bg-red-50 cursor-pointer"
                  title="Delete Listing"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardProperties;

