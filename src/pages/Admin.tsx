import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const { toast } = useToast();
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", description: "" });

  const { data: contentSections, isLoading, refetch } = useQuery({
    queryKey: ["content-sections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content_sections")
        .select("*")
        .order("created_at");
      
      if (error) throw error;
      return data;
    },
  });

  const handleEdit = (section: any) => {
    setEditingSection(section.id);
    setFormData({
      title: section.title || "",
      description: section.description || "",
    });
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from("content_sections")
        .update({
          title: formData.title,
          description: formData.description,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editingSection);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Content updated successfully",
      });

      setEditingSection(null);
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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Content Management</h1>
      <div className="space-y-8">
        {contentSections?.map((section) => (
          <div key={section.id} className="p-6 bg-white rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Section: {section.section_id}</h2>
                {editingSection !== section.id ? (
                  <>
                    <h3 className="font-medium">Title:</h3>
                    <p className="mb-2">{section.title}</p>
                    <h3 className="font-medium">Description:</h3>
                    <p className="whitespace-pre-wrap">{section.description}</p>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full"
                        rows={4}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div>
                {editingSection !== section.id ? (
                  <Button onClick={() => handleEdit(section)}>Edit</Button>
                ) : (
                  <div className="space-x-2">
                    <Button onClick={handleSave}>Save</Button>
                    <Button variant="outline" onClick={() => setEditingSection(null)}>
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;