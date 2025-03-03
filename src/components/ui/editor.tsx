
import { useState, useRef } from "react";
import { Button } from "./button";
import { Save } from "lucide-react";
import { EditorToolbar } from "./editor/EditorToolbar";
import { FileUploader } from "./editor/FileUploader";
import { EditorArea } from "./editor/EditorArea";
import { useEditorUtils } from "./editor/EditorUtils";

interface EditorProps {
  initialContent: string;
  onSave: (content: string) => void;
}

export const Editor = ({ initialContent, onSave }: EditorProps) => {
  const [content, setContent] = useState(initialContent);
  const [isUploading, setIsUploading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileUploaderRef = useRef<HTMLDivElement>(null);
  const { handleFormat, handleLink, handleCodeBlock } = useEditorUtils();

  const handleFormatCommand = (command: string, value?: string) => {
    handleFormat(command, value);
    // Update content state after formatting
    const editorElement = document.querySelector('[contenteditable="true"]');
    if (editorElement) {
      setContent(editorElement.innerHTML);
    }
  };

  const handleFileUploadSuccess = (url: string, type: 'image' | 'file', fileName: string) => {
    if (type === 'image') {
      handleFormatCommand('insertImage', url);
    } else {
      const fileLink = `<a href="${url}" target="_blank" class="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
          <polyline points="13 2 13 9 20 9"></polyline>
        </svg>
        ${fileName}</a>`;
      handleFormatCommand('insertHTML', fileLink);
    }
  };

  return (
    <div className="space-y-4">
      <EditorToolbar
        onFormatCommand={handleFormatCommand}
        onLinkClick={handleLink}
        onCodeBlockClick={handleCodeBlock}
        onImageButtonClick={() => imageInputRef.current?.click()}
        onFileButtonClick={() => fileInputRef.current?.click()}
        isUploading={isUploading}
      />
      
      <FileUploader
        onFileUploadSuccess={handleFileUploadSuccess}
        onUploadStateChange={setIsUploading}
      />
      
      <EditorArea
        initialContent={initialContent}
        onContentChange={setContent}
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
