
import React from 'react';
import { Button } from '@/components/ui/button';
import jsPDF from 'jspdf';

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
  const generatePDFFlyer = async () => {
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Image URLs for the flyer pages
      const image1Url = '/lovable-uploads/Screenshot 2025-01-23 at 10.50.48 AM.png';
      const image2Url = '/lovable-uploads/Screenshot 2025-01-23 at 10.51.19 AM.png';
      
      // Helper function to load image and get dimensions
      const loadImage = (url: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = url;
        });
      };
      
      // Load and add first image
      const img1 = await loadImage(image1Url);
      const img1Ratio = img1.width / img1.height;
      const img1Width = pageWidth - 20; // 10mm margin on each side
      const img1Height = img1Width / img1Ratio;
      
      pdf.addImage(img1, 'PNG', 10, 10, img1Width, Math.min(img1Height, pageHeight - 20));
      
      // Add new page for second image
      pdf.addPage();
      
      // Load and add second image
      const img2 = await loadImage(image2Url);
      const img2Ratio = img2.width / img2.height;
      const img2Width = pageWidth - 20;
      const img2Height = img2Width / img2Ratio;
      
      pdf.addImage(img2, 'PNG', 10, 10, img2Width, Math.min(img2Height, pageHeight - 20));
      
      // Save the PDF
      pdf.save('Lyten-Investment-Flyer.pdf');
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Fallback to downloading the first image if PDF generation fails
      const fallbackUrl = '/lovable-uploads/Screenshot 2025-01-23 at 10.50.48 AM.png';
      const downloadLink = document.createElement('a');
      downloadLink.href = fallbackUrl;
      downloadLink.download = 'Lyten-Investment-Flyer.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const handleButtonClick = (link: string) => {
    if (link.startsWith('#download-flyer')) {
      generatePDFFlyer();
    } else if (link.startsWith('#')) {
      const element = document.querySelector(link);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(link, '_blank');
    }
  };

  return (
    <section className={`py-20 px-6 bg-black ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
          {headline}
        </h2>
        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-200">
          Review Materials and Connect
        </h3>
        <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
          {description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => handleButtonClick(primaryButtonLink)}
            size="lg"
            className="bg-white text-black hover:bg-gray-100 hover:text-black px-8 py-3 text-lg font-semibold"
          >
            {primaryButtonText}
          </Button>
          
          {secondaryButtonText && (
            <Button 
              onClick={() => handleButtonClick(secondaryButtonLink!)}
              variant="outline"
              size="lg"
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-black px-8 py-3 text-lg font-semibold"
            >
              {secondaryButtonText}
            </Button>
          )}

          {tertiaryButtonText && (
            <Button 
              onClick={() => handleButtonClick(tertiaryButtonLink!)}
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 text-gray-300 bg-transparent hover:bg-gray-300 hover:text-black px-8 py-3 text-lg font-semibold"
            >
              {tertiaryButtonText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
