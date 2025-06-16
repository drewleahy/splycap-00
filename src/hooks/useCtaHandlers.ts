
import { useToast } from '@/components/ui/use-toast';
import { downloadFile, handleDirectDownload, handleBlobDownload, extractFilenameFromUrl } from '@/utils/downloadUtils';

export const useCtaHandlers = () => {
  const { toast } = useToast();

  const handleCtaClick = (ctaLink: string) => {
    if (ctaLink.startsWith('#')) {
      const element = document.querySelector(ctaLink);
      element?.scrollIntoView({
        behavior: 'smooth'
      });
    } else {
      window.open(ctaLink, '_blank');
    }
  };

  const handleSecondaryCtaClick = async (secondaryCtaLink?: string, e?: React.MouseEvent) => {
    if (!secondaryCtaLink) return;

    // Prevent default button behavior if the function is triggered via <a>, just in case
    if (e) e.preventDefault();

    // Log for debug
    console.log("[Deck Download] Attempting to download from:", secondaryCtaLink);

    // Check for DocSend URLs FIRST - open in new tab immediately
    if (secondaryCtaLink.includes('docsend.com')) {
      console.log('Opening DocSend URL in new tab:', secondaryCtaLink);
      window.open(secondaryCtaLink, '_blank', 'noopener,noreferrer');
      return;
    }

    // Enhanced blob URL handling with better error recovery
    if (secondaryCtaLink.startsWith('blob:')) {
      try {
        console.log('Starting blob download process...');
        
        // First, verify the blob URL is still valid
        const response = await fetch(secondaryCtaLink, { method: 'HEAD' });
        if (!response.ok) {
          throw new Error('Blob URL is no longer valid');
        }
        
        const success = handleBlobDownload(secondaryCtaLink);
        if (success) {
          toast({ 
            title: "Download started!", 
            description: "Your Neurable deck PDF is downloading." 
          });
        }
        return;
      } catch (err) {
        console.error('Blob download error:', err);
        
        // Try to fallback to opening in same tab if blob download fails
        try {
          console.log('Attempting fallback: opening blob URL in same tab');
          window.location.href = secondaryCtaLink;
          toast({ 
            title: "Opening PDF...", 
            description: "The PDF should open in your browser." 
          });
          return;
        } catch (fallbackErr) {
          console.error('Fallback also failed:', fallbackErr);
          toast({ 
            title: "Download failed", 
            description: "The uploaded PDF may have expired. Please try uploading again.", 
            variant: "destructive" 
          });
          return;
        }
      }
    }

    // Direct download for local files
    if (
      secondaryCtaLink.startsWith('/') ||
      secondaryCtaLink.startsWith('file:')
    ) {
      const filename = extractFilenameFromUrl(secondaryCtaLink);
      handleDirectDownload(secondaryCtaLink, filename);
      toast({ title: "Download started!", description: "Your PDF should be downloading." });
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
      const filename = extractFilenameFromUrl(secondaryCtaLink);

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

  const handleTertiaryCtaClick = (tertiaryCtaLink?: string) => {
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

  return {
    handleCtaClick,
    handleSecondaryCtaClick,
    handleTertiaryCtaClick
  };
};
