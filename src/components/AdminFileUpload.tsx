
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, AlertCircle, Check, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface AdminFileUploadProps {
  onSuccess?: (fileUrl: string, fileName: string) => void;
  onError?: (error: string) => void;
  onStart?: () => void;
  isUploading?: boolean;
  allowedFileTypes?: string[];
  label?: string;
  buttonText?: string;
}

export const AdminFileUpload = ({ 
  onSuccess, 
  onError,
  onStart,
  isUploading: externalIsUploading,
  allowedFileTypes = [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".jpg", ".jpeg", ".png"],
  label = "Upload File",
  buttonText = "Select File"
}: AdminFileUploadProps) => {
  const { toast } = useToast();
  const [internalIsUploading, setInternalIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<{url: string, name: string} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use external state if provided, otherwise use internal state
  const isUploading = externalIsUploading !== undefined ? externalIsUploading : internalIsUploading;

  const validateFile = (file: File): boolean => {
    // Check file size (10MB limit)
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      const errorMsg = `File size exceeds 10MB limit (${(file.size / (1024 * 1024)).toFixed(2)}MB)`;
      setError(errorMsg);
      if (onError) onError(errorMsg);
      return false;
    }

    // Check file type
    if (allowedFileTypes.length > 0) {
      const fileExtension = "." + file.name.split('.').pop()?.toLowerCase();
      if (!allowedFileTypes.includes(fileExtension) && 
          !allowedFileTypes.some(type => file.type.includes(type.replace('.', '')))) {
        const errorMsg = `File type not allowed. Please upload: ${allowedFileTypes.join(', ')}`;
        setError(errorMsg);
        if (onError) onError(errorMsg);
        return false;
      }
    }

    return true;
  };

  const uploadFileWithPhp = async (file: File) => {
    console.log(`Starting PHP upload for file: ${file.name} (${file.size} bytes)`);
    
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const url = "/api/upload-file.php";
      console.log("Sending POST request to:", url);
      
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      
      console.log("Response received", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });
      
      if (!response.ok) {
        let errorText;
        try {
          const errorData = await response.json();
          errorText = errorData.error || `Upload failed with status: ${response.status}`;
        } catch (e) {
          errorText = await response.text();
        }
        
        throw new Error(`Upload failed with status: ${response.status}. ${errorText}`);
      }
      
      let data;
      try {
        data = await response.json();
      } catch (e) {
        const text = await response.text();
        console.log("Raw response:", text);
        throw new Error("Invalid server response");
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      if (!data.publicUrl) {
        throw new Error("No file URL returned from server");
      }
      
      console.log("Upload successful, received URL:", data.publicUrl);
      return data.publicUrl;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  const uploadViaDirectApi = async (file: File) => {
    console.log(`Starting direct API upload for: ${file.name}`);
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      // Use simple fetch API for the upload
      const response = await fetch('/api/upload-file', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Upload successful, received data:", data);
      
      if (!data.publicUrl) {
        throw new Error("No file URL returned from server");
      }
      
      return data.publicUrl;
    } catch (error) {
      console.error("Direct API upload failed:", error);
      throw error;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    if (onStart) onStart();
    setInternalIsUploading(true);
    setError(null);
    setUploadedFile(null);

    try {
      console.log("File selected:", file.name, file.type, file.size, "bytes");
      
      // Validate file before uploading
      if (!validateFile(file)) {
        setInternalIsUploading(false);
        return;
      }

      toast({
        title: "Uploading",
        description: `Uploading ${file.name}...`,
      });

      // Try multiple upload methods in sequence
      let fileUrl: string | null = null;
      let error: Error | null = null;
      
      // Method 1: Try direct API upload first
      try {
        fileUrl = await uploadViaDirectApi(file);
        console.log("Direct API upload succeeded");
      } catch (err) {
        console.error("Direct API upload failed, trying PHP fallback:", err);
        error = err as Error;
      }
      
      // Method 2: If Method 1 failed, try PHP upload
      if (!fileUrl) {
        try {
          fileUrl = await uploadFileWithPhp(file);
          console.log("PHP upload succeeded");
        } catch (err) {
          console.error("PHP upload failed:", err);
          error = err as Error;
          
          // If both methods failed, throw the last error
          if (!fileUrl) {
            throw error;
          }
        }
      }
      
      // If we have a file URL, the upload was successful
      if (fileUrl) {
        setUploadedFile({
          url: fileUrl,
          name: file.name
        });
        
        if (onSuccess) {
          onSuccess(fileUrl, file.name);
        }
        
        toast({
          title: "Upload Complete",
          description: "File has been uploaded successfully",
        });
      }
    } catch (err) {
      console.error("All upload methods failed:", err);
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(`Failed to upload file: ${errorMessage}`);
      
      if (onError) onError(errorMessage);
      
      toast({
        title: "Upload Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setInternalIsUploading(false);
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
    <div className="w-full">
      {!uploadedFile ? (
        <div className="space-y-4">
          {label && <p className="text-sm font-medium text-gray-700">{label}</p>}
          
          <div className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            {isUploading ? (
              <div className="flex flex-col items-center justify-center py-4">
                <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
                <p className="text-sm text-gray-600">Uploading, please wait...</p>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500 mb-3">
                  {allowedFileTypes.join(', ')} (Max 10MB)
                </p>
                
                {error && (
                  <Alert variant="destructive" className="mb-3 w-full">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <Button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="relative"
                  disabled={isUploading}
                  size="sm"
                >
                  {buttonText}
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
        </div>
      ) : (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center mb-2">
            <div className="bg-green-100 rounded-full p-1 mr-2">
              <Check className="w-4 h-4 text-green-600" />
            </div>
            <h3 className="font-medium text-green-800">File Uploaded</h3>
          </div>
          
          <div className="flex items-start gap-2 mb-3 bg-white p-2 rounded border border-green-100">
            <FileText className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-gray-700 truncate">{uploadedFile.name}</p>
              <a 
                href={uploadedFile.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 underline block truncate"
              >
                View File
              </a>
            </div>
          </div>
          
          <Button 
            size="sm" 
            variant="outline" 
            onClick={resetUpload}
            className="w-full"
          >
            Upload Another File
          </Button>
        </div>
      )}
    </div>
  );
};
