import React from 'react';
import ListingPageLayout from '../components/listings/ListingPageLayout';

export const RentPage: React.FC = () => {
  return (
    <ListingPageLayout
      title="Rental Properties & Flats"
      subtitle="Discover furnished and semi-furnished apartments, independent houses, and studios in Gachibowli, Kondapur, and Hitec City."
      defaultListingType="rent"
      categoryFilter="all"
    />
  );
};

export default RentPage;

