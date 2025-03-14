
import { useState, useRef, useEffect } from "react";
import { EditorToolbar } from "./EditorToolbar";
import { useFileUpload } from "./hooks/useFileUpload";
import { Button } from "../button";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EditorProps {
  initialContent: string;
  onSave: (content: string) => void;
  captureRef?: (ref: React.RefObject<HTMLDivElement>) => React.RefObject<HTMLDivElement>;
  content?: string;
  setContent?: React.Dispatch<React.SetStateAction<string>>;
}

export const Editor = ({ 
  initialContent, 
  onSave, 
  captureRef,
  content: externalContent,
  setContent: externalSetContent 
}: EditorProps) => {
  const { toast } = useToast();
  const [internalContent, setInternalContent] = useState(initialContent || "");
  const editorRef = useRef<HTMLDivElement>(null);
  
  // Use external or internal state based on props
  const content = externalContent !== undefined ? externalContent : internalContent;
  const setContent = externalSetContent || setInternalContent;
  
  // Share the ref with parent if requested
  useEffect(() => {
    if (captureRef) {
      captureRef(editorRef);
    }
  }, [captureRef]);
  
  const { 
    isUploading, 
    fileInputRef, 
    imageInputRef, 
    handleImageSelect, 
    handleFileSelect 
  } = useFileUpload(setContent, editorRef);

  // Initialize editor with content
  useEffect(() => {
    if (editorRef.current && initialContent) {
      console.log("Setting initial content:", initialContent.substring(0, 100) + "...");
      // Only update if the content is different to avoid cursor jumps
      if (editorRef.current.innerHTML !== initialContent) {
        editorRef.current.innerHTML = initialContent || '';
      }
    }
  }, [initialContent]);

  // Update when external content changes
  useEffect(() => {
    if (externalContent !== undefined && editorRef.current) {
      console.log("External content updated:", externalContent?.substring(0, 100) + "...");
      if (editorRef.current.innerHTML !== externalContent) {
        editorRef.current.innerHTML = externalContent || '';
      }
    }
  }, [externalContent]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML;
    console.log("Content changed via input:", newContent.substring(0, 100) + "...");
    setContent(newContent);
  };

  const handleSaveClick = () => {
    console.log("Saving content:", content.substring(0, 100) + "...");
    onSave(content);
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
        dangerouslySetInnerHTML={{ __html: initialContent }}
      />
      
      <Button 
        className="w-full bg-blue-600 hover:bg-blue-700"
        onClick={handleSaveClick}
        disabled={isUploading}
      >
        <Save className="w-4 h-4 mr-2" />
        {isUploading ? "Uploading..." : "Save Changes"}
      </Button>
    </div>
  );
};
