
import { DealPageConfig } from '@/types/deal-template';
import { Microscope, TrendingUp, Shield, Award, Globe, Zap } from 'lucide-react';

export const nanotronicsConfig: DealPageConfig = {
  id: "nanotronics",
  dealName: "Nanotronics Investment Opportunity",
  companyName: "Nanotronics",
  route: "/deals/nanotronics-exclusive-2025",
  
  seo: {
    title: "Exclusive Nanotronics Investment Opportunity - SPLY Capital",
    description: "Join SPLY Capital's exclusive investment in Nanotronics, the AI-powered industrial inspection platform revolutionizing manufacturing quality control.",
    keywords: ["nanotronics", "AI inspection", "manufacturing", "quality control", "investment opportunity", "SPLY Capital", "exclusive"]
  },
  
  hero: {
    headline: "Exclusive Access: Nanotronics Investment Opportunity",
    subheadline: "Join SPLY Capital's investment in Nanotronics — the AI-powered industrial inspection platform revolutionizing manufacturing quality control across global supply chains.",
    primaryCta: {
      text: "Schedule a Call",
      link: "https://calendly.com/haley-splycapital/deal-interest"
    },
    secondaryCta: {
      text: "Sign NDA to View Materials",
      link: "#nda-materials"
    },
    tertiaryCta: {
      text: "Download Deck",
      link: "#download-deck"
    }
  },
  
  opportunity: {
    title: "Access to a Strategic Growth Round in a Category-Leading AI Manufacturing Platform",
    description: "SPLY Capital has secured a meaningful allocation in Nanotronics' oversubscribed growth round. With its proprietary AI-powered inspection systems already deployed by global leaders—including Google, Intel, and Illumina—the company is scaling rapidly across semiconductor, aerospace, and life science industries.",
    keyMetrics: [
      "$400M+ current valuation",
      "Leading strategic investors participating", 
      "Strong revenue growth trajectory",
      "Proven market traction with major manufacturers"
    ]
  },
  
  market: {
    title: "Massive Industrial Inspection Market Opportunity",
    description: "The global industrial inspection market is valued at $20+ billion and growing rapidly. Traditional manual inspection methods are being replaced by AI-powered solutions that deliver superior accuracy, speed, and cost efficiency.",
    headerLabel: "Market Context"
  },
  
  company: {
    title: "Nanotronics: AI-Powered Industrial Inspection Leader",
    description: "Nanotronics combines advanced AI algorithms with sophisticated imaging technology to create autonomous inspection systems for manufacturing. Their platform detects defects and anomalies that human inspectors often miss, reducing waste and improving quality across production lines.",
    logoSrc: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    logoAlt: "Nanotronics Logo",
    headerLabel: "Company Overview",
    keyStats: [
      "Fortune 500 customer base",
      "90%+ defect detection accuracy improvement",
      "50%+ reduction in inspection time",
      "Global manufacturing partnerships"
    ]
  },
  
  traction: {
    title: "Proven Commercial Success with Global Manufacturers",
    description: "Nanotronics has demonstrated strong commercial validation through partnerships with leading manufacturers:",
    headerLabel: "Commercial Traction",
    keyPoints: [
      "Deployed across automotive, electronics, and aerospace industries",
      "Multi-million dollar contracts with Fortune 500 companies",
      "Expanding international presence in Europe and Asia",
      "Strong recurring revenue model with high customer retention"
    ]
  },
  
  thesis: {
    title: "Compelling Investment Thesis",
    description: "Nanotronics represents an exceptional investment opportunity at the intersection of AI and industrial automation:",
    points: [
      {
        title: "Market-Leading Technology",
        description: "Proprietary AI algorithms delivering superior inspection accuracy and speed",
        icon: Microscope
      },
      {
        title: "Proven Revenue Growth",
        description: "Strong financial performance with expanding customer base and contracts",
        icon: TrendingUp
      },
      {
        title: "Defensible IP Portfolio",
        description: "Extensive patent portfolio protecting core inspection technologies",
        icon: Shield
      },
      {
        title: "Experienced Leadership",
        description: "World-class team with deep expertise in AI, manufacturing, and enterprise sales",
        icon: Award
      },
      {
        title: "Global Market Expansion",
        description: "Scaling operations internationally with strategic partnerships",
        icon: Globe
      },
      {
        title: "AI Innovation Edge",
        description: "Continuous R&D investment maintaining technological leadership",
        icon: Zap
      }
    ]
  },
  
  backing: {
    title: "Backed by Leading Investors and Strategic Partners",
    description: "Nanotronics is supported by top-tier investors and has formed strategic partnerships with industry leaders:",
    keyPoints: [
      "Backed by prominent venture capital firms",
      "Strategic partnerships with major manufacturing companies",
      "Strong advisory board with industry veterans",
      "Government and institutional support for AI innovation"
    ]
  },
  
  cta: {
    headline: "Next Steps",
    description: "We've secured this exclusive allocation for the SPLYCAP network. The round is closing quickly as demand exceeds availability.",
    primaryButton: {
      text: "Download Investment Materials",
      link: "#download-materials"
    },
    secondaryButton: {
      text: "Sign NDA to View Diligence",
      link: "#nda-materials"
    },
    tertiaryButton: {
      text: "Book a Call",
      link: "https://calendly.com/haley-splycapital/deal-interest"
    }
  },
  
  video: {
    title: "See Nanotronics AI Inspection in Action",
    description: "Watch how Nanotronics' AI-powered inspection technology is transforming manufacturing quality control",
    videoUrl: "https://player.vimeo.com/video/nanotronics-demo"
  },
  
  footer: {
    copyright: "© 2025 SPLY CAPITAL. All rights reserved.",
    links: []
  }
};
