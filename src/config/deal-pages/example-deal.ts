
import { DealPageConfig } from '@/types/deal-template';
import { Battery, TrendingUp, Shield, Award, Globe } from 'lucide-react';

export const exampleDealConfig: DealPageConfig = {
  id: "example-company",
  dealName: "Example Company Investment Opportunity",
  companyName: "Example Corp",
  route: "/deals/example-corp-exclusive-2025",
  
  seo: {
    title: "Exclusive Example Corp Investment Opportunity - SPLY Capital",
    description: "Join SPLY Capital's exclusive investment in Example Corp, a revolutionary technology company backed by top-tier investors.",
    keywords: ["example corp", "technology", "investment opportunity", "SPLY Capital", "exclusive"]
  },
  
  hero: {
    headline: "Exclusive Access: Example Corp Investment Opportunity",
    subheadline: "Join SPLY Capital's investment in Example Corp — a revolutionary tech company redefining the industry with breakthrough innovation.",
    primaryCta: {
      text: "Schedule a Call",
      link: "https://calendly.com/haley-splycapital/deal-interest"
    },
    secondaryCta: {
      text: "Sign NDA to View Materials",
      link: "https://example-nda-link.com"
    },
    tertiaryCta: {
      text: "Watch Video",
      link: "https://vimeo.com/example-video"
    }
  },
  
  opportunity: {
    title: "Access to an Oversubscribed Round at a Strategic Entry Point",
    description: "SPLY Capital has secured a significant allocation in Example Corp's oversubscribed Series B at an attractive valuation. Leading VCs are participating in the next round with projected strong returns.",
    keyMetrics: [
      {
        header: "$XXX million current valuation",
        body: "Attractive entry point with strong institutional backing and clear path to next round"
      },
      {
        header: "Top-tier VC leading next round",
        body: "Major venture capital firms committed to supporting the company's growth trajectory"
      },
      {
        header: "Projected X.X step-up potential",
        body: "Strong fundamentals and market position suggest significant value creation opportunity"
      },
      {
        header: "Strong exit pathway identified",
        body: "Clear strategic acquirers and IPO potential based on market leadership position"
      }
    ]
  },
  
  market: {
    title: "Massive Market Opportunity",
    description: "The market Example Corp operates in represents a multi-billion dollar opportunity with strong growth fundamentals and clear market drivers.",
    headerLabel: "Market Context"
  },
  
  company: {
    title: "Example Corp's Competitive Advantage",
    description: "Example Corp is developing next-generation technology that delivers superior performance while reducing costs. The technology represents a significant breakthrough in the industry.",
    logoSrc: "/placeholder-logo.png", // You would replace this with actual logo
    logoAlt: "Example Corp Logo",
    headerLabel: "Company Overview",
    keyStats: [
      "Key metric 1",
      "Key metric 2", 
      "Key metric 3"
    ]
  },
  
  traction: {
    title: "Strong Commercial Validation",
    description: "Example Corp has demonstrated strong commercial traction with key partnerships and customer validation:",
    headerLabel: "Commercial Traction",
    keyPoints: [
      "Partnership with major customer",
      "Proven revenue generation",
      "Strong pipeline of opportunities"
    ]
  },
  
  thesis: {
    title: "Clear Investment Thesis",
    description: "Example Corp represents an exceptional investment opportunity based on multiple factors:",
    points: [
      {
        title: "Market Leadership",
        description: "Clear competitive advantages and market positioning",
        icon: TrendingUp
      },
      {
        title: "Proven Technology",
        description: "Validated technology with superior performance metrics",
        icon: Battery
      },
      {
        title: "Strong IP Portfolio",
        description: "Defensible intellectual property and patents",
        icon: Shield
      },
      {
        title: "Experienced Team",
        description: "World-class leadership team with proven track record",
        icon: Award
      },
      {
        title: "Strategic Partnerships",
        description: "Key relationships with industry leaders",
        icon: Globe
      }
    ]
  },
  
  backing: {
    title: "Validated by Industry Leaders",
    description: "Example Corp is supported by top-tier investors and strategic partners:",
    keyPoints: [
      "Backed by leading VCs",
      "Strategic partnerships with industry leaders",
      "Experienced advisory board",
      "Strong institutional support"
    ]
  },
  
  cta: {
    headline: "Next Steps",
    description: "We've secured this exclusive allocation for the SPLYCAP network, and the round is closing quickly.",
    primaryButton: {
      text: "Download Materials",
      link: "#download-materials"
    },
    secondaryButton: {
      text: "Sign NDA",
      link: "https://example-nda-link.com"
    },
    tertiaryButton: {
      text: "Book a Call", 
      link: "https://calendly.com/haley-splycapital/deal-interest"
    }
  },
  
  video: {
    title: "Watch Example Corp's Vision",
    description: "Learn more about the company's technology and market opportunity",
    videoUrl: "https://vimeo.com/example-video"
  },
  
  footer: {
    copyright: "© 2025 SPLY CAPITAL. All rights reserved.",
    links: []
  }
};
