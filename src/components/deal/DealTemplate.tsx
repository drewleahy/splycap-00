
import React, { useEffect } from 'react';
import { DealPageConfig } from '@/types/deal-template';
import { LandingLayout } from '@/components/landing/LandingLayout';
import { LandingHero } from '@/components/landing/LandingHero';
import { LandingOpportunity } from '@/components/landing/LandingOpportunity';
import { LandingContent } from '@/components/landing/LandingContent';
import { LandingContentWithLogo } from '@/components/landing/LandingContentWithLogo';
import { LandingFeatures } from '@/components/landing/LandingFeatures';
import { LandingCTA } from '@/components/landing/LandingCTA';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { CustomerLogosSection } from './CustomerLogosSection';

interface DealTemplateProps {
  config: DealPageConfig;
}

export const DealTemplate = ({ config }: DealTemplateProps) => {
  useEffect(() => {
    document.title = config.seo.title;
    
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
        backgroundImage={config.hero.backgroundImage}
      />
      
      {/* Add Customer Logos Section for Nanotronics */}
      {config.id === 'nanotronics' && (
        <CustomerLogosSection
          imageSrc="/lovable-uploads/4b0656ae-4ae0-4e62-9272-33f7855bf48b.png"
          imageAlt="Nanotronics Key Customers - Including Google, 3M, Illumina, Rolex, Amazon, NASA, Apple, Intel, Canon, and more"
        />
      )}
      
      {config.opportunity && (
        <LandingOpportunity
          title={config.opportunity.title}
          body={config.opportunity.description}
          keyPoints={config.opportunity.keyMetrics}
          headerLabel="The Opportunity"
        />
      )}
      
      {config.market && (
        <LandingContent
          title={config.market.title}
          body={config.market.description}
          headerLabel={config.market.headerLabel || "Market Context"}
          className="bg-gray-50"
        />
      )}
      
      {config.company && (
        <LandingContentWithLogo
          title={config.company.title}
          body={config.company.description}
          logoSrc={config.company.logoSrc}
          logoAlt={config.company.logoAlt}
          headerLabel={config.company.headerLabel || "Company Overview"}
          keyStats={config.company.keyStats}
        />
      )}
      
      {config.traction && (
        <LandingContent
          title={config.traction.title}
          body={config.traction.description}
          headerLabel={config.traction.headerLabel || "Traction"}
          keyPoints={config.traction.keyPoints}
          className="bg-gray-50"
          additionalContent={config.traction.additionalContent}
        />
      )}
      
      {config.thesis && (
        <LandingFeatures
          title={config.thesis.title}
          description={config.thesis.description}
          features={config.thesis.points.map(point => ({
            title: point.title,
            description: point.description,
            icon: point.icon
          }))}
          headerLabel="Investment Thesis"
        />
      )}
      
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
      
      {config.video && (
        <div id="video" className="py-16 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">{config.video.title}</h2>
            <p className="text-lg text-gray-600 mb-8">{config.video.description}</p>
            <div className="aspect-video">
              <iframe
                src={config.video.videoUrl}
                className="w-full h-full rounded-lg"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
      
      <LandingFooter
        copyright={config.footer.copyright}
        links={config.footer.links}
      />
    </LandingLayout>
  );
};
