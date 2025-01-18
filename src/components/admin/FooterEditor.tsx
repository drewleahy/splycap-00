import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export const FooterEditor = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
  });

  const { data: content, isLoading, refetch } = useQuery({
    queryKey: ["footer-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content_sections")
        .select("*")
        .eq("section_id", "footer")
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const handleEdit = () => {
    setFormData({
      description: content?.description || "",
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from("content_sections")
        .update({
          description: formData.description,
          updated_at: new Date().toISOString(),
        })
        .eq("section_id", "footer");

      if (error) throw error;

      toast({
        title: "Success",
        description: "Footer content updated successfully",
      });

      setIsEditing(false);
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update footer content",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <Loader2 className="w-8 h-8 animate-spin" />;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Footer Content</h2>
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
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
          <p className="mb-4 whitespace-pre-wrap">{content?.description}</p>
          <Button onClick={handleEdit}>Edit</Button>
        </div>
      )}
    </div>
  );
};