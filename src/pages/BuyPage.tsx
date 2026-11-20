import React from 'react';
import ListingPageLayout from '../components/listings/ListingPageLayout';

export const BuyPage: React.FC = () => {
  return (
    <ListingPageLayout
      title="Buy Properties in Hyderabad & Telangana"
      subtitle="Browse verified luxury villas, modern apartments, independent duplex homes, and residential investment plots."
      defaultListingType="sale"
      categoryFilter="all"
    />
  );
};

export default BuyPage;

