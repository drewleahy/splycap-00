
import { LandingPageConfig } from '@/types/landing';
import { specialOffer2024Config } from '@/config/landing-pages/special-offer-2024';
import { lytenOpportunityConfig } from '@/config/landing-pages/lyten-opportunity';

// Registry of all landing page configurations
const landingPageConfigs: Record<string, LandingPageConfig> = {
  'special-offer-2024': specialOffer2024Config,
  'lyten-opportunity': lytenOpportunityConfig,
  // Add more configurations here as you create them
};

export const getLandingPageConfig = (id: string): LandingPageConfig | null => {
  return landingPageConfigs[id] || null;
};

export const getAllLandingPageConfigs = (): LandingPageConfig[] => {
  return Object.values(landingPageConfigs);
};

export const getLandingPageByRoute = (route: string): LandingPageConfig | null => {
  return Object.values(landingPageConfigs).find(config => config.route === route) || null;
};

// Helper function to generate obscure URLs
export const generateObscureUrl = (baseName: string): string => {
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `/${baseName}-${randomSuffix}`;
};

// Helper function to validate landing page configuration
export const validateLandingConfig = (config: LandingPageConfig): boolean => {
  const required = ['id', 'title', 'route', 'seo', 'hero', 'cta', 'footer'];
  return required.every(field => config[field as keyof LandingPageConfig]);
};
