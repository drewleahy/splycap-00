
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, AlertCircle, Check, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PDFUploadProps {
  onSuccess?: (fileUrl: string, fileName: string) => void;
  label?: string;
}

export const PDFUpload = ({ onSuccess, label = "Upload PDF" }: PDFUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<{url: string, name: string} | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if it's a PDF
    if (file.type !== 'application/pdf') {
      setError('Please select a PDF file');
      return;
    }

    // Reset states
    setIsUploading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      console.log(`Starting PDF upload: ${file.name}`);
      toast({
        title: "Uploading PDF",
        description: `Uploading ${file.name}...`,
      });

      // Create FormData
      const formData = new FormData();
      formData.append("file", file);
      
      // Upload via PHP proxy
      const response = await fetch("/api/upload-file.php", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.publicUrl) {
        setUploadedFile({ url: data.publicUrl, name: file.name });
        setSuccessMessage(`${file.name} uploaded successfully!`);
        toast({
          title: "Success",
          description: "PDF uploaded successfully",
        });
        
        if (onSuccess) {
          onSuccess(data.publicUrl, file.name);
        }
      } else {
        throw new Error("No file URL returned");
      }
    } catch (err) {
      console.error("PDF upload failed:", err);
      setError(err instanceof Error ? err.message : "Failed to upload PDF");
      toast({
        title: "Upload Failed",
        description: err instanceof Error ? err.message : "Failed to upload PDF",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const clearStatus = useCallback(() => {
    setSuccessMessage(null);
    setError(null);
    setUploadedFile(null);
  }, []);

  return (
    <div className="my-4">
      <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
        {isUploading ? (
          <div className="flex flex-col items-center justify-center py-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
            <p className="text-sm text-gray-600">Uploading PDF...</p>
          </div>
        ) : successMessage && uploadedFile ? (
          <div className="flex flex-col items-center justify-center py-4">
            <div className="bg-green-100 rounded-full p-3 mb-3">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <FileText className="w-8 h-8 text-gray-600 mb-2" />
            <p className="text-sm text-green-600 font-medium mb-2">{successMessage}</p>
            <p className="text-xs text-gray-500 mb-3">File URL: {uploadedFile.url}</p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open(uploadedFile.url, '_blank')}
              >
                View PDF
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearStatus}
              >
                Upload Another PDF
              </Button>
            </div>
          </div>
        ) : (
          <>
            <FileText className="w-12 h-12 text-gray-400 mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{label}</h3>
            <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-500 mb-4">PDF files only (max 10MB)</p>
            
            {error && (
              <div className="flex flex-col items-center">
                <div className="flex items-center text-red-500 text-sm mt-1 mb-2">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span>{error}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={clearStatus}
                  className="mb-2"
                >
                  Try Again
                </Button>
              </div>
            )}
            
            <Button 
              variant="outline" 
              onClick={() => document.getElementById("pdf-upload")?.click()}
              className="relative"
            >
              <Upload className="w-4 h-4 mr-2" />
              Select PDF File
              <input
                id="pdf-upload"
                type="file"
                accept=".pdf,application/pdf"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
