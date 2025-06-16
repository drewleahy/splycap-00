
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PDFUpload } from "@/components/PDFUpload";

// Utility to persist/fetch the deck URL in localStorage for Neurable ONLY
const NEURABLE_STORAGE_KEY = "neurable-deck-url";

export const NeurableDeckUpload = ({
  onUpload,
}: {
  onUpload?: (url: string, name: string) => void;
}) => {
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  useEffect(() => {
    // Only check for Neurable-specific storage
    const stored = localStorage.getItem(NEURABLE_STORAGE_KEY);
    if (stored) {
      setUploadedUrl(stored);
      console.log("Loaded existing Neurable deck URL:", stored);
    }
  }, []);

  const handleSuccess = (url: string) => {
    console.log("Neurable deck upload success:", url);
    setUploadedUrl(url);
    localStorage.setItem(NEURABLE_STORAGE_KEY, url);
    if (onUpload) onUpload(url, "Neurable-Deck.pdf");
  };

  const clearDeck = () => {
    console.log("Clearing Neurable deck");
    localStorage.removeItem(NEURABLE_STORAGE_KEY);
    setUploadedUrl(null);
  };

  return (
    <div className="my-6">
      <h4 className="text-sm font-medium mb-2 text-orange-700">
        [NEURABLE ONLY] Upload or reset the Neurable Deck PDF (this only affects the Neurable page)
      </h4>
      <div className="text-xs text-gray-600 mb-3">
        Storage key: {NEURABLE_STORAGE_KEY} (isolated from other deal pages)
      </div>
      {uploadedUrl ? (
        <div className="bg-green-50 border border-green-200 rounded p-3 mb-2 flex items-center gap-3">
          <span className="text-green-700 font-semibold">Neurable Deck Uploaded!</span>
          <a
            href={uploadedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline mr-2"
          >
            View Deck PDF
          </a>
          <Button size="sm" variant="outline" onClick={clearDeck}>
            Remove PDF
          </Button>
        </div>
      ) : (
        <PDFUpload onSuccess={handleSuccess} label="Upload Neurable Deck PDF" />
      )}
    </div>
  );
};
