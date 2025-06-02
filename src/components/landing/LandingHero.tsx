
import React from 'react';
import { Button } from '@/components/ui/button';

interface LandingHeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: string;
  className?: string;
}

export const LandingHero = ({
  headline,
  subheadline,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  backgroundImage,
  className = ""
}: LandingHeroProps) => {
  const handleCtaClick = () => {
    if (ctaLink.startsWith('#')) {
      const element = document.querySelector(ctaLink);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(ctaLink, '_blank');
    }
  };

  const handleSecondaryCtaClick = () => {
    if (secondaryCtaLink) {
      if (secondaryCtaLink.startsWith('#')) {
        const element = document.querySelector(secondaryCtaLink);
        element?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.open(secondaryCtaLink, '_blank');
      }
    }
  };

  return (
    <>
      {/* Confidential Banner */}
      <div className="bg-black text-white text-center py-2 text-sm font-medium">
        CONFIDENTIAL
      </div>
      
      <section className={`relative pt-20 pb-16 px-6 bg-white ${className}`}>
        {backgroundImage && (
          <div className="absolute inset-0 z-0">
            <img 
              src={backgroundImage} 
              alt="Background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
        )}
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-4 text-black">
            {headline}
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-gray-700">
            {subheadline}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleCtaClick}
              size="lg"
              className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg"
            >
              {ctaText}
            </Button>
            
            {secondaryCtaText && secondaryCtaLink && (
              <Button 
                onClick={handleSecondaryCtaClick}
                size="lg"
                variant="outline"
                className="border-2 border-black text-black bg-transparent hover:bg-black hover:text-white px-8 py-3 text-lg font-medium"
              >
                {secondaryCtaText}
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
