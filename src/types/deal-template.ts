
import { LucideIcon } from 'lucide-react';

export interface DealPageConfig {
  // Basic deal info
  id: string;
  dealName: string;
  companyName: string;
  route: string;
  
  // SEO
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  
  // Hero section
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: {
      text: string;
      link: string;
    };
    secondaryCta?: {
      text: string;
      link: string;
    };
    tertiaryCta?: {
      text: string;
      link: string;
    };
    backgroundImage?: string;
  };
  
  // Investment opportunity overview
  opportunity: {
    title: string;
    description: string;
    keyMetrics: string[];
  };
  
  // Market context
  market?: {
    title: string;
    description: string;
    headerLabel?: string;
  };
  
  // Company overview with logo
  company: {
    title: string;
    description: string;
    logoSrc: string;
    logoAlt: string;
    headerLabel?: string;
    keyStats?: string[];
  };
  
  // Commercial traction
  traction?: {
    title: string;
    description: string;
    headerLabel?: string;
    keyPoints?: string[];
  };
  
  // Investment thesis
  thesis: {
    title: string;
    description: string;
    points: Array<{
      title: string;
      description: string;
      icon?: LucideIcon;
    }>;
  };
  
  // Strategic backing/validation
  backing?: {
    title: string;
    description: string;
    keyPoints: string[];
  };
  
  // Call to action
  cta: {
    headline: string;
    description: string;
    primaryButton: {
      text: string;
      link: string;
    };
    secondaryButton?: {
      text: string;
      link: string;
    };
    tertiaryButton?: {
      text: string;
      link: string;
    };
  };
  
  // Video section
  video?: {
    title: string;
    description?: string;
    videoUrl: string;
  };
  
  // Footer
  footer: {
    copyright: string;
    links?: Array<{
      text: string;
      url: string;
    }>;
  };
}
