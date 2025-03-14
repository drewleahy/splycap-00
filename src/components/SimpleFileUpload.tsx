
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, AlertCircle, Check, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

  // Upload directly to Supabase storage (no edge function)
  const uploadViaStorage = async (file: File): Promise<string> => {
    console.log("Uploading directly to Supabase Storage");
    
    // Generate a unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const bucketName = 'lovable-uploads';
    
    // Upload directly to storage
    const { data, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });
    
    if (uploadError) throw uploadError;
    
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data?.path || fileName);
    
    console.log("Storage upload successful:", urlData.publicUrl);
    return urlData.publicUrl;
  };

  // Upload using the edge function with authentication
  const uploadViaEdgeFunction = async (file: File): Promise<string> => {
    console.log("Uploading via authenticated Edge Function");
    
    // Get authentication token
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      console.error("Error getting auth session:", sessionError);
      throw new Error("Authentication error: " + sessionError.message);
    }
    
    const accessToken = sessionData?.session?.access_token;
    if (!accessToken) {
      console.warn("No authentication token available, will attempt anonymous upload");
    } else {
      console.log("Auth token available, will use for upload");
    }
    
    const formData = new FormData();
    formData.append('file', file);
    
    const headers: HeadersInit = {
      'Accept': 'application/json'
    };
    
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
    
    const url = "https://hjjtsbkxxvygpurfhlub.supabase.co/functions/v1/upload-file";
    console.log("Sending upload request to:", url);
    
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });
    
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        const text = await response.text();
        throw new Error(`Upload failed with status: ${response.status}. Response: ${text.substring(0, 200)}`);
      }
      
      throw new Error(errorData.error || `Upload failed with status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Edge function upload successful:", data.publicUrl);
    return data.publicUrl;
  };

  const handleFileUpload = async (file: File, type: 'image' | 'file') => {
    try {
      setInternalIsUploading(true);
      console.log(`Starting ${type} upload:`, file.name);
      
      // Try different upload methods in sequence
      let publicUrl;
      let lastError;
      
      // Try edge function with auth first
      try {
        console.log("Trying authenticated edge function upload");
        publicUrl = await uploadViaEdgeFunction(file);
      } catch (error) {
        console.error("Edge function upload failed:", error);
        lastError = error;
        
        // Fall back to direct storage upload
        try {
          console.log("Trying direct storage upload");
          publicUrl = await uploadViaStorage(file);
        } catch (storageError) {
          console.error("Storage upload failed:", storageError);
          lastError = storageError;
        }
      }
      
      if (!publicUrl) {
        throw new Error(`All upload methods failed. Last error: ${lastError?.message || 'Unknown error'}`);
      }

      // Format the result depending on file type
      if (type === 'image') {
        setUploadedFile({
          url: publicUrl,
          name: file.name
        });
        
        if (onSuccess) {
          onSuccess(publicUrl, file.name);
        }
      } else {
        setUploadedFile({
          url: publicUrl,
          name: file.name
        });
        
        if (onSuccess) {
          onSuccess(publicUrl, file.name);
        }
      }

      toast({
        title: "Success",
        description: `${type === 'image' ? 'Image' : 'File'} uploaded successfully`,
      });
    } catch (error) {
      console.error('Final upload error:', error);
      
      // More descriptive error message
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Unknown error occurred during upload';
        
      setError(errorMessage);
      
      if (onError) {
        onError(errorMessage);
      }
      
      toast({
        title: "Error",
        description: `Failed to upload ${type}: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setInternalIsUploading(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Error",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }
      handleFileUpload(file, 'image');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file, 'file');
    }
  };

  // Generic file change handler (called from the input)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Decide how to handle the file based on type
      if (file.type.startsWith('image/')) {
        handleImageSelect(e);
      } else {
        handleFileSelect(e);
      }
    }
  };

  // Reset the form to upload another file
  const resetUpload = () => {
    setUploadedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
