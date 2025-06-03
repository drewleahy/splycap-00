
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
    
    const image1Url = '/lovable-uploads/f8e2333a-4626-4ee6-9192-f37dffa4a939.png';
    const image2Url = '/lovable-uploads/3b4ad6cd-8468-4560-b1ee-c1367789ad85.png';
    
    try {
      // Try to open images directly first (most reliable method)
      window.open(image1Url, '_blank');
      setTimeout(() => {
        window.open(image2Url, '_blank');
      }, 500);
      
      console.log('Opened flyer images in new tabs');
      
      // Optional: Try PDF creation as enhancement if available
      try {
        const { default: jsPDF } = await import('jspdf');
        
        const getImageBase64 = async (url: string): Promise<string> => {
          const response = await fetch(url);
          const blob = await response.blob();
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        };
        
        const pdf = new jsPDF('p', 'mm', 'a4');
        const image1Base64 = await getImageBase64(image1Url);
        const image2Base64 = await getImageBase64(image2Url);
        
        pdf.addImage(image1Base64, 'PNG', 10, 10, 190, 277);
        pdf.addPage();
        pdf.addImage(image2Base64, 'PNG', 10, 10, 190, 277);
        pdf.save('Lyten-Investment-Flyer.pdf');
        
        console.log('PDF download completed');
      } catch (pdfError) {
        console.log('PDF creation not available, images opened instead');
      }
      
    } catch (error) {
      console.error('Download failed:', error);
      alert('Unable to download the flyer. Please contact support.');
    }
  };

  const handleButtonClick = (link: string) => {
    console.log('Button clicked with link:', link);
    
    if (link.startsWith('#download-flyer')) {
      downloadFlyer();
    } else if (link.startsWith('#')) {
      const element = document.querySelector(link);
      element?.scrollIntoView({ behavior: 'smooth' });
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
