import { Property, PropertyCategory, SearchFilters } from '../types/property';
import { properties as defaultSeedProperties } from '../data/properties';
import { supabaseService } from './supabaseService';

// Active memory cache initialized with local seed properties + any localStorage items
let cachedProperties: Property[] = (() => {
  try {
    const stored = localStorage.getItem('korutla_properties_db_custom');
    const customProps: Property[] = stored ? JSON.parse(stored) : [];
    return [...customProps, ...defaultSeedProperties];
  } catch {
    return [...defaultSeedProperties];
  }
})();

// Asynchronously hydrate from live Supabase on application boot
supabaseService.getProperties().then((liveProps) => {
  if (liveProps && liveProps.length > 0) {
    cachedProperties = liveProps;
  }
});

export const propertyService = {
  getAllProperties: (): Property[] => {
    return cachedProperties;
  },

  getPropertyById: (id: string): Property | undefined => {
    return cachedProperties.find((p) => p.id === id);
  },

  getPropertiesByCategory: (category: PropertyCategory): Property[] => {
    return cachedProperties.filter((p) => p.category === category || p.propertyType === category);
  },

  getFeaturedProperties: (): Property[] => {
    return cachedProperties.filter((p) => p.isFeatured);
  },

  getNewProperties: (): Property[] => {
    return cachedProperties.filter((p) => p.isNew);
  },

  getPremiumProperties: (): Property[] => {
    return cachedProperties.filter((p) => p.isPremium);
  },

  getSaleProperties: (): Property[] => {
    return cachedProperties.filter((p) => p.listingType === 'sale');
  },

  getRentProperties: (): Property[] => {
    return cachedProperties.filter((p) => p.listingType === 'rent');
  },

  getPropertiesByCity: (city: string): Property[] => {
    const cleanCity = city.toLowerCase().replace(/-/g, ' ');
    return cachedProperties.filter(
      (p) => p.location.city.toLowerCase() === cleanCity || p.location.city.toLowerCase().includes(cleanCity)
    );
  },

  getPropertiesByLocality: (locality: string): Property[] => {
    const cleanLoc = locality.toLowerCase().replace(/-/g, ' ');
    return cachedProperties.filter(
      (p) => p.location.locality.toLowerCase() === cleanLoc || p.location.locality.toLowerCase().includes(cleanLoc)
    );
  },

  getRelatedProperties: (property: Property, limit: number = 4): Property[] => {
    return cachedProperties
      .filter(
        (p) =>
          p.id !== property.id &&
          (p.category === property.category ||
            p.location.locality === property.location.locality ||
            p.location.city === property.location.city)
      )
      .slice(0, limit);
  },

  filterProperties: (filters: SearchFilters): Property[] => {
    let result = [...cachedProperties];

    if (filters.query) {
      const q = filters.query.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.locality.toLowerCase().includes(q) ||
          p.location.city.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (filters.city) {
      const c = filters.city.toLowerCase();
      result = result.filter((p) => p.location.city.toLowerCase() === c || p.location.city.toLowerCase().includes(c));
    }

    if (filters.locality) {
      const loc = filters.locality.toLowerCase();
      result = result.filter(
        (p) => p.location.locality.toLowerCase() === loc || p.location.locality.toLowerCase().includes(loc)
      );
    }

    if (filters.listingType) {
      result = result.filter((p) => p.listingType === filters.listingType);
    }

    if (filters.propertyType) {
      result = result.filter((p) => p.propertyType === filters.propertyType || p.category === filters.propertyType);
    }

    if (filters.minPrice !== undefined && filters.minPrice > 0) {
      result = result.filter((p) => p.price >= (filters.minPrice ?? 0));
    }

    if (filters.maxPrice !== undefined && filters.maxPrice > 0) {
      result = result.filter((p) => p.price <= (filters.maxPrice ?? Infinity));
    }

    if (filters.minBedrooms !== undefined && filters.minBedrooms > 0) {
      result = result.filter((p) => (p.bedrooms ?? 0) >= (filters.minBedrooms ?? 0));
    }

    if (filters.minBathrooms !== undefined && filters.minBathrooms > 0) {
      result = result.filter((p) => (p.bathrooms ?? 0) >= (filters.minBathrooms ?? 0));
    }

    if (filters.furnishing) {
      result = result.filter((p) => p.furnishing === filters.furnishing);
    }

    if (filters.facing) {
      result = result.filter((p) => p.facing === filters.facing);
    }

    if (filters.isVerified) {
      result = result.filter((p) => p.isVerified);
    }

    if (filters.isFeatured) {
      result = result.filter((p) => p.isFeatured);
    }

    // Sort
    if (filters.sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'popular') {
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    } else {
      // default: newest
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  },

  async addProperty(property: Omit<Property, 'id' | 'createdAt'>): Promise<Property> {
    const created = await supabaseService.createProperty(property);
    cachedProperties.unshift(created);
    return created;
  },
};
