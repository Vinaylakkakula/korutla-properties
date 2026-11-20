import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Property, Inquiry, Visit, User } from '../types/property';
import { properties as localSeedProperties } from '../data/properties';
import { agents as localAgents } from '../data/agents';

const STORAGE_PROPERTIES_KEY = 'korutla_properties_db_custom';
const STORAGE_INQUIRIES_KEY = 'korutla_properties_db_inquiries';
const STORAGE_VISITS_KEY = 'korutla_properties_db_visits';

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
      return [...customProps, ...localSeedProperties];
    } catch {
      return [...localSeedProperties];
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
