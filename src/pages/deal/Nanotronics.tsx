
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
      
      // Update the config with the uploaded deck URL
      const updatedConfig = {
        ...nanotronicsConfig,
        hero: {
          ...nanotronicsConfig.hero,
          tertiaryCta: {
            text: "Download Deck",
            link: uploadedDeckUrl
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
