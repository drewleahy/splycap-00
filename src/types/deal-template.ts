
import { LucideIcon } from 'lucide-react';

export interface OpportunitySection {
  header: string;
  body: string;
}

export interface DealPageConfig {
  id: string;
  dealName: string;
  companyName: string;
  route: string;
  
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  
  hero: {
    headline: string;
    subheadline: string;
    backgroundImage?: string;
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
  };
  
  opportunity: {
    title: string;
    description: string;
    keyMetrics: OpportunitySection[];
  };
  
  market?: {
    title: string;
    description: string;
    headerLabel?: string;
  };
  
  company?: {
    title: string;
    description: string;
    logoSrc?: string;
    logoAlt?: string;
    headerLabel?: string;
    keyStats?: string[];
  };
  
  traction?: {
    title: string;
    description: string;
    headerLabel?: string;
    keyPoints?: string[];
    additionalContent?: string;
  };
  
  thesis?: {
    title: string;
    description: string;
    points: Array<{
      title: string;
      description: string;
      icon?: LucideIcon;
    }>;
  };
  
  backing?: {
    title: string;
    description: string;
    keyPoints: string[];
  };
  
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
  
  video?: {
    title: string;
    description: string;
    videoUrl: string;
  };
  
  footer: {
    copyright: string;
    links?: Array<{
      text: string;
      url: string;
    }>;
  };
}
