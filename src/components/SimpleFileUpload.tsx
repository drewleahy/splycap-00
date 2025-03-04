
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, AlertCircle, Check, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SimpleFileUploadProps {
  onSuccess?: (fileUrl: string, fileName: string) => void;
  allowedFileTypes?: string[];
}

export const SimpleFileUpload = ({ 
  onSuccess, 
  allowedFileTypes = [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".jpg", ".jpeg", ".png"] 
}: SimpleFileUploadProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<{url: string, name: string} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    // Check file size (10MB limit)
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      setError(`File size exceeds 10MB limit`);
      return false;
    }

    // Check file type
    if (allowedFileTypes.length > 0) {
      const fileExtension = "." + file.name.split('.').pop()?.toLowerCase();
      if (!allowedFileTypes.includes(fileExtension) && 
          !allowedFileTypes.some(type => file.type.includes(type.replace('.', '')))) {
        setError(`File type not allowed. Please upload: ${allowedFileTypes.join(', ')}`);
        return false;
      }
    }

    return true;
  };

  const uploadFile = async (file: File) => {
    console.log(`Starting upload for file: ${file.name} (${file.size} bytes)`);
    
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      // Simple direct PHP upload
      const response = await fetch("/api/upload-file.php", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        console.error(`Upload failed with status: ${response.status}`);
        throw new Error(`Upload failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Upload response:", data);
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      if (!data.publicUrl) {
        throw new Error("No file URL returned");
      }
      
      return data.publicUrl;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);
    setUploadedFile(null);

    try {
      // Validate file before uploading
      if (!validateFile(file)) {
        setIsUploading(false);
        return;
      }

      toast({
        title: "Uploading",
        description: `Uploading ${file.name}...`,
      });

      // Upload the file
      const fileUrl = await uploadFile(file);
      
      setUploadedFile({
        url: fileUrl,
        name: file.name
      });
      
      toast({
        title: "Upload Complete",
        description: "File has been uploaded successfully",
      });
      
      if (onSuccess) {
        onSuccess(fileUrl, file.name);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(`Failed to upload file: ${errorMessage}`);
      
      toast({
        title: "Upload Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const resetUpload = () => {
    setError(null);
    setUploadedFile(null);
  };

  return (
    <div className="my-4">
      {!uploadedFile ? (
        <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
          {isUploading ? (
            <div className="flex flex-col items-center justify-center py-4">
              <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
              <p className="text-sm text-gray-600">Uploading, please wait...</p>
            </div>
          ) : (
            <>
              <Upload className="w-10 h-10 text-gray-400 mb-3" />
              <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500 mb-4">
                {allowedFileTypes.join(', ')} (Max 10MB)
              </p>
              
              {error && (
                <div className="flex items-center text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-md w-full">
                  <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              
              <Button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="relative"
              >
                Select File
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={isUploading}
                  accept={allowedFileTypes.join(',')}
                />
              </Button>
            </>
          )}
        </div>
      ) : (
        <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center mb-3">
            <div className="bg-green-100 rounded-full p-2 mr-3">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-medium text-green-800">File Successfully Uploaded</h3>
          </div>
          
          <div className="flex items-start gap-3 mb-4 bg-white p-3 rounded border border-green-100">
            <FileText className="w-5 h-5 text-gray-500 mt-0.5 shrink-0" />
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-gray-700 mb-1">{uploadedFile.name}</p>
              <a 
                href={uploadedFile.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 underline block truncate"
              >
                View Document
              </a>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={resetUpload}
            >
              Upload Another File
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
