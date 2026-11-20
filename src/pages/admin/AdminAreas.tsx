import React, { useState, useEffect } from 'react';
import {
  MapPin,
  PlusCircle,
  Search,
  Edit2,
  Trash2,
  Save,
  X,
  Sparkles,
  ExternalLink,
  IndianRupee,
  Layers,
  Image as ImageIcon,
} from 'lucide-react';
import { supabaseService } from '../../services/supabaseService';
import { LocalityInfo } from '../../data/locations';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import Textarea from '../../components/ui/Textarea';

export const AdminAreas: React.FC = () => {
  const { addToast } = useToast();
  const [localities, setLocalities] = useState<LocalityInfo[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal states for Create & Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [originalSlug, setOriginalSlug] = useState('');

  // Form Fields
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [city, setCity] = useState('Korutla');
  const [avgPrice, setAvgPrice] = useState('₹2,500 / sq.ft');
  const [propertyCount, setPropertyCount] = useState(25);
  const [image, setImage] = useState('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80');
  const [description, setDescription] = useState('');
  const [highlightsInput, setHighlightsInput] = useState('');

  const fetchAreas = async () => {
    try {
      const data = await supabaseService.getLocalities();
      setLocalities(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  const openCreateModal = () => {
    setIsEditing(false);
    setOriginalSlug('');
    setName('');
    setSlug('');
    setCity('Korutla');
    setAvgPrice('₹2,400 / sq.ft');
    setPropertyCount(15);
    setImage('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80');
    setDescription('');
    setHighlightsInput('Prime Location, Fast Growth, 100% Vastu, Good Ground Water');
    setIsModalOpen(true);
  };

  const openEditModal = (loc: LocalityInfo) => {
    setIsEditing(true);
    setOriginalSlug(loc.slug);
    setName(loc.name);
    setSlug(loc.slug);
    setCity(loc.city);
    setAvgPrice(loc.avgPrice);
    setPropertyCount(loc.propertyCount);
    setImage(loc.image);
    setDescription(loc.description);
    setHighlightsInput(loc.highlights ? loc.highlights.join(', ') : '');
    setIsModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEditing) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      );
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) {
      addToast('Please enter an area name and valid slug', 'error');
      return;
    }

    const highlightsArray = highlightsInput
      .split(',')
      .map((h) => h.trim())
      .filter(Boolean);

    const payload: LocalityInfo = {
      name,
      slug,
      city,
      avgPrice,
      propertyCount: Number(propertyCount) || 1,
      image,
      description: description || `Prime residential and commercial area in ${city}.`,
      highlights: highlightsArray.length > 0 ? highlightsArray : ['Prime Location', 'Good Connectivity'],
    };

    if (isEditing) {
      await supabaseService.updateLocality(originalSlug, payload);
      setLocalities((prev) =>
        prev.map((l) => (l.slug === originalSlug ? { ...payload } : l))
      );
      addToast(`Area "${name}" updated successfully!`, 'success');
    } else {
      await supabaseService.createLocality(payload);
      setLocalities((prev) => [payload, ...prev.filter((l) => l.slug !== payload.slug)]);
      addToast(`New area "${name}" created on Korutla Properties!`, 'success');
    }

    setIsModalOpen(false);
  };

  const handleDelete = async (locSlug: string, locName: string) => {
    if (window.confirm(`Are you sure you want to delete the area "${locName}" from the website?`)) {
      await supabaseService.deleteLocality(locSlug);
      setLocalities((prev) => prev.filter((l) => l.slug !== locSlug));
      addToast(`Area "${locName}" deleted from website`, 'info');
    }
  };

  const filtered = localities.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.description.toLowerCase().includes(search.toLowerCase()) ||
      l.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-forest">
              Areas & Places Management (CRUD)
            </h2>
            <span className="bg-gold/15 text-gold-dark text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-gold/30">
              Admin Exclusive
            </span>
          </div>
          <p className="text-xs text-mutedGray font-light mt-1">
            Add new Korutla localities, edit average sq.ft prices, update photos, or remove areas displayed across the site.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-forest hover:bg-forest/90 text-white font-semibold text-xs transition shadow-sm cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-gold" />
          <span>+ Add New Area / Place</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-subtle flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-mutedGray absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search areas (e.g. Gandhi Nagar, Metpally Road, Dharmapuri, Raikal)..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-forest"
          />
        </div>
        <span className="text-xs text-mutedGray whitespace-nowrap">
          Total: <strong className="text-forest">{localities.length} Areas</strong>
        </span>
      </div>

      {/* Areas Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((loc) => (
          <div
            key={loc.slug}
            className="bg-white rounded-3xl border border-neutral-200/80 shadow-subtle overflow-hidden flex flex-col group hover:shadow-md transition"
          >
            {/* Area Cover Image */}
            <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden">
              <img
                src={loc.image}
                alt={loc.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-bold backdrop-blur-sm">
                  {loc.propertyCount} Properties
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="font-serif text-lg font-bold leading-tight">{loc.name}</h3>
                <span className="text-xs text-gold font-semibold flex items-center gap-1">
                  <IndianRupee className="w-3 h-3" /> Avg: {loc.avgPrice}
                </span>
              </div>
            </div>

            {/* Area Details */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <p className="text-xs text-charcoal/80 font-light line-clamp-2">
                {loc.description}
              </p>

              {/* Highlights tags */}
              {loc.highlights && loc.highlights.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {loc.highlights.slice(0, 3).map((h, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-ivory-100 text-charcoal/80 border border-neutral-200"
                    >
                      {h}
                    </span>
                  ))}
                  {loc.highlights.length > 3 && (
                    <span className="text-[10px] px-1.5 py-0.5 text-mutedGray">
                      +{loc.highlights.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-[10px] font-mono text-mutedGray">
                  /{loc.slug}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => openEditModal(loc)}
                    className="p-1.5 rounded-lg border border-neutral-300 text-charcoal hover:bg-neutral-100 transition cursor-pointer"
                    title="Edit Area"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-forest" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(loc.slug, loc.name)}
                    className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition cursor-pointer"
                    title="Delete Area"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Area Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? `Edit Area: ${name}` : 'Add New Area / Place to Website'}
        size="md"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Area / Locality Name"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Gandhi Nagar, Metpally Road"
            />

            <Input
              label="URL Slug (unique)"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. gandhi-nagar"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              label="City / Mandal"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Korutla"
            />

            <Input
              label="Average Price"
              required
              value={avgPrice}
              onChange={(e) => setAvgPrice(e.target.value)}
              placeholder="₹2,600 / sq.ft"
            />

            <Input
              label="Active Properties"
              type="number"
              value={String(propertyCount)}
              onChange={(e) => setPropertyCount(Number(e.target.value))}
              placeholder="25"
            />
          </div>

          <Input
            label="Cover Image URL"
            required
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://images.unsplash.com/..."
          />

          <Textarea
            label="Area Description (Shown on Home & Location Pages)"
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe this area, connectivity, water availability, nearby schools, bus station..."
          />

          <Input
            label="Highlights (Comma separated)"
            value={highlightsInput}
            onChange={(e) => setHighlightsInput(e.target.value)}
            placeholder="Near RTC Bus Stand, 100% Vastu, DTCP Approved, Municipal Water"
          />

          <div className="pt-2 flex items-center justify-end gap-2">
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
              {isEditing ? 'Save Area Updates' : 'Publish Area to Website'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminAreas;
