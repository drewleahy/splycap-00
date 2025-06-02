
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
    console.log('Starting PDF generation...');
    
    // Image URLs for the flyer pages
    const image1Url = '/lovable-uploads/Screenshot 2025-01-23 at 10.50.48 AM.png';
    const image2Url = '/lovable-uploads/Screenshot 2025-01-23 at 10.51.19 AM.png';
    
    console.log('Image URLs:', { image1Url, image2Url });
    
    // First, let's test if we can access the images at all
    try {
      console.log('Testing image accessibility...');
      
      const testImage1 = await fetch(image1Url);
      console.log('Image 1 fetch response:', testImage1.status, testImage1.statusText);
      
      const testImage2 = await fetch(image2Url);
      console.log('Image 2 fetch response:', testImage2.status, testImage2.statusText);
      
      if (!testImage1.ok || !testImage2.ok) {
        throw new Error(`Images not accessible. Image 1: ${testImage1.status}, Image 2: ${testImage2.status}`);
      }
      
      console.log('Both images are accessible, proceeding with PDF generation...');
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      console.log('PDF dimensions:', { pageWidth, pageHeight });
      
      // Helper function to load image and get dimensions
      const loadImage = (url: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            console.log(`Image loaded successfully: ${url}`, { width: img.width, height: img.height });
            resolve(img);
          };
          img.onerror = (error) => {
            console.error(`Failed to load image: ${url}`, error);
            reject(error);
          };
          img.src = url;
        });
      };
      
      console.log('Loading first image...');
      const img1 = await loadImage(image1Url);
      const img1Ratio = img1.width / img1.height;
      const img1Width = pageWidth - 20; // 10mm margin on each side
      const img1Height = img1Width / img1Ratio;
      
      console.log('Adding first image to PDF...');
      pdf.addImage(img1, 'PNG', 10, 10, img1Width, Math.min(img1Height, pageHeight - 20));
      
      console.log('Adding new page...');
      pdf.addPage();
      
      console.log('Loading second image...');
      const img2 = await loadImage(image2Url);
      const img2Ratio = img2.width / img2.height;
      const img2Width = pageWidth - 20;
      const img2Height = img2Width / img2Ratio;
      
      console.log('Adding second image to PDF...');
      pdf.addImage(img2, 'PNG', 10, 10, img2Width, Math.min(img2Height, pageHeight - 20));
      
      console.log('Saving PDF...');
      pdf.save('Lyten-Investment-Flyer.pdf');
      console.log('PDF saved successfully!');
      
    } catch (error) {
      console.error('Detailed error in PDF generation:', error);
      console.log('Attempting simple direct download fallback...');
      
      // Simplified fallback - just trigger download of first image
      try {
        const downloadLink = document.createElement('a');
        downloadLink.href = image1Url;
        downloadLink.download = 'Lyten-Investment-Flyer-Page1.png';
        downloadLink.target = '_blank';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        console.log('Simple download link created and clicked');
        
        // Also try the second image
        setTimeout(() => {
          const downloadLink2 = document.createElement('a');
          downloadLink2.href = image2Url;
          downloadLink2.download = 'Lyten-Investment-Flyer-Page2.png';
          downloadLink2.target = '_blank';
          document.body.appendChild(downloadLink2);
          downloadLink2.click();
          document.body.removeChild(downloadLink2);
          console.log('Second image download link created and clicked');
        }, 1000);
        
      } catch (fallbackError) {
        console.error('All download methods failed:', fallbackError);
        alert('Sorry, there was an issue downloading the flyer. Please try again or contact support.');
      }
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
