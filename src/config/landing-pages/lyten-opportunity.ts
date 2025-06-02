
import { LandingPageConfig } from '@/types/landing';
import { Battery, Zap, TrendingUp, Shield, Globe, Award } from 'lucide-react';

export const lytenOpportunityConfig: LandingPageConfig = {
  id: "lyten-opportunity",
  title: "Lyten Investment Opportunity",
  route: "/lyten-exclusive-2025",
  seo: {
    title: "Exclusive Lyten Investment Opportunity - SPLY Capital",
    description: "Join SPLY Capital's exclusive investment in Lyten, the revolutionary battery technology company backed by top-tier investors.",
    keywords: ["lyten", "battery technology", "investment opportunity", "SPLY Capital", "lithium sulfur", "clean energy"]
  },
  hero: {
    headline: "Exclusive Access: Lyten Investment Opportunity",
    subheadline: "Join SPLY Capital's strategic investment in Lyten — a breakthrough Lithium-Sulfur innovator disrupting global energy storage with a proprietary 3D Graphene platform and $4.5B in commercial contracts.",
    ctaText: "Schedule a Call",
    ctaLink: "https://calendly.com/splycapital/lyten-opportunity"
  },
  content: {
    title: "Global Energy Storage: A $569B Market by 2034",
    body: "The global energy storage systems market is poised for massive growth—projected to double from $289B today to over $569B by 2034 (Precedence Research). Battery Energy Storage Systems (BESS) alone will surge to $186.9B by 2030, driven by innovation from Tesla, LG Chem, Siemens—and now Lyten."
  },
  features: {
    title: "Why Lyten Represents a Transformational Investment",
    items: [
      {
        title: "Revolutionary Technology",
        description: "Lyten's proprietary 3D Graphene platform enables Lithium-Sulfur batteries with 40% better energy density than traditional lithium-ion.",
        icon: Battery
      },
      {
        title: "Massive Market Potential",
        description: "Targeting the $120B+ global battery market with applications in EVs, aerospace, defense, and energy storage.",
        icon: TrendingUp
      },
      {
        title: "Proven Leadership Team",
        description: "Led by industry veterans with decades of experience scaling breakthrough technologies in energy and materials.",
        icon: Award
      },
      {
        title: "Strategic Partnerships",
        description: "Partnerships with major automotive OEMs, aerospace companies, and government agencies validating commercial viability.",
        icon: Shield
      },
      {
        title: "Manufacturing Ready",
        description: "Moving beyond R&D with pilot production facilities and clear path to commercial scale manufacturing.",
        icon: Zap
      },
      {
        title: "Sustainability Impact",
        description: "Enabling the clean energy transition with safer, more efficient batteries using abundant sulfur materials.",
        icon: Globe
      }
    ]
  },
  cta: {
    headline: "Ready to Join This Exclusive Opportunity?",
    description: "This investment opportunity is available exclusively to qualified investors through SPLY Capital. Limited allocation available.",
    primaryButtonText: "Request Investment Details",
    primaryButtonLink: "mailto:investments@splycapital.com?subject=Lyten Investment Inquiry&body=I am interested in learning more about the Lyten investment opportunity through SPLY Capital.",
    secondaryButtonText: "Schedule Discussion",
    secondaryButtonLink: "https://calendly.com/splycapital/lyten-opportunity"
  },
  footer: {
    copyright: "© 2024 SPLY Capital. All rights reserved.",
    links: [
      {
        text: "Investment Disclosures",
        url: "/disclosures"
      },
      {
        text: "Privacy Policy",
        url: "/privacy"
      },
      {
        text: "Contact Us",
        url: "mailto:info@splycapital.com"
      }
    ]
  }
};
