import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  Video,
  User,
  Phone,
  Mail,
  CheckCircle2,
  MapPin,
  ChevronRight,
  ArrowLeft,
  CalendarCheck,
  MessageCircle,
} from 'lucide-react';
import { propertyService } from '../services/propertyService';
import { supabaseService } from '../services/supabaseService';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';

export const ScheduleVisitPage: React.FC = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const { addToast } = useToast();

  const property = propertyService.getPropertyById(propertyId || '') || propertyService.getAllProperties()[0];

  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [scheduledDate, setScheduledDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('11:00 AM - 12:00 PM');
  const [visitType, setVisitType] = useState<'in-person' | 'video'>('in-person');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const slots = [
    '10:00 AM - 11:00 AM',
    '11:30 AM - 12:30 PM',
    '02:00 PM - 03:00 PM',
    '03:30 PM - 04:30 PM',
    '05:00 PM - 06:00 PM',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName || !visitorPhone || !visitorEmail) {
      addToast('Please fill out all required contact fields', 'error');
      return;
    }
    supabaseService.scheduleVisit({
      propertyId: property.id,
      userId: `usr-${Date.now()}`,
      userName: visitorName,
      userPhone: visitorPhone,
      scheduledDate,
      scheduledTime: timeSlot,
      notes: `${visitType === 'video' ? '[Video Walkthrough] ' : ''}${notes}`,
    });

    // Create real-time notification for Priya Reddy / Assigned Agent
    supabaseService.createNotification({
      agentId: property.agent.id,
      agentName: property.agent.name,
      type: 'visit',
      title: 'New Site Visit Scheduled',
      message: `${visitorName} booked a ${visitType} visit on ${scheduledDate} (${timeSlot}) for "${property.title}".`,
      propertyId: property.id,
      propertyTitle: property.title,
      customerName: visitorName,
      customerPhone: visitorPhone,
      customerEmail: visitorEmail,
      scheduledDate,
      scheduledTime: timeSlot,
    });

    setIsSubmitted(true);
    addToast(`Site visit booked! Notification sent to agent ${property.agent.name}.`, 'success');
  };

  if (isSubmitted) {
    return (
      <div className="pt-28 pb-24 max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 sm:p-12 border border-neutral-200/80 shadow-floating"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CalendarCheck className="w-10 h-10" />
          </div>

          <h2 className="font-serif text-3xl font-bold text-forest mb-2">
            Visit Scheduled Successfully!
          </h2>
          <p className="text-sm text-mutedGray max-w-md mx-auto mb-6 font-light leading-relaxed">
            Your booking reference has been confirmed and dispatched to{' '}
            <strong className="text-forest font-bold">{property.agent.name}</strong>&apos;s agent portal.
          </p>

          {/* Agent notification preview */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-ivory-50 border border-neutral-200/80 text-left mb-6">
            <img
              src={property.agent.photo}
              alt={property.agent.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-forest"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="font-serif text-base font-bold text-forest truncate">
                  {property.agent.name}
                </h4>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              </div>
              <p className="text-xs text-mutedGray">
                Assigned Listing Agent • {property.agent.phone}
              </p>
            </div>
          </div>

          {/* Instant WhatsApp Dispatch Action */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-left space-y-3 mb-8">
            <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm">
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Instant WhatsApp Confirmation</span>
            </div>
            <p className="text-xs text-emerald-700/90 leading-relaxed">
              Notify {property.agent.name} directly on WhatsApp right now to reserve the time slot and receive the Google Maps pin:
            </p>
            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <a
                href={`https://api.whatsapp.com/send?phone=${property.agent.phone.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(
                  `Hello ${property.agent.name}, I just scheduled a site visit for "${property.title}" on Korutla Properties.\n\nDate: ${scheduledDate}\nTime Slot: ${timeSlot}\nFormat: ${visitType === 'in-person' ? 'In-Person Tour' : 'Live Video Walkthrough'}\nName: ${visitorName}\nPhone: ${visitorPhone}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Notify {property.agent.name} on WhatsApp</span>
              </a>
              <a
                href={`tel:${property.agent.phone}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-emerald-300 text-emerald-800 font-semibold text-xs hover:bg-emerald-50 transition"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Agent</span>
              </a>
            </div>
          </div>

          {/* Booking Summary Box */}
          <div className="bg-ivory-100 rounded-2xl p-6 text-left space-y-3 text-sm text-charcoal border border-neutral-200/80 mb-8">
            <div className="flex justify-between pb-2 border-b border-neutral-200">
              <span className="text-xs text-mutedGray">Property</span>
              <span className="font-bold text-forest truncate max-w-xs">{property.title}</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-neutral-200">
              <span className="text-xs text-mutedGray">Date & Time</span>
              <span className="font-semibold text-charcoal">{scheduledDate} ({timeSlot})</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-neutral-200">
              <span className="text-xs text-mutedGray">Visit Format</span>
              <span className="font-semibold capitalize text-forest">
                {visitType === 'in-person' ? 'In-Person Guided Tour' : 'Live Video Walkthrough'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-mutedGray">Visitor</span>
              <span className="font-semibold">{visitorName} ({visitorPhone})</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button to={`/property/${property.id}`} variant="primary" size="md">
              Back to Property Listing
            </Button>
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              size="md"
            >
              Book Another Time
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      {/* Hero Header */}
      <div className="bg-forest text-white py-12 md:py-16 mb-10 border-b border-forest-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-ivory-300 mb-2">
            <Link to={`/property/${property.id}`} className="hover:text-gold flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Property</span>
            </Link>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Schedule a Private Visit
          </h1>
          <p className="text-sm text-ivory-300 font-light">
            Choose a convenient date and time to explore this property in-person or via live video.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Property Summary Card */}
          <div className="md:col-span-5 bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-subtle space-y-4">
            <img
              src={property.coverImage}
              alt={property.title}
              className="w-full aspect-[16/10] object-cover rounded-2xl"
            />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-gold-dark bg-gold/10 px-2.5 py-0.5 rounded">
                {property.category.replace(/-/g, ' ')}
              </span>
              <h3 className="font-serif text-lg font-bold text-forest mt-2 mb-1 leading-snug">
                {property.title}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-mutedGray mb-3">
                <MapPin className="w-3.5 h-3.5 text-forest shrink-0" />
                <span className="truncate">
                  {property.location.locality}, {property.location.city}
                </span>
              </div>
              <div className="font-serif text-2xl font-bold text-forest pb-3 border-b border-neutral-100">
                {property.priceFormatted}
              </div>
            </div>

            {/* Agent info */}
            <div className="flex items-center gap-3 pt-1">
              <img
                src={property.agent.photo}
                alt={property.agent.name}
                className="w-10 h-10 rounded-full object-cover border border-neutral-200"
              />
              <div>
                <span className="text-[10px] text-mutedGray block">Guide for this tour:</span>
                <span className="text-xs font-bold text-forest">{property.agent.name}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visit Form */}
          <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-subtle">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Visit Type Selector */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-charcoal mb-2.5 block">
                  Select Visit Format
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setVisitType('in-person')}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      visitType === 'in-person'
                        ? 'bg-forest text-white border-forest shadow-sm'
                        : 'bg-ivory-100 text-charcoal border-neutral-200 hover:border-forest'
                    }`}
                  >
                    <div className="font-bold text-sm mb-1 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-gold" />
                      In-Person Tour
                    </div>
                    <span className="text-[11px] opacity-80 block font-light leading-snug">
                      Meet agent at property site
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVisitType('video')}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      visitType === 'video'
                        ? 'bg-forest text-white border-forest shadow-sm'
                        : 'bg-ivory-100 text-charcoal border-neutral-200 hover:border-forest'
                    }`}
                  >
                    <div className="font-bold text-sm mb-1 flex items-center gap-1.5">
                      <Video className="w-4 h-4 text-gold" />
                      Video Walkthrough
                    </div>
                    <span className="text-[11px] opacity-80 block font-light leading-snug">
                      Live WhatsApp / Zoom tour
                    </span>
                  </button>
                </div>
              </div>

              {/* Preferred Date */}
              <div>
                <Input
                  label="Preferred Date"
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                />
              </div>

              {/* Available Time Slots */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-charcoal mb-2 block">
                  Preferred Time Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {slots.map((slot) => {
                    const isSelected = timeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeSlot(slot)}
                        className={`p-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer flex items-center gap-2 ${
                          isSelected
                            ? 'bg-forest text-white border-forest'
                            : 'bg-ivory-100 text-charcoal border-neutral-200 hover:border-forest'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5 text-gold" />
                        <span>{slot}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Visitor Details */}
              <div className="space-y-4 pt-4 border-t border-neutral-100">
                <Input
                  label="Your Full Name"
                  required
                  placeholder="e.g. Vinay Kumar"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  leftIcon={<User className="w-4 h-4" />}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label="Phone Number"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={visitorPhone}
                    onChange={(e) => setVisitorPhone(e.target.value)}
                    leftIcon={<Phone className="w-4 h-4" />}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    required
                    placeholder="vinay@example.com"
                    value={visitorEmail}
                    onChange={(e) => setVisitorEmail(e.target.value)}
                    leftIcon={<Mail className="w-4 h-4" />}
                  />
                </div>
                <Textarea
                  label="Special Notes / Questions (Optional)"
                  placeholder="e.g. Interested in Vastu compliance, parking space, or bank loan eligibility..."
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full">
                Confirm & Schedule Visit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleVisitPage;

