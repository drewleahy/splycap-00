
import { LandingPageConfig } from '@/types/landing';

// Simple direct export without complex registry pattern
export const validateLandingConfig = (config: LandingPageConfig): boolean => {
  const required = ['id', 'title', 'route', 'seo', 'hero', 'cta', 'footer'];
  return required.every(field => config[field as keyof LandingPageConfig]);
};

export const generateObscureUrl = (baseName: string): string => {
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `/${baseName}-${randomSuffix}`;
};
