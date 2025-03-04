
import { useState, useRef, useEffect } from "react";
import { EditorToolbar } from "./EditorToolbar";
import { useFileUpload } from "./hooks/useFileUpload";
import { Button } from "../button";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EditorProps {
  initialContent: string;
  onSave: (content: string) => void;
}

export const Editor = ({ initialContent, onSave }: EditorProps) => {
  const { toast } = useToast();
  const [content, setContent] = useState(initialContent);
  const editorRef = useRef<HTMLDivElement>(null);
  const { 
    isUploading, 
    fileInputRef, 
    imageInputRef, 
    handleImageSelect, 
    handleFileSelect 
  } = useFileUpload(setContent, editorRef);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialContent;
    }
  }, [initialContent]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML;
    setContent(newContent);
  };

  return (
    <div className="space-y-4">
      <EditorToolbar 
        editorRef={editorRef}
        setContent={setContent}
        isUploading={isUploading}
        imageInputRef={imageInputRef}
        fileInputRef={fileInputRef}
        toast={toast}
      />
      
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
