import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Property, Inquiry, Visit, User, AgentInfo, AgentNotification } from '../types/property';
import { properties as localSeedProperties } from '../data/properties';
import { agents as localAgents } from '../data/agents';
import { korutlaLocalities, LocalityInfo } from '../data/locations';

const STORAGE_PROPERTIES_KEY = 'korutla_properties_db_custom';
const STORAGE_DELETED_PROPERTIES_KEY = 'korutla_properties_db_deleted';
const STORAGE_INQUIRIES_KEY = 'korutla_properties_db_inquiries';
const STORAGE_VISITS_KEY = 'korutla_properties_db_visits';
const STORAGE_AGENTS_KEY = 'korutla_properties_db_agents';
const STORAGE_NOTIFICATIONS_KEY = 'korutla_properties_db_notifications';
const STORAGE_LOCALITIES_KEY = 'korutla_properties_db_localities';
const STORAGE_DELETED_LOCALITIES_KEY = 'korutla_properties_db_deleted_localities';

// Initial seed inquiries for Korutla Admin
const DEFAULT_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-101',
    propertyId: 'prop-2',
    userId: 'usr-1',
    userName: 'Ramesh Chander Rao',
    userEmail: 'ramesh.chander@gmail.com',
    userPhone: '+91 98492 11234',
    message: 'Interested in the Venkateshwara Colony duplex villa. Is the price slightly negotiable for immediate registration?',
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: 'inq-102',
    propertyId: 'prop-4',
    userId: 'usr-2',
    userName: 'Suresh Reddy (Gulf NRI)',
    userEmail: 'suresh.dubai@yahoo.com',
    userPhone: '+971 50 1234567',
    message: 'We are looking to invest in 200 Sq Yds open plot in Metpally Road Korutla. Please send legal layout copy and video walkthrough to WhatsApp.',
    status: 'responded',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
  {
    id: 'inq-103',
    propertyId: 'prop-1',
    userId: 'usr-3',
    userName: 'Kavitha Ananthula',
    userEmail: 'kavitha.a@gmail.com',
    userPhone: '+91 94405 67890',
    message: 'Is this independent house 100% East facing and is Municipal tap water connection available?',
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
  },
];

// Initial seed visits for Korutla Admin
const DEFAULT_VISITS: Visit[] = [
  {
    id: 'vis-201',
    propertyId: 'prop-2',
    userId: 'usr-1',
    userName: 'Ramesh Chander Rao',
    userPhone: '+91 98492 11234',
    scheduledDate: '2026-11-23',
    scheduledTime: '11:00 AM',
    status: 'scheduled',
    notes: 'Requested Priya Reddy to meet directly at Venkateshwara Colony near Hanuman Temple arch.',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'vis-202',
    propertyId: 'prop-3',
    userId: 'usr-4',
    userName: 'Dr. Srinivas Goud',
    userPhone: '+91 99890 33445',
    scheduledDate: '2026-11-24',
    scheduledTime: '04:30 PM',
    status: 'scheduled',
    notes: 'Commercial showroom inspection with civil contractor.',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 'vis-203',
    propertyId: 'prop-6',
    userId: 'usr-5',
    userName: 'Naveen Kumar',
    userPhone: '+91 98481 22334',
    scheduledDate: '2026-11-20',
    scheduledTime: '10:00 AM',
    status: 'completed',
    notes: 'Completed site visit for Dharmapuri agricultural land. Clear passbook verified.',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

// Seed notifications for Priya Reddy & Admin
const DEFAULT_NOTIFICATIONS: AgentNotification[] = [
  {
    id: 'notif-1',
    agentId: 'agent-2',
    agentName: 'Priya Reddy',
    type: 'visit',
    title: 'New Site Visit Scheduled',
    message: 'Ramesh Chander Rao booked a site visit for Duplex Villa in Venkateshwara Colony.',
    propertyId: 'prop-2',
    propertyTitle: '3 BHK Luxury Duplex Villa in Venkateshwara Colony',
    customerName: 'Ramesh Chander Rao',
    customerPhone: '+91 98492 11234',
    customerEmail: 'ramesh.chander@gmail.com',
    scheduledDate: '2026-11-23',
    scheduledTime: '11:00 AM',
    isRead: false,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'notif-2',
    agentId: 'agent-2',
    agentName: 'Priya Reddy',
    type: 'inquiry',
    title: 'New Property Inquiry',
    message: 'Ramesh Chander Rao submitted an inquiry asking if the price is negotiable for immediate registration.',
    propertyId: 'prop-2',
    propertyTitle: '3 BHK Luxury Duplex Villa in Venkateshwara Colony',
    customerName: 'Ramesh Chander Rao',
    customerPhone: '+91 98492 11234',
    customerEmail: 'ramesh.chander@gmail.com',
    isRead: false,
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: 'notif-3',
    agentId: 'agent-1',
    agentName: 'Rajesh Goud',
    type: 'inquiry',
    title: 'New Property Inquiry',
    message: 'Kavitha Ananthula enquired about East facing orientation and municipal water.',
    propertyId: 'prop-1',
    propertyTitle: 'Spacious Independent House in Gandhi Nagar',
    customerName: 'Kavitha Ananthula',
    customerPhone: '+91 94405 67890',
    isRead: true,
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
  },
];

export const supabaseService = {
  /**
   * Fetch all properties from Supabase, or fallback to local storage / seed
   */
  async getProperties(): Promise<Property[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*, agent:agents(*)')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            price: Number(item.price),
            priceFormatted: item.price_formatted,
            priceUnit: item.price_unit,
            listingType: item.listing_type,
            propertyType: item.property_type,
            category: item.category,
            location: item.location || {
              city: item.city || 'Korutla',
              state: item.state || 'Telangana',
              locality: item.locality || 'Korutla Town',
              address: item.address || 'Korutla - 505326',
              lat: item.lat ? Number(item.lat) : 18.8208,
              lng: item.lng ? Number(item.lng) : 78.7118,
            },
            bedrooms: item.bedrooms ? Number(item.bedrooms) : undefined,
            bathrooms: item.bathrooms ? Number(item.bathrooms) : undefined,
            area: Number(item.area),
            areaUnit: item.area_unit,
            facing: item.facing,
            floor: item.floor ? Number(item.floor) : undefined,
            totalFloors: item.total_floors ? Number(item.total_floors) : undefined,
            furnishing: item.furnishing,
            parking: item.parking ? Number(item.parking) : undefined,
            amenities: Array.isArray(item.amenities) ? item.amenities : [],
            images: Array.isArray(item.images) ? item.images : [item.cover_image],
            coverImage: item.cover_image,
            isVerified: Boolean(item.is_verified),
            isFeatured: Boolean(item.is_featured),
            isPremium: Boolean(item.is_premium),
            isNew: Boolean(item.is_new),
            createdAt: item.created_at,
            agent: item.agent || localAgents[0],
            plotDetails: item.plot_details,
            status: item.status || 'available',
            deposit: item.deposit ? Number(item.deposit) : undefined,
          }));
        }
      } catch (e) {
        console.warn('Supabase fetch failed, falling back to local storage cache:', e);
      }
    }

    // Fallback: Read from localStorage or return seed properties
    try {
      const stored = localStorage.getItem(STORAGE_PROPERTIES_KEY);
      const customProps: Property[] = stored ? JSON.parse(stored) : [];
      const deletedIds: string[] = JSON.parse(localStorage.getItem(STORAGE_DELETED_PROPERTIES_KEY) || '[]');
      
      const combined = [...customProps, ...localSeedProperties];
      return combined.filter((p) => !deletedIds.includes(p.id));
    } catch {
      return [...localSeedProperties];
    }
  },

  /**
   * Update property (Admin)
   */
  async updateProperty(id: string, updates: Partial<Property>): Promise<Property | null> {
    if (isSupabaseConfigured()) {
      try {
        await supabase
          .from('properties')
          .update({
            ...(updates.title && { title: updates.title }),
            ...(updates.price !== undefined && { price: updates.price }),
            ...(updates.priceFormatted && { price_formatted: updates.priceFormatted }),
            ...(updates.status && { status: updates.status }),
            ...(updates.isFeatured !== undefined && { is_featured: updates.isFeatured }),
            ...(updates.isVerified !== undefined && { is_verified: updates.isVerified }),
          })
          .eq('id', id);
      } catch (e) {
        console.warn('Supabase update failed:', e);
      }
    }

    try {
      const stored = localStorage.getItem(STORAGE_PROPERTIES_KEY);
      let customProps: Property[] = stored ? JSON.parse(stored) : [];
      const existingIdx = customProps.findIndex((p) => p.id === id);

      if (existingIdx >= 0) {
        customProps[existingIdx] = { ...customProps[existingIdx], ...updates };
      } else {
        const seedProp = localSeedProperties.find((p) => p.id === id);
        if (seedProp) {
          customProps.push({ ...seedProp, ...updates });
        }
      }
      localStorage.setItem(STORAGE_PROPERTIES_KEY, JSON.stringify(customProps));
      return { ...(localSeedProperties.find((p) => p.id === id) || {}), ...updates } as Property;
    } catch {
      return null;
    }
  },

  /**
   * Delete property (Admin)
   */
  async deleteProperty(id: string): Promise<boolean> {
    if (isSupabaseConfigured()) {
      try {
        await supabase.from('properties').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase delete failed:', e);
      }
    }

    try {
      // Remove from custom list if present
      const stored = localStorage.getItem(STORAGE_PROPERTIES_KEY);
      if (stored) {
        const customProps: Property[] = JSON.parse(stored);
        localStorage.setItem(
          STORAGE_PROPERTIES_KEY,
          JSON.stringify(customProps.filter((p) => p.id !== id))
        );
      }

      // Add to deleted ids list
      const deletedIds: string[] = JSON.parse(localStorage.getItem(STORAGE_DELETED_PROPERTIES_KEY) || '[]');
      if (!deletedIds.includes(id)) {
        deletedIds.push(id);
        localStorage.setItem(STORAGE_DELETED_PROPERTIES_KEY, JSON.stringify(deletedIds));
      }
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Insert a new property into Supabase (and cache locally)
   */
  async createProperty(property: Omit<Property, 'id' | 'createdAt'>): Promise<Property> {
    const newProperty: Property = {
      ...property,
      id: `prop-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    if (isSupabaseConfigured()) {
      try {
        const payload = {
          id: newProperty.id,
          title: newProperty.title,
          description: newProperty.description,
          price: newProperty.price,
          price_formatted: newProperty.priceFormatted,
          price_unit: newProperty.priceUnit,
          listing_type: newProperty.listingType,
          property_type: newProperty.propertyType,
          category: newProperty.category,
          location: newProperty.location,
          city: newProperty.location.city,
          locality: newProperty.location.locality,
          address: newProperty.location.address,
          lat: newProperty.location.lat,
          lng: newProperty.location.lng,
          bedrooms: newProperty.bedrooms,
          bathrooms: newProperty.bathrooms,
          area: newProperty.area,
          area_unit: newProperty.areaUnit,
          facing: newProperty.facing,
          floor: newProperty.floor,
          total_floors: newProperty.totalFloors,
          furnishing: newProperty.furnishing,
          parking: newProperty.parking,
          amenities: newProperty.amenities,
          images: newProperty.images,
          cover_image: newProperty.coverImage,
          is_verified: newProperty.isVerified,
          is_featured: newProperty.isFeatured,
          is_premium: newProperty.isPremium,
          is_new: newProperty.isNew,
          agent_id: newProperty.agent?.id || localAgents[0].id,
          status: newProperty.status || 'available',
          created_at: newProperty.createdAt,
        };

        await supabase.from('properties').insert(payload);
      } catch (e) {
        console.warn('Could not insert to live Supabase, saving to local store:', e);
      }
    }

    // Always cache into localStorage so newly listed properties appear immediately
    try {
      const stored = localStorage.getItem(STORAGE_PROPERTIES_KEY);
      const customProps: Property[] = stored ? JSON.parse(stored) : [];
      customProps.unshift(newProperty);
      localStorage.setItem(STORAGE_PROPERTIES_KEY, JSON.stringify(customProps));
    } catch (e) {
      console.error('Failed to save property locally:', e);
    }

    return newProperty;
  },

  /**
   * Submit an inquiry to Supabase
   */
  async submitInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Promise<Inquiry> {
    const newInquiry: Inquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('inquiries').insert({
          id: newInquiry.id,
          property_id: newInquiry.propertyId,
          user_id: newInquiry.userId,
          user_name: newInquiry.userName,
          user_email: newInquiry.userEmail,
          user_phone: newInquiry.userPhone,
          message: newInquiry.message,
          status: newInquiry.status,
          created_at: newInquiry.createdAt,
        });
      } catch (e) {
        console.warn('Could not save inquiry to Supabase:', e);
      }
    }

    try {
      const stored = localStorage.getItem(STORAGE_INQUIRIES_KEY);
      const inquiries: Inquiry[] = stored ? JSON.parse(stored) : [];
      inquiries.unshift(newInquiry);
      localStorage.setItem(STORAGE_INQUIRIES_KEY, JSON.stringify(inquiries));
    } catch {}

    return newInquiry;
  },

  /**
   * Schedule a site visit to Supabase
   */
  async scheduleVisit(visit: Omit<Visit, 'id' | 'createdAt' | 'status'>): Promise<Visit> {
    const newVisit: Visit = {
      ...visit,
      id: `vis-${Date.now()}`,
      status: 'scheduled',
      createdAt: new Date().toISOString(),
    };

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('property_visits').insert({
          id: newVisit.id,
          property_id: newVisit.propertyId,
          user_id: newVisit.userId,
          user_name: newVisit.userName,
          user_phone: newVisit.userPhone,
          scheduled_date: newVisit.scheduledDate,
          scheduled_time: newVisit.scheduledTime,
          status: newVisit.status,
          notes: newVisit.notes,
          created_at: newVisit.createdAt,
        });
      } catch (e) {
        console.warn('Could not save visit to Supabase:', e);
      }
    }

    try {
      const stored = localStorage.getItem(STORAGE_VISITS_KEY);
      const list: Visit[] = stored ? JSON.parse(stored) : [];
      list.unshift(newVisit);
      localStorage.setItem(STORAGE_VISITS_KEY, JSON.stringify(list));
    } catch {}

    return newVisit;
  },

  /**
   * Fetch inquiries (Admin & Agent)
   */
  async getInquiries(): Promise<Inquiry[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('inquiries')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          return data.map((item: any) => ({
            id: item.id,
            propertyId: item.property_id,
            userId: item.user_id,
            userName: item.user_name,
            userEmail: item.user_email,
            userPhone: item.user_phone,
            message: item.message,
            status: item.status || 'pending',
            createdAt: item.created_at,
          }));
        }
      } catch (e) {
        console.warn('Could not fetch inquiries from Supabase:', e);
      }
    }

    try {
      const stored = localStorage.getItem(STORAGE_INQUIRIES_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_INQUIRIES_KEY, JSON.stringify(DEFAULT_INQUIRIES));
        return DEFAULT_INQUIRIES;
      }
      return JSON.parse(stored);
    } catch {
      return DEFAULT_INQUIRIES;
    }
  },

  /**
   * Update inquiry status
   */
  async updateInquiryStatus(id: string, status: Inquiry['status']): Promise<void> {
    if (isSupabaseConfigured()) {
      try {
        await supabase.from('inquiries').update({ status }).eq('id', id);
      } catch (e) {
        console.warn('Supabase update inquiry failed:', e);
      }
    }

    try {
      const inqs = await this.getInquiries();
      const updated = inqs.map((inq) => (inq.id === id ? { ...inq, status } : inq));
      localStorage.setItem(STORAGE_INQUIRIES_KEY, JSON.stringify(updated));
    } catch {}
  },

  /**
   * Delete inquiry
   */
  async deleteInquiry(id: string): Promise<void> {
    if (isSupabaseConfigured()) {
      try {
        await supabase.from('inquiries').delete().eq('id', id);
      } catch (e) {}
    }
    try {
      const inqs = await this.getInquiries();
      localStorage.setItem(STORAGE_INQUIRIES_KEY, JSON.stringify(inqs.filter((i) => i.id !== id)));
    } catch {}
  },

  /**
   * Fetch visits (Admin & Agent)
   */
  async getVisits(): Promise<Visit[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('property_visits')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          return data.map((item: any) => ({
            id: item.id,
            propertyId: item.property_id,
            userId: item.user_id,
            userName: item.user_name,
            userPhone: item.user_phone,
            scheduledDate: item.scheduled_date,
            scheduledTime: item.scheduled_time,
            status: item.status || 'scheduled',
            notes: item.notes,
            createdAt: item.created_at,
          }));
        }
      } catch (e) {
        console.warn('Could not fetch visits from Supabase:', e);
      }
    }

    try {
      const stored = localStorage.getItem(STORAGE_VISITS_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_VISITS_KEY, JSON.stringify(DEFAULT_VISITS));
        return DEFAULT_VISITS;
      }
      return JSON.parse(stored);
    } catch {
      return DEFAULT_VISITS;
    }
  },

  /**
   * Update visit status
   */
  async updateVisitStatus(id: string, status: Visit['status']): Promise<void> {
    if (isSupabaseConfigured()) {
      try {
        await supabase.from('property_visits').update({ status }).eq('id', id);
      } catch (e) {}
    }
    try {
      const visits = await this.getVisits();
      const updated = visits.map((v) => (v.id === id ? { ...v, status } : v));
      localStorage.setItem(STORAGE_VISITS_KEY, JSON.stringify(updated));
    } catch {}
  },

  /**
   * Delete visit
   */
  async deleteVisit(id: string): Promise<void> {
    if (isSupabaseConfigured()) {
      try {
        await supabase.from('property_visits').delete().eq('id', id);
      } catch (e) {}
    }
    try {
      const visits = await this.getVisits();
      localStorage.setItem(STORAGE_VISITS_KEY, JSON.stringify(visits.filter((v) => v.id !== id)));
    } catch {}
  },

  /**
   * Fetch Agents list
   */
  async getAgents(): Promise<AgentInfo[]> {
    try {
      const stored = localStorage.getItem(STORAGE_AGENTS_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_AGENTS_KEY, JSON.stringify(localAgents));
        return localAgents;
      }
      return JSON.parse(stored);
    } catch {
      return localAgents;
    }
  },

  /**
   * Update Agent profile (photo, phone, areas, etc.)
   */
  async updateAgent(id: string, updates: Partial<AgentInfo>): Promise<AgentInfo[]> {
    try {
      const list = await this.getAgents();
      const updated = list.map((a) => (a.id === id ? { ...a, ...updates } : a));
      localStorage.setItem(STORAGE_AGENTS_KEY, JSON.stringify(updated));
      return updated;
    } catch {
      return localAgents;
    }
  },

  /**
   * Get Notifications for Agents & Admin
   */
  async getNotifications(agentId?: string): Promise<AgentNotification[]> {
    try {
      const stored = localStorage.getItem(STORAGE_NOTIFICATIONS_KEY);
      const list: AgentNotification[] = stored ? JSON.parse(stored) : DEFAULT_NOTIFICATIONS;
      if (agentId) {
        return list.filter((n) => n.agentId === agentId || n.agentId === 'all');
      }
      return list;
    } catch {
      return DEFAULT_NOTIFICATIONS;
    }
  },

  /**
   * Create an instant Notification for Agent (Priya Reddy, etc.)
   */
  async createNotification(
    notification: Omit<AgentNotification, 'id' | 'createdAt' | 'isRead'>
  ): Promise<AgentNotification> {
    const newNotif: AgentNotification = {
      ...notification,
      id: `notif-${Date.now()}`,
      isRead: false,
      createdAt: new Date().toISOString(),
    };

    try {
      const current = await this.getNotifications();
      const updated = [newNotif, ...current];
      localStorage.setItem(STORAGE_NOTIFICATIONS_KEY, JSON.stringify(updated));
    } catch {}

    return newNotif;
  },

  /**
   * Mark notification as read
   */
  async markNotificationAsRead(id: string): Promise<void> {
    try {
      const current = await this.getNotifications();
      const updated = current.map((n) => (n.id === id ? { ...n, isRead: true } : n));
      localStorage.setItem(STORAGE_NOTIFICATIONS_KEY, JSON.stringify(updated));
    } catch {}
  },

  /**
   * Mark all notifications as read
   */
  async markAllNotificationsAsRead(agentId?: string): Promise<void> {
    try {
      const current = await this.getNotifications();
      const updated = current.map((n) =>
        !agentId || n.agentId === agentId ? { ...n, isRead: true } : n
      );
      localStorage.setItem(STORAGE_NOTIFICATIONS_KEY, JSON.stringify(updated));
    } catch {}
  },

  /**
   * Fetch all areas / places (CRUD Read)
   */
  async getLocalities(): Promise<LocalityInfo[]> {
    try {
      const stored = localStorage.getItem(STORAGE_LOCALITIES_KEY);
      const deleted: string[] = JSON.parse(localStorage.getItem(STORAGE_DELETED_LOCALITIES_KEY) || '[]');
      let list: LocalityInfo[] = stored ? JSON.parse(stored) : korutlaLocalities;
      return list.filter((l) => !deleted.includes(l.slug));
    } catch {
      return korutlaLocalities;
    }
  },

  /**
   * Create new Area / Place (CRUD Create)
   */
  async createLocality(loc: LocalityInfo): Promise<LocalityInfo> {
    try {
      const list = await this.getLocalities();
      const updated = [loc, ...list.filter((l) => l.slug !== loc.slug)];
      localStorage.setItem(STORAGE_LOCALITIES_KEY, JSON.stringify(updated));
      return loc;
    } catch {
      return loc;
    }
  },

  /**
   * Update Area / Place (CRUD Update)
   */
  async updateLocality(slug: string, updates: Partial<LocalityInfo>): Promise<LocalityInfo | null> {
    try {
      const list = await this.getLocalities();
      const updated = list.map((l) => (l.slug === slug ? { ...l, ...updates } : l));
      localStorage.setItem(STORAGE_LOCALITIES_KEY, JSON.stringify(updated));
      return updated.find((l) => l.slug === (updates.slug || slug)) || null;
    } catch {
      return null;
    }
  },

  /**
   * Delete Area / Place (CRUD Delete)
   */
  async deleteLocality(slug: string): Promise<boolean> {
    try {
      const list = await this.getLocalities();
      const filtered = list.filter((l) => l.slug !== slug);
      localStorage.setItem(STORAGE_LOCALITIES_KEY, JSON.stringify(filtered));

      const deleted: string[] = JSON.parse(localStorage.getItem(STORAGE_DELETED_LOCALITIES_KEY) || '[]');
      if (!deleted.includes(slug)) {
        deleted.push(slug);
        localStorage.setItem(STORAGE_DELETED_LOCALITIES_KEY, JSON.stringify(deleted));
      }
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Create new Agent (CRUD Create)
   */
  async createAgent(agent: AgentInfo): Promise<AgentInfo> {
    try {
      const list = await this.getAgents();
      const updated = [agent, ...list.filter((a) => a.id !== agent.id)];
      localStorage.setItem(STORAGE_AGENTS_KEY, JSON.stringify(updated));
      return agent;
    } catch {
      return agent;
    }
  },

  /**
   * Delete Agent (CRUD Delete)
   */
  async deleteAgent(id: string): Promise<boolean> {
    try {
      const list = await this.getAgents();
      const updated = list.filter((a) => a.id !== id);
      localStorage.setItem(STORAGE_AGENTS_KEY, JSON.stringify(updated));
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Sync and toggle favorites
   */
  async syncFavorite(userId: string, propertyId: string, add: boolean) {
    if (isSupabaseConfigured() && userId) {
      try {
        if (add) {
          await supabase.from('saved_properties').insert({
            user_id: userId,
            property_id: propertyId,
          });
        } else {
          await supabase
            .from('saved_properties')
            .eq('user_id', userId)
            .eq('property_id', propertyId)
            .delete();
        }
      } catch (e) {
        console.warn('Could not sync favorite to Supabase:', e);
      }
    }
  },
};

export default supabaseService;
