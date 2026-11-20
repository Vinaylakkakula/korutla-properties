import React from 'react';
import ListingPageLayout from '../components/listings/ListingPageLayout';

export const FarmLandPage: React.FC = () => {
  return (
    <ListingPageLayout
      title="Farm Lands & Agricultural Properties"
      subtitle="Fertile agricultural lands, managed mango plantations, and private weekend farm retreats in Shankarpally, Chevella, and Vikarabad."
      categoryFilter="farm-land"
      showPlotFilters={true}
    />
  );
};

export default FarmLandPage;

