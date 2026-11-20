import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Phone,
  MessageCircle,
  Mail,
  CheckCircle2,
  Calendar,
  MapPin,
  Star,
  Award,
  Globe2,
} from 'lucide-react';
import { agentService } from '../services/agentService';
import { generateCallLink, generateWhatsAppLink } from '../utils/format';
import { useToast } from '../context/ToastContext';
import PropertyCard from '../components/ui/PropertyCard';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import SectionHeading from '../components/ui/SectionHeading';

export const AgentProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToast } = useToast();

  const agent = agentService.getAgentById(id || '') || agentService.getAllAgents()[0];
  const agentProperties = agentService.getAgentProperties(agent.id);
  const agentReviews = agentService.getAgentReviews(agent.id);

  // Contact form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(`Hello ${agent.name}, I would like to consult with you regarding property investment.`);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      addToast('Please enter your name and phone number', 'error');
      return;
    }
    addToast(`Your consultation request has been sent to ${agent.name}!`, 'success');
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div className="pt-24 pb-20">
      {/* Agent Header Hero */}
      <div className="bg-forest text-white py-12 md:py-16 mb-12 border-b border-forest-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
            <img
              src={agent.photo}
              alt={agent.name}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl object-cover border-4 border-gold shadow-floating"
            />

            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="text-xs uppercase tracking-widest text-gold font-bold">
                  Certified Property Advisor
                </span>
                {agent.isVerified && (
                  <span className="inline-flex items-center gap-1 bg-white/20 text-white text-[11px] font-bold px-2 py-0.5 rounded-md">
                    <CheckCircle2 className="w-3 h-3 text-gold" />
                    Verified Broker
                  </span>
                )}
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                {agent.name}
              </h1>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-ivory-200">
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-gold" />
                  <span>{agent.experience || '8+ years'} Experience</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe2 className="w-4 h-4 text-gold" />
                  <span>{agent.languages?.join(', ')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span>{agent.areasCovered?.join(', ')}</span>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3">
                <a
                  href={generateCallLink(agent.phone)}
                  className="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold-dark text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {agent.phone}</span>
                </a>
                <a
                  href={generateWhatsAppLink(agent.phone)}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Agent</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Listings & Reviews (8 Cols) */}
          <div className="lg:col-span-8 space-y-12">
            {/* About */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-subtle">
              <h3 className="font-serif text-xl font-bold text-forest mb-3">About {agent.name}</h3>
              <p className="text-sm text-charcoal/80 leading-relaxed font-light">
                {agent.about}
              </p>
            </div>

            {/* Agent's Listings */}
            <div>
              <SectionHeading
                title={`${agent.name}'s Active Listings`}
                subtitle={`Browse ${agentProperties.length} verified listings managed by this agent.`}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {agentProperties.map((p, idx) => (
                  <PropertyCard key={p.id} property={p} index={idx} />
                ))}
              </div>
            </div>

            {/* Client Reviews */}
            <div>
              <SectionHeading
                title="Client Reviews & Ratings"
                subtitle="Feedback from buyers and investors who worked with this agent."
              />
              <div className="space-y-4">
                {agentReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-subtle"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={rev.userPhoto}
                          alt={rev.userName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-forest">{rev.userName}</h4>
                          <span className="text-xs text-mutedGray">Verified Buyer</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-gold">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(rev.rating) ? 'fill-current' : 'text-neutral-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-charcoal/80 font-light italic leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Agent Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-floating sticky top-28">
              <h3 className="font-serif text-xl font-bold text-forest mb-2">Book Consultation</h3>
              <p className="text-xs text-mutedGray mb-6">
                Schedule a 1-on-1 advisory session with {agent.name} for property search, legal advice, or valuation.
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <Input
                  label="Your Name"
                  required
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Textarea
                  label="Message / Property Requirement"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button type="submit" variant="primary" size="md" className="w-full">
                  Send Consultation Request
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfilePage;

