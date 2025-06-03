
import { LandingPageConfig } from '@/types/landing';

export const validateLandingConfig = (config: LandingPageConfig): boolean => {
  try {
    const required = ['id', 'title', 'route', 'seo', 'hero', 'cta', 'footer'];
    return required.every(field => {
      const value = config[field as keyof LandingPageConfig];
      return value !== undefined && value !== null;
    });
  } catch (error) {
    console.error('Config validation error:', error);
    return false;
  }
};

export const generateObscureUrl = (baseName: string): string => {
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `/${baseName}-${randomSuffix}`;
};
