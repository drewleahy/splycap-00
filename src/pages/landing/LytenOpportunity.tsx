
import React from 'react';
import { LandingTemplate } from '@/components/landing/LandingTemplate';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { lytenOpportunityConfig } from '@/config/landing-pages/lyten-opportunity';

const LytenOpportunity = () => {
  return (
    <ErrorBoundary>
      <LandingTemplate config={lytenOpportunityConfig} />
    </ErrorBoundary>
  );
};

export default LytenOpportunity;
