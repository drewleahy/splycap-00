
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

  // Initialize editor with content - only once on mount
  useEffect(() => {
    if (editorRef.current) {
      console.log("Setting initial content on mount:", initialContent?.substring(0, 100));
      editorRef.current.innerHTML = initialContent || '';
      
      // Force a content update to ensure state is synchronized
      setContent(initialContent || '');
    }
  }, []); // Empty dependency array - only run once

  // Update when external content changes
  useEffect(() => {
    if (externalContent !== undefined && editorRef.current) {
      console.log("External content updated:", externalContent?.substring(0, 100) + "...");
      if (editorRef.current.innerHTML !== externalContent) {
        editorRef.current.innerHTML = externalContent || '';
      }
    }
  }, [externalContent]);

  // Handle input changes from typing in the editor
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML;
    console.log("Editor content changed:", newContent.substring(0, 100) + "...");
    setContent(newContent);
  };

  const handleSaveClick = () => {
    // Get the most up-to-date content directly from the editorRef
    const currentContent = editorRef.current?.innerHTML || content;
    console.log("Saving content:", currentContent.substring(0, 100) + "...");
    onSave(currentContent);
    
    toast({
      title: "Content saved",
      description: "Your changes have been saved successfully.",
    });
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
        data-placeholder="Start typing here..."
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
