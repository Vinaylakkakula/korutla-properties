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
    name: 'Korutla',
    state: 'Telangana',
    slug: 'korutla',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    propertyCount: 185,
    description: 'A historic town in Jagtial district, Telangana. Korutla is known for its rich cultural heritage, growing infrastructure, and excellent real estate opportunities.',
    popularLocalities: ['Korutla Town', 'Dharmapuri', 'Raikal', 'Metpally', 'Jagtial', 'Bejjanki', 'Mallial', 'Gollapally', 'Ibrahimpatnam', 'Laxmipur'],
  },
  {
    name: 'Jagtial',
    state: 'Telangana',
    slug: 'jagtial',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    propertyCount: 112,
    description: 'The district headquarters with rapidly growing residential and commercial zones along NH-63.',
    popularLocalities: ['Jagtial Town', 'Raikal', 'Dharmapuri', 'Gollapally', 'Velgatoor'],
  },
  {
    name: 'Karimnagar',
    state: 'Telangana',
    slug: 'karimnagar',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    propertyCount: 156,
    description: 'Major commercial and educational hub of northern Telangana with excellent connectivity and modern amenities.',
    popularLocalities: ['Karimnagar Town', 'Huzurabad', 'Jammikunta', 'Choppadandi', 'Sircilla'],
  },
  {
    name: 'Hyderabad',
    state: 'Telangana',
    slug: 'hyderabad',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    propertyCount: 248,
    description: 'The city of pearls, tech giants, and thriving infrastructure. Hyderabad leads India in real estate appreciation.',
    popularLocalities: ['Kokapet', 'Gachibowli', 'Kondapur', 'Tellapur', 'Nallagandla', 'Manikonda'],
  },
  {
    name: 'Warangal',
    state: 'Telangana',
    slug: 'warangal',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    propertyCount: 78,
    description: 'Historical city with the famous Warangal Fort, NIT campus, and emerging IT park. Great investment potential.',
    popularLocalities: ['Hanamkonda', 'Kazipet', 'Balasamudram', 'Subedari', 'Chintagattu'],
  },
  {
    name: 'Nizamabad',
    state: 'Telangana',
    slug: 'nizamabad',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    propertyCount: 54,
    description: 'Known as the turmeric city, Nizamabad offers affordable residential plots and agricultural land opportunities.',
    popularLocalities: ['Nizamabad Town', 'Bodhan', 'Armoor', 'Kamareddy', 'Dichpally'],
  },
  {
    name: 'Sircilla',
    state: 'Telangana',
    slug: 'sircilla',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    propertyCount: 38,
    description: 'The textile hub of Telangana with growing commercial and residential opportunities.',
    popularLocalities: ['Sircilla Town', 'Vemulawada', 'Yellareddypet', 'Mustabad'],
  },
  {
    name: 'Peddapalli',
    state: 'Telangana',
    slug: 'peddapalli',
    image: 'https://images.unsplash.com/photo-1560448204771-d5438e01b9b1?w=800&q=80',
    propertyCount: 42,
    description: 'A growing district with coal mining heritage, good rail connectivity, and affordable real estate options.',
    popularLocalities: ['Peddapalli Town', 'Ramagundam', 'Manthani', 'Sultanabad', 'Godavarikhani'],
  },
];

export const korutlaLocalities: LocalityInfo[] = [
  {
    name: 'Korutla Town',
    slug: 'korutla-town',
    city: 'Korutla',
    propertyCount: 42,
    description: 'The heart of Korutla with bustling commercial streets, temples, schools, and excellent residential neighborhoods.',
    avgPrice: '₹2,800 / sq.ft',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    highlights: ['Town Center Hub', 'Schools & Colleges', 'Hospital Access', 'Bus Stand Connectivity'],
  },
  {
    name: 'Dharmapuri',
    slug: 'dharmapuri',
    city: 'Korutla',
    propertyCount: 36,
    description: 'A neighboring mandal with historic significance, peaceful living, and affordable plots and agricultural land.',
    avgPrice: '₹1,800 / sq.ft',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    highlights: ['Godavari River Proximity', 'Temple Town', 'Agricultural Hub', 'NH-63 Access'],
  },
  {
    name: 'Raikal',
    slug: 'raikal',
    city: 'Korutla',
    propertyCount: 28,
    description: 'A serene mandal headquarters with developing residential pockets and excellent farm land opportunities.',
    avgPrice: '₹1,500 / sq.ft',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    highlights: ['Peaceful Living', 'Affordable Plots', 'Farm Land Deals', 'Rural Charm'],
  },
  {
    name: 'Metpally',
    slug: 'metpally',
    city: 'Korutla',
    propertyCount: 32,
    description: 'A well-connected town near Korutla with a growing commercial center, government offices, and emerging residential areas.',
    avgPrice: '₹2,200 / sq.ft',
    image: 'https://images.unsplash.com/photo-1613490493576-7fcdde59107f?w=800&q=80',
    highlights: ['Government Offices', 'Railway Station', 'Commercial Growth', 'Hospital Facilities'],
  },
  {
    name: 'Jagtial',
    slug: 'jagtial',
    city: 'Korutla',
    propertyCount: 48,
    description: 'The district headquarters with modern amenities, government institutions, and booming real estate market.',
    avgPrice: '₹3,200 / sq.ft',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    highlights: ['District HQ', 'Modern Infrastructure', 'Educational Institutions', 'Healthcare Facilities'],
  },
  {
    name: 'Bejjanki',
    slug: 'bejjanki',
    city: 'Korutla',
    propertyCount: 20,
    description: 'A growing area with affordable residential plots and excellent potential for long-term property investment.',
    avgPrice: '₹1,200 / sq.ft',
    image: 'https://images.unsplash.com/photo-1560448204771-d5438e01b9b1?w=800&q=80',
    highlights: ['Affordable Land', 'Agricultural Belt', 'Growing Infrastructure', 'Investment Potential'],
  },
  {
    name: 'Mallial',
    slug: 'mallial',
    city: 'Korutla',
    propertyCount: 18,
    description: 'A quiet mandal with scenic landscapes, farm land opportunities, and growing connectivity to Korutla.',
    avgPrice: '₹1,100 / sq.ft',
    image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80',
    highlights: ['Scenic Landscapes', 'Farm Land', 'Peaceful Environment', 'Developing Roads'],
  },
  {
    name: 'Gollapally',
    slug: 'gollapally',
    city: 'Korutla',
    propertyCount: 22,
    description: 'A village area on the outskirts of Korutla with highly affordable plots and emerging residential developments.',
    avgPrice: '₹900 / sq.ft',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    highlights: ['Budget-Friendly', 'Open Land Available', 'Near Korutla Town', 'Village Living'],
  },
  {
    name: 'Ibrahimpatnam',
    slug: 'ibrahimpatnam',
    city: 'Korutla',
    propertyCount: 16,
    description: 'A residential area near Korutla with new residential layouts and improving road connectivity.',
    avgPrice: '₹1,400 / sq.ft',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    highlights: ['New Layouts', 'Road Development', 'Proximity to Town', 'Growing Area'],
  },
  {
    name: 'Laxmipur',
    slug: 'laxmipur',
    city: 'Korutla',
    propertyCount: 14,
    description: 'A developing village with agricultural land and open plots ideal for investment and future construction.',
    avgPrice: '₹800 / sq.ft',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
    highlights: ['Agricultural Land', 'Open Plots', 'Investment Zone', 'Future Growth Area'],
  },
  {
    name: 'Velgatoor',
    slug: 'velgatoor',
    city: 'Korutla',
    propertyCount: 15,
    description: 'Located between Korutla and Jagtial with growing residential interest and affordable housing options.',
    avgPrice: '₹1,300 / sq.ft',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
    highlights: ['Strategic Location', 'Affordable Housing', 'Near Highway', 'Emerging Demand'],
  },
  {
    name: 'Pegadapally',
    slug: 'pegadapally',
    city: 'Korutla',
    propertyCount: 12,
    description: 'A quiet settlement near Korutla offering open plots and farm land at competitive prices.',
    avgPrice: '₹750 / sq.ft',
    image: 'https://images.unsplash.com/photo-1564013799919-ab11bef89d57?w=800&q=80',
    highlights: ['Competitive Pricing', 'Farm Lands', 'Growing Connectivity', 'Near National Highway'],
  },
];
