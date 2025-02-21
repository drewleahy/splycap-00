
import { useState } from "react";
import { Button } from "./button";
import {
  Bold,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Save,
} from "lucide-react";

interface EditorProps {
  initialContent: string;
  onSave: (content: string) => void;
}

export const Editor = ({ initialContent, onSave }: EditorProps) => {
  const [content, setContent] = useState(initialContent);

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  const handleLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      handleFormat("createLink", url);
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
      </div>
      
      <div
        className="min-h-[200px] p-4 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        contentEditable
        dangerouslySetInnerHTML={{ __html: content }}
        onInput={(e) => setContent(e.currentTarget.innerHTML)}
      />
      
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
