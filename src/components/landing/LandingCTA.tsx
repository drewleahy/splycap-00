
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
  const downloadFlyer = async () => {
    console.log('Starting flyer download...');
    
    const flyerFiles = [
      {
        url: '/lovable-uploads/f8e2333a-4626-4ee6-9192-f37dffa4a939.png',
        filename: 'Lyten-Investment-Flyer-Page-1.png'
      },
      {
        url: '/lovable-uploads/3b4ad6cd-8468-4560-b1ee-c1367789ad85.png',
        filename: 'Lyten-Investment-Flyer-Page-2.png'
      }
    ];

    // Download each file with a longer delay to avoid browser blocking
    for (let i = 0; i < flyerFiles.length; i++) {
      const file = flyerFiles[i];
      
      try {
        console.log(`Downloading ${file.filename}...`);
        
        // Fetch the file and create a blob
        const response = await fetch(file.url);
        const blob = await response.blob();
        
        // Create download link
        const link = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        link.href = objectUrl;
        link.download = file.filename;
        link.style.display = 'none';
        
        // Add to DOM, click, and clean up
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the object URL
        setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
        
        console.log(`${file.filename} download initiated`);
        
        // Wait longer between downloads to ensure browser processes each one
        if (i < flyerFiles.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
      } catch (error) {
        console.error(`Failed to download ${file.filename}:`, error);
        // Fallback: open in new tab
        window.open(file.url, '_blank');
      }
    }
    
    console.log('All flyer downloads initiated');
  };

  const handleButtonClick = (link: string) => {
    console.log('Button clicked with link:', link);
    
    if (link.startsWith('#download-flyer')) {
      downloadFlyer();
      return;
    }
    
    if (link.startsWith('#')) {
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.open(link, '_blank');
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
