
import React, { useEffect } from 'react';
import { LandingPageConfig } from '@/types/landing';
import { LandingLayout } from './LandingLayout';
import { LandingHero } from './LandingHero';
import { LandingFeatures } from './LandingFeatures';
import { LandingCTA } from './LandingCTA';
import { LandingFooter } from './LandingFooter';

interface LandingTemplateProps {
  config: LandingPageConfig;
}

export const LandingTemplate = ({ config }: LandingTemplateProps) => {
  useEffect(() => {
    // Set document title and meta tags
    document.title = config.seo.title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', config.seo.description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = config.seo.description;
      document.head.appendChild(meta);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', config.seo.keywords.join(', '));
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = config.seo.keywords.join(', ');
      document.head.appendChild(meta);
    }

    // Log page view for analytics
    console.log(`Landing page view: ${config.id}`);
  }, [config]);

  return (
    <LandingLayout>
      <LandingHero
        headline={config.hero.headline}
        subheadline={config.hero.subheadline}
        ctaText={config.hero.ctaText}
        ctaLink={config.hero.ctaLink}
        backgroundImage={config.hero.image}
      />
      
      {config.features && (
        <LandingFeatures
          title={config.features.title}
          features={config.features.items}
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
        />
      </div>
      
      <LandingFooter
        copyright={config.footer.copyright}
        links={config.footer.links}
      />
    </LandingLayout>
  );
};
