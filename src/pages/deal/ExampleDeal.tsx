
import React from 'react';
import { DealTemplate } from '@/components/deal/DealTemplate';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { exampleDealConfig } from '@/config/deal-pages/example-deal';

const ExampleDeal = () => {
  return (
    <ErrorBoundary>
      <DealTemplate config={exampleDealConfig} />
    </ErrorBoundary>
  );
};

export default ExampleDeal;
