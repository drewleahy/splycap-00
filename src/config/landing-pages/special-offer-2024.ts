
import { LandingPageConfig } from '@/types/landing';
import { Star, Target, Users } from 'lucide-react';

export const specialOffer2024Config: LandingPageConfig = {
  id: "special-offer-2024",
  title: "Special Investment Opportunity 2024",
  route: "/exclusive-investment-2024",
  seo: {
    title: "Exclusive Investment Opportunity - SPLY Capital",
    description: "Limited-time exclusive investment opportunity with SPLY Capital. High-growth potential in emerging technologies.",
    keywords: ["investment", "venture capital", "exclusive opportunity", "SPLY Capital"]
  },
  hero: {
    headline: "Exclusive Investment Opportunity",
    subheadline: "Join leading investors in our latest high-potential venture. Limited spots available for qualified investors.",
    image: "/lovable-uploads/b775e78f-bfa7-4461-bacc-8661144da34b.png",
    ctaText: "Learn More",
    ctaLink: "#details"
  },
  features: {
    title: "Why This Opportunity",
    items: [
      {
        title: "Proven Track Record",
        description: "Our portfolio companies have achieved an average 3x return over the past 5 years.",
        icon: Star
      },
      {
        title: "Strategic Focus",
        description: "Focused investment in high-growth technology sectors with massive market potential.",
        icon: Target
      },
      {
        title: "Expert Network",
        description: "Access to our extensive network of industry experts, advisors, and successful entrepreneurs.",
        icon: Users
      }
    ]
  },
  cta: {
    headline: "Ready to Join Us?",
    description: "This opportunity is available to qualified investors only. Contact us to learn more about minimum investment requirements and terms.",
    primaryButtonText: "Request Information",
    primaryButtonLink: "mailto:investments@splycapital.com?subject=Exclusive Investment Inquiry",
    secondaryButtonText: "Schedule Call",
    secondaryButtonLink: "https://calendly.com/splycapital"
  },
  footer: {
    copyright: "© 2024 SPLY Capital. All rights reserved.",
    links: [
      {
        text: "Privacy Policy",
        url: "/privacy"
      },
      {
        text: "Terms",
        url: "/terms"
      },
      {
        text: "Contact",
        url: "mailto:info@splycapital.com"
      }
    ]
  }
};
