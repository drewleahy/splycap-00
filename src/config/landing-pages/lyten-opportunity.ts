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
    subheadline: "Join SPLY Capital's investment in Lyten — a Lithium-Sulfur innovator redefining energy storage with 3D Graphene tech and $4.5B in contracts.",
    ctaText: "Schedule a Call",
    ctaLink: "https://calendly.com/splycapital/lyten-opportunity",
    secondaryCtaText: "Watch Video",
    secondaryCtaLink: "https://vimeo.com/999262573"
  },
  opportunitySection: {
    title: "Access to an Oversubscribed Round at a Strategic Entry Point",
    body: "SPLY Capital has secured a $10–20M allocation in Lyten's oversubscribed Series B extension at a $1.55B valuation. Goldman Sachs is leading the Series C in July, with a projected 3.5–4x valuation step-up. Lyten is targeting an IPO in 2026–2027.",
    keyPoints: [
      "$1.55B current valuation",
      "Goldman Sachs-led Series C launching July 2025",
      "Projected 3.5–4x step-up from today's entry",
      "IPO targeted for 2026–2027"
    ]
  },
  content: {
    title: "Global Energy Storage: A $569B Market by 2034",
    body: "As of 2025, the global energy storage systems market is valued at $288.97B and projected to reach $569.39B by 2034 (7.87% CAGR, Precedence Research). The Battery Energy Storage Systems (BESS) segment is expected to triple to $186.9B by 2030, driven by innovation from Tesla, LG Chem, Siemens — and now, Lyten.",
    headerLabel: "Market Context"
  },
  lytenSection: {
    title: "Lyten's Lithium-Sulfur Advantage",
    body: "Lyten is developing next-generation Lithium-Sulfur batteries enabled by a proprietary 3D Graphene platform. The technology delivers 40% higher energy density than traditional lithium-ion and eliminates reliance on nickel, cobalt, and manganese — enabling safer, more efficient batteries using abundant sulfur materials.",
    logoSrc: "/lovable-uploads/a2a03b30-6e55-4ec1-b4d4-7450fb3c678a.png",
    logoAlt: "Lyten Logo",
    headerLabel: "Company Overview",
    keyStats: [
      "500+ patents globally",
      "95% lithium extraction efficiency",
      "Performance metrics exceed Tesla Megapack, CATL, Panasonic"
    ]
  },
  commercialTraction: {
    title: "$4.5B in Signed Contracts",
    body: "Lyten has secured $4.5B in commercial agreements across three major deals:",
    headerLabel: "Commercial Traction",
    keyPoints: [
      "$1.5B with Trinidad & Tobago",
      "$1.5B with Angola", 
      "$1.5B in additional global agreements"
    ]
  },
  whyInvesting: {
    title: "Clear Differentiation and Strategic Alignment",
    body: "Lyten combines proprietary technology, validated demand, and alignment with global priorities for energy security and climate impact.",
    items: [
      {
        title: "Proven Commercial Demand",
        description: "$4.5B in signed commercial contracts across energy, infrastructure, and defense",
        icon: TrendingUp
      },
      {
        title: "Defensible IP Portfolio",
        description: "500+ patents securing Li-S and 3D Graphene innovations",
        icon: Shield
      },
      {
        title: "Category-Leading Performance",
        description: "Superior performance to incumbent Li-ion leaders (Tesla, CATL, Panasonic)",
        icon: Battery
      },
      {
        title: "Strategic Government Support",
        description: "EXIM Bank $650M commitment supporting emerging market deployment",
        icon: Award
      },
      {
        title: "Institutional-Grade Partnerships",
        description: "Blue-chip partners and leadership from Stellantis, Honeywell, NASA, Tesla, GM",
        icon: Globe
      }
    ]
  },
  strategicBacking: {
    title: "Validated by Industry and Government",
    body: "Lyten is supported by both public and private institutions:",
    keyPoints: [
      "$650M commitment from U.S. EXIM Bank",
      "Partners include Stellantis, Honeywell, NASA",
      "Leadership team includes veterans from Tesla, GM, Panasonic",
      "Applications in defense and aerospace"
    ]
  },
  features: {
    title: "Why We're Investing",
    items: [
      {
        title: "Proven Commercial Demand",
        description: "$4.5B in signed commercial contracts across energy, infrastructure, and defense",
        icon: TrendingUp
      },
      {
        title: "Defensible IP Portfolio",
        description: "500+ patents securing Li-S and 3D Graphene innovations",
        icon: Shield
      },
      {
        title: "Category-Leading Performance",
        description: "Superior performance to incumbent Li-ion leaders (Tesla, CATL, Panasonic)",
        icon: Battery
      },
      {
        title: "Strategic Government Support",
        description: "EXIM Bank $650M commitment supporting emerging market deployment",
        icon: Award
      },
      {
        title: "Institutional-Grade Partnerships",
        description: "Blue-chip partners and leadership from Stellantis, Honeywell, NASA, Tesla, GM",
        icon: Globe
      }
    ]
  },
  cta: {
    headline: "Next Steps",
    description: "We've secured this exclusive allocation for the SPLYCAP network at a $1.55B valuation, and the round is closing quickly.",
    primaryButtonText: "Download Flyer",
    primaryButtonLink: "#download-flyer",
    secondaryButtonText: "Sign NDA to View Diligence Materials",
    secondaryButtonLink: "https://docsend.com/view/s/xq8d5sgc7btdhde8",
    tertiaryButtonText: "Book a Call",
    tertiaryButtonLink: "https://calendly.com/splycapital/lyten-opportunity"
  },
  footer: {
    copyright: "© 2025 SPLY CAPITAL. All rights reserved.",
    links: []
  }
};
