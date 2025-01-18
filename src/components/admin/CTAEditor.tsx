import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export const CTAEditor = () => {
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    button_text: "",
  });

  const { data: ctaSections, isLoading, refetch } = useQuery({
    queryKey: ["cta-sections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cta_sections")
        .select("*")
        .order("created_at");
      
      if (error) throw error;
      return data;
    },
  });

  const handleEdit = (section: any) => {
    setEditingId(section.id);
    setFormData({
      title: section.title,
      description: section.description,
      button_text: section.button_text,
    });
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from("cta_sections")
        .update({
          title: formData.title,
          description: formData.description,
          button_text: formData.button_text,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editingId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "CTA section updated successfully",
      });

      setEditingId(null);
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update CTA section",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <Loader2 className="w-8 h-8 animate-spin" />;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Call-to-Action Sections</h2>
      <div className="space-y-6">
        {ctaSections?.map((section) => (
          <div key={section.id} className="border-b pb-4">
            {editingId === section.id ? (
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
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Button Text</label>
                  <Input
                    value={formData.button_text}
                    onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSave}>Save</Button>
                  <Button variant="outline" onClick={() => setEditingId(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-medium">{section.title}</h3>
                <p className="text-gray-600 mb-2">{section.description}</p>
                <p className="text-gray-600 mb-2">Button: {section.button_text}</p>
                <Button onClick={() => handleEdit(section)}>Edit</Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};