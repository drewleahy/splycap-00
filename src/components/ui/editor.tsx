
import { useState, useRef } from "react";
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

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const handleLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      handleFormat("createLink", url);
    }
  };

  const handleFileUpload = async (file: File, type: 'image' | 'file') => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `content-uploads/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('public')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('public')
        .getPublicUrl(filePath);

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
      toast({
        title: "Error",
        description: `Failed to upload ${type}`,
        variant: "destructive",
      });
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
          onClick={() => imageInputRef.current?.click()}
          type="button"
          className="hover:bg-gray-100"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          type="button"
          className="hover:bg-gray-100"
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
        onInput={(e) => setContent(e.currentTarget.innerHTML)}
        className="min-h-[200px] p-4 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {initialContent}
      </div>
      
      <Button 
        className="w-full bg-blue-600 hover:bg-blue-700"
        onClick={() => onSave(content)}
      >
        <Save className="w-4 h-4 mr-2" />
        Save Changes
      </Button>
    </div>
  );
};
