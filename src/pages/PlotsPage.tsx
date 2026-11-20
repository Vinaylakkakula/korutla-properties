import React from 'react';
import ListingPageLayout from '../components/listings/ListingPageLayout';

export const PlotsPage: React.FC = () => {
  return (
    <ListingPageLayout
      title="Plots & Land in Korutla (505326) & Jagtial"
      subtitle="DTCP and layout approved residential plots, open investment layouts, and commercial parcels in Shantinagar, Raikal Road, Dharmapuri, and Korutla mandal."
      defaultListingType="sale"
      categoryFilter="all"
      showPlotFilters={true}
    />
  );
};

export default PlotsPage;

