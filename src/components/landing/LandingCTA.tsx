import React from 'react';
import { Button } from '@/components/ui/button';
import jsPDF from 'jspdf';

interface CTAButton {
  text: string;
  link: string;
  onClick?: () => void;
}

interface LandingCTAProps {
  headline: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  tertiaryButtonText?: string;
  tertiaryButtonLink?: string;
  quaternaryButtonText?: string;
  quaternaryButtonLink?: string;
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
  quaternaryButtonText,
  quaternaryButtonLink,
  className = ""
}: LandingCTAProps) => {
  const downloadFlyer = async () => {
    console.log('Creating PDF flyer...');
    
    const flyerImages = [
      '/lovable-uploads/f8e2333a-4626-4ee6-9192-f37dffa4a939.png',
      '/lovable-uploads/3b4ad6cd-8468-4560-b1ee-c1367789ad85.png'
    ];

    try {
      // Create new PDF document
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      for (let i = 0; i < flyerImages.length; i++) {
        const imageUrl = flyerImages[i];
        console.log(`Adding image ${i + 1} to PDF...`);

        // Fetch the image
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        
        // Convert blob to base64
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });

        // Add image to PDF (full page)
        if (i > 0) {
          pdf.addPage();
        }
        
        // Add image to fill the page
        pdf.addImage(base64, 'PNG', 0, 0, 210, 297); // A4 size in mm
      }

      // Download the PDF
      pdf.save('Lyten-Investment-Flyer.pdf');
      console.log('PDF download initiated');
      
    } catch (error) {
      console.error('Failed to create PDF:', error);
      alert('Unable to create PDF. Please try again or contact us directly.');
    }
  };

  const handleButtonClick = (link: string, onClick?: () => void) => {
    console.log('Button clicked with link:', link);
    
    // If there's a custom onClick handler, use it
    if (onClick) {
      onClick();
      return;
    }
    
    // Check for special download flyer action
    if (link.startsWith('#download-flyer')) {
      downloadFlyer();
      return;
    }
    
    // Check for anchor links
    if (link.startsWith('#')) {
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    
    // Check for Vimeo video links - scroll to video section
    if (link.startsWith('https://vimeo.com/')) {
      const videoElement = document.querySelector('#video');
      if (videoElement) {
        videoElement.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    
    // Check for javascript void links (handled by onClick)
    if (link === 'javascript:void(0)') {
      // Try to call global function if available
      if ((window as any).downloadNanotronicsDeck) {
        (window as any).downloadNanotronicsDeck();
      }
      return;
    }
    
    // Default: open in new tab
    window.open(link, '_blank');
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
        
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center flex-wrap">
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
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-black px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold w-full sm:w-auto"
            >
              {tertiaryButtonText}
            </Button>
          )}

          {quaternaryButtonText && (
            <Button 
              onClick={() => handleButtonClick(quaternaryButtonLink!)}
              variant="outline"
              size="lg"
              className="border-2 border-blue-300 text-blue-300 bg-transparent hover:bg-blue-300 hover:text-black px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold w-full sm:w-auto"
            >
              {quaternaryButtonText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
