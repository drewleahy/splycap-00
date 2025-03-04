
import { useState, useRef, useEffect } from "react";
import { Button } from "./button";
import {
  Bold,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Save,
  Image as ImageIcon,
  File as FileIcon,
  Code as CodeIcon,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EditorProps {
  initialContent: string;
  onSave: (content: string) => void;
}

export const Editor = ({ initialContent, onSave }: EditorProps) => {
  const { toast } = useToast();
  const [content, setContent] = useState(initialContent);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialContent;
    }
  }, [initialContent]);

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const handleLink = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      toast({
        title: "Error",
        description: "Please select some text first",
        variant: "destructive",
      });
      return;
    }

    const url = prompt("Enter URL:");
    if (url) {
      editorRef.current?.focus();
      handleFormat("createLink", url);
    }
  };

  const handleCodeBlock = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      toast({
        title: "Error",
        description: "Please select some text first",
        variant: "destructive",
      });
      return;
    }

    const selectedText = selection.toString();
    const language = prompt("Enter code language (e.g., javascript, typescript, sql, html, css):", "javascript");
    
    if (language) {
      const codeHtml = `<pre class="bg-gray-100 p-3 rounded-md overflow-x-auto my-2"><code class="language-${language}">${selectedText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
      
      document.execCommand('insertHTML', false, codeHtml);
      
      if (editorRef.current) {
        setContent(editorRef.current.innerHTML);
      }
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

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML;
    setContent(newContent);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-gray-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleFormat("bold")}
          type="button"
          className="hover:bg-gray-100"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleFormat("italic")}
          type="button"
          className="hover:bg-gray-100"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleFormat("insertUnorderedList")}
          type="button"
          className="hover:bg-gray-100"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleFormat("insertOrderedList")}
          type="button"
          className="hover:bg-gray-100"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleLink}
          type="button"
          className="hover:bg-gray-100"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleCodeBlock}
          type="button"
          className="hover:bg-gray-100"
        >
          <CodeIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => imageInputRef.current?.click()}
          type="button"
          className="hover:bg-gray-100"
          disabled={isUploading}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          type="button"
          className="hover:bg-gray-100"
          disabled={isUploading}
        >
          <FileIcon className="h-4 w-4" />
        </Button>
      </div>
      
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
      
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        className="min-h-[200px] p-4 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      />
      
      <Button 
        className="w-full bg-blue-600 hover:bg-blue-700"
        onClick={() => onSave(content)}
        disabled={isUploading}
      >
        <Save className="w-4 h-4 mr-2" />
        {isUploading ? "Uploading..." : "Save Changes"}
      </Button>
    </div>
  );
};
