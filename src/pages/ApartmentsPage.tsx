import React from 'react';
import ListingPageLayout from '../components/listings/ListingPageLayout';

export const ApartmentsPage: React.FC = () => {
  return (
    <ListingPageLayout
      title="Apartments & Gated Communities in Korutla (505326)"
      subtitle="Explore 2 and 3 BHK modern residences and gated community layouts in Gandhi Nagar, Metpally Road, and Korutla town."
      defaultListingType="sale"
      categoryFilter="apartment"
    />
  );
};

export default ApartmentsPage;

