export interface CityInfo {
  name: string;
  state: string;
  slug: string;
  image: string;
  propertyCount: number;
  description: string;
  popularLocalities: string[];
}

export interface LocalityInfo {
  name: string;
  slug: string;
  city: string;
  propertyCount: number;
  description: string;
  avgPrice: string;
  image: string;
  highlights: string[];
}

export const cities: CityInfo[] = [
  {
    name: 'Hyderabad',
    state: 'Telangana',
    slug: 'hyderabad',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    propertyCount: 248,
    description: 'The city of pearls, tech giants, and thriving infrastructure. Hyderabad leads India in real estate appreciation.',
    popularLocalities: ['Kokapet', 'Gachibowli', 'Kondapur', 'Tellapur', 'Nallagandla', 'Manikonda', 'Bachupally', 'Miyapur', 'Shamshabad', 'Shankarpally'],
  },
  {
    name: 'Bengaluru',
    state: 'Karnataka',
    slug: 'bengaluru',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    propertyCount: 112,
    description: "India's Silicon Valley with cosmopolitan luxury apartments and gated villa projects.",
    popularLocalities: ['Whitefield', 'Sarjapur Road', 'Electronic City', 'Indiranagar', 'HSR Layout'],
  },
  {
    name: 'Mumbai',
    state: 'Maharashtra',
    slug: 'mumbai',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    propertyCount: 84,
    description: "The financial capital featuring high-rise skyline residences, sea-facing penthouses, and commercial hubs.",
    popularLocalities: ['Bandra', 'Andheri West', 'Worli', 'Powai', 'Thane'],
  },
  {
    name: 'Chennai',
    state: 'Tamil Nadu',
    slug: 'chennai',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    propertyCount: 65,
    description: 'Coastal powerhouse with blossoming IT corridors along OMR and heritage residences.',
    popularLocalities: ['OMR', 'ECR', 'Anna Nagar', 'Adyar', 'Velachery'],
  },
  {
    name: 'Pune',
    state: 'Maharashtra',
    slug: 'pune',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    propertyCount: 54,
    description: 'Educational and automotive powerhouse with green hills, luxury township living and IT hubs.',
    popularLocalities: ['Hinjawadi', 'Baner', 'Kharadi', 'Viman Nagar', 'Wakad'],
  },
  {
    name: 'Delhi NCR',
    state: 'Delhi / Haryana',
    slug: 'delhi-ncr',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    propertyCount: 78,
    description: 'National capital region offering world-class expressways, golf course residences, and sprawling farmhouses.',
    popularLocalities: ['Golf Course Extension', 'Noida Expressway', 'Dwarka Expressway', 'South Delhi'],
  },
  {
    name: 'Vijayawada',
    state: 'Andhra Pradesh',
    slug: 'vijayawada',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    propertyCount: 46,
    description: 'The commercial nerve center of Andhra Pradesh with rapid riverside and bypass growth.',
    popularLocalities: ['Benz Circle', 'Poranki', 'Gannavaram', 'Tadigadapa', 'Enikepadu'],
  },
  {
    name: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    slug: 'visakhapatnam',
    image: 'https://images.unsplash.com/photo-1560448204771-d5438e01b9b1?w=800&q=80',
    propertyCount: 38,
    description: 'The City of Destiny with scenic beach corridors, IT SEZs, and luxury port-city apartments.',
    popularLocalities: ['Madhurawada', 'Rushikonda', 'Yendada', 'Seethammadhara', 'Gajuwaka'],
  },
];

export const hyderabadLocalities: LocalityInfo[] = [
  {
    name: 'Kokapet',
    slug: 'kokapet',
    city: 'Hyderabad',
    propertyCount: 42,
    description: 'The jewel of Hyderabad real estate. High-rise golden mile luxury and ultra-luxurious sky villas.',
    avgPrice: '₹12,500 / sq.ft',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    highlights: ['Golden Mile Corridor', 'Trump Tower', 'ORR Exit 1', '5 min from Financial District'],
  },
  {
    name: 'Gachibowli',
    slug: 'gachibowli',
    city: 'Hyderabad',
    propertyCount: 56,
    description: 'Heart of the IT and Financial District, home to global conglomerates and elite sports complexes.',
    avgPrice: '₹10,500 / sq.ft',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    highlights: ['Financial District Hub', 'Top International Schools', 'Care & Continental Hospitals', 'Bustling Nightlife'],
  },
  {
    name: 'Kondapur',
    slug: 'kondapur',
    city: 'Hyderabad',
    propertyCount: 48,
    description: 'Vibrant residential hub flanked by Botanical Garden and HITEC City tech parks.',
    avgPrice: '₹9,800 / sq.ft',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    highlights: ['Botanical Garden Greens', '5 min to HITEC City', 'Sarath City Capital Mall', 'Premium Dining'],
  },
  {
    name: 'Tellapur',
    slug: 'tellapur',
    city: 'Hyderabad',
    propertyCount: 38,
    description: 'The fastest growing villa and luxury apartment ecosystem with expansive planned infrastructure.',
    avgPrice: '₹8,200 / sq.ft',
    image: 'https://images.unsplash.com/photo-1613490493576-7fcdde59107f?w=800&q=80',
    highlights: ['Villa Communities', 'Wide 100ft Roads', 'Proximity to Wipro Circle', 'Zero Pollution Corridor'],
  },
  {
    name: 'Nallagandla',
    slug: 'nallagandla',
    city: 'Hyderabad',
    propertyCount: 32,
    description: 'Peaceful residential neighborhood around scenic lakes, favoured by tech executives and families.',
    avgPrice: '₹8,600 / sq.ft',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    highlights: ['Citizen Hospital', 'Lake Front Parks', 'Sanctuary Living', 'Aparna Townships'],
  },
  {
    name: 'Manikonda',
    slug: 'manikonda',
    city: 'Hyderabad',
    propertyCount: 29,
    description: 'Established western residential destination with superb connectivity to Lanco Hills and Film Nagar.',
    avgPrice: '₹7,500 / sq.ft',
    image: 'https://images.unsplash.com/photo-1560448204771-d5438e01b9b1?w=800&q=80',
    highlights: ['Lanco Hills Complex', 'Close to Outer Ring Road', 'Established Markets', 'Near Delhi Public School'],
  },
  {
    name: 'Bachupally',
    slug: 'bachupally',
    city: 'Hyderabad',
    propertyCount: 24,
    description: 'North-West Hyderabad education hub with exceptional gated communities and family-friendly living.',
    avgPrice: '₹6,200 / sq.ft',
    image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80',
    highlights: ['Silver Oaks School', 'Praneeth Townships', 'Miyapur Metro Connection', 'High Value for Money'],
  },
  {
    name: 'Miyapur',
    slug: 'miyapur',
    city: 'Hyderabad',
    propertyCount: 27,
    description: 'Major transit hub with terminal Metro station, bustling retail avenues and modern high-rises.',
    avgPrice: '₹6,800 / sq.ft',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    highlights: ['Metro Terminal 1', 'NH-65 Connectivity', 'Multiplexes & Retail', 'Quick Access to BHEL'],
  },
  {
    name: 'Shamshabad',
    slug: 'shamshabad',
    city: 'Hyderabad',
    propertyCount: 22,
    description: 'Airport corridor with massive aero-city development, commercial parks, and prime plots.',
    avgPrice: '₹5,500 / sq.ft',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    highlights: ['RGIA International Airport', 'Airport Metro Line', 'Hardware SEZ', 'Pharma City Link'],
  },
  {
    name: 'Shankarpally',
    slug: 'shankarpally',
    city: 'Hyderabad',
    propertyCount: 20,
    description: 'Green oasis of Telangana, the undisputed haven for premium weekend villas and managed farm lands.',
    avgPrice: '₹28,000 / sq.yd',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
    highlights: ['Lush Greenery', 'Heritage Club Resorts', 'Upcoming 4-Lane Highway', 'Organic Farming Community'],
  },
  {
    name: 'Kukatpally',
    slug: 'kukatpally',
    city: 'Hyderabad',
    propertyCount: 31,
    description: 'Dense commercial powerhouse with Forum Sujana Mall, JNTU University, and robust infrastructure.',
    avgPrice: '₹8,400 / sq.ft',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
    highlights: ['Nexus Hyderabad Mall', 'JNTU Metro', 'Commercial Streets', 'Top Healthcare Facilities'],
  },
  {
    name: 'Uppal',
    slug: 'uppal',
    city: 'Hyderabad',
    propertyCount: 18,
    description: 'Eastern gateway with Rajiv Gandhi Cricket Stadium, Metro line, and IT SEZ developments.',
    avgPrice: '₹5,900 / sq.ft',
    image: 'https://images.unsplash.com/photo-1564013799919-ab11bef89d57?w=800&q=80',
    highlights: ['International Cricket Stadium', 'Uppal Skywalk', 'Genpact IT SEZ', 'Warangal Highway Link'],
  },
];

