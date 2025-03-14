import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, AlertCircle, Check, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SimpleFileUploadProps {
  onSuccess?: (fileUrl: string, fileName: string) => void;
  onError?: (error: string) => void;
  onStart?: () => void;
  isUploading?: boolean;
  allowedFileTypes?: string[];
  forcePhpUpload?: boolean;
}

export const SimpleFileUpload = ({ 
  onSuccess, 
  onError,
  onStart,
  isUploading: externalIsUploading,
  allowedFileTypes = [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".jpg", ".jpeg", ".png"],
  forcePhpUpload = false
}: SimpleFileUploadProps) => {
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

  // Simplified direct upload to Supabase
  const uploadDirectToSupabase = async (file: File) => {
    console.log(`Starting direct Supabase upload for file: ${file.name} (${file.size} bytes)`);
    console.log(`File type: ${file.type}`);
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      // Log the URL we're sending to
      const url = "https://hjjtsbkxxvygpurfhlub.supabase.co/functions/v1/upload-file";
      console.log("Sending POST request directly to Supabase:", url);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      const response = await fetch(url, {
        method: "POST",
        body: formData,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      console.log("Response received", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });
      
      if (!response.ok) {
        let errorText;
        try {
          // Try to parse as JSON first
          const errorData = await response.json();
          errorText = errorData.error || `Upload failed with status: ${response.status}`;
        } catch (e) {
          // If not JSON, get as text
          errorText = await response.text();
        }
        
        console.error("Upload failed:", {
          status: response.status,
          statusText: response.statusText,
          responseText: errorText
        });
        throw new Error(`Upload failed with status: ${response.status}. ${errorText}`);
      }
      
      let data;
      try {
        data = await response.json();
        console.log("Parsed response data:", data);
      } catch (e) {
        console.error("Failed to parse response as JSON:", e);
        const text = await response.text();
        console.log("Raw response:", text);
        throw new Error("Invalid server response");
      }
      
      if (data.error) {
        console.error("Server returned error:", data.error);
        throw new Error(data.error);
      }
      
      if (!data.publicUrl) {
        console.error("No publicUrl in response:", data);
        throw new Error("No file URL returned from server");
      }
      
      console.log("Upload successful, received URL:", data.publicUrl);
      return data.publicUrl;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.log("No file selected");
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
        console.log("File validation failed");
        setInternalIsUploading(false);
        return;
      }

      toast({
        title: "Uploading",
        description: `Uploading ${file.name}...`,
      });

      // Direct upload to Supabase Edge Function
      try {
        console.log("Using direct Supabase upload for file:", file.name);
        const fileUrl = await uploadDirectToSupabase(file);
        console.log("Upload completed successfully, URL:", fileUrl);
        
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
      } catch (uploadError) {
        console.error("Upload process failed:", uploadError);
        const errorMessage = uploadError instanceof Error ? uploadError.message : "Unknown error occurred";
        setError(`Failed to upload file: ${errorMessage}`);
        
        if (onError) onError(errorMessage);
        
        toast({
          title: "Upload Failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("File processing failed:", err);
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(`Failed to process file: ${errorMessage}`);
      
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
