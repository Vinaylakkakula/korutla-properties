import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Building,
  PlusCircle,
  Search,
  Filter,
  CheckCircle2,
  Star,
  Trash2,
  ExternalLink,
  MapPin,
  IndianRupee,
  Eye,
  Check,
  X,
} from 'lucide-react';
import { supabaseService } from '../../services/supabaseService';
import { Property } from '../../types/property';
import { formatPrice } from '../../utils/format';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/ui/Button';

export const AdminProperties: React.FC = () => {
  const { addToast } = useToast();
  const [properties, setProperties] = useState<Property[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [localityFilter, setLocalityFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      const data = await supabaseService.getProperties();
      setProperties(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleToggleVerified = async (p: Property) => {
    const updated = !p.isVerified;
    await supabaseService.updateProperty(p.id, { isVerified: updated });
    setProperties((prev) =>
      prev.map((item) => (item.id === p.id ? { ...item, isVerified: updated } : item))
    );
    addToast(`Property ${updated ? 'marked Verified' : 'unverified'}`, 'success');
  };

  const handleToggleFeatured = async (p: Property) => {
    const updated = !p.isFeatured;
    await supabaseService.updateProperty(p.id, { isFeatured: updated });
    setProperties((prev) =>
      prev.map((item) => (item.id === p.id ? { ...item, isFeatured: updated } : item))
    );
    addToast(`Property ${updated ? 'marked Featured' : 'unfeatured'}`, 'success');
  };

  const handleChangeStatus = async (id: string, status: Property['status']) => {
    await supabaseService.updateProperty(id, { status });
    setProperties((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
    addToast(`Status updated to ${status}`, 'success');
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      await supabaseService.deleteProperty(id);
      setProperties((prev) => prev.filter((item) => item.id !== id));
      addToast('Property listing deleted successfully', 'info');
    }
  };

  const filtered = properties.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.locality.toLowerCase().includes(search.toLowerCase()) ||
      p.agent?.name?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchLocality = localityFilter === 'all' || p.location.locality === localityFilter;
    return matchSearch && matchStatus && matchLocality;
  });

  const uniqueLocalities = Array.from(new Set(properties.map((p) => p.location.locality))).filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-forest">Properties Management</h2>
          <p className="text-xs text-mutedGray font-light">
            Total {properties.length} listings in Korutla (505326) and surrounding areas.
          </p>
        </div>

        <Link
          to="/sell"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-forest hover:bg-forest/90 text-white font-semibold text-xs transition shadow-sm"
        >
          <PlusCircle className="w-4 h-4 text-gold" />
          <span>+ Add New Listing</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-subtle flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-mutedGray absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, locality (e.g. Gandhi Nagar), or agent..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-forest"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-neutral-200 text-xs bg-white focus:outline-none focus:border-forest"
          >
            <option value="all">All Statuses</option>
            <option value="available">Available</option>
            <option value="under-offer">Under Offer</option>
            <option value="sold">Sold</option>
          </select>

          <select
            value={localityFilter}
            onChange={(e) => setLocalityFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-neutral-200 text-xs bg-white focus:outline-none focus:border-forest"
          >
            <option value="all">All Localities</option>
            {uniqueLocalities.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50/80 border-b border-neutral-200/80 text-[11px] font-bold text-mutedGray uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Property</th>
                <th className="py-3.5 px-3">Price</th>
                <th className="py-3.5 px-3">Locality</th>
                <th className="py-3.5 px-3">Agent</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-3 text-center">Verified</th>
                <th className="py-3.5 px-3 text-center">Featured</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200/70">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-mutedGray">
                    No properties match your filter criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-neutral-50/60 transition">
                    {/* Property info */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.coverImage || p.images[0]}
                          alt={p.title}
                          className="w-14 h-11 rounded-lg object-cover border border-neutral-200 shrink-0"
                        />
                        <div className="min-w-0 max-w-xs">
                          <Link
                            to={`/property/${p.id}`}
                            className="font-bold text-forest hover:text-gold truncate block text-xs"
                            title={p.title}
                          >
                            {p.title}
                          </Link>
                          <span className="text-[10px] text-mutedGray uppercase tracking-wider block">
                            {p.category.replace(/-/g, ' ')} • {p.area} {p.areaUnit}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-3 font-semibold text-charcoal whitespace-nowrap">
                      {p.priceFormatted}
                    </td>

                    {/* Locality */}
                    <td className="py-3.5 px-3 text-mutedGray whitespace-nowrap">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gold shrink-0" />
                        {p.location.locality}
                      </span>
                    </td>

                    {/* Agent */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="font-medium text-forest">{p.agent?.name || 'Priya Reddy'}</span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-3">
                      <select
                        value={p.status}
                        onChange={(e) =>
                          handleChangeStatus(p.id, e.target.value as Property['status'])
                        }
                        className="text-[11px] font-semibold rounded-lg border border-neutral-300 px-2 py-1 bg-white cursor-pointer"
                      >
                        <option value="available">Available</option>
                        <option value="under-offer">Under Offer</option>
                        <option value="sold">Sold</option>
                      </select>
                    </td>

                    {/* Verified Toggle */}
                    <td className="py-3.5 px-3 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleVerified(p)}
                        className={`p-1.5 rounded-lg transition cursor-pointer ${
                          p.isVerified
                            ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                            : 'bg-neutral-100 text-neutral-400 hover:text-neutral-600'
                        }`}
                        title={p.isVerified ? 'Click to Unverify' : 'Click to Verify'}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    </td>

                    {/* Featured Toggle */}
                    <td className="py-3.5 px-3 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(p)}
                        className={`p-1.5 rounded-lg transition cursor-pointer ${
                          p.isFeatured
                            ? 'bg-amber-50 text-amber-500 hover:bg-amber-100'
                            : 'bg-neutral-100 text-neutral-400 hover:text-neutral-600'
                        }`}
                        title={p.isFeatured ? 'Featured listing' : 'Not featured'}
                      >
                        <Star className={`w-4 h-4 ${p.isFeatured ? 'fill-amber-500' : ''}`} />
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1">
                      <Link
                        to={`/property/${p.id}`}
                        target="_blank"
                        className="p-1.5 rounded-lg border border-neutral-200 text-charcoal hover:bg-neutral-100 inline-block"
                        title="View Live Listing"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDelete(p.id, p.title)}
                        className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 inline-block cursor-pointer"
                        title="Delete Listing"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProperties;
