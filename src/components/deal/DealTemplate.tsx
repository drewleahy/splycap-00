import React, { useEffect, useState } from 'react';
import { DealPageConfig } from '@/types/deal-template';
import { LandingLayout } from '@/components/landing/LandingLayout';
import { LandingHero } from '@/components/landing/LandingHero';
import { LandingOpportunity } from '@/components/landing/LandingOpportunity';
import { LandingContent } from '@/components/landing/LandingContent';
import { LandingContentWithLogo } from '@/components/landing/LandingContentWithLogo';
import { LandingFeatures } from '@/components/landing/LandingFeatures';
import { LandingCTA } from '@/components/landing/LandingCTA';
import { LandingVideoSection } from '@/components/landing/LandingVideoSection';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { CustomerLogosSection } from './CustomerLogosSection';
import { NeurableDeckUpload } from "./NeurableDeckUpload";
import { NeurableOpportunitySection } from "./NeurableOpportunitySection";
import { useAuth } from "@/hooks/use-auth";
import { NeurableProductTechnologySection } from "./NeurableProductTechnologySection";

interface DealTemplateProps {
  config: DealPageConfig;
}

export const DealTemplate = ({ config }: DealTemplateProps) => {
  useEffect(() => {
    // Set document title
    document.title = config.seo.title;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', config.seo.description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = config.seo.description;
      document.head.appendChild(meta);
    }

    console.log(`Deal page view: ${config.id}`);
  }, [config]);

  const { user } = useAuth();

  // Only show hero photo if there's a backgroundImage present for this deal config
  const showHeroPhoto = Boolean(config.hero.backgroundImage);

  // Only show CustomerLogosSection for certain deals (e.g., Nanotronics)
  const showCustomerLogos = config.id === "nanotronics";

  // Special handling for Neurable download deck PDF override
  const [neurableDeckUrl, setNeurableDeckUrl] = useState<string | null>(null);
  const isNeurable = config.id === "neurable-exclusive-2025";

  useEffect(() => {
    if (isNeurable) {
      setNeurableDeckUrl(localStorage.getItem("neurable-deck-url") || null);
    }
  }, [isNeurable]);

  // Determine which PDF link to use for secondary CTA
  const actualSecondaryCtaLink =
    isNeurable && neurableDeckUrl
      ? neurableDeckUrl
      : config.hero.secondaryCta?.link;

  // Neurable custom "The Opportunity" section data
  const neurableOpportunitySection = isNeurable
    ? {
        title: "Strategic Entry into a Category Leader in Non-Invasive BCI",
        overview:
          "SPLY Capital has secured a $2M allocation in Neurable’s $8M Series A-3 round at an $80M pre-money valuation. The company is in active discussions with acquirers, and the structure is optimized for capital-light scaling and M&A optionality.",
        keyVerticals: [
          {
            name: "$80M current pre-money valuation",
            detail: ""
          },
          {
            name: "OEM deals with Sony & Samsung",
            detail: ""
          },
          {
            name: "Defense partnerships including DARPA",
            detail: ""
          },
          {
            name: "10–15x M&A return potential with major OEMs",
            detail: ""
          },
          {
            name: "IPO optionality if B2B SaaS gains scale",
            detail: ""
          }
        ],
        competitiveAdvantage: [],
        positioning: "",
      }
    : null;

  return (
    <LandingLayout>
      {/* Only show upload UI for admins/authenticated users */}
      {isNeurable && user && <NeurableDeckUpload onUpload={setNeurableDeckUrl} />}

      <LandingHero
        headline={config.hero.headline}
        subheadline={config.hero.subheadline}
        ctaText={config.hero.primaryCta.text}
        ctaLink={config.hero.primaryCta.link}
        secondaryCtaText={config.hero.secondaryCta?.text}
        secondaryCtaLink={actualSecondaryCtaLink}
        tertiaryCtaText={config.hero.tertiaryCta?.text}
        tertiaryCtaLink={config.hero.tertiaryCta?.link}
        backgroundImage={showHeroPhoto ? config.hero.backgroundImage : undefined}
      />

      {showCustomerLogos && <CustomerLogosSection />}

      {/* Custom "The Opportunity" and new Product & Technology for Neurable */}
      {isNeurable && neurableOpportunitySection ? (
        <>
          <NeurableOpportunitySection
            title={neurableOpportunitySection.title}
            overview={neurableOpportunitySection.overview}
            keyVerticals={neurableOpportunitySection.keyVerticals}
            competitiveAdvantage={[]} // Intentionally empty
            positioning={""} // No positioning text
          />
          <NeurableProductTechnologySection />
        </>
      ) : (
        <LandingOpportunity
          title={config.opportunity.title}
          body={config.opportunity.description}
          sections={config.opportunity.keyMetrics}
          headerLabel="The Opportunity"
        />
      )}

      {config.market && (
        <LandingContent
          title={config.market.title}
          body={config.market.description}
          headerLabel={config.market.headerLabel || "Market Context"}
        />
      )}

      <LandingContentWithLogo
        title={config.company.title}
        body={config.company.description}
        logoSrc={config.company.logoSrc}
        logoAlt={config.company.logoAlt}
        headerLabel={config.company.headerLabel || "Company Overview"}
        keyStats={config.company.keyStats}
      />

      {config.traction && (
        <LandingContent
          title={config.traction.title}
          body={config.traction.description}
          headerLabel={config.traction.headerLabel || "Commercial Traction"}
          keyPoints={config.traction.keyPoints}
          additionalContent={config.traction.additionalContent}
          className="bg-gray-50"
        />
      )}

      <LandingFeatures
        title={config.thesis.title}
        description={config.thesis.description}
        features={config.thesis.points}
        headerLabel="Why We're Investing"
      />

      {config.backing && (
        <LandingOpportunity
          title={config.backing.title}
          body={config.backing.description}
          keyPoints={config.backing.keyPoints}
          headerLabel="Strategic Backing"
          className="bg-gray-50"
        />
      )}

      <div id="details">
        <LandingCTA
          headline={config.cta.headline}
          description={config.cta.description}
          primaryButtonText={config.cta.primaryButton.text}
          primaryButtonLink={config.cta.primaryButton.link}
          secondaryButtonText={config.cta.secondaryButton?.text}
          secondaryButtonLink={config.cta.secondaryButton?.link}
          tertiaryButtonText={config.cta.tertiaryButton?.text}
          tertiaryButtonLink={config.cta.tertiaryButton?.link}
          quaternaryButtonText={config.cta.quaternaryButton?.text}
          quaternaryButtonLink={config.cta.quaternaryButton?.link}
        />
      </div>

      <LandingFooter
        copyright={config.footer.copyright}
        links={config.footer.links}
      />
    </LandingLayout>
  );
};
