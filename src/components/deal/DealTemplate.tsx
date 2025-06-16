
import React, { useEffect, useState } from 'react';
import { DealPageConfig } from '@/types/deal-template';
import { LandingLayout } from '@/components/landing/LandingLayout';
import { LandingHero } from '@/components/landing/LandingHero';
import { LandingOpportunity } from '@/components/landing/LandingOpportunity';
import { LandingContent } from '@/components/landing/LandingContent';
import { LandingContentWithLogo } from '@/components/landing/LandingContentWithLogo';
import { LandingContentWithLogoStyled } from '@/components/landing/LandingContentWithLogoStyled';
import { LandingFeatures } from '@/components/landing/LandingFeatures';
import { LandingFeaturesStyled } from '@/components/landing/LandingFeaturesStyled';
import { LandingCTA } from '@/components/landing/LandingCTA';
import { LandingVideoSection } from '@/components/landing/LandingVideoSection';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { CustomerLogosSection } from './CustomerLogosSection';
import { NeurableOpportunitySection } from "./NeurableOpportunitySection";
import { NeurableOpportunitySectionStyled } from "./NeurableOpportunitySectionStyled";
import { NeurableMarketSection } from "./NeurableMarketSection";
import { NeurableMarketSectionStyled } from "./NeurableMarketSectionStyled";
import { NeurableProductTechnologySection } from "./NeurableProductTechnologySection";
import { NeurableProductTechnologySectionStyled } from "./NeurableProductTechnologySectionStyled";
import { NeurableDubaiSection } from "./NeurableDubaiSection";
import { NeurableCommercialTractionStyled } from "./NeurableCommercialTractionStyled";
import { NeurableWhyInvestingStyled } from "./NeurableWhyInvestingStyled";

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

  // Only show hero photo if there's a backgroundImage present for this deal config
  const showHeroPhoto = Boolean(config.hero.backgroundImage);

  // Only show CustomerLogosSection for certain deals (e.g., Nanotronics)
  const showCustomerLogos = config.id === "nanotronics";

  const isNeurable = config.id === "neurable-exclusive-2025";

  // New bullet list for Neurable Opportunity Section
  const neurableOpportunityBullets = [
    "$80M current pre-money valuation",
    "OEM deals with Sony & Samsung",
    "Defense partnerships including DARPA",
    "10–15x M&A return potential with major OEMs",
    "IPO optionality if B2B SaaS gains scale",
  ];

  const neurableOpportunitySection = isNeurable
    ? {
        title: "Strategic Entry into a Category Leader in Non-Invasive Brain-Computer Interfaces (BCI)",
        overview:
          "SPLY Capital has secured a $2M allocation in Neurable's $8M Series A-3 round at an $80M pre-money valuation. The company is in active discussions with acquirers, and the structure is optimized for capital-light scaling and M&A optionality.",
        bullets: neurableOpportunityBullets,
      }
    : null;

  return (
    <LandingLayout>
      <LandingHero
        headline={config.hero.headline}
        subheadline={config.hero.subheadline}
        ctaText={config.hero.primaryCta.text}
        ctaLink={config.hero.primaryCta.link}
        secondaryCtaText={config.hero.secondaryCta?.text}
        secondaryCtaLink={config.hero.secondaryCta?.link}
        tertiaryCtaText={config.hero.tertiaryCta?.text}
        tertiaryCtaLink={config.hero.tertiaryCta?.link}
        backgroundImage={showHeroPhoto ? config.hero.backgroundImage : undefined}
      />

      {showCustomerLogos && <CustomerLogosSection />}

      {/* Custom "The Opportunity" and new Product & Technology for Neurable */}
      {isNeurable && neurableOpportunitySection ? (
        <>
          <NeurableOpportunitySectionStyled
            title={neurableOpportunitySection.title}
            overview={neurableOpportunitySection.overview}
            bullets={neurableOpportunitySection.bullets}
          />
          <NeurableProductTechnologySectionStyled />
        </>
      ) : (
        <LandingOpportunity
          title={config.opportunity.title}
          body={config.opportunity.description}
          sections={config.opportunity.keyMetrics}
          headerLabel="The Opportunity"
        />
      )}

      {/* USE STYLED NEURABLE MARKET SECTION */}
      {isNeurable ? (
        <NeurableMarketSectionStyled />
      ) : (
        config.market && (
          <LandingContent
            title={config.market.title}
            body={config.market.description}
            headerLabel={config.market.headerLabel || "Market Context"}
          />
        )
      )}

      {/* Use styled component for Neurable, original for others */}
      {isNeurable ? (
        <LandingContentWithLogoStyled
          title={config.company.title}
          body={config.company.description}
          logoSrc={config.company.logoSrc}
          logoAlt={config.company.logoAlt}
          headerLabel={config.company.headerLabel || "Company Overview"}
          keyStats={config.company.keyStats}
        />
      ) : (
        <LandingContentWithLogo
          title={config.company.title}
          body={config.company.description}
          logoSrc={config.company.logoSrc}
          logoAlt={config.company.logoAlt}
          headerLabel={config.company.headerLabel || "Company Overview"}
          keyStats={config.company.keyStats}
        />
      )}

      {/* Add Dubai section only for Neurable */}
      {isNeurable && <NeurableDubaiSection />}

      {/* Use styled component for Neurable Commercial Traction, original for others */}
      {config.traction && (
        isNeurable ? (
          <NeurableCommercialTractionStyled />
        ) : (
          <LandingContent
            title={config.traction.title}
            body={config.traction.description}
            headerLabel={config.traction.headerLabel || "Commercial Traction"}
            keyPoints={config.traction.keyPoints}
            additionalContent={config.traction.additionalContent}
            className="bg-gray-50"
          />
        )
      )}

      {/* Use styled features component for Neurable */}
      {isNeurable ? (
        <NeurableWhyInvestingStyled />
      ) : (
        <LandingFeatures
          title={config.thesis.title}
          description={config.thesis.description}
          features={config.thesis.points}
          headerLabel="Why We're Investing"
        />
      )}

      {/* Only render Strategic Backing section if it exists in config */}
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
