
import { useState, useRef, RefObject } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useFileUpload = (
  setContent: React.Dispatch<React.SetStateAction<string>>,
  editorRef: RefObject<HTMLDivElement>
) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Function to format text in the editor
  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  // New approach for file uploads using direct fetch with retry
  const uploadFile = async (file: File, type: 'image' | 'file', maxRetries = 3): Promise<string> => {
    let retries = 0;
    
    while (retries <= maxRetries) {
      try {
        // Sanitize the filename to ensure it only contains safe characters
        const sanitizedFileName = file.name.replace(/[^\x00-\x7F]/g, '');
        const fileExt = sanitizedFileName.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        // Instead of creating the bucket programmatically, we'll use the existing bucket
        const bucketName = 'lovable-uploads';
        
        // Generate a signed URL for upload
        const { data: signedUrlData, error: signedUrlError } = await supabase.storage
          .from(bucketName)
          .createSignedUploadUrl(fileName);
        
        if (signedUrlError) {
          console.error('Signed URL error:', signedUrlError);
          throw new Error(`Failed to generate upload URL: ${signedUrlError.message}`);
        }
        
        // Use the signed URL to upload the file directly
        const { signedUrl, path } = signedUrlData;
        
        // Upload the file using fetch directly
        const uploadResponse = await fetch(signedUrl, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type,
          },
        });
        
        if (!uploadResponse.ok) {
          throw new Error(`Upload failed with status: ${uploadResponse.status}`);
        }
        
        // Get the public URL
        const { data: publicUrlData } = supabase.storage
          .from(bucketName)
          .getPublicUrl(path);
        
        return publicUrlData.publicUrl;
      } catch (error) {
        console.error(`Upload attempt ${retries + 1} failed:`, error);
        retries++;
        
        if (retries <= maxRetries) {
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retries)));
          console.log(`Retrying upload, attempt ${retries + 1}...`);
        } else {
          throw error; // Rethrow the error if all retries failed
        }
      }
    }
    
    throw new Error('Upload failed after maximum retry attempts');
  };

  // Alternative method: use edge function for uploads if direct upload continues to fail
  const uploadViaEdgeFunction = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload-file', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Unknown upload error');
      }
      
      const data = await response.json();
      return data.publicUrl;
    } catch (error) {
      console.error('Edge function upload error:', error);
      throw error;
    }
  };

  const handleFileUpload = async (file: File, type: 'image' | 'file') => {
    try {
      setIsUploading(true);
      
      let publicUrl;
      try {
        // Try the direct upload first
        publicUrl = await uploadFile(file, type);
      } catch (directUploadError) {
        console.error('Direct upload failed, falling back to alternative method:', directUploadError);
        
        // Fallback to using a simple method - direct upload with fetch
        try {
          const sanitizedFileName = file.name.replace(/[^\x00-\x7F]/g, '');
          const fileExt = sanitizedFileName.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
          const bucketName = 'lovable-uploads';
          
          // Try a much simpler approach - direct upload without signed URLs
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
          
          publicUrl = urlData.publicUrl;
        } catch (simpleUploadError) {
          console.error('Simple upload failed too:', simpleUploadError);
          throw simpleUploadError;
        }
      }

      if (type === 'image') {
        handleFormat('insertImage', publicUrl);
      } else {
        // For non-image files, create a nice file link
        const sanitizedFileName = file.name.replace(/[^\x00-\x7F]/g, '');
        const fileLink = `<a href="${publicUrl}" target="_blank" class="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
            <polyline points="13 2 13 9 20 9"></polyline>
          </svg>
          ${sanitizedFileName}</a>`;
        handleFormat('insertHTML', fileLink);
      }

      toast({
        title: "Success",
        description: `${type === 'image' ? 'Image' : 'File'} uploaded successfully`,
      });
    } catch (error) {
      console.error('Upload error:', error);
      
      // More descriptive error message
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Unknown error occurred during upload';
        
      toast({
        title: "Error",
        description: `Failed to upload ${type}: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
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

  return {
    isUploading,
    fileInputRef,
    imageInputRef,
    handleImageSelect,
    handleFileSelect
  };
};
