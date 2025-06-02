
import React from 'react';
import { Button } from '@/components/ui/button';

interface LandingCTAProps {
  headline: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  className?: string;
}

export const LandingCTA = ({
  headline,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  className = ""
}: LandingCTAProps) => {
  const handlePrimaryClick = () => {
    if (primaryButtonLink.startsWith('#')) {
      const element = document.querySelector(primaryButtonLink);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(primaryButtonLink, '_blank');
    }
  };

  const handleSecondaryClick = () => {
    if (secondaryButtonLink) {
      if (secondaryButtonLink.startsWith('#')) {
        const element = document.querySelector(secondaryButtonLink);
        element?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.open(secondaryButtonLink, '_blank');
      }
    }
  };

  return (
    <section className={`py-20 px-6 bg-sply-purple ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
          {headline}
        </h2>
        <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
          {description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handlePrimaryClick}
            size="lg"
            className="bg-white text-sply-purple hover:bg-gray-100 px-8 py-3 text-lg"
          >
            {primaryButtonText}
          </Button>
          
          {secondaryButtonText && (
            <Button 
              onClick={handleSecondaryClick}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-sply-purple px-8 py-3 text-lg"
            >
              {secondaryButtonText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
