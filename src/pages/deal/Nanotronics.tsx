
import React, { useEffect, useState } from 'react';
import { DealTemplate } from '@/components/deal/DealTemplate';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { nanotronicsConfig } from '@/config/deal-pages/nanotronics';
import { deckStateManager } from '@/utils/deckStateManager';
import { DealPageConfig } from '@/types/deal-template';

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
        
        // Create a temporary anchor element to trigger download
        const link = document.createElement('a');
        link.href = uploadedDeckUrl;
        link.download = 'nanotronics-investment-deck.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
            link: "javascript:window.downloadNanotronicsDeck()"
          }
        }
      };
      
      setConfig(updatedConfig);
    }
  }, []);

  return (
    <ErrorBoundary>
      <DealTemplate config={config} />
    </ErrorBoundary>
  );
};

export default Nanotronics;
