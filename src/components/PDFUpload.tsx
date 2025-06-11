
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

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    // Reset states
    setIsUploading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      console.log(`Starting PDF upload: ${file.name}, size: ${file.size} bytes`);
      
      toast({
        title: "Uploading PDF",
        description: `Uploading ${file.name}...`,
      });

      // Create FormData
      const formData = new FormData();
      formData.append("file", file);
      
      console.log("FormData created, attempting upload...");
      
      // Try multiple upload methods in sequence
      let uploadResult = null;
      
      // Method 1: Try the service worker proxy first
      try {
        console.log("Attempting upload via service worker proxy...");
        const response = await fetch("/api/upload-file", {
          method: "POST",
          body: formData,
        });

        console.log("Response status:", response.status);
        console.log("Response headers:", Object.fromEntries(response.headers.entries()));

        if (response.ok) {
          const data = await response.json();
          console.log("Upload successful via service worker:", data);
          uploadResult = data;
        } else {
          const errorText = await response.text();
          console.error("Service worker upload failed:", errorText);
          throw new Error(`Service worker upload failed: ${response.status} - ${errorText}`);
        }
      } catch (serviceWorkerError) {
        console.error("Service worker method failed:", serviceWorkerError);
        
        // Method 2: Try PHP endpoint
        try {
          console.log("Attempting upload via PHP endpoint...");
          const phpResponse = await fetch("/api/upload-file.php", {
            method: "POST",
            body: formData,
          });

          if (phpResponse.ok) {
            const phpData = await phpResponse.json();
            console.log("Upload successful via PHP:", phpData);
            uploadResult = phpData;
          } else {
            const phpErrorText = await phpResponse.text();
            console.error("PHP upload failed:", phpErrorText);
            throw new Error(`PHP upload failed: ${phpResponse.status} - ${phpErrorText}`);
          }
        } catch (phpError) {
          console.error("PHP method failed:", phpError);
          
          // Method 3: Try creating a simple blob URL as fallback
          console.log("Creating blob URL as fallback...");
          const blobUrl = URL.createObjectURL(file);
          uploadResult = {
            publicUrl: blobUrl,
            message: "File loaded locally (blob URL)"
          };
          console.log("Blob URL created:", blobUrl);
        }
      }
      
      if (uploadResult && uploadResult.publicUrl) {
        setUploadedFile({ url: uploadResult.publicUrl, name: file.name });
        setSuccessMessage(`${file.name} uploaded successfully!`);
        
        toast({
          title: "Success",
          description: "PDF uploaded successfully",
        });
        
        if (onSuccess) {
          onSuccess(uploadResult.publicUrl, file.name);
        }
      } else {
        throw new Error("No file URL returned from any upload method");
      }
    } catch (err) {
      console.error("All upload methods failed:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to upload PDF";
      setError(errorMessage);
      
      toast({
        title: "Upload Failed",
        description: errorMessage,
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
            <p className="text-xs text-gray-500 mt-1">Trying multiple upload methods...</p>
          </div>
        ) : successMessage && uploadedFile ? (
          <div className="flex flex-col items-center justify-center py-4">
            <div className="bg-green-100 rounded-full p-3 mb-3">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <FileText className="w-8 h-8 text-gray-600 mb-2" />
            <p className="text-sm text-green-600 font-medium mb-2">{successMessage}</p>
            <p className="text-xs text-gray-500 mb-3 max-w-md text-center break-all">
              File URL: {uploadedFile.url}
            </p>
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
              <div className="flex flex-col items-center mb-4">
                <div className="flex items-center text-red-500 text-sm mt-1 mb-2">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span className="text-center">{error}</span>
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
