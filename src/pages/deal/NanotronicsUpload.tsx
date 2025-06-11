
import React, { useState } from 'react';
import { DealTemplate } from '@/components/deal/DealTemplate';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { nanotronicsConfig } from '@/config/deal-pages/nanotronics';
import { PDFUpload } from '@/components/PDFUpload';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const NanotronicsUpload = () => {
  const [deckUrl, setDeckUrl] = useState<string>('');
  const [deckName, setDeckName] = useState<string>('');

  const handlePDFUpload = (fileUrl: string, fileName: string) => {
    setDeckUrl(fileUrl);
    setDeckName(fileName);
    console.log('PDF uploaded:', { fileUrl, fileName });
  };

  const updateDeckLink = () => {
    if (deckUrl) {
      // Update the config with the new deck URL
      const updatedConfig = {
        ...nanotronicsConfig,
        hero: {
          ...nanotronicsConfig.hero,
          tertiaryCta: {
            text: "Download Deck",
            link: deckUrl
          }
        }
      };
      
      toast({
        title: "Deck Link Updated",
        description: `The "Download Deck" button now links to ${deckName}`,
      });
      
      console.log('Updated config with deck URL:', deckUrl);
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto mb-8">
            <CardHeader>
              <CardTitle>Upload Nanotronics Deck</CardTitle>
            </CardHeader>
            <CardContent>
              <PDFUpload 
                onSuccess={handlePDFUpload}
                label="Upload Nanotronics Investment Deck"
              />
              
              {deckUrl && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700 mb-2">
                    PDF Ready: {deckName}
                  </p>
                  <p className="text-xs text-gray-600 mb-3">
                    URL: {deckUrl}
                  </p>
                  <Button onClick={updateDeckLink} className="w-full">
                    Update Deal Page Link
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="bg-white rounded-lg shadow-sm">
            <DealTemplate config={nanotronicsConfig} />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default NanotronicsUpload;
