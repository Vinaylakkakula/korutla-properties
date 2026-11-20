import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Building,
  PlusCircle,
  Search,
  CheckCircle2,
  Star,
  Trash2,
  ExternalLink,
  MapPin,
  IndianRupee,
  Eye,
  Edit2,
  Save,
  X,
  Sparkles,
} from 'lucide-react';
import { supabaseService } from '../../services/supabaseService';
import { Property, PropertyCategory, FacingType } from '../../types/property';
import { formatPrice } from '../../utils/format';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import Textarea from '../../components/ui/Textarea';

export const AdminProperties: React.FC = () => {
  const { addToast } = useToast();
  const [properties, setProperties] = useState<Property[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [localityFilter, setLocalityFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Modal State for Edit / Add
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState('');

  // Form Fields
  const [editTitle, setEditTitle] = useState('');
  const [editPrice, setEditPrice] = useState('18500000');
  const [editPriceFormatted, setEditPriceFormatted] = useState('₹1.85 Cr');
  const [editCategory, setEditCategory] = useState<PropertyCategory>('independent-house');
  const [editListingType, setEditListingType] = useState<'sale' | 'rent'>('sale');
  const [editLocality, setEditLocality] = useState('Gandhi Nagar');
  const [editArea, setEditArea] = useState('2400');
  const [editAreaUnit, setEditAreaUnit] = useState('sqft');
  const [editBedrooms, setEditBedrooms] = useState('3');
  const [editBathrooms, setEditBathrooms] = useState('3');
  const [editFacing, setEditFacing] = useState<FacingType>('east');
  const [editStatus, setEditStatus] = useState<Property['status']>('available');
  const [editCoverImage, setEditCoverImage] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editIsVerified, setEditIsVerified] = useState(true);
  const [editIsFeatured, setEditIsFeatured] = useState(false);

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

  const openCreateModal = () => {
    setIsEditing(false);
    setSelectedPropertyId('');
    setEditTitle('');
    setEditPrice('12500000');
    setEditPriceFormatted('₹1.25 Cr');
    setEditCategory('independent-house');
    setEditListingType('sale');
    setEditLocality('Gandhi Nagar');
    setEditArea('2000');
    setEditAreaUnit('sqft');
    setEditBedrooms('3');
    setEditBathrooms('3');
    setEditFacing('east');
    setEditStatus('available');
    setEditCoverImage('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80');
    setEditDescription('Beautiful, 100% Vastu-compliant property in a prime Korutla location with clear title and municipal water.');
    setEditIsVerified(true);
    setEditIsFeatured(false);
    setIsModalOpen(true);
  };

  const openEditModal = (p: Property) => {
    setIsEditing(true);
    setSelectedPropertyId(p.id);
    setEditTitle(p.title);
    setEditPrice(String(p.price));
    setEditPriceFormatted(p.priceFormatted);
    setEditCategory(p.category);
    setEditListingType(p.listingType);
    setEditLocality(p.location.locality);
    setEditArea(String(p.area));
    setEditAreaUnit(p.areaUnit);
    setEditBedrooms(p.bedrooms ? String(p.bedrooms) : '3');
    setEditBathrooms(p.bathrooms ? String(p.bathrooms) : '2');
    setEditFacing(p.facing || 'east');
    setEditStatus(p.status || 'available');
    setEditCoverImage(p.coverImage || (p.images && p.images[0]) || '');
    setEditDescription(p.description);
    setEditIsVerified(p.isVerified);
    setEditIsFeatured(p.isFeatured);
    setIsModalOpen(true);
  };

  const handlePriceNumberChange = (raw: string) => {
    setEditPrice(raw);
    const num = Number(raw) || 0;
    if (num >= 10000000) {
      setEditPriceFormatted(`₹${(num / 10000000).toFixed(2).replace(/\.00$/, '')} Cr`);
    } else if (num >= 100000) {
      setEditPriceFormatted(`₹${(num / 100000).toFixed(2).replace(/\.00$/, '')} Lakhs`);
    } else {
      setEditPriceFormatted(`₹${num.toLocaleString('en-IN')}`);
    }
  };

  const handleSaveProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTitle) {
      addToast('Please enter a property title', 'error');
      return;
    }

    const payload: Partial<Property> = {
      title: editTitle,
      price: Number(editPrice) || 5000000,
      priceFormatted: editPriceFormatted,
      category: editCategory,
      listingType: editListingType,
      location: {
        city: 'Korutla',
        state: 'Telangana',
        locality: editLocality,
        address: `${editLocality}, Korutla - 505326`,
        lat: 18.8208,
        lng: 78.7118,
      },
      area: Number(editArea) || 1200,
      areaUnit: editAreaUnit as any,
      bedrooms: Number(editBedrooms) || undefined,
      bathrooms: Number(editBathrooms) || undefined,
      facing: editFacing,
      status: editStatus,
      coverImage: editCoverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      images: [editCoverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'],
      description: editDescription,
      isVerified: editIsVerified,
      isFeatured: editIsFeatured,
    };

    if (isEditing && selectedPropertyId) {
      await supabaseService.updateProperty(selectedPropertyId, payload);
      setProperties((prev) =>
        prev.map((item) =>
          item.id === selectedPropertyId ? ({ ...item, ...payload } as Property) : item
        )
      );
      addToast(`Property "${editTitle}" updated successfully!`, 'success');
    } else {
      const created = await supabaseService.createProperty({
        ...payload,
        propertyType: 'residential',
        priceUnit: 'total',
        isPremium: false,
        isNew: true,
        amenities: ['Power Backup', '24/7 Water', 'Clear Title'],
        agent: {
          id: 'agent-2',
          name: 'Priya Reddy',
          phone: '+91 94401 50532',
          email: 'priya.reddy@korutlaproperties.com',
          photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
          isVerified: true,
        },
      } as any);

      setProperties((prev) => [created, ...prev]);
      addToast(`New listing created on website!`, 'success');
    }

    setIsModalOpen(false);
  };

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
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-forest">Properties Management (CRUD)</h2>
            <span className="bg-forest/10 text-forest text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              Full Edit & Delete Control
            </span>
          </div>
          <p className="text-xs text-mutedGray font-light mt-1">
            Total {properties.length} listings in Korutla (505326). Edit prices, descriptions, or remove anytime.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-forest hover:bg-forest/90 text-white font-semibold text-xs transition shadow-sm cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-gold" />
          <span>+ Add New Listing</span>
        </button>
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
                          <span
                            className="font-bold text-forest hover:text-gold truncate block text-xs cursor-pointer"
                            onClick={() => openEditModal(p)}
                            title="Click to edit property"
                          >
                            {p.title}
                          </span>
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
                      {/* EDIT BUTTON */}
                      <button
                        type="button"
                        onClick={() => openEditModal(p)}
                        className="p-1.5 rounded-lg border border-neutral-300 text-forest hover:bg-forest/5 inline-block cursor-pointer"
                        title="Edit Property Listing"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

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

      {/* FULL EDIT / ADD PROPERTY MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? `Edit Listing: ${editTitle}` : 'Add New Property (Admin)'}
        size="lg"
      >
        <form onSubmit={handleSaveProperty} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          <Input
            label="Property Title"
            required
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="e.g. 3 BHK Luxury Duplex Villa in Venkateshwara Colony"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Category
              </label>
              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value as PropertyCategory)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white focus:outline-none focus:border-forest"
              >
                <option value="independent-house">Independent House</option>
                <option value="residential-plot">Residential Plot</option>
                <option value="open-plot">Open Plot</option>
                <option value="apartment-development-plot">Development Plot</option>
                <option value="commercial-space">Commercial Space</option>
                <option value="commercial-plot">Commercial Plot</option>
                <option value="farm-land">Farm Land</option>
                <option value="agricultural-land">Agricultural Land</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Listing Purpose
              </label>
              <select
                value={editListingType}
                onChange={(e) => setEditListingType(e.target.value as 'sale' | 'rent')}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white focus:outline-none focus:border-forest"
              >
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Price (in Rupees)"
              type="number"
              required
              value={editPrice}
              onChange={(e) => handlePriceNumberChange(e.target.value)}
              placeholder="18500000"
            />

            <Input
              label="Price Formatted Display"
              required
              value={editPriceFormatted}
              onChange={(e) => setEditPriceFormatted(e.target.value)}
              placeholder="₹1.85 Cr"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              label="Locality / Area in Korutla"
              required
              value={editLocality}
              onChange={(e) => setEditLocality(e.target.value)}
              placeholder="Venkateshwara Colony"
            />

            <Input
              label="Area Size"
              type="number"
              required
              value={editArea}
              onChange={(e) => setEditArea(e.target.value)}
              placeholder="2400"
            />

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Area Unit
              </label>
              <select
                value={editAreaUnit}
                onChange={(e) => setEditAreaUnit(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white focus:outline-none focus:border-forest"
              >
                <option value="sqft">Sq. Ft</option>
                <option value="sqyd">Sq. Yards (Gajam)</option>
                <option value="acres">Acres</option>
                <option value="gunthas">Guntas</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <Input
              label="Bedrooms"
              type="number"
              value={editBedrooms}
              onChange={(e) => setEditBedrooms(e.target.value)}
              placeholder="3"
            />

            <Input
              label="Bathrooms"
              type="number"
              value={editBathrooms}
              onChange={(e) => setEditBathrooms(e.target.value)}
              placeholder="3"
            />

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Facing
              </label>
              <select
                value={editFacing}
                onChange={(e) => setEditFacing(e.target.value as FacingType)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white focus:outline-none focus:border-forest"
              >
                <option value="east">East Facing</option>
                <option value="north">North Facing</option>
                <option value="west">West Facing</option>
                <option value="south">South Facing</option>
                <option value="north-east">North-East Facing</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Status
              </label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value as Property['status'])}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white focus:outline-none focus:border-forest"
              >
                <option value="available">Available</option>
                <option value="under-offer">Under Offer</option>
                <option value="sold">Sold</option>
              </select>
            </div>
          </div>

          <Input
            label="Cover Image URL"
            required
            value={editCoverImage}
            onChange={(e) => setEditCoverImage(e.target.value)}
            placeholder="https://images.unsplash.com/photo-..."
          />

          <Textarea
            label="Description & Highlights"
            required
            rows={3}
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Describe property condition, layout, water facility, proximity to bus stand or temples..."
          />

          <div className="flex items-center gap-6 pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-charcoal">
              <input
                type="checkbox"
                checked={editIsVerified}
                onChange={(e) => setEditIsVerified(e.target.checked)}
                className="rounded text-forest focus:ring-forest w-4 h-4"
              />
              <span>Verified Listing Badge</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-charcoal">
              <input
                type="checkbox"
                checked={editIsFeatured}
                onChange={(e) => setEditIsFeatured(e.target.checked)}
                className="rounded text-forest focus:ring-forest w-4 h-4"
              />
              <span>Featured Listing (Home Page)</span>
            </label>
          </div>

          <div className="pt-3 border-t border-neutral-100 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              leftIcon={<Save className="w-3.5 h-3.5" />}
            >
              {isEditing ? 'Save Changes' : 'Create Listing'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminProperties;
