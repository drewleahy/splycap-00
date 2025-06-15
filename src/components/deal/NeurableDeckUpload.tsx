
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PDFUpload } from "@/components/PDFUpload";

// Utility to persist/fetch the deck URL in localStorage for Neurable
const STORAGE_KEY = "neurable-deck-url";

export const NeurableDeckUpload = ({
  onUpload,
}: {
  onUpload?: (url: string, name: string) => void;
}) => {
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setUploadedUrl(stored);
  }, []);

  const handleSuccess = (url: string) => {
    setUploadedUrl(url);
    localStorage.setItem(STORAGE_KEY, url);
    if (onUpload) onUpload(url, "Neurable-Deck.pdf");
  };

  const clearDeck = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUploadedUrl(null);
  };

  return (
    <div className="my-6">
      <h4 className="text-sm font-medium mb-2">[Demo] Admin/Editor: Upload or reset the Neurable Deck PDF</h4>
      {uploadedUrl ? (
        <div className="bg-green-50 border border-green-200 rounded p-3 mb-2 flex items-center gap-3">
          <span className="text-green-700 font-semibold">Uploaded!</span>
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
        <PDFUpload onSuccess={handleSuccess} label="Upload Deck PDF" />
      )}
    </div>
  );
};
