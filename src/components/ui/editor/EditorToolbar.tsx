
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
import { useToast } from "@/hooks/use-toast";

interface EditorToolbarProps {
  onFormatCommand: (command: string, value?: string) => void;
  onLinkClick: () => void;
  onCodeBlockClick: () => void;
  onImageButtonClick: () => void;
  onFileButtonClick: () => void;
  isUploading: boolean;
}

export const EditorToolbar = ({
  onFormatCommand,
  onLinkClick,
  onCodeBlockClick,
  onImageButtonClick,
  onFileButtonClick,
  isUploading,
}: EditorToolbarProps) => {
  return (
    <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-gray-50">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onFormatCommand("bold")}
        type="button"
        className="hover:bg-gray-100"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onFormatCommand("italic")}
        type="button"
        className="hover:bg-gray-100"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onFormatCommand("insertUnorderedList")}
        type="button"
        className="hover:bg-gray-100"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onFormatCommand("insertOrderedList")}
        type="button"
        className="hover:bg-gray-100"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onLinkClick}
        type="button"
        className="hover:bg-gray-100"
      >
        <LinkIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onCodeBlockClick}
        type="button"
        className="hover:bg-gray-100"
      >
        <CodeIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onImageButtonClick}
        type="button"
        className="hover:bg-gray-100"
        disabled={isUploading}
      >
        <ImageIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onFileButtonClick}
        type="button"
        className="hover:bg-gray-100"
        disabled={isUploading}
      >
        <FileIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
