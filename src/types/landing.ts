
import { LucideIcon } from 'lucide-react';

export interface LandingPageConfig {
  id: string;
  title: string;
  route: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  hero: {
    headline: string;
    subheadline: string;
    image?: string;
    ctaText: string;
    ctaLink: string;
  };
  opportunitySection?: {
    title: string;
    body: string;
    keyPoints: string[];
  };
  content?: {
    title: string;
    body: string;
  };
  lytenSection?: {
    title: string;
    body: string;
    logoSrc: string;
    logoAlt: string;
  };
  features?: {
    title: string;
    items: Array<{
      title: string;
      description: string;
      icon?: LucideIcon;
    }>;
  };
  cta: {
    headline: string;
    description: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
  };
  footer: {
    copyright: string;
    links?: Array<{
      text: string;
      url: string;
    }>;
  };
}
