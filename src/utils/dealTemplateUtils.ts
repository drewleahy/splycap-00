
import { DealPageConfig } from '@/types/deal-template';

export const createDealConfig = (overrides: Partial<DealPageConfig>): DealPageConfig => {
  const defaultConfig: DealPageConfig = {
    id: '',
    dealName: '',
    companyName: '',
    route: '',
    seo: {
      title: '',
      description: '',
      keywords: []
    },
    hero: {
      headline: '',
      subheadline: '',
      primaryCta: {
        text: 'Schedule a Call',
        link: 'https://calendly.com/haley-splycapital/deal-interest'
      }
    },
    opportunity: {
      title: '',
      description: '',
      keyMetrics: []
    },
    company: {
      title: '',
      description: '',
      logoSrc: '',
      logoAlt: ''
    },
    thesis: {
      title: 'Why We\'re Investing',
      description: '',
      points: []
    },
    cta: {
      headline: 'Next Steps',
      description: '',
      primaryButton: {
        text: 'Download Flyer',
        link: '#download-flyer'
      },
      secondaryButton: {
        text: 'Sign NDA to View Diligence Materials',
        link: ''
      },
      tertiaryButton: {
        text: 'Book a Call',
        link: 'https://calendly.com/haley-splycapital/deal-interest'
      }
    },
    footer: {
      copyright: '© 2025 SPLY CAPITAL. All rights reserved.',
      links: []
    }
  };

  return { ...defaultConfig, ...overrides };
};

export const generateDealRoute = (companyName: string): string => {
  return `/deals/${companyName.toLowerCase().replace(/\s+/g, '-')}-exclusive-2025`;
};

export const validateDealConfig = (config: DealPageConfig): boolean => {
  const required = ['id', 'dealName', 'companyName', 'route'];
  return required.every(field => {
    const value = config[field as keyof DealPageConfig];
    return value !== undefined && value !== null && value !== '';
  });
};
