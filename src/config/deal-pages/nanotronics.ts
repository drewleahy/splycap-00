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
      {
        header: "$705M post-money valuation",
        body: "Backed by leading global investors including Founders Fund, the Investment Corporation of Dubai, and Plug and Play Tech Center"
      },
      {
        header: "Deep partnerships with industry giants",
        body: "Selected by Google as the exclusive advanced inspection partner for its Willow quantum chip program"
      },
      {
        header: "Accelerating revenue and commercialization",
        body: "Rapid growth driven by deployments of nSpec™ and nControl™ systems across mission-critical production lines"
      },
      {
        header: "Defensible IP and platform expansion",
        body: "150+ patents protect its core AI, optical, and automation technology—now powering modular CubeFab™ facilities worldwide"
      }
    ]
  },
  
  market: {
    title: "Positioned at the Forefront of a Manufacturing Revolution",
    description: "Nanotronics is pioneering the future of industrial inspection by integrating artificial intelligence, machine learning, and advanced imaging into mission-critical production environments. As industries transition away from fragmented, manual inspection methods, Nanotronics' platform is emerging as the new standard — delivering unprecedented levels of precision, scalability, and efficiency.\n\nWith proven adoption in semiconductors, aerospace, life sciences, and quantum computing, Nanotronics is not just addressing today's manufacturing needs — it's defining the infrastructure for the factories of the future.",
    headerLabel: "Market Context"
  },
  
  company: {
    title: "Nanotronics: AI-Powered Optical Inspection for Advanced Manufacturing",
    description: "Nanotronics is redefining industrial inspection and factory control through a proprietary platform that combines artificial intelligence, machine learning, and advanced imaging. Its nSpec™ and nControl™ systems automate quality assurance at the nanoscale—driving higher yields, lower costs, and faster innovation across semiconductors, aerospace, life sciences, and quantum computing.",
    logoSrc: "/lovable-uploads/138211f1-327b-4096-a569-d960abb0e1b1.png",
    logoAlt: "Nanotronics Logo",
    headerLabel: "Company Overview",
    keyStats: [
      "400+ patents issued and pending",
      "Deployed across 250+ global customers in 34 countries",
      "Selected by Google for quantum chip development with nSpec™ systems"
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
    ],
    additionalContent: "Nanotronics' systems—nSpec™ for inspection and nControl™ for process optimization—are being scaled globally through strategic partnerships and modular CubeFab™ deployments."
  },
  
  thesis: {
    title: "Compelling Investment Thesis",
    description: "Nanotronics combines proprietary technology, demonstrated commercial traction, and a defensible AI platform—aligning with critical trends in advanced manufacturing, supply chain security, and next-generation computing.",
    points: [
      {
        title: "Proven Commercial Demand",
        description: "Deployed by 250+ customers across 34 countries, including leaders in semiconductors, aerospace, and life sciences",
        icon: TrendingUp
      },
      {
        title: "Defensible IP Portfolio",
        description: "Over 400 issued and pending patents spanning AI, optics, quantum inspection, and process automation",
        icon: Shield
      },
      {
        title: "Category-Leading Performance",
        description: "Exclusive partner to Google's Willow quantum chip team; nSpec™ achieved >90% inspection accuracy, surpassing legacy AOI methods",
        icon: Microscope
      },
      {
        title: "Strategic Government Engagement",
        description: "Nanotronics CEO testified before Congress as an expert in AI and quantum manufacturing policy",
        icon: Award
      },
      {
        title: "Institutional-Grade Partnerships",
        description: "Backed by Founders Fund, Investment Corporation of Dubai, and used by Google, Intel, Meta, Canon, Amazon, Illumina, and more",
        icon: Globe
      }
    ]
  },
  
  backing: {
    title: "Validated by Leading Institutions Across Industry and Government",
    description: "Nanotronics is supported by a powerful combination of private investors, commercial partners, and government engagement:",
    keyPoints: [
      "Backed by Founders Fund, Investment Corporation of Dubai, and Plug and Play Tech Center",
      "Selected by Google as the exclusive optical inspection partner for its Willow quantum chip",
      "Customers include Intel, Meta, Amazon, Canon, Illumina, and over 250 others",
      "CEO Matthew Putman has testified before Congress on AI and quantum leadership",
      "Applications span semiconductors, quantum, aerospace, life sciences, and national security tech"
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
