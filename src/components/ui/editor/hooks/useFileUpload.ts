
import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { uploadFile } from "@/api/uploadFile";
import { insertContentIntoEditor } from "@/utils/contentUtils";

export const useFileUpload = (
  setContent: React.Dispatch<React.SetStateAction<string>>,
  editorRef: React.RefObject<HTMLDivElement>
) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Create a function to handle direct storage uploads if needed
  const uploadToStorage = async (file: File): Promise<string> => {
    console.log("Uploading file to Supabase storage:", file.name);
    
    // Generate a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const bucketName = 'lovable-uploads';
    
    // Upload file to Storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });
    
    if (error) throw error;
    
    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data?.path || fileName);
    
    return publicUrl;
  };

  const insertImage = (url: string, alt: string = "Uploaded image") => {
    console.log("Inserting image:", url);
    
    const imageHtml = `<img src="${url}" alt="${alt}" style="max-width: 100%; height: auto; margin: 10px 0;" />`;
    
    // Insert at cursor position
    const success = insertContentIntoEditor(editorRef, imageHtml);
    
    if (success && editorRef.current) {
      setContent(editorRef.current.innerHTML);
      console.log("Image inserted successfully", editorRef.current.innerHTML.substring(0, 100) + "...");
    }
  };

  const insertFile = (url: string, fileName: string) => {
    console.log("Inserting file link:", url);
    
    const fileHtml = `<a href="${url}" target="_blank" class="inline-flex items-center px-4 py-2 my-2 bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 text-gray-800 text-sm">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      ${fileName}
    </a>`;
    
    // Insert at cursor position
    const success = insertContentIntoEditor(editorRef, fileHtml);
    
    if (success && editorRef.current) {
      setContent(editorRef.current.innerHTML);
      console.log("File link inserted successfully", editorRef.current.innerHTML.substring(0, 100) + "...");
    }
  };

  // Handle image upload
  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setIsUploading(true);
      console.log("Selected image for upload:", file.name);
      
      // Try uploadFile function first
      try {
        const fileUrl = await uploadFile(file);
        insertImage(fileUrl, file.name);
      } catch (uploadError) {
        console.error("Error with uploadFile, trying direct storage upload:", uploadError);
        // Fallback to direct storage upload
        const fileUrl = await uploadToStorage(file);
        insertImage(fileUrl, file.name);
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setIsUploading(false);
      if (imageInputRef.current) {
        imageInputRef.current.value = '';
      }
    }
  };

  // Handle file upload
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setIsUploading(true);
      console.log("Selected file for upload:", file.name);
      
      // Try uploadFile function first
      try {
        const fileUrl = await uploadFile(file);
        insertFile(fileUrl, file.name);
      } catch (uploadError) {
        console.error("Error with uploadFile, trying direct storage upload:", uploadError);
        // Fallback to direct storage upload
        const fileUrl = await uploadToStorage(file);
        insertFile(fileUrl, file.name);
      }
    } catch (error) {
      console.error("File upload failed:", error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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
