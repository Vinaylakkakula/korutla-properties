import React from 'react';
import ListingPageLayout from '../components/listings/ListingPageLayout';

export const CommercialPage: React.FC = () => {
  return (
    <ListingPageLayout
      title="Commercial Properties & Office Spaces"
      subtitle="Grade-A office suites, retail showrooms, warehouses, and commercial plots in Financial District, Kondapur, and Shamshabad."
      categoryFilter="commercial-property"
    />
  );
};

export default CommercialPage;

