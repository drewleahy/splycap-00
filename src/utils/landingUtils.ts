
import { LandingPageConfig } from '@/types/landing';
import { lytenOpportunityConfig } from '@/config/landing-pages/lyten-opportunity';

// Registry of all landing page configurations
const landingPageConfigs: Record<string, LandingPageConfig> = {
  'lyten-opportunity': lytenOpportunityConfig,
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

export const generateObscureUrl = (baseName: string): string => {
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `/${baseName}-${randomSuffix}`;
};

export const validateLandingConfig = (config: LandingPageConfig): boolean => {
  const required = ['id', 'title', 'route', 'seo', 'hero', 'cta', 'footer'];
  return required.every(field => config[field as keyof LandingPageConfig]);
};
