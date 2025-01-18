import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export const WealthPerspectiveEditor = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const { data: content, isLoading, refetch } = useQuery({
    queryKey: ["wealth-perspective"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content_sections")
        .select("*")
        .eq("section_id", "wealth-perspective")
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
  });

  const handleEdit = () => {
    setFormData({
      title: content?.title || "",
      description: content?.description || "",
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from("content_sections")
        .upsert({
          section_id: "wealth-perspective",
          title: formData.title,
          description: formData.description,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Content updated successfully",
      });

      setIsEditing(false);
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update content",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <Loader2 className="w-8 h-8 animate-spin" />;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Wealth Generation Perspective</h2>
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={6}
            />
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleSave}>Save</Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="font-medium mb-2">Current Content:</h3>
          <p className="mb-4">{content?.title || "No title set"}</p>
          <p className="mb-4 whitespace-pre-wrap">{content?.description || "No description set"}</p>
          <Button onClick={handleEdit}>Edit</Button>
        </div>
      )}
    </div>
  );
};