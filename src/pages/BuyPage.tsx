import React from 'react';
import ListingPageLayout from '../components/listings/ListingPageLayout';

export const BuyPage: React.FC = () => {
  return (
    <ListingPageLayout
      title="Buy Properties in Korutla (505326) & Telangana"
      subtitle="Browse verified homes, luxury villas, modern apartments, independent duplex houses, and residential plots in Korutla and surrounding mandals."
      defaultListingType="sale"
      categoryFilter="all"
    />
  );
};

export default BuyPage;

