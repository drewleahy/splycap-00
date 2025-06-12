
import React, { useEffect, useState } from 'react';
import { DealTemplate } from '@/components/deal/DealTemplate';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { nanotronicsConfig } from '@/config/deal-pages/nanotronics';
import { DealPageConfig } from '@/types/deal-template';

const Nanotronics = () => {
  return (
    <ErrorBoundary>
      <DealTemplate config={nanotronicsConfig} />
    </ErrorBoundary>
  );
};

export default Nanotronics;
