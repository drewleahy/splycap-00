
import React from 'react';
import { Button } from '@/components/ui/button';

interface LandingCTAProps {
  headline: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  tertiaryButtonText?: string;
  tertiaryButtonLink?: string;
  className?: string;
}

export const LandingCTA = ({
  headline,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  tertiaryButtonText,
  tertiaryButtonLink,
  className = ""
}: LandingCTAProps) => {
  const downloadFlyer = () => {
    console.log('Starting flyer download...');
    
    const image1Url = '/lovable-uploads/f8e2333a-4626-4ee6-9192-f37dffa4a939.png';
    const image2Url = '/lovable-uploads/3b4ad6cd-8468-4560-b1ee-c1367789ad85.png';
    
    try {
      // Open images in new tabs (most reliable method)
      const tab1 = window.open(image1Url, '_blank');
      setTimeout(() => {
        const tab2 = window.open(image2Url, '_blank');
        if (!tab1 || !tab2) {
          console.warn('Pop-up blocked - trying alternative download method');
          // Fallback: create download links
          const link1 = document.createElement('a');
          link1.href = image1Url;
          link1.download = 'Lyten-Investment-Flyer-Page-1.png';
          link1.click();
          
          setTimeout(() => {
            const link2 = document.createElement('a');
            link2.href = image2Url;
            link2.download = 'Lyten-Investment-Flyer-Page-2.png';
            link2.click();
          }, 500);
        }
      }, 500);
      
      console.log('Flyer download initiated');
      
    } catch (error) {
      console.error('Download failed:', error);
      alert('Unable to download the flyer. Please contact support.');
    }
  };

  const handleButtonClick = (link: string) => {
    console.log('Button clicked with link:', link);
    
    try {
      if (link.startsWith('#download-flyer')) {
        downloadFlyer();
      } else if (link.startsWith('#')) {
        const element = document.querySelector(link);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.open(link, '_blank');
      }
    } catch (error) {
      console.error('Button click error:', error);
    }
  };

  return (
    <section className={`py-16 sm:py-20 px-4 sm:px-6 bg-black ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white">
          {headline}
        </h2>
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-gray-200">
          Review Materials and Connect
        </h3>
        <p className="text-base sm:text-xl mb-6 sm:mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center">
          <Button 
            onClick={() => handleButtonClick(primaryButtonLink)}
            size="lg"
            className="bg-white text-black hover:bg-gray-100 hover:text-black px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold w-full sm:w-auto"
          >
            {primaryButtonText}
          </Button>
          
          {secondaryButtonText && (
            <Button 
              onClick={() => handleButtonClick(secondaryButtonLink!)}
              variant="outline"
              size="lg"
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-black px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold w-full sm:w-auto"
            >
              {secondaryButtonText}
            </Button>
          )}

          {tertiaryButtonText && (
            <Button 
              onClick={() => handleButtonClick(tertiaryButtonLink!)}
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 text-gray-300 bg-transparent hover:bg-gray-300 hover:text-black px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold w-full sm:w-auto"
            >
              {tertiaryButtonText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
