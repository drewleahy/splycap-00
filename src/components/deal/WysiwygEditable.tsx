
import React, { useState, useRef } from "react";
import { Editor } from "@/components/ui/editor";
import { fetchLPContent, saveLPContent } from "@/utils/contentUtils";
import { Button } from "@/components/ui/button";
import { Edit2, X, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WysiwygEditableProps {
  sectionId: string;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

export const WysiwygEditable = ({
  sectionId,
  children,
  as = "div",
  className = "",
}: WysiwygEditableProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [initialContent, setInitialContent] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const fetchContent = async () => {
    setLoading(true);
    const data = await fetchLPContent(sectionId);
    setContent(data || "");
    setInitialContent(data || "");
    setLoading(false);
  };

  // Open editor
  const handleEdit = async () => {
    if (initialContent === null) {
      await fetchContent();
    }
    setIsEditing(true);
  };

  // Save handler
  const handleSave = async () => {
    setLoading(true);
    try {
      await saveLPContent(sectionId, content);
      setInitialContent(content);
      setIsEditing(false);
      toast({
        title: "Saved!",
        description: "Section updated successfully.",
      });
    } catch (e: any) {
      toast({
        title: "Save failed",
        description: e.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Cancel handler
  const handleCancel = () => {
    setContent(initialContent || "");
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="relative rounded-lg shadow-lg border bg-white p-4 mb-4">
        <Editor
          initialContent={initialContent || ""}
          onSave={(val) => { setContent(val); handleSave(); }}
          content={content}
          setContent={setContent}
        />
        <div className="mt-2 flex gap-2">
          <Button onClick={handleSave} disabled={loading || !content} size="sm">
            <Save className="w-4 h-4 mr-1" /> Save
          </Button>
          <Button onClick={handleCancel} variant="ghost" size="sm">
            <X className="w-4 h-4 mr-1" /> Cancel
          </Button>
        </div>
      </div>
    );
  }

  // Use specified HTML element for non-editing display
  const Element = as as any;

  return (
    <Element className={`${className} group`}>
      <div className="relative">
        {/* Edit button top-right */}
        <button
          type="button"
          onClick={handleEdit}
          className="absolute right-1 top-0 z-20 opacity-70 group-hover:opacity-100 bg-white border rounded-full p-1.5 shadow hover:bg-gray-100 transition"
          title="Edit section"
        >
          <Edit2 className="w-4 h-4 text-gray-700" />
        </button>
        <span>
          {initialContent !== null ? (
            <div
              className="wysiwyg-content"
              dangerouslySetInnerHTML={{ __html: initialContent }}
            />
          ) : (
            children
          )}
        </span>
      </div>
    </Element>
  );
};
