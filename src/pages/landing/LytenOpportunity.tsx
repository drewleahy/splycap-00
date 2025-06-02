
import React from 'react';
import { LandingTemplate } from '@/components/landing/LandingTemplate';
import { lytenOpportunityConfig } from '@/config/landing-pages/lyten-opportunity';

const LytenOpportunity = () => {
  return <LandingTemplate config={lytenOpportunityConfig} />;
};

export default LytenOpportunity;
