
import React from 'react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';

interface LandingHeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: string;
  showLogos?: boolean;
  partnerLogoSrc?: string;
  partnerLogoAlt?: string;
}

export const LandingHero = ({
  headline,
  subheadline,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  backgroundImage,
  showLogos = false,
  partnerLogoSrc,
  partnerLogoAlt
}: LandingHeroProps) => {
  const backgroundStyle = backgroundImage 
    ? { backgroundImage: `url(${backgroundImage})` }
    : { background: 'linear-gradient(135deg, #1a1f2c 0%, #2d3748 100%)' };

  return (
    <section 
      className="min-h-screen flex items-center justify-center relative bg-cover bg-center bg-no-repeat"
      style={backgroundStyle}
    >
      <div className="absolute inset-0 bg-black/50" />
      <Navbar />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {showLogos && (
          <div className="flex items-center justify-center mb-8 sm:mb-12">
            <div className="flex items-center space-x-4 sm:space-x-8">
              <img 
                src="/lovable-uploads/Logo.png" 
                alt="SPLY Capital Logo" 
                className="h-8 sm:h-12 md:h-16"
              />
              <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">×</span>
              {partnerLogoSrc && (
                <img 
                  src={partnerLogoSrc} 
                  alt={partnerLogoAlt || "Partner Logo"} 
                  className="h-8 sm:h-12 md:h-16"
                />
              )}
            </div>
          </div>
        )}
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight text-shadow-lg">
          {headline}
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto text-shadow-lg">
          {subheadline}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <Button
            size="lg"
            className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto"
            onClick={() => window.open(ctaLink, '_blank')}
          >
            {ctaText}
          </Button>
          
          {secondaryCtaText && secondaryCtaLink && (
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
              onClick={() => window.open(secondaryCtaLink, '_blank')}
            >
              {secondaryCtaText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
