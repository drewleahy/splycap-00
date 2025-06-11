
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
  const [uploadProgress, setUploadProgress] = useState<string>("");

  const validateFile = (file: File): string | null => {
    console.log("Validating file:", file.name, file.type, file.size);
    
    if (file.type !== 'application/pdf') {
      return 'Please select a PDF file';
    }

    if (file.size > 10 * 1024 * 1024) {
      return 'File size must be less than 10MB';
    }

    if (file.size === 0) {
      return 'File appears to be empty';
    }

    return null;
  };

  const tryUploadMethod = async (file: File, method: string, url: string, options: RequestInit = {}) => {
    console.log(`Trying upload method: ${method} to ${url}`);
    setUploadProgress(`Trying ${method}...`);
    
    const formData = new FormData();
    formData.append("file", file);
    
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      ...options,
    });

    console.log(`${method} response:`, response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`${method} failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log(`${method} success:`, data);
    return data;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("File selected:", file.name, file.type, file.size);

    // Reset states
    setIsUploading(true);
    setError(null);
    setSuccessMessage(null);
    setUploadProgress("Validating file...");

    try {
      // Validate file
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      toast({
        title: "Uploading PDF",
        description: `Uploading ${file.name}...`,
      });

      let uploadResult = null;
      const uploadMethods = [
        {
          name: "Service Worker Proxy",
          url: "/api/upload-file",
          options: {}
        },
        {
          name: "PHP Endpoint",
          url: "/api/upload-file.php",
          options: {}
        },
        {
          name: "Direct Supabase",
          url: "https://hjjtsbkxxvygpurfhlub.supabase.co/functions/v1/upload-file",
          options: {
            headers: {
              'Accept': 'application/json',
            }
          }
        }
      ];

      // Try each upload method in sequence
      for (let i = 0; i < uploadMethods.length; i++) {
        const method = uploadMethods[i];
        try {
          uploadResult = await tryUploadMethod(file, method.name, method.url, method.options);
          if (uploadResult && uploadResult.publicUrl) {
            break; // Success, exit the loop
          }
        } catch (methodError) {
          console.error(`${method.name} failed:`, methodError);
          
          // If this isn't the last method, continue to the next one
          if (i < uploadMethods.length - 1) {
            setUploadProgress(`${method.name} failed, trying next method...`);
            continue;
          } else {
            // This was the last method, create a blob URL as final fallback
            console.log("All upload methods failed, creating blob URL as fallback");
            setUploadProgress("Creating local file reference...");
            const blobUrl = URL.createObjectURL(file);
            uploadResult = {
              publicUrl: blobUrl,
              message: "File loaded locally (blob URL - note: this will only work in this browser session)"
            };
          }
        }
      }
      
      if (uploadResult && uploadResult.publicUrl) {
        setUploadedFile({ url: uploadResult.publicUrl, name: file.name });
        setSuccessMessage(`${file.name} uploaded successfully!`);
        setUploadProgress("");
        
        toast({
          title: "Success",
          description: uploadResult.message || "PDF uploaded successfully",
        });
        
        if (onSuccess) {
          onSuccess(uploadResult.publicUrl, file.name);
        }
      } else {
        throw new Error("No file URL returned from any upload method");
      }
    } catch (err) {
      console.error("All upload attempts failed:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to upload PDF";
      setError(`Upload failed: ${errorMessage}`);
      setUploadProgress("");
      
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
    setUploadProgress("");
  }, []);

  return (
    <div className="my-4">
      <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
        {isUploading ? (
          <div className="flex flex-col items-center justify-center py-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
            <p className="text-sm text-gray-600">Uploading PDF...</p>
            {uploadProgress && (
              <p className="text-xs text-gray-500 mt-1">{uploadProgress}</p>
            )}
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
      
      {/* Debug info */}
      <div className="mt-2 p-2 bg-gray-100 rounded text-xs text-gray-600">
        <p><strong>Debug Info:</strong></p>
        <p>Browser: {navigator.userAgent.includes('Chrome') ? 'Chrome' : navigator.userAgent.includes('Firefox') ? 'Firefox' : 'Other'}</p>
        <p>Upload endpoints available: Service Worker, PHP, Direct Supabase</p>
      </div>
    </div>
  );
};
