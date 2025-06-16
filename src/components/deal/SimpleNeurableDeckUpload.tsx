
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PDFUpload } from "@/components/PDFUpload";

const NEURABLE_STORAGE_KEY = "neurable-deck-url";

export const SimpleNeurableDeckUpload = () => {
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(NEURABLE_STORAGE_KEY);
    if (stored) {
      setUploadedUrl(stored);
    }
  }, []);

  const handleSuccess = (url: string) => {
    console.log("Neurable deck upload success:", url);
    setUploadedUrl(url);
    localStorage.setItem(NEURABLE_STORAGE_KEY, url);
  };

  const clearDeck = () => {
    console.log("Clearing Neurable deck");
    localStorage.removeItem(NEURABLE_STORAGE_KEY);
    setUploadedUrl(null);
  };

  return (
    <div className="bg-blue-50 border border-blue-200 p-6 m-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2 text-blue-800">
        Upload Neurable Deck PDF
      </h3>
      <p className="text-sm text-blue-600 mb-4">
        Upload the Neurable investment deck PDF here to make it available for download via the "Download Deck" button.
      </p>
      
      {uploadedUrl ? (
        <div className="bg-green-50 border border-green-200 rounded p-4 mb-4 flex items-center gap-3">
          <span className="text-green-700 font-semibold">✓ Neurable Deck Uploaded!</span>
          <a
            href={uploadedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline mr-2"
          >
            View PDF
          </a>
          <Button size="sm" variant="outline" onClick={clearDeck}>
            Remove PDF
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <PDFUpload onSuccess={handleSuccess} label="Upload Neurable Deck PDF" />
          <p className="text-xs text-gray-500">
            The PDF will be stored locally and made available for download.
          </p>
        </div>
      )}
    </div>
  );
};
