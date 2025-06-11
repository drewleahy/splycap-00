
import React from 'react';
import { DealTemplate } from '@/components/deal/DealTemplate';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { nanotronicsConfig } from '@/config/deal-pages/nanotronics';

const Nanotronics = () => {
  return (
    <ErrorBoundary>
      <DealTemplate config={nanotronicsConfig} />
    </ErrorBoundary>
  );
};

export default Nanotronics;
