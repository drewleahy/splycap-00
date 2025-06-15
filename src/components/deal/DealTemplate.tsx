import React, { useEffect } from 'react';
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
import { WysiwygEditable } from './WysiwygEditable';

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

  // Helper function for section IDs
  const sectionId = (sectionKey: string) => `${config.id}-${sectionKey}`;

  return (
    <LandingLayout>
      <WysiwygEditable sectionId={sectionId("hero")} as="section" className="">
        <LandingHero
          headline={config.hero.headline}
          subheadline={config.hero.subheadline}
          ctaText={config.hero.primaryCta.text}
          ctaLink={config.hero.primaryCta.link}
          secondaryCtaText={config.hero.secondaryCta?.text}
          secondaryCtaLink={config.hero.secondaryCta?.link}
          tertiaryCtaText={config.hero.tertiaryCta?.text}
          tertiaryCtaLink={config.hero.tertiaryCta?.link}
          backgroundImage={config.hero.backgroundImage}
          dealId={config.id} // NEW: for hero field-level editing
        />
      </WysiwygEditable>
      
      <CustomerLogosSection />
      
      <WysiwygEditable sectionId={sectionId("opportunity")} as="section" className="">
        <LandingOpportunity
          title={config.opportunity.title}
          body={config.opportunity.description}
          sections={config.opportunity.keyMetrics}
          headerLabel="The Opportunity"
        />
      </WysiwygEditable>
      
      {config.market && (
        <WysiwygEditable sectionId={sectionId("market")} as="section" className="">
          <LandingContent
            title={config.market.title}
            body={config.market.description}
            headerLabel={config.market.headerLabel || "Market Context"}
          />
        </WysiwygEditable>
      )}
      
      {config.company && (
        <WysiwygEditable sectionId={sectionId("company")} as="section" className="">
          <LandingContentWithLogo
            title={config.company.title}
            body={config.company.description}
            logoSrc={config.company.logoSrc}
            logoAlt={config.company.logoAlt}
            headerLabel={config.company.headerLabel || "Company Overview"}
            keyStats={config.company.keyStats}
          />
        </WysiwygEditable>
      )}
      
      {config.traction && (
        <WysiwygEditable sectionId={sectionId("traction")} as="section" className="">
          <LandingContent
            title={config.traction.title}
            body={config.traction.description}
            headerLabel={config.traction.headerLabel || "Commercial Traction"}
            keyPoints={config.traction.keyPoints}
            additionalContent={config.traction.additionalContent}
            className="bg-gray-50"
          />
        </WysiwygEditable>
      )}
      
      {config.thesis && (
        <WysiwygEditable sectionId={sectionId("thesis")} as="section" className="">
          <LandingFeatures
            title={config.thesis.title}
            description={config.thesis.description}
            features={config.thesis.points}
            headerLabel="Why We're Investing"
          />
        </WysiwygEditable>
      )}
      
      {config.backing && (
        <WysiwygEditable sectionId={sectionId("backing")} as="section" className="">
          <LandingOpportunity
            title={config.backing.title}
            body={config.backing.description}
            keyPoints={config.backing.keyPoints}
            headerLabel="Strategic Backing"
            className="bg-gray-50"
          />
        </WysiwygEditable>
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
