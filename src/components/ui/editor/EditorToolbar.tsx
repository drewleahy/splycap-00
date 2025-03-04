
import React, { RefObject } from "react";
import { Button } from "../button";
import {
  Bold,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Image as ImageIcon,
  File as FileIcon,
  Code as CodeIcon,
} from "lucide-react";
import { formatUtils } from "./utils/formatUtils";

interface EditorToolbarProps {
  editorRef: RefObject<HTMLDivElement>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  isUploading: boolean;
  imageInputRef: RefObject<HTMLInputElement>;
  fileInputRef: RefObject<HTMLInputElement>;
  toast: any;
}

export const EditorToolbar = ({ 
  editorRef, 
  setContent, 
  isUploading,
  imageInputRef,
  fileInputRef,
  toast
}: EditorToolbarProps) => {
  const { handleFormat, handleLink, handleCodeBlock } = formatUtils(editorRef, setContent, toast);

  return (
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
  );
};
