
import React, { useEffect, useState } from 'react';
import { DealTemplate } from '@/components/deal/DealTemplate';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { nanotronicsConfig } from '@/config/deal-pages/nanotronics';
import { deckStateManager } from '@/utils/deckStateManager';
import { DealPageConfig } from '@/types/deal-template';
import { toast } from '@/hooks/use-toast';

const Nanotronics = () => {
  const [config, setConfig] = useState<DealPageConfig>(nanotronicsConfig);

  useEffect(() => {
    // Check if there's an uploaded deck URL
    const uploadedDeckUrl = deckStateManager.getDeckUrl('nanotronics');
    
    if (uploadedDeckUrl) {
      console.log('Found uploaded deck URL:', uploadedDeckUrl);
      
      // Create a download function that will be called when the button is clicked
      const handleDownload = () => {
        console.log('Triggering download for:', uploadedDeckUrl);
        
        try {
          // First try to open in new tab
          const newWindow = window.open(uploadedDeckUrl, '_blank');
          
          // If popup was blocked or failed, try direct download
          if (!newWindow) {
            console.log('Popup blocked, trying direct download...');
            const link = document.createElement('a');
            link.href = uploadedDeckUrl;
            link.download = 'nanotronics-investment-deck.pdf';
            link.target = '_blank';
            
            // Add to DOM, click, and remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            toast({
              title: "Download Started",
              description: "Your PDF download should begin shortly.",
            });
          } else {
            toast({
              title: "PDF Opened",
              description: "The deck has been opened in a new tab.",
            });
          }
        } catch (error) {
          console.error('Download failed:', error);
          toast({
            title: "Download Failed",
            description: "Unable to open the PDF. Please try uploading again.",
            variant: "destructive",
          });
        }
      };
      
      // Store the download function globally so the button can access it
      (window as any).downloadNanotronicsDeck = handleDownload;
      
      // Update the config with a javascript: URL that calls our download function
      const updatedConfig = {
        ...nanotronicsConfig,
        hero: {
          ...nanotronicsConfig.hero,
          tertiaryCta: {
            text: "Download Deck",
            link: "javascript:void(0)",
            onClick: handleDownload
          }
        }
      };
      
      setConfig(updatedConfig);
    } else {
      // No deck uploaded yet, show original config
      setConfig(nanotronicsConfig);
    }
  }, []);

  return (
    <ErrorBoundary>
      <DealTemplate config={config} />
    </ErrorBoundary>
  );
};

export default Nanotronics;
