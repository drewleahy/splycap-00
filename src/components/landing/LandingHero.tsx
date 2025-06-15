
import React from 'react';
import { Button } from '@/components/ui/button';

// Utility to trigger download for remote blob/file URLs
async function downloadFile(url: string, filename = "Neurable-Deck.pdf") {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch file");
    const blob = await res.blob();

    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();

    // Clean up the object URL after use
    setTimeout(() => {
      URL.revokeObjectURL(link.href);
    }, 1000);
  } catch (err) {
    alert("Failed to download file. (See console for details.)");
    console.error("Deck download error:", err);
  }
}

interface LandingHeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  tertiaryCtaText?: string;
  tertiaryCtaLink?: string;
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
  tertiaryCtaText,
  tertiaryCtaLink,
  backgroundImage,
  className = ""
}: LandingHeroProps) => {
  const handleCtaClick = () => {
    if (ctaLink.startsWith('#')) {
      const element = document.querySelector(ctaLink);
      element?.scrollIntoView({
        behavior: 'smooth'
      });
    } else {
      window.open(ctaLink, '_blank');
    }
  };

  const handleSecondaryCtaClick = async () => {
    if (!secondaryCtaLink) return;
    // Only intercept the click if it's a Neurable "deck PDF" upload link, else fallback
    // We assume it's a custom upload if it starts with http and contains 'neurable' or is a blob/file, or not the default neurable.com link
    if (
      secondaryCtaLink &&
      (
        !secondaryCtaLink.includes('neurable.com/2025-deck.pdf') && // not the hardcoded public deck
        (
          secondaryCtaLink.startsWith('http') ||
          secondaryCtaLink.startsWith('/') ||
          secondaryCtaLink.startsWith('blob:')
        )
      )
    ) {
      // Try to guess the filename from the URL if possible
      let filename = "Neurable-Deck.pdf";
      try {
        const urlParts = secondaryCtaLink.split("?");
        const lastSlash = urlParts[0].lastIndexOf("/");
        if (lastSlash !== -1) {
          const candidate = urlParts[0].substr(lastSlash + 1);
          if (candidate.endsWith('.pdf')) filename = candidate;
        }
      } catch {}
      await downloadFile(secondaryCtaLink, filename);
    } else if (secondaryCtaLink.startsWith('#')) {
      const element = document.querySelector(secondaryCtaLink);
      element?.scrollIntoView({
        behavior: 'smooth'
      });
    } else if (secondaryCtaLink.startsWith('https://vimeo.com/')) {
      // For Vimeo video links, scroll to the video section instead of opening in new tab
      const videoElement = document.querySelector('#video');
      if (videoElement) {
        videoElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    } else {
      window.open(secondaryCtaLink, '_blank');
    }
  };

  const handleTertiaryCtaClick = () => {
    if (tertiaryCtaLink) {
      if (tertiaryCtaLink.startsWith('#')) {
        const element = document.querySelector(tertiaryCtaLink);
        element?.scrollIntoView({
          behavior: 'smooth'
        });
      } else if (tertiaryCtaLink.startsWith('https://vimeo.com/')) {
        // For Vimeo video links, scroll to the video section instead of opening in new tab
        console.log('Scrolling to video section...');
        const videoElement = document.querySelector('#video');
        if (videoElement) {
          videoElement.scrollIntoView({
            behavior: 'smooth'
          });
        } else {
          console.warn('Video section not found');
        }
      } else if (tertiaryCtaLink === 'javascript:void(0)') {
        // Handle the download deck functionality
        if ((window as any).downloadNanotronicsDeck) {
          (window as any).downloadNanotronicsDeck();
        }
      } else {
        window.open(tertiaryCtaLink, '_blank');
      }
    }
  };

  return <>
      {/* Confidential Banner */}
      <div className="bg-black text-white text-center py-3 text-xs sm:text-sm font-medium">
        CONFIDENTIAL
      </div>
      
      <section className={`relative pt-12 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 bg-white ${className}`}>
        {backgroundImage && <div className="absolute inset-0 z-0">
            <img src={backgroundImage} alt="Background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>}
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-black leading-tight">
            {headline}
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto text-gray-700 leading-relaxed px-2 sm:px-0">
            {subheadline}
          </p>
          
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center items-center px-4 sm:px-0">
            <Button onClick={handleCtaClick} size="lg" className="bg-black text-white hover:bg-gray-800 px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto">
              {ctaText}
            </Button>
            
            {secondaryCtaText && secondaryCtaLink && <Button onClick={handleSecondaryCtaClick} size="lg" variant="outline" className="border-2 border-gray-600 text-gray-600 bg-transparent hover:bg-gray-600 hover:text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-medium w-full sm:w-auto">
                {secondaryCtaText}
              </Button>}

            {tertiaryCtaText && tertiaryCtaLink && (
              <Button onClick={handleTertiaryCtaClick} size="lg" variant="outline" className="border-2 border-gray-600 text-gray-600 bg-transparent hover:bg-gray-600 hover:text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-medium w-full sm:w-auto">
                {tertiaryCtaText}
              </Button>
            )}
          </div>
        </div>
      </section>
    </>;
};
