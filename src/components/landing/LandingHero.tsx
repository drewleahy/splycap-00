
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

async function downloadFile(url: string, filename = "Neurable-Deck.pdf") {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch file");
    const blob = await res.blob();

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => {
      URL.revokeObjectURL(link.href);
    }, 1000);

    return true;
  } catch (err) {
    console.error("Deck download error:", err);
    throw err;
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
  const { toast } = useToast();

  // Check if this is the Neurable page
  const isNeurable = window.location.pathname.includes('neurable');

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

  const handleSecondaryCtaClick = async (e?: React.MouseEvent) => {
    if (!secondaryCtaLink) return;

    // Prevent default button behavior if the function is triggered via <a>, just in case
    if (e) e.preventDefault();

    // Log for debug
    console.log("[Deck Download] Attempting to download from:", secondaryCtaLink);

    // Direct download for local or blob links
    if (
      secondaryCtaLink.startsWith('blob:') ||
      secondaryCtaLink.startsWith('/') ||
      secondaryCtaLink.startsWith('file:')
    ) {
      let filename = "Neurable-Deck.pdf";
      try {
        const urlParts = secondaryCtaLink.split("?");
        const lastSlash = urlParts[0].lastIndexOf("/");
        if (lastSlash !== -1) {
          const candidate = urlParts[0].substr(lastSlash + 1);
          if (candidate.endsWith('.pdf')) filename = candidate;
        }
      } catch {}
      const link = document.createElement('a');
      link.href = secondaryCtaLink;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast({ title: "Download started!", description: "Your PDF should be downloading from local source." });
      return;
    }

    // Supabase/public/storage PDF or any custom PDF
    const isSupabasePDF =
      secondaryCtaLink.includes('supabase.co/storage') ||
      (secondaryCtaLink.endsWith('.pdf') &&
        !secondaryCtaLink.includes('neurable.com/2025-deck.pdf'));

    if (
      secondaryCtaLink &&
      (
        isSupabasePDF ||
        (
          secondaryCtaLink.startsWith('http') &&
          !secondaryCtaLink.includes('neurable.com/2025-deck.pdf')
        )
      )
    ) {
      let filename = "Neurable-Deck.pdf";
      try {
        const urlParts = secondaryCtaLink.split("?");
        const lastSlash = urlParts[0].lastIndexOf("/");
        if (lastSlash !== -1) {
          const candidate = urlParts[0].substr(lastSlash + 1);
          if (candidate.endsWith('.pdf')) filename = candidate;
        }
      } catch {}

      try {
        toast({ title: "Preparing download...", description: "Downloading PDF deck..." });
        await downloadFile(secondaryCtaLink, filename);
        toast({ title: "Download started!", description: "Your PDF deck is downloading." });
      } catch (err) {
        toast({ title: "Download failed", description: "Please try again or contact support.", variant: "destructive" });
      }
      return;
    } else if (secondaryCtaLink.startsWith('#')) {
      const element = document.querySelector(secondaryCtaLink);
      element?.scrollIntoView({
        behavior: 'smooth'
      });
      return;
    } else if (secondaryCtaLink.startsWith('https://vimeo.com/')) {
      const videoElement = document.querySelector('#video');
      if (videoElement) {
        videoElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
      return;
    } else {
      window.open(secondaryCtaLink, '_blank');
      return;
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
        if ((window as any).downloadNanotronicsDeck) {
          (window as any).downloadNanotronicsDeck();
        }
      } else {
        window.open(tertiaryCtaLink, '_blank');
      }
    }
  };

  // Debug: What is the secondary CTA link?
  React.useEffect(() => {
    if (secondaryCtaLink) {
      console.log("[LandingHero] secondaryCtaLink received:", secondaryCtaLink);
    }
  }, [secondaryCtaLink]);

  // Apply Neurable-specific styling
  const bannerBg = isNeurable ? "bg-gray-900" : "bg-black";
  const bannerText = isNeurable ? "text-white" : "text-white";
  const heroText = isNeurable ? "text-gray-900" : "text-black";
  const subText = isNeurable ? "text-gray-700" : "text-gray-700";
  const primaryBtnStyle = isNeurable 
    ? "bg-gray-900 text-white hover:bg-gray-800" 
    : "bg-black text-white hover:bg-gray-800";
  const secondaryBtnStyle = isNeurable 
    ? "border-2 border-gray-900 text-gray-900 bg-transparent hover:bg-gray-900 hover:text-white" 
    : "border-2 border-gray-600 text-gray-600 bg-transparent hover:bg-gray-600 hover:text-white";

  return (
    <>
      {/* Confidential Banner */}
      <div className={`${bannerBg} ${bannerText} text-center py-3 text-xs sm:text-sm font-medium`}>
        CONFIDENTIAL
      </div>
      
      <section className={`relative pt-16 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 bg-white ${className}`}>
        {backgroundImage && <div className="absolute inset-0 z-0">
            <img src={backgroundImage} alt="Background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>}
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className={`text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 ${heroText} leading-tight`}>
            {headline}
          </h1>
          <p className={`text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-3xl mx-auto ${subText} leading-relaxed px-2 sm:px-0`}>
            {subheadline}
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center items-center px-4 sm:px-0">
            <Button onClick={handleCtaClick} size="lg" className={`${primaryBtnStyle} px-8 sm:px-10 py-4 text-base sm:text-lg font-semibold w-full sm:w-auto`}>
              {ctaText}
            </Button>
            
            {secondaryCtaText && secondaryCtaLink && <Button onClick={handleSecondaryCtaClick} size="lg" variant="outline" className={`${secondaryBtnStyle} px-8 sm:px-10 py-4 text-base sm:text-lg font-semibold w-full sm:w-auto`}>
                {secondaryCtaText}
              </Button>}

            {tertiaryCtaText && tertiaryCtaLink && (
              <Button onClick={handleTertiaryCtaClick} size="lg" variant="outline" className={`${secondaryBtnStyle} px-8 sm:px-10 py-4 text-base sm:text-lg font-semibold w-full sm:w-auto`}>
                {tertiaryCtaText}
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
