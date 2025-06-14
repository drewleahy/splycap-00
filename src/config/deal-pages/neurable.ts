
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
      text: "Download Deck",
      link: "https://neurable.com/2025-deck.pdf"
    }
  },
  // Keep "opportunity" for fallback but it's not used on the Neurable deal page
  opportunity: {
    title: "Market Context & Strategic Positioning",
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
    description: "Founded at the University of Michigan and backed by leading neuroscientists, Neurable’s platform unlocks effortless focus, cognitive insights, and mental wellness through EEG headbands and everyday headphones.",
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
      "$5M+ in defense R&D grants (incl. DARPA)",
      "Proof of concept completed with Master & Dynamic",
      "Targeting $10M revenue in 2025"
    ],
    additionalContent: "",
  },
  thesis: {
    title: "Why We’re Investing",
    description: "Neurable’s strong IP, commercial traction, and category-defining team position it as the winner in BCI-enabled audio wearables.",
    points: [
      {
        title: "Category-Defining IP",
        description: "Proprietary BCI tech with early FDA pathway and consumer focus.",
      },
      {
        title: "Market Tailwinds",
        description: "Growing demand for brain wellness and wearables with advanced sensors.",
      },
      {
        title: "Execution & Partnerships",
        description: "OEM deals with leading headphone brands; fast go-to-market.",
      },
      {
        title: "Elite Team",
        description: "Leading experts from neuroscience, engineering, and consumer electronics.",
      },
      {
        title: "Moat",
        description: "High defensibility via patents, data, and platform lock-in.",
      },
    ],
  },
  backing: {
    title: "Strategic Backing",
    description: "Supported by top VC firms and strategic angels in neuroscience and audio hardware.",
    keyPoints: [
      "Major Silicon Valley VCs",
      "Consumer brand partnerships in negotiation",
      "Advisors include pioneers in BCI and wearable tech"
    ],
  },
  cta: {
    headline: "Interested in Neurable’s Revolution?",
    description: "Request access to our data room to view the full Neurable investment deck, diligence materials, and virtual demo.",
    primaryButton: {
      text: "Request Data Room",
      link: "mailto:info@splycapital.com?subject=Requesting%20Neurable%20Data%20Room"
    },
    secondaryButton: {
      text: "Download Investment Deck",
      link: "https://neurable.com/2025-deck.pdf"
    },
    tertiaryButton: {
      text: "Meet the Neurable Team",
      link: "https://neurable.com/team"
    },
    quaternaryButton: {
      text: "Visit Neurable.com",
      link: "https://neurable.com/"
    }
  },
  video: {
    title: "Neurable Product Demo",
    description: "See Neurable’s next generation neural wearable in action.",
    videoUrl: "https://player.vimeo.com/video/968123456?h=0",
  },
  footer: {
    copyright: "© 2025 Neurable. All rights reserved.",
    links: [
      { text: "Website", url: "https://neurable.com" },
      { text: "Contact", url: "mailto:info@neurable.com" },
      { text: "Privacy", url: "https://neurable.com/privacy" }
    ],
  },
};
export default neurableConfig;
