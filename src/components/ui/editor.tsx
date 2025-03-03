
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
      // Create a pre element with a code element inside it
      const codeHtml = `<pre class="bg-gray-100 p-3 rounded-md overflow-x-auto my-2"><code class="language-${language}">${selectedText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
      
      // Insert the HTML
      document.execCommand('insertHTML', false, codeHtml);
      
      if (editorRef.current) {
        setContent(editorRef.current.innerHTML);
      }
    }
  };

  const handleFileUpload = async (file: File, type: 'image' | 'file') => {
    try {
      setIsUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      // We'll use different paths as we try different buckets
      let currentPath = `lovable-uploads/${fileName}`;
      let bucketName = 'public';

      // First try to upload to the 'public' bucket
      let uploadResult = await supabase.storage
        .from(bucketName)
        .upload(currentPath, file);
      
      // If the public bucket doesn't exist, try uploading to the content-uploads bucket
      if (uploadResult.error && uploadResult.error.message.includes('bucket not found')) {
        bucketName = 'content-uploads';
        uploadResult = await supabase.storage
          .from(bucketName)
          .upload(currentPath, file);
          
        // If that also fails, try 'lovable-uploads' bucket with simplified path
        if (uploadResult.error && uploadResult.error.message.includes('bucket not found')) {
          bucketName = 'lovable-uploads';
          currentPath = fileName; // Simplified path for default bucket
          uploadResult = await supabase.storage
            .from(bucketName)
            .upload(currentPath, file);
        }
      }
      
      if (uploadResult.error) throw uploadResult.error;

      // Get the correct public URL based on which bucket succeeded
      let publicUrl = '';
      
      if (uploadResult.data) {
        const successBucket = uploadResult.data.path.includes('/') 
          ? uploadResult.data.path.split('/')[0] 
          : bucketName;
          
        const { data } = supabase.storage
          .from(successBucket)
          .getPublicUrl(uploadResult.data.path);
          
        publicUrl = data.publicUrl;
      }

      // Fallback to using a local path if we still don't have a URL
      if (!publicUrl) {
        publicUrl = `/lovable-uploads/${fileName}`;
      }

      if (type === 'image') {
        handleFormat('insertImage', publicUrl);
      } else {
        const fileLink = `<a href="${publicUrl}" target="_blank" class="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
            <polyline points="13 2 13 9 20 9"></polyline>
          </svg>
          ${file.name}</a>`;
        handleFormat('insertHTML', fileLink);
      }

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
