export type PropertyCategory =
  | 'home'
  | 'independent-house'
  | 'villa'
  | 'apartment'
  | 'gated-community-apartment'
  | 'residential-plot'
  | 'open-plot'
  | 'apartment-development-plot'
  | 'commercial-property'
  | 'commercial-plot'
  | 'farm-land'
  | 'agricultural-land';

export type ListingType = 'sale' | 'rent';

export type FurnishingType = 'furnished' | 'semi-furnished' | 'unfurnished';

export type FacingType =
  | 'north'
  | 'south'
  | 'east'
  | 'west'
  | 'north-east'
  | 'north-west'
  | 'south-east'
  | 'south-west';

export interface AgentInfo {
  id: string;
  name: string;
  phone: string;
  email: string;
  photo: string;
  isVerified: boolean;
  experience?: string;
  languages?: string[];
  areasCovered?: string[];
  about?: string;
}

export interface PlotDetails {
  dimensions?: string;
  roadWidth?: number;
  roadWidthUnit?: string;
  layoutApproval?: boolean;
  reraApproval?: boolean;
  cornerPlot?: boolean;
  boundaryWall?: boolean;
  electricity?: boolean;
  waterAvailability?: boolean;
  ownershipType?: string;
  soilType?: string;
  irrigationDetails?: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  priceFormatted: string;
  priceUnit: 'total' | 'monthly' | 'per-acre';
  listingType: ListingType;
  propertyType: PropertyCategory;
  category: PropertyCategory;
  location: {
    city: string;
    state: string;
    locality: string;
    address: string;
    lat?: number;
    lng?: number;
  };
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  areaUnit: 'sqft' | 'sqyd' | 'acres' | 'guntas';
  facing?: FacingType;
  floor?: number;
  totalFloors?: number;
  furnishing?: FurnishingType;
  parking?: number;
  amenities: string[];
  images: string[];
  coverImage: string;
  isVerified: boolean;
  isFeatured: boolean;
  isPremium: boolean;
  isNew: boolean;
  createdAt: string;
  updatedAt?: string;
  agent: AgentInfo;
  plotDetails?: PlotDetails;
  status: 'available' | 'sold' | 'rented';
  deposit?: number;
  availableFrom?: string;
  tenantPreference?: string;
}

export interface SearchFilters {
  query?: string;
  city?: string;
  locality?: string;
  propertyType?: PropertyCategory;
  listingType?: ListingType;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  minArea?: number;
  maxArea?: number;
  areaUnit?: string;
  furnishing?: FurnishingType;
  facing?: FacingType;
  amenities?: string[];
  isVerified?: boolean;
  isFeatured?: boolean;
  possession?: string;
  gatedCommunity?: boolean;
  readyToMove?: boolean;
  sortBy?: 'newest' | 'price-low' | 'price-high' | 'popular';
  page?: number;
  limit?: number;
}

export interface Review {
  id: string;
  propertyId: string;
  userId: string;
  userName: string;
  userPhoto: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Inquiry {
  id: string;
  propertyId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  message: string;
  status: 'pending' | 'responded' | 'closed';
  createdAt: string;
}

export interface Visit {
  id: string;
  propertyId: string;
  userId: string;
  userName: string;
  userPhone: string;
  scheduledDate: string;
  scheduledTime: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo: string;
  role: 'buyer' | 'seller' | 'agent' | 'admin';
  favorites: string[];
  createdAt: string;
}

export interface AgentNotification {
  id: string;
  agentId: string;
  agentName: string;
  type: 'inquiry' | 'visit' | 'listing';
  title: string;
  message: string;
  propertyId: string;
  propertyTitle: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  isRead: boolean;
  createdAt: string;
}
