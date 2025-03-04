
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

  // Primary upload method using the Edge Function
  const uploadViaEdgeFunction = async (file: File): Promise<string> => {
    console.log("Uploading via Edge Function");
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Use the edge function directly
      const response = await fetch('/api/upload-file', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Unknown upload error');
      }
      
      const data = await response.json();
      console.log("Edge function upload successful:", data.publicUrl);
      return data.publicUrl;
    } catch (error) {
      console.error('Edge function upload error:', error);
      throw error;
    }
  };

  // Fallback method using direct Supabase storage upload
  const uploadViaSupabaseStorage = async (file: File): Promise<string> => {
    console.log("Uploading via Supabase Storage");
    const sanitizedFileName = file.name.replace(/[^\x00-\x7F]/g, '');
    const fileExt = sanitizedFileName.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const bucketName = 'lovable-uploads';
    
    // Try a simple approach - direct upload without signed URLs
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
    
    console.log("Supabase storage upload successful:", urlData.publicUrl);
    return urlData.publicUrl;
  };

  // Last resort: use the public edge function
  const uploadViaPublicEdgeFunction = async (file: File): Promise<string> => {
    console.log("Uploading via Public Edge Function");
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Use the full edge function URL directly without authentication
      const url = "https://hjjtsbkxxvygpurfhlub.supabase.co/functions/v1/upload-file";
      
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response not OK:", response.status, errorText);
        throw new Error(`Upload failed with status ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      console.log("Public edge function upload successful:", data.publicUrl);
      return data.publicUrl;
    } catch (error) {
      console.error('Public edge function upload error:', error);
      throw error;
    }
  };

  const handleFileUpload = async (file: File, type: 'image' | 'file') => {
    try {
      setIsUploading(true);
      console.log(`Starting ${type} upload:`, file.name);
      
      let publicUrl;
      let uploadMethods = [
        { name: "Edge Function", fn: uploadViaEdgeFunction },
        { name: "Supabase Storage", fn: uploadViaSupabaseStorage },
        { name: "Public Edge Function", fn: uploadViaPublicEdgeFunction }
      ];
      
      let lastError;
      
      // Try each upload method in sequence until one works
      for (const method of uploadMethods) {
        try {
          console.log(`Trying upload method: ${method.name}`);
          publicUrl = await method.fn(file);
          console.log(`Upload succeeded with ${method.name}`);
          break; // Exit the loop if upload is successful
        } catch (error) {
          console.error(`Upload failed with ${method.name}:`, error);
          lastError = error;
          // Continue to the next method
        }
      }
      
      if (!publicUrl) {
        throw new Error(`All upload methods failed. Last error: ${lastError?.message || 'Unknown error'}`);
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
      console.error('Final upload error:', error);
      
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
