
import { DealPageConfig } from "@/types/deal-template";

const neurableLogo = "/lovable-uploads/f23f77bf-733f-4ad5-9795-3558974c76de.png";

const neurbaleDealConfig: DealPageConfig = {
  id: "neurable-exclusive-2025",
  dealName: "Neurable Series A-3",
  companyName: "Neurable",
  route: "/deals/neurable-exclusive-2025",
  seo: {
    title: "Neurable – $5M SPV in $8M Series A3 @ $80M Valuation | SPLY Capital",
    description: "High-alpha neurotechnology investment: Join $5M SPV in Neurable Series A-3 alongside Sony, Samsung, and top defense partners. Strong IP, BCI leadership, and scalable SaaS licensing.",
    keywords: ["Neurable", "Brain Computer Interface", "SPV", "SPLY Capital", "neurotechnology", "investment", "BCI", "Series A3"],
  },
  hero: {
    headline: "IC Presentation: $5M SPV in $8M Series A3 @ $80M Valuation",
    subheadline:
      "We recommend a $5M investment in Neurable as part of its current $8M Series A-3 financing round. Neurable is a category-defining neurotechnology company building the world’s most accurate, non-invasive brain-computer interface (BCI) platform—powering new modes of interaction across consumer electronics, defense, and healthcare.",
    backgroundImage: "", // Optionally add a bg image path here
    primaryCta: {
      text: "Request Diligence Materials",
      link: "#details",
    },
    secondaryCta: {
      text: "Download Flyer",
      link: "#download-flyer",
    },
    tertiaryCta: {
      text: "Book Intro Call",
      link: "https://calendly.com/haley-splycapital/deal-interest",
    },
  },
  opportunity: {
    title: "Why We Are Investing",
    description: "",
    keyMetrics: [
      {
        header: "Category Leadership in BCI",
        body: "Neurable’s patented signal processing architecture solves the decades-old problem of signal-to-noise degradation in non-invasive electroencephalography (EEG), enabling productized brain-computer interfaces in earbuds and headphones.",
      },
      {
        header: "OEM + Defense Traction",
        body: "Neurable has closed contracts with Sony and Samsung for licensing and co-development, and secured $5M in defense grants, including work with DARPA and other defense innovation units.",
      },
      {
        header: "IP Portfolio with Deep Moat",
        body: "With 33 patents filed and 11 granted, Neurable owns one of the most defensible non-invasive BCI intellectual property portfolios in the world, predating Apple’s in-ear EEG efforts.",
      },
      {
        header: "Founder Expertise + Board Strength",
        body: "Founder & CEO Ramses Alcaide, PhD, is a neuroscientist and BCI pioneer. The board includes Mithril Capital (Peter Thiel’s fund) and Pace Ventures, which has underwritten for a $500M exit minimum.",
      },
      {
        header: "Software-Led Model, No Hardware Burden",
        body: "Neurable owns the software intellectual property stack while integrating with existing headphone OEMs. Unlike competitors, Neurable does not manufacture hardware, enabling fast, capital-efficient scaling.",
      },
      {
        header: "Exit Tailwinds Building",
        body: "With multiple OEM partnerships and an acquirer-ready licensing model, Neurable is an ideal target for companies like Apple, Meta, Samsung, or Bose, and is already in discussions with some of them.",
      },
    ],
  },
  market: {
    title: "Market Opportunity & Strategic Positioning",
    description: `**BCI Market Inflection**
The global brain-computer interface (BCI) market is projected to grow from $2.2B in 2023 to $6.5B by 2030, driven by consumer wearables, neuro-assistive applications, and productivity augmentation. Neurable is positioned at the convergence of these verticals, with a productized EEG architecture deployable across consumer and government channels.

- **Consumer Wearables:** Headphones, earbuds, XR devices
- **Neuro-Predictive Monitoring:** Focus, fatigue, stress, productivity
- **Defense & National Security:** Operator performance, cognitive load, signal tracking
- **Mental Health & Wellness:** Early detection of brain-state anomalies

**Competitive Map**
| Company           | Focus                        | Weakness vs. Neurable         |
|-------------------|-----------------------------|-------------------------------|
| CTRL-Labs (Meta)  | Muscle-based wrist interface | Acquired by Meta; requires EMG|
| Kernel            | Optical neuroimaging         | $100M+ burn, high-cost hardware|
| Emotiv            | EEG headsets                 | Bulky hardware, low signal quality|
| Apple             | R&D in neural earbuds        | Project reportedly failed; patents post-date Neurable|
| Blackrock Neurotech| Invasive implants           | Not scalable for consumer applications|

Neurable is the only non-invasive, software-first BCI platform with validated signal quality across commercial and defense endpoints.`,
    headerLabel: "Market Context",
  },
  company: {
    title: "Product & Technology",
    description:
      `**Platform Includes:**\n\n- **Signal Engine (Core IP):** Captures and amplifies brain signals with high SNR, removes noise in real-time, enables plug-and-play with zero calibration.\n\n- **Software SDK:** Integrates with OEM headphones/earbuds, enables real-time tracking of focus, fatigue, stress, and is used for UX, defense, and wellness apps.\n\n- **IP Portfolio:** 33 patents filed, 11 granted across signal processing, artifact removal, cognitive state tracking, and wearable EEG. Patents pre-date Apple and protect against competitive encroachment. Validated via peer-reviewed publications showing 30-minute advance prediction of cognitive failure (vs. 1–5 seconds for existing wearables).`,
    logoSrc: neurableLogo,
    logoAlt: "Neurable Logo",
    headerLabel: "Company Overview",
    keyStats: [
      "33 patents filed, 11 granted across signal processing and EEG state tracking",
      "Commercial partnerships with Sony, Samsung, Master & Dynamic",
      "Validated via peer-reviewed publications (Nature, others)",
    ],
  },
  traction: {
    title: "Business Model & Go-To-Market Strategy",
    description: "",
    headerLabel: "Commercial Traction",
    keyPoints: [
      "**OEM Licensing** (Sony, Samsung): NRE fees + licensing royalties",
      "**Defense Contracts**: R&D funding + product co-development",
      "**Future SaaS**: SDK licensing for app developers and research partners",
      "**GTMP Execution**: Proof of concept with Master & Dynamic; now scaling into Samsung, Sony",
      "Targeting enterprise wellness/workforce (B2B mental focus analytics)",
      "Defense R&D de-risks new capabilities without burning VC",
      "**2025 Targets:** $10M revenue, OEM product lines, scale SDK licensing and expand defense rev.",
    ],
    additionalContent: "",
  },
  thesis: {
    title: "Investment Risks & Mitigants",
    description: "",
    points: [
      {
        title: "Cap table complexity",
        description: "Mitigated via milestone-based equity refresh and active governance.",
      },
      {
        title: "Market education needed",
        description: "Defense + OEM validation de-risk consumer adoption.",
      },
      {
        title: "Competitive IP disputes",
        description: "Patent coverage pre-dates Apple, includes core EEG tech.",
      },
      {
        title: "Series B readiness",
        description: "Targeting >$10M revenue + contracts with global OEMs.",
      },
    ],
  },
  backing: {
    title: "Exit Scenarios & Return Potential",
    description: `**Precedent Transactions:**
- Meta acquired CTRL-Labs (2019, $500M–$1B)
- Boston Scientific acquired Axonics (2024, $3.7B)
- Tether invested in Blackrock Neuro (2024, $200M)
- Snap Inc. acquired NextMind (2022, undisclosed)

**Potential Acquirers:**
- Apple (AirPods, health expansion)
- Meta (Neural input, AR/VR)
- Sony / Samsung (existing partners)
- Google / Alphabet X (wellness + brain analytics)
- Bose / Jabra (audio-focused neurotech integrations)

**Return Profile:**
- 3–4x step-up for next round (Series B with top-tier VC)
- 10–15x potential M&A exit if Sony/Samsung/OEMs buy
- Optionality for IPO if B2B SaaS neurotech gains scale`,
    keyPoints: [
      "3–4x step-up for next round (Series B, top-tier VC)",
      "10–15x potential M&A exit if Sony/Samsung/OEMs buy",
      "Optionality for IPO if B2B SaaS neurotech gains scale",
    ],
  },
  cta: {
    headline: "Ready to learn more about Neurable?",
    description: "Access our diligence portal, review our investment thesis, or schedule an intro call.",
    primaryButton: { text: "Download Flyer", link: "#download-flyer" },
    secondaryButton: { text: "Sign NDA for Dataroom", link: "https://splycapital.com/neurable-nda" },
    tertiaryButton: { text: "Book Intro Call", link: "https://calendly.com/haley-splycapital/deal-interest" },
    quaternaryButton: { text: "Request Info", link: "mailto:hello@splycapital.com" },
  },
  footer: {
    copyright: "© 2025 SPLY CAPITAL. All rights reserved.",
    links: [
      { text: "SPLY Capital", url: "/" },
      { text: "Contact", url: "mailto:hello@splycapital.com" },
    ],
  },
};

export default neurbaleDealConfig;
