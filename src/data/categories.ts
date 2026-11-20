import { PropertyCategory } from '../types/property';

export interface CategoryItem {
  id: PropertyCategory;
  title: string;
  shortTitle: string;
  description: string;
  slug: string;
  iconName: string;
  image: string;
  count: number;
}

export const categories: CategoryItem[] = [
  {
    id: 'home',
    title: 'Homes',
    shortTitle: 'Homes',
    description: 'Charming single-family homes and duplexes in peaceful neighborhoods.',
    slug: 'homes',
    iconName: 'Home',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    count: 42,
  },
  {
    id: 'independent-house',
    title: 'Independent Houses',
    shortTitle: 'Ind. Houses',
    description: 'Standalone multi-floor houses with private parking and terrace.',
    slug: 'independent-houses',
    iconName: 'Building',
    image: 'https://images.unsplash.com/photo-1564013799919-ab11bef89d57?w=800&q=80',
    count: 28,
  },
  {
    id: 'villa',
    title: 'Villas',
    shortTitle: 'Villas',
    description: 'Opulent designer villas in premier gated communities with private gardens.',
    slug: 'villas',
    iconName: 'Castle',
    image: 'https://images.unsplash.com/photo-1613490493576-7fcdde59107f?w=800&q=80',
    count: 36,
  },
  {
    id: 'apartment',
    title: 'Apartments & Flats',
    shortTitle: 'Apartments',
    description: 'Modern 2, 3, & 4 BHK residences close to tech corridors and transit.',
    slug: 'apartments',
    iconName: 'Building2',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    count: 94,
  },
  {
    id: 'gated-community-apartment',
    title: 'Gated Community Apartments',
    shortTitle: 'Gated Apartments',
    description: 'High-rise luxury townships with world-class clubhouses and 24/7 security.',
    slug: 'gated-community-apartments',
    iconName: 'ShieldCheck',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    count: 65,
  },
  {
    id: 'residential-plot',
    title: 'Residential Plots',
    shortTitle: 'Res. Plots',
    description: 'HMDA & DTCP approved plots ready for immediate villa construction.',
    slug: 'residential-plots',
    iconName: 'MapPin',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    count: 58,
  },
  {
    id: 'open-plot',
    title: 'Open Plots',
    shortTitle: 'Open Plots',
    description: 'High-appreciation layout plots along developing highway corridors.',
    slug: 'open-plots',
    iconName: 'Compass',
    image: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&q=80',
    count: 47,
  },
  {
    id: 'apartment-development-plot',
    title: 'Apartment Development Plots',
    shortTitle: 'Dev. Plots',
    description: 'Prime land parcels ideal for builder floors, mid-rise, and high-rise apartments.',
    slug: 'apartment-development-plots',
    iconName: 'DraftingCompass',
    image: 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f5?w=800&q=80',
    count: 19,
  },
  {
    id: 'commercial-property',
    title: 'Commercial Properties',
    shortTitle: 'Commercial',
    description: 'Grade-A office suites, retail showrooms, and grade spaces for business.',
    slug: 'commercial-properties',
    iconName: 'Briefcase',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    count: 31,
  },
  {
    id: 'commercial-plot',
    title: 'Commercial Plots',
    shortTitle: 'Comm. Plots',
    description: 'Strategic main-road commercial zoned lands suited for commercial complexes.',
    slug: 'commercial-plots',
    iconName: 'Landmark',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    count: 16,
  },
  {
    id: 'farm-land',
    title: 'Farm Lands',
    shortTitle: 'Farm Lands',
    description: 'Picturesque managed farm lands with drip irrigation, fruit plantations and clubhouses.',
    slug: 'farm-lands',
    iconName: 'Trees',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
    count: 24,
  },
  {
    id: 'agricultural-land',
    title: 'Agricultural Lands',
    shortTitle: 'Agri Lands',
    description: 'Fertile red & black soil acreage with clear titles and sweet borewell water.',
    slug: 'agricultural-lands',
    iconName: 'Tractor',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
    count: 21,
  },
];

