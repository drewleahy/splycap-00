
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, AlertCircle, Check, FileText, RefreshCw } from "lucide-react";
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
  const [diagnosticInfo, setDiagnosticInfo] = useState<string | null>(null);
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

  // Uploads file directly to Supabase with enhanced error handling
  const uploadToSupabase = async (file: File) => {
    console.log(`Starting direct Supabase upload for file: ${file.name} (${file.size} bytes)`);
    
    const formData = new FormData();
    formData.append('file', file);
    
    let diagnosticLog = `Attempting Supabase upload for ${file.name}\n`;
    
    try {
      // Collect environment info for diagnostics
      diagnosticLog += `Browser: ${navigator.userAgent}\n`;
      diagnosticLog += `URL: ${window.location.href}\n`;
      
      const url = "https://hjjtsbkxxvygpurfhlub.supabase.co/functions/v1/upload-file";
      diagnosticLog += `Upload URL: ${url}\n`;
      
      // Test connectivity first with a HEAD request
      diagnosticLog += "Testing connectivity...\n";
      try {
        const testConnection = await fetch(url, { 
          method: 'HEAD',
          mode: 'cors'
        });
        diagnosticLog += `Connection test: ${testConnection.status} ${testConnection.statusText}\n`;
      } catch (testError) {
        diagnosticLog += `Connection test failed: ${testError.message}\n`;
        // Continue anyway, the main request might still work
      }
      
      // Set longer timeout for large files
      const timeout = Math.max(30000, file.size / 1024); // Minimum 30s, or 1s per KB
      diagnosticLog += `Setting timeout: ${timeout}ms\n`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        diagnosticLog += "Request timed out, aborting\n";
        controller.abort();
      }, timeout);
      
      // Attempt the upload with full diagnostics
      diagnosticLog += "Sending upload request...\n";
      const startTime = Date.now();
      
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
        mode: 'cors',
        credentials: 'omit', // Don't send cookies
        headers: {
          // No auth headers needed
        }
      });
      
      clearTimeout(timeoutId);
      const endTime = Date.now();
      diagnosticLog += `Response received in ${endTime - startTime}ms\n`;
      diagnosticLog += `Status: ${response.status} ${response.statusText}\n`;
      
      // Check HTTP headers in the response
      const headers = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });
      diagnosticLog += `Headers: ${JSON.stringify(headers)}\n`;
      
      if (!response.ok) {
        let errorText = "Unknown error";
        try {
          // Try to parse as JSON first
          const errorData = await response.json();
          errorText = errorData.error || `Upload failed with status: ${response.status}`;
          diagnosticLog += `Error JSON: ${JSON.stringify(errorData)}\n`;
        } catch (e) {
          // If not JSON, get as text
          errorText = await response.text();
          diagnosticLog += `Error text: ${errorText}\n`;
        }
        
        throw new Error(`Upload failed with status: ${response.status}. ${errorText}`);
      }
      
      // Try to parse the successful response
      let data;
      const rawResponse = await response.text();
      diagnosticLog += `Raw response: ${rawResponse}\n`;
      
      try {
        data = JSON.parse(rawResponse);
        diagnosticLog += `Parsed JSON response: ${JSON.stringify(data)}\n`;
      } catch (e) {
        diagnosticLog += `Failed to parse JSON: ${e.message}\n`;
        throw new Error("Invalid server response");
      }
      
      if (data.error) {
        diagnosticLog += `Server returned error: ${data.error}\n`;
        throw new Error(data.error);
      }
      
      if (!data.publicUrl) {
        diagnosticLog += `No publicUrl in response\n`;
        throw new Error("No file URL returned from server");
      }
      
      diagnosticLog += `Upload successful, URL: ${data.publicUrl}\n`;
      setDiagnosticInfo(diagnosticLog);
      return data.publicUrl;
    } catch (error) {
      diagnosticLog += `Final error: ${error.message}\n`;
      if (error.stack) {
        diagnosticLog += `Stack trace: ${error.stack}\n`;
      }
      
      console.error("Upload diagnostic log:", diagnosticLog);
      setDiagnosticInfo(diagnosticLog);
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
    setDiagnosticInfo(null);
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

      // Try direct Supabase upload
      try {
        console.log("Attempting direct Supabase upload...");
        const fileUrl = await uploadToSupabase(file);
        
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
      } catch (err) {
        console.error("Upload failed:", err);
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
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
    setDiagnosticInfo(null);
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
          
          {diagnosticInfo && (
            <div className="mt-4">
              <details className="text-xs">
                <summary className="text-sm font-medium cursor-pointer text-gray-600 flex items-center">
                  <RefreshCw className="w-3 h-3 mr-1" /> 
                  Upload Diagnostics
                </summary>
                <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto text-gray-600 max-h-40">
                  {diagnosticInfo}
                </pre>
              </details>
            </div>
          )}
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
