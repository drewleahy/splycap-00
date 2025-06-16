import { DealPageConfig } from "@/types/deal-template";

const neurableConfig: DealPageConfig = {
  id: "neurable-exclusive-2025",
  dealName: "Neurable",
  companyName: "Neurable",
  route: "/deals/neurable-exclusive-2025",
  seo: {
    title: "Neurable — SPLY Capital Exclusive 2025",
    description: "Access the SPLY Capital exclusive Neurable investment opportunity. Explore deal details, company, market, and investment thesis.",
    keywords: ["Neurable", "Investment Deal", "SPLY Capital", "2025", "Exclusive"],
  },
  hero: {
    headline: "Exclusive Access: Neurable Investment Opportunity",
    subheadline: "Join SPLY Capital in a $2M allocation to Neurable — a category-defining brain-computer interface (BCI) platform enabling neural interaction across consumer electronics, defense, and wellness.",
    primaryCta: {
      text: "Sign NDA to View Diligence Materials",
      link: "#details"
    },
    secondaryCta: {
      text: "Book a Call",
      link: "https://calendly.com/haley-splycapital/deal-interest"
    }
  },
  // Keep "opportunity" for fallback but it's not used on the Neurable deal page
  opportunity: {
    title: "Strategic Entry into a Category Leader in Non-Invasive Brain-Computer Interfaces",
    description: "",
    keyMetrics: []
  },
  market: {
    title: "Global BCI Market Reaching $6.5B by 2030",
    description: `The global BCI market is projected to grow from $2.2B in 2023 to $6.5B by 2030 (CAGR: ~17%). Neurable is positioned at the center of four high-growth verticals:

Consumer Wearables: Headphones, XR, earbuds

Neuroanalytics: Tracking stress, focus, fatigue

Defense: Operator performance optimization

Wellness: Brain-state anomaly detection
`,
    headerLabel: "Market Context",
  },
  company: {
    title: "About Neurable",
    description: "Founded at the University of Michigan and backed by leading neuroscientists, Neurable's platform unlocks effortless focus, cognitive insights, and mental wellness through EEG headbands and everyday headphones.",
    logoSrc: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=200&q=80",
    logoAlt: "Neurable logo",
    headerLabel: "Company Overview",
    keyStats: [
      "50+ patents pending and granted",
      "Launched partnerships with Jabra, Bose",
      "Awarded CES 2024 Innovation"
    ],
  },
  traction: {
    title: "Commercial Traction",
    description: "OEM and Defense Revenue Building Toward Scale",
    headerLabel: "Commercial Traction",
    keyPoints: [
      "Sony & Samsung licensing deals signed",
      "$5M+ in defense R&D grants (including DARPA)",
      "Proof of concept completed with Master & Dynamic",
      "OEM-integrated product lines launching in 2025",
      "Targeting $10M revenue in 2025"
    ],
    additionalContent: "",
  },
  thesis: {
    title: "Why We're Investing",
    description: "IP Moat + Exit Signals",
    points: [
      {
        title: "Defensible IP Portfolio",
        description: "Early patents protecting EEG signal capture and real-time cognitive state tracking",
      },
      {
        title: "Capital-Light Growth Model",
        description: "OEM licensing + defense funding model means low burn and scalable revenue",
      },
      {
        title: "Acquirer-Ready Architecture",
        description: "Active conversations with Apple, Meta, Samsung",
      },
      {
        title: "Strategic Board & Support",
        description: "Includes Mithril Capital and Pace Ventures",
      },
      {
        title: "Strong Exit Precedents",
        description: "CTRL-Labs (Meta), Axonics (Boston Scientific), Blackrock Neuro (Tether)",
      },
      {
        title: "Projected 3–4x step-up in Series B valuation",
        description: "",
      },
    ],
  },
  cta: {
    headline: "Next Steps",
    description: "We've secured this exclusive allocation for the SPLYCAP network at a $80M pre-money valuation, and the round is closing quickly.",
    primaryButton: {
      text: "Sign NDA to View Diligence Materials",
      link: "mailto:info@splycapital.com?subject=Requesting%20Neurable%20Data%20Room"
    },
    secondaryButton: {
      text: "Sign (International) NDA to View Diligence Materials",
      link: "mailto:info@splycapital.com?subject=Requesting%20Neurable%20International%20Data%20Room"
    },
    tertiaryButton: {
      text: "Book a Call",
      link: "https://calendly.com/haley-splycapital/deal-interest"
    },
    quaternaryButton: {
      text: "Visit Neurable.com",
      link: "https://neurable.com/"
    }
  },
  video: {
    title: "Neurable Product Demo",
    description: "See Neurable's next generation neural wearable in action.",
    videoUrl: "https://player.vimeo.com/video/968123456?h=0",
  },
  footer: {
    copyright: "© 2025 SPLY CAPITAL. All rights reserved.",
    links: []
  },
};
export default neurableConfig;
