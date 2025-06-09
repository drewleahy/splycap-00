
import React, { useEffect } from 'react';
import { LandingPageConfig } from '@/types/landing';
import { LandingLayout } from './LandingLayout';
import { LandingHero } from './LandingHero';
import { LandingOpportunity } from './LandingOpportunity';
import { LandingContent } from './LandingContent';
import { LandingContentWithLogo } from './LandingContentWithLogo';
import { LandingFeatures } from './LandingFeatures';
import { LandingCTA } from './LandingCTA';
import { LandingVideoSection } from './LandingVideoSection';
import { LandingFooter } from './LandingFooter';
import { useVisitorTracking } from '@/hooks/use-visitor-tracking';

interface LandingTemplateProps {
  config: LandingPageConfig;
}

export const LandingTemplate = ({ config }: LandingTemplateProps) => {
  // Track visitor for this landing page
  useVisitorTracking({
    pageUrl: window.location.href,
    referrerUrl: document.referrer,
  });

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

    console.log(`Landing page view: ${config.id}`);
  }, [config]);

  return (
    <LandingLayout>
      <LandingHero
        headline={config.hero.headline}
        subheadline={config.hero.subheadline}
        ctaText={config.hero.ctaText}
        ctaLink={config.hero.ctaLink}
        secondaryCtaText={config.hero.secondaryCtaText}
        secondaryCtaLink={config.hero.secondaryCtaLink}
        tertiaryCtaText={config.hero.tertiaryCtaText}
        tertiaryCtaLink={config.hero.tertiaryCtaLink}
        backgroundImage={config.hero.image}
      />
      
      {config.opportunitySection && (
        <LandingOpportunity
          title={config.opportunitySection.title}
          body={config.opportunitySection.body}
          keyPoints={config.opportunitySection.keyPoints}
          headerLabel="The Opportunity"
        />
      )}
      
      {config.content && (
        <LandingContent
          title={config.content.title}
          body={config.content.body}
          headerLabel={config.content.headerLabel}
          keyPoints={config.content.keyPoints}
        />
      )}
      
      {config.lytenSection && (
        <LandingContentWithLogo
          title={config.lytenSection.title}
          body={config.lytenSection.body}
          logoSrc={config.lytenSection.logoSrc}
          logoAlt={config.lytenSection.logoAlt}
          headerLabel={config.lytenSection.headerLabel}
          keyStats={config.lytenSection.keyStats}
        />
      )}
      
      {config.commercialTraction && (
        <LandingContent
          title={config.commercialTraction.title}
          body={config.commercialTraction.body}
          headerLabel={config.commercialTraction.headerLabel}
          keyPoints={config.commercialTraction.keyPoints}
          className="bg-gray-50"
        />
      )}
      
      {config.whyInvesting && (
        <LandingFeatures
          title={config.whyInvesting.title}
          description={config.whyInvesting.body}
          features={config.whyInvesting.items || []}
          headerLabel="Why We're Investing"
        />
      )}
      
      {config.strategicBacking && (
        <LandingOpportunity
          title={config.strategicBacking.title}
          body={config.strategicBacking.body}
          keyPoints={config.strategicBacking.keyPoints}
          headerLabel="Strategic Backing"
          className="bg-gray-50"
        />
      )}
      
      <div id="details">
        <LandingCTA
          headline={config.cta.headline}
          description={config.cta.description}
          primaryButtonText={config.cta.primaryButtonText}
          primaryButtonLink={config.cta.primaryButtonLink}
          secondaryButtonText={config.cta.secondaryButtonText}
          secondaryButtonLink={config.cta.secondaryButtonLink}
          tertiaryButtonText={config.cta.tertiaryButtonText}
          tertiaryButtonLink={config.cta.tertiaryButtonLink}
        />
      </div>
      
      <LandingVideoSection
        videoUrl="https://player.vimeo.com/video/999262573?h=0"
        title="Watch Lyten's Vision for the Future"
      />
      
      <LandingFooter
        copyright={config.footer.copyright}
        links={config.footer.links}
      />
    </LandingLayout>
  );
};
