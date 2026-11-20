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
  PlusCircle,
  Trash2,
} from 'lucide-react';
import { supabaseService } from '../../services/supabaseService';
import { AgentInfo } from '../../types/property';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import Textarea from '../../components/ui/Textarea';

export const AdminAgents: React.FC = () => {
  const { addToast } = useToast();
  const [agents, setAgents] = useState<AgentInfo[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<AgentInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Edit fields
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('8 years');
  const [areas, setAreas] = useState('');
  const [about, setAbout] = useState('');
  const [isVerified, setIsVerified] = useState(true);

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

  const openAddModal = () => {
    setIsAddingNew(true);
    setSelectedAgent(null);
    setName('');
    setPhoto('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80');
    setPhone('+91 94401 50532');
    setEmail('agent@korutlaproperties.com');
    setExperience('6 years');
    setAreas('Korutla Town, Metpally Road, Gandhi Nagar');
    setAbout('Dedicated real estate consultant in Korutla specializing in residential properties and clear title plots.');
    setIsVerified(true);
    setIsModalOpen(true);
  };

  const openEditModal = (agent: AgentInfo) => {
    setIsAddingNew(false);
    setSelectedAgent(agent);
    setName(agent.name);
    setPhoto(agent.photo);
    setPhone(agent.phone);
    setEmail(agent.email);
    setExperience(agent.experience || '8 years');
    setAreas(agent.areasCovered ? agent.areasCovered.join(', ') : 'Korutla Town');
    setAbout(agent.about || '');
    setIsVerified(Boolean(agent.isVerified));
    setIsModalOpen(true);
  };

  const handleSaveAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      addToast('Name and phone number are required', 'error');
      return;
    }

    const areasArray = areas
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);

    if (isAddingNew) {
      const newAgent: AgentInfo = {
        id: `agent-${Date.now()}`,
        name,
        photo: photo || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
        phone,
        email: email || 'agent@korutlaproperties.com',
        experience,
        areasCovered: areasArray,
        about,
        isVerified,
        languages: ['Telugu', 'Hindi', 'English'],
      };

      await supabaseService.createAgent(newAgent);
      setAgents((prev) => [...prev, newAgent]);
      addToast(`Agent "${name}" added to Korutla team!`, 'success');
    } else if (selectedAgent) {
      const updated = await supabaseService.updateAgent(selectedAgent.id, {
        name,
        photo,
        phone,
        email,
        experience,
        areasCovered: areasArray,
        about,
        isVerified,
      });

      setAgents(updated);
      addToast(`${name}'s profile updated successfully`, 'success');
    }

    setIsModalOpen(false);
  };

  const handleDeleteAgent = async (id: string, agentName: string) => {
    if (window.confirm(`Are you sure you want to remove agent "${agentName}"?`)) {
      await supabaseService.deleteAgent(id);
      setAgents((prev) => prev.filter((a) => a.id !== id));
      addToast(`Agent "${agentName}" removed`, 'info');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-forest">
              Agents Management (CRUD)
            </h2>
            <span className="bg-forest/10 text-forest text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              Full Admin Rights
            </span>
          </div>
          <p className="text-xs text-mutedGray font-light mt-1">
            Add new agents, edit contact numbers & coverage areas, or test notification lines.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={openAddModal}
            className="px-4 py-2 rounded-xl bg-forest hover:bg-forest/90 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5 text-gold" />
            <span>+ Add New Agent</span>
          </button>

          <a
            href="https://api.whatsapp.com/send?phone=919440150532&text=Hello%20Priya%20Reddy,%20this%20is%20a%20test%20notification%20from%20Korutla%20Properties%20Admin."
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Test Priya Reddy Alert</span>
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

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => openEditModal(agent)}
                    className="px-3 py-1.5 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-charcoal font-semibold text-xs transition flex items-center gap-1 cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>

                  {!isPriya && (
                    <button
                      type="button"
                      onClick={() => handleDeleteAgent(agent.id, agent.name)}
                      className="p-1.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition cursor-pointer"
                      title="Delete Agent"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit / Add Agent Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isAddingNew ? 'Add New Agent to Korutla Team' : `Edit Agent: ${name}`}
        size="md"
      >
        <form onSubmit={handleSaveAgent} className="space-y-4">
          <Input
            label="Agent Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="e.g. Priya Reddy, Ramesh Goud"
          />

          <Input
            label="Photo URL"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            required
            placeholder="https://images.unsplash.com/..."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Phone Number (for WhatsApp & Calls)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="+91 94401 50532"
            />

            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="agent@korutlaproperties.com"
            />
          </div>

          <Input
            label="Experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="8 years"
          />

          <Input
            label="Areas Covered (Comma separated)"
            value={areas}
            onChange={(e) => setAreas(e.target.value)}
            placeholder="Venkateshwara Colony, Shantinagar, Gandhi Nagar"
          />

          <Textarea
            label="About Bio"
            rows={3}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Experienced local consultant in Korutla..."
          />

          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-charcoal pt-1">
            <input
              type="checkbox"
              checked={isVerified}
              onChange={(e) => setIsVerified(e.target.checked)}
              className="rounded text-forest focus:ring-forest w-4 h-4"
            />
            <span>Verified Agent Badge</span>
          </label>

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
              {isAddingNew ? 'Add Agent' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminAgents;
