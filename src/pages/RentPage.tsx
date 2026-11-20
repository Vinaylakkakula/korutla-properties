import React from 'react';
import ListingPageLayout from '../components/listings/ListingPageLayout';

export const RentPage: React.FC = () => {
  return (
    <ListingPageLayout
      title="Rental Properties & Flats in Korutla (505326)"
      subtitle="Discover furnished and semi-furnished apartments, independent houses, commercial shops, and godowns across Korutla town and nearby corridors."
      defaultListingType="rent"
      categoryFilter="all"
    />
  );
};

export default RentPage;

