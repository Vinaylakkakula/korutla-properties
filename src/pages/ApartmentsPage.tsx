import React from 'react';
import ListingPageLayout from '../components/listings/ListingPageLayout';

export const ApartmentsPage: React.FC = () => {
  return (
    <ListingPageLayout
      title="Apartments & Gated Communities"
      subtitle="Explore 2, 3, and 4 BHK luxury high-rise residences with world-class clubhouses, pools, and sports arenas."
      defaultListingType="sale"
      categoryFilter="apartment"
    />
  );
};

export default ApartmentsPage;

