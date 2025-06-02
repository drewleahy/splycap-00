
import React from 'react';
import { Button } from '@/components/ui/button';

interface LandingHeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
  className?: string;
}

export const LandingHero = ({
  headline,
  subheadline,
  ctaText,
  ctaLink,
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

  return (
    <section className={`relative py-20 px-6 ${backgroundImage ? '' : 'bg-black'} ${className}`}>
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
        {!backgroundImage && (
          <img
            src="/lovable-uploads/f7a927cd-a039-40ff-82ba-7da595d28922.png"
            alt="SPLY CAPITAL"
            className="h-8 md:h-12 mx-auto mb-6"
          />
        )}
        
        <h1 className={`text-2xl md:text-4xl font-bold mb-4 ${backgroundImage ? 'text-white' : 'text-white'}`}>
          {headline}
        </h1>
        <p className={`text-lg md:text-xl mb-8 max-w-3xl mx-auto ${backgroundImage ? 'text-gray-200' : 'text-gray-300'}`}>
          {subheadline}
        </p>
        
        <Button 
          onClick={handleCtaClick}
          size="lg"
          className="bg-sply-purple text-white hover:bg-sply-purple/90 px-8 py-3 text-lg"
        >
          {ctaText}
        </Button>
      </div>
    </section>
  );
};
