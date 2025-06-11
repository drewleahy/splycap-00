
import React, { useState } from 'react';
import { DealTemplate } from '@/components/deal/DealTemplate';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { nanotronicsConfig } from '@/config/deal-pages/nanotronics';
import { PDFUpload } from '@/components/PDFUpload';
import { UploadDiagnostics } from '@/components/UploadDiagnostics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { deckStateManager } from '@/utils/deckStateManager';

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
      // Store the deck URL in our state manager
      deckStateManager.setDeckUrl('nanotronics', deckUrl);
      
      toast({
        title: "Deck Link Updated",
        description: `The "Download Deck" button now links to ${deckName}. You can view the updated deal page.`,
      });
      
      console.log('Updated deck URL for nanotronics:', deckUrl);
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto mb-8">
            <h1 className="text-3xl font-bold mb-4">Nanotronics Deal Management</h1>
            
            <Tabs defaultValue="upload" className="space-y-6">
              <TabsList>
                <TabsTrigger value="upload">Upload Deck</TabsTrigger>
                <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload">
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Nanotronics Investment Deck</CardTitle>
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
                        <p className="text-xs text-gray-600 mb-3 break-all">
                          URL: {deckUrl}
                        </p>
                        <div className="space-y-2">
                          <Button onClick={updateDeckLink} className="w-full">
                            Update Deal Page Link
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => window.open('/deals/nanotronics-exclusive-2025', '_blank')}
                            className="w-full"
                          >
                            View Deal Page
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="diagnostics">
                <UploadDiagnostics />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm">
            <DealTemplate config={nanotronicsConfig} />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default NanotronicsUpload;
