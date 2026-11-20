# Korutla Properties — Supabase Backend Guide

This project is fully integrated with **Supabase** for:
- **PostgreSQL Database** (Properties, Agents, Inquiries, Visits, Reviews, Saved Listings)
- **Supabase Authentication** (Email & Password sign-up, sign-in, session state)
- **Supabase Storage** (Property photos & cover images in `property-images` bucket)
- **Row Level Security (RLS)** (Production-grade security policies)

---

## Quick Setup (Client-Ready in 3 Steps)

### Step 1: Create a Free Supabase Project
1. Go to [https://supabase.com](https://supabase.com) and click **Start your project**.
2. Create an organization and click **New Project**.
3. Name your project (e.g. `korutla-properties`), set a secure database password, and choose your preferred region (e.g., `South Asia (Mumbai)`).

### Step 2: Run the Database Schema
1. In your Supabase dashboard, navigate to the **SQL Editor** tab on the left menu.
2. Click **New query**.
3. Open `supabase/schema.sql` from this repository, copy the entire SQL content, and paste it into the editor.
4. Click **Run** (or press `Ctrl+Enter` / `Cmd+Enter`).
   > This automatically creates:
   > - All tables: `properties`, `agents`, `inquiries`, `property_visits`, `saved_properties`, `profiles`, `reviews`
   > - Row Level Security (RLS) policies
   > - Automatic profile creation trigger on user signup
   > - Public `property-images` storage bucket
   > - Pre-loaded Korutla (505326) seed properties and agents

### Step 3: Configure Environment Variables
1. In your Supabase project dashboard, navigate to **Project Settings** -> **API**.
2. Copy your **Project URL** and **Project API Key (`anon` `public`)**.
3. In the root of your application, create or edit `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```
4. Restart your development server (`npm run dev`). That's it!

---

## Dual-Mode Client Ready Architecture

This application is built with **hybrid client-ready architecture**:
- **With Supabase Keys**: Connects live to Supabase for real-time reads, writes, auth, and image storage.
- **Without Supabase Keys (or Offline Preview)**: Seamlessly uses the local memory & browser localStorage cache with zero crashes, mock auth accounts, and 22+ verified Korutla properties pre-loaded.

---

## Database Tables Overview

| Table | Purpose |
|---|---|
| `properties` | All property listings (villas, apartments, plots, commercial, farm land) with pricing, specs, amenities, and Korutla coordinates |
| `agents` | Verified property consultants in Korutla (505326) |
| `inquiries` | Direct inquiries sent from property detail pages |
| `property_visits` | Scheduled site visits and video walkthroughs |
| `saved_properties` | User favorite / saved listings |
| `profiles` | User profiles linked to Supabase Auth (`auth.users`) |
| `reviews` | Verified buyer and tenant reviews |

---

## Storage Buckets
- **Bucket**: `property-images` (Public access enabled for property photographs)
