import React from 'react';
import HeroSection from '../components/home/HeroSection';
import CategorySection from '../components/home/CategorySection';
import FeaturedSection from '../components/home/FeaturedSection';
import PopularKorutlaSection from '../components/home/PopularHyderabadSection';
import ExploreCitiesSection from '../components/home/ExploreCitiesSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import StatsSection from '../components/home/StatsSection';
import SellBanner from '../components/home/SellBanner';
import Testimonials from '../components/home/Testimonials';
import FaqSection from '../components/home/FaqSection';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      {/* 1. Full-Width Cinematic Hero with Interactive Search Tabs */}
      <HeroSection />

      {/* 2. 12 Property Category Cards */}
      <CategorySection />

      {/* 3. Featured Properties with Dynamic Filtering */}
      <FeaturedSection />

      {/* 4. Popular Korutla & Nearby Areas */}
      <PopularKorutlaSection />

      {/* 5. Explore Cities across Telangana */}
      <ExploreCitiesSection />

      {/* 6. Why Choose Korutla Properties */}
      <WhyChooseUs />

      {/* 7. Animated Statistics Counters */}
      <StatsSection />

      {/* 8. Sell Your Property Banner */}
      <SellBanner />

      {/* 9. Customer Testimonials */}
      <Testimonials />

      {/* 10. Frequently Asked Questions */}
      <FaqSection />
    </div>
  );
};

export default HomePage;
