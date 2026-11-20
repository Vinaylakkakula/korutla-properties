import React, { useState, useEffect } from 'react';
import {
  Users,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  MessageCircle,
  Edit2,
  Save,
  X,
  Sparkles,
} from 'lucide-react';
import { supabaseService } from '../../services/supabaseService';
import { AgentInfo } from '../../types/property';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';

export const AdminAgents: React.FC = () => {
  const { addToast } = useToast();
  const [agents, setAgents] = useState<AgentInfo[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<AgentInfo | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Edit fields
  const [editPhone, setEditPhone] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editExperience, setEditExperience] = useState('');
  const [editAreas, setEditAreas] = useState('');
  const [editAbout, setEditAbout] = useState('');

  const fetchAgents = async () => {
    try {
      const data = await supabaseService.getAgents();
      setAgents(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const openEditModal = (agent: AgentInfo) => {
    setSelectedAgent(agent);
    setEditPhone(agent.phone);
    setEditEmail(agent.email);
    setEditExperience(agent.experience || '8 years');
    setEditAreas(agent.areasCovered ? agent.areasCovered.join(', ') : 'Korutla Town');
    setEditAbout(agent.about || '');
    setEditModalOpen(true);
  };

  const handleSaveAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAgent) return;

    const areasArray = editAreas
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);

    const updated = await supabaseService.updateAgent(selectedAgent.id, {
      phone: editPhone,
      email: editEmail,
      experience: editExperience,
      areasCovered: areasArray,
      about: editAbout,
    });

    setAgents(updated);
    setEditModalOpen(false);
    addToast(`${selectedAgent.name}'s profile updated successfully`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-forest">
            Exclusive Listing Agents
          </h2>
          <p className="text-xs text-mutedGray font-light">
            Verified local property specialists representing properties across Korutla (505326).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://api.whatsapp.com/send?phone=919440150532&text=Hello%20Priya%20Reddy,%20this%20is%20a%20test%20notification%20from%20Korutla%20Properties%20Admin."
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Test Priya Reddy Notification Line</span>
          </a>
        </div>
      </div>

      {/* Agents Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map((agent) => {
          const isPriya = agent.name.includes('Priya');

          return (
            <div
              key={agent.id}
              className={`rounded-3xl p-6 border shadow-subtle transition relative space-y-4 ${
                isPriya
                  ? 'bg-gradient-to-b from-ivory-50 to-white border-gold/40 shadow-md ring-1 ring-gold/30'
                  : 'bg-white border-neutral-200/80'
              }`}
            >
              {isPriya && (
                <div className="absolute top-4 right-4 bg-gold text-forest text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Lead Representative
                </div>
              )}

              <div className="flex items-start gap-4">
                <img
                  src={agent.photo}
                  alt={agent.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-forest shrink-0 shadow-sm"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-serif text-lg font-bold text-forest truncate">
                      {agent.name}
                    </h3>
                    {agent.isVerified && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                  </div>
                  <span className="text-xs text-mutedGray block">
                    {agent.experience || 'Senior Consultant'}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-forest font-semibold mt-1">
                    <Phone className="w-3 h-3 text-gold" />
                    <span>{agent.phone}</span>
                  </div>
                </div>
              </div>

              {agent.about && (
                <p className="text-xs text-charcoal/80 font-light leading-relaxed line-clamp-2">
                  {agent.about}
                </p>
              )}

              {/* Areas Covered */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-mutedGray block mb-1.5">
                  Coverage Localities in Korutla
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(agent.areasCovered || ['Korutla Town']).map((area, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2.5 py-0.5 rounded-lg bg-forest/5 text-forest font-medium border border-forest/10"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <a
                    href={`https://api.whatsapp.com/send?phone=${agent.phone.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(
                      `Hello ${agent.name}, Admin message from Korutla Properties.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition flex items-center gap-1 shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${agent.phone}`}
                    className="p-1.5 rounded-xl border border-neutral-200 text-charcoal hover:bg-neutral-50 transition"
                    title="Direct Call"
                  >
                    <Phone className="w-3.5 h-3.5 text-forest" />
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => openEditModal(agent)}
                  className="px-3 py-1.5 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-charcoal font-semibold text-xs transition flex items-center gap-1 cursor-pointer"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Agent Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title={selectedAgent ? `Edit Agent: ${selectedAgent.name}` : 'Edit Agent'}
        size="md"
      >
        <form onSubmit={handleSaveAgent} className="space-y-4">
          <Input
            label="Phone Number (for WhatsApp & Calls)"
            value={editPhone}
            onChange={(e) => setEditPhone(e.target.value)}
            required
            placeholder="+91 94401 50532"
          />

          <Input
            label="Email Address"
            type="email"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            required
            placeholder="agent@korutlaproperties.com"
          />

          <Input
            label="Experience"
            value={editExperience}
            onChange={(e) => setEditExperience(e.target.value)}
            placeholder="8 years"
          />

          <Input
            label="Areas Covered (Comma separated)"
            value={editAreas}
            onChange={(e) => setEditAreas(e.target.value)}
            placeholder="Venkateshwara Colony, Shantinagar, Gandhi Nagar"
          />

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">
              About Bio
            </label>
            <textarea
              rows={3}
              value={editAbout}
              onChange={(e) => setEditAbout(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 p-3 text-xs focus:outline-none focus:border-forest"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" leftIcon={<Save className="w-3.5 h-3.5" />}>
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminAgents;
