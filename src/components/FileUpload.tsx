
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, AlertCircle, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FileUploadProps {
  onSuccess?: (fileUrl: string) => void;
}

export const FileUpload = ({ onSuccess }: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset states
    setIsUploading(true);
    setError(null);
    setSuccessMessage(null);
    setProgress(10);

    try {
      console.log(`Starting file upload: ${file.name}`);
      toast({
        title: "Uploading",
        description: `Uploading ${file.name}...`,
      });

      // Create FormData
      const formData = new FormData();
      formData.append("file", file);
      
      // Try direct upload to PHP proxy
      try {
        setProgress(30);
        const response = await fetch("/api/upload-file.php", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Upload failed with status: ${response.status}`);
        }

        const data = await response.json();
        setProgress(100);
        
        if (data.publicUrl) {
          // Show success message
          setSuccessMessage(`${file.name} uploaded successfully!`);
          toast({
            title: "Success",
            description: "File uploaded successfully",
          });
          
          if (onSuccess) {
            onSuccess(data.publicUrl);
          }
        } else {
          throw new Error("No file URL returned");
        }
      } catch (uploadError) {
        console.error("Upload error:", uploadError);
        throw new Error(`File upload failed: ${uploadError instanceof Error ? uploadError.message : "Unknown error"}`);
      }
    } catch (err) {
      console.error("File upload failed:", err);
      setError(err instanceof Error ? err.message : "Failed to upload file");
      toast({
        title: "Upload Failed",
        description: err instanceof Error ? err.message : "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Reset the input
      e.target.value = "";
    }
  };

  const clearStatus = useCallback(() => {
    setSuccessMessage(null);
    setError(null);
  }, []);

  return (
    <div className="my-4">
      <div className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
        {isUploading ? (
          <div className="flex flex-col items-center justify-center py-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
            <p className="text-sm text-gray-600">Uploading... {progress}%</p>
          </div>
        ) : successMessage ? (
          <div className="flex flex-col items-center justify-center py-4">
            <div className="bg-green-100 rounded-full p-2 mb-2">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-sm text-green-600 font-medium mb-2">{successMessage}</p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={clearStatus}
            >
              Upload Another File
            </Button>
          </div>
        ) : (
          <>
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-500 mb-4">PDF, Word, Excel, or image files</p>
            
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
              onClick={() => document.getElementById("file-upload")?.click()}
              className="relative"
            >
              Select File
              <input
                id="file-upload"
                type="file"
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
