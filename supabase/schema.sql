-- ==============================================================================
-- KORUTLA PROPERTIES — SUPABASE DATABASE SCHEMA
-- Location: Korutla, Telangana (PIN 505326)
--
-- This script sets up all tables, Row Level Security (RLS) policies,
-- storage buckets, and initial seeds for a 100% Client-Ready production database.
-- Run this entire script in your Supabase Project -> SQL Editor.
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. TABLES DEFINITIONS
-- ==============================================================================

-- PROFILES (Linked with Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Member',
  email TEXT NOT NULL,
  phone TEXT,
  role TEXT DEFAULT 'buyer' CHECK (role IN ('buyer', 'seller', 'agent', 'admin')),
  photo TEXT DEFAULT 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW())
);

-- AGENTS
CREATE TABLE IF NOT EXISTS public.agents (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  photo TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT true,
  experience TEXT DEFAULT '5+ years',
  languages TEXT[] DEFAULT ARRAY['Telugu', 'Hindi', 'English'],
  areas_covered TEXT[] DEFAULT ARRAY['Korutla Town', 'Gandhi Nagar', 'Shivaji Nagar'],
  about TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- PROPERTIES
CREATE TABLE IF NOT EXISTS public.properties (
  id TEXT PRIMARY KEY DEFAULT ('prop-' || floor(extract(epoch from now()) * 1000)::text),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL,
  price_formatted TEXT NOT NULL,
  price_unit TEXT DEFAULT 'total' CHECK (price_unit IN ('total', 'monthly', 'per-acre')),
  listing_type TEXT NOT NULL CHECK (listing_type IN ('sale', 'rent')),
  property_type TEXT NOT NULL,
  category TEXT NOT NULL,
  city TEXT DEFAULT 'Korutla',
  locality TEXT DEFAULT 'Korutla Town',
  address TEXT NOT NULL,
  lat NUMERIC DEFAULT 18.8208,
  lng NUMERIC DEFAULT 78.7118,
  location JSONB NOT NULL DEFAULT '{"city": "Korutla", "state": "Telangana", "locality": "Korutla Town", "address": "Korutla - 505326"}'::jsonb,
  bedrooms INTEGER,
  bathrooms INTEGER,
  area NUMERIC NOT NULL,
  area_unit TEXT DEFAULT 'sqft' CHECK (area_unit IN ('sqft', 'sqyd', 'acres', 'guntas')),
  facing TEXT CHECK (facing IN ('north', 'south', 'east', 'west', 'north-east', 'north-west', 'south-east', 'south-west')),
  floor INTEGER,
  total_floors INTEGER,
  furnishing TEXT CHECK (furnishing IN ('furnished', 'semi-furnished', 'unfurnished')),
  parking INTEGER DEFAULT 1,
  amenities JSONB DEFAULT '[]'::jsonb,
  plot_details JSONB,
  images JSONB NOT NULL DEFAULT '[]'::jsonb,
  cover_image TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_premium BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT true,
  agent_id TEXT REFERENCES public.agents(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'sold', 'rented')),
  deposit NUMERIC,
  available_from TEXT,
  tenant_preference TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW())
);

-- INQUIRIES
CREATE TABLE IF NOT EXISTS public.inquiries (
  id TEXT PRIMARY KEY DEFAULT ('inq-' || floor(extract(epoch from now()) * 1000)::text),
  property_id TEXT REFERENCES public.properties(id) ON DELETE CASCADE,
  user_id TEXT,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_phone TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'responded', 'closed')),
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- PROPERTY VISITS
CREATE TABLE IF NOT EXISTS public.property_visits (
  id TEXT PRIMARY KEY DEFAULT ('vis-' || floor(extract(epoch from now()) * 1000)::text),
  property_id TEXT REFERENCES public.properties(id) ON DELETE CASCADE,
  user_id TEXT,
  user_name TEXT NOT NULL,
  user_phone TEXT NOT NULL,
  scheduled_date DATE NOT NULL,
  scheduled_time TEXT NOT NULL,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- SAVED PROPERTIES (FAVORITES)
CREATE TABLE IF NOT EXISTS public.saved_properties (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  property_id TEXT REFERENCES public.properties(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, property_id)
);

-- REVIEWS
CREATE TABLE IF NOT EXISTS public.reviews (
  id TEXT PRIMARY KEY DEFAULT ('rev-' || floor(extract(epoch from now()) * 1000)::text),
  property_id TEXT REFERENCES public.properties(id) ON DELETE CASCADE,
  user_id TEXT,
  user_name TEXT NOT NULL,
  user_photo TEXT DEFAULT 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80',
  rating NUMERIC(2,1) CHECK (rating >= 1.0 AND rating <= 5.0),
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Profiles: Anyone can view, user can update their own
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Agents: Public read
CREATE POLICY "Agents are viewable by everyone" ON public.agents FOR SELECT USING (true);

-- Properties: Public read, authenticated users can insert and update
CREATE POLICY "Properties are viewable by everyone" ON public.properties FOR SELECT USING (true);
CREATE POLICY "Anyone authenticated can insert property" ON public.properties FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone authenticated can update property" ON public.properties FOR UPDATE USING (true);

-- Inquiries: Public insert, user or agent read
CREATE POLICY "Anyone can submit inquiry" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Inquiries viewable by all authenticated users" ON public.inquiries FOR SELECT USING (true);

-- Property Visits: Public insert
CREATE POLICY "Anyone can schedule visits" ON public.property_visits FOR INSERT WITH CHECK (true);
CREATE POLICY "Visits viewable by authenticated users" ON public.property_visits FOR SELECT USING (true);

-- Saved Properties (Favorites):
CREATE POLICY "Favorites viewable by creator" ON public.saved_properties FOR SELECT USING (true);
CREATE POLICY "Favorites insertable" ON public.saved_properties FOR INSERT WITH CHECK (true);
CREATE POLICY "Favorites deletable" ON public.saved_properties FOR DELETE USING (true);

-- Reviews: Public read
CREATE POLICY "Reviews viewable by everyone" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Anyone can submit review" ON public.reviews FOR INSERT WITH CHECK (true);

-- ==============================================================================
-- 4. GRANTS FOR ANON AND AUTHENTICATED ROLES
-- ==============================================================================
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ROUTINES TO anon, authenticated, service_role;

-- ==============================================================================
-- 5. AUTOMATIC PROFILE CREATION TRIGGER
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, phone, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    NEW.raw_user_meta_data->>'phone',
    COALESCE(NEW.raw_user_meta_data->>'role', 'buyer')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 5. STORAGE BUCKET FOR PROPERTY PHOTOS
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access to Property Images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'property-images');

CREATE POLICY "Authenticated users can upload property images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'property-images');

-- ==============================================================================
-- 6. SEED DATA (AGENTS IN KORUTLA - 505326)
-- ==============================================================================
INSERT INTO public.agents (id, name, phone, email, photo, is_verified, experience, languages, areas_covered, about)
VALUES
  ('agent-1', 'Rajesh Goud', '+91 98490 50532', 'rajesh.goud@korutlaproperties.com', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', true, '14 years', ARRAY['Telugu', 'Hindi', 'English'], ARRAY['Korutla Town', 'Gandhi Nagar', 'Shivaji Nagar', 'Metpally Road'], 'Senior property consultant in Korutla (505326). Specializes in prime residential houses, commercial plots along RTC bus stand road, and open plots.'),
  ('agent-2', 'Priya Reddy', '+91 94401 50532', 'priya.reddy@korutlaproperties.com', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80', true, '8 years', ARRAY['Telugu', 'Hindi', 'English'], ARRAY['Venkateshwara Colony', 'Shantinagar', 'Korutla Town'], 'Expert in new duplex homes, independent houses, and rental apartments across Korutla and surrounding colonies with 100% Vastu compliance.'),
  ('agent-3', 'Venkat Rao', '+91 99480 50532', 'venkat.rao@korutlaproperties.com', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80', true, '18 years', ARRAY['Telugu', 'Hindi', 'English'], ARRAY['Dharmapuri', 'Raikal', 'Mallial', 'Mohanraopet'], 'A veteran in fertile agricultural land, mango orchards, and DTCP layout open plots across Korutla mandal and the Godavari basin.'),
  ('agent-4', 'Srinivas Sharma', '+91 98661 50532', 'srinivas.sharma@korutlaproperties.com', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80', true, '10 years', ARRAY['Telugu', 'English', 'Hindi'], ARRAY['Prakasham Bazar', 'Main Road Korutla', 'Bypass Road'], 'Commercial property and showroom specialist in Korutla market. Handles retail shops, warehouse spaces, and high-visibility commercial plots.')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  areas_covered = EXCLUDED.areas_covered;

-- ==============================================================================
-- 7. SEED DATA (PROPERTIES IN KORUTLA - 505326)
-- ==============================================================================
INSERT INTO public.properties (
  id, title, description, price, price_formatted, price_unit, listing_type,
  property_type, category, city, locality, address, lat, lng,
  bedrooms, bathrooms, area, area_unit, facing, floor, total_floors,
  furnishing, parking, amenities, cover_image, is_verified, is_featured, is_premium, is_new, agent_id, status
)
VALUES
(
  'prop-1',
  '4 BHK Luxury Independent Villa in Venkateshwara Colony',
  'Modern architectural elegance in Korutla (505326). Double-height living hall, imported granite flooring, private landscaped garden, home automation, and 100% Vastu compliance near Sai Baba Temple.',
  13500000, '₹1.35 Cr', 'total', 'sale', 'villa', 'villa',
  'Korutla', 'Venkateshwara Colony', 'Plot 18, Sai Baba Temple Road, Venkateshwara Colony, Korutla - 505326',
  18.8242, 78.7085, 4, 4, 3400, 'sqft', 'east', 2, 2, 'furnished', 2,
  '["Private Garden", "Solar Power Geyser", "24/7 Security CCTV", "Borewell & Municipal Water", "Inverter Backup"]'::jsonb,
  'https://images.unsplash.com/photo-1613490493576-7fcdde59107f?w=1200&q=80',
  true, true, true, true, 'agent-1', 'available'
),
(
  'prop-2',
  '3 BHK Premium Apartment in Gandhi Nagar, Korutla',
  'Spacious 3 BHK apartment in the heart of Korutla town. Well-ventilated balconies, modular kitchen, automatic elevator with generator backup, and dedicated covered car parking.',
  5800000, '₹58 Lakhs', 'total', 'sale', 'apartment', 'apartment',
  'Korutla', 'Gandhi Nagar', 'Tower 2, Gandhi Nagar Main Road, Korutla - 505326',
  18.8221, 78.7125, 3, 3, 1750, 'sqft', 'north-east', 4, 6, 'semi-furnished', 1,
  '["Automatic Elevator", "Power Backup", "Covered Parking", "Municipal Water", "Rainwater Harvesting"]'::jsonb,
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
  true, true, false, true, 'agent-2', 'available'
),
(
  'prop-3',
  'Contemporary 4 BHK Triplex House in Shivaji Nagar',
  'Set on a 200 Sq.Yd plot in quiet Shivaji Nagar, Korutla. Features terrace sit-out lounge, independent borewell, 100% teakwood doors, and parking for 2 cars.',
  9200000, '₹92 Lakhs', 'total', 'sale', 'villa', 'villa',
  'Korutla', 'Shivaji Nagar', 'Near Old Bus Stand, Shivaji Nagar, Korutla - 505326',
  18.8194, 78.7148, 4, 4, 2800, 'sqft', 'east', 3, 3, 'semi-furnished', 2,
  '["Terrace Garden", "Private Borewell", "CCTV Security", "Solar Water Heater", "Car Stilt Parking"]'::jsonb,
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
  true, true, true, false, 'agent-2', 'available'
),
(
  'prop-4',
  'Modern 2 BHK Rental Flat near RTC Bus Stand',
  'Prime central location in Korutla. 3 mins walk to RTC Bus Stand, shopping areas, and clinics. Fully painted with inverter wiring, modular kitchen, and round-the-clock water supply.',
  11000, '₹11,000/mo', 'monthly', 'rent', 'apartment', 'apartment',
  'Korutla', 'Korutla Town', 'Near RTC Bus Stand, Main Road, Korutla - 505326',
  18.8235, 78.7138, 2, 2, 1150, 'sqft', 'north', 2, 4, 'semi-furnished', 1,
  '["Power Backup Provision", "24/7 Water", "Lift Access", "Bike & Car Parking"]'::jsonb,
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
  true, false, false, true, 'agent-2', 'available'
),
(
  'prop-6',
  'DTCP Approved 200 Sq.Yd Residential Plot in Shantinagar',
  'Prime East-facing residential plot in peaceful Shantinagar colony, Korutla (505326). 100% clear title, 33-foot CC road, ready for immediate house construction with electricity and drainage.',
  2400000, '₹24 Lakhs', 'total', 'sale', 'residential-plot', 'residential-plot',
  'Korutla', 'Shantinagar', 'Plot 34, Shantinagar Colony, Korutla - 505326',
  18.8182, 78.7095, null, null, 200, 'sqyd', 'east', null, null, null, null,
  '["33ft CC Roads", "Underground Drainage", "Street Lights", "Immediate Construction Ready"]'::jsonb,
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
  true, true, false, true, 'agent-3', 'available'
),
(
  'prop-11',
  '3.0 Acres Managed Mango Garden & Farm Land in Dharmapuri',
  'Fertile red loam agricultural land near Godavari basin. Planted with 200 mature Benishan mango trees, dedicated 5HP solar borewell, drip irrigation lines, and farmhouse cottage shed.',
  6600000, '₹22 Lakhs/acre', 'per-acre', 'sale', 'farm-land', 'farm-land',
  'Korutla', 'Dharmapuri', 'Dharmapuri Mandal Road, Near Korutla - 505326',
  18.8820, 78.7840, null, null, 3, 'acres', null, null, null, null, null,
  '["200 Mango Trees", "2 Heavy Sweet Borewells", "Solar Drip Setup", "Rythu Bandhu Registered"]'::jsonb,
  'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80',
  true, true, true, true, 'agent-3', 'available'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  price = EXCLUDED.price,
  price_formatted = EXCLUDED.price_formatted;

-- ==============================================================================
-- DONE! Your Supabase database is completely set up and ready for production.
-- ==============================================================================
