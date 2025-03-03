
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import React, { useRef } from "react";

interface FileUploaderProps {
  onFileUploadSuccess: (url: string, type: 'image' | 'file', fileName: string) => void;
  onUploadStateChange: (isUploading: boolean) => void;
}

export const FileUploader = ({ 
  onFileUploadSuccess, 
  onUploadStateChange 
}: FileUploaderProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File, type: 'image' | 'file') => {
    try {
      onUploadStateChange(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      console.log(`Starting upload for ${type}:`, {
        fileName,
        fileType: file.type,
        fileSize: file.size,
        bucket: 'lovable-uploads'
      });
      
      const bucketName = 'lovable-uploads';
      const currentPath = fileName; // Simplified path
      
      const uploadResult = await supabase.storage
        .from(bucketName)
        .upload(currentPath, file);
      
      if (uploadResult.error) {
        console.error('Upload error:', uploadResult.error);
        throw uploadResult.error;
      }
      
      console.log('Upload successful:', uploadResult.data);
      
      const { data } = supabase.storage
        .from(bucketName)
        .getPublicUrl(uploadResult.data.path);
      
      const publicUrl = data.publicUrl;
      console.log('Public URL:', publicUrl);
      
      onFileUploadSuccess(publicUrl, type, file.name);

      toast({
        title: "Success",
        description: `${type === 'image' ? 'Image' : 'File'} uploaded successfully`,
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: `Failed to upload ${type}. Please check your permissions or try again later.`,
        variant: "destructive",
      });
    } finally {
      onUploadStateChange(false);
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

  const triggerImageUpload = () => {
    imageInputRef.current?.click();
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        ref={imageInputRef}
        onChange={handleImageSelect}
        accept="image/*"
        className="hidden"
      />
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
      />
    </>
  );
};
