import React from 'react';
import ListingPageLayout from '../components/listings/ListingPageLayout';

export const PlotsPage: React.FC = () => {
  return (
    <ListingPageLayout
      title="Plots & Land in Hyderabad & Telangana"
      subtitle="HMDA, DTCP, and RERA approved residential plots, open investment layouts, and commercial parcels in Tellapur, Shankarpally, and Shamshabad."
      defaultListingType="sale"
      categoryFilter="all"
      showPlotFilters={true}
    />
  );
};

export default PlotsPage;

