import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const Admin = () => {
  const { toast } = useToast();
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<{ title?: string; description?: string }>({});

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
    setEditing(section.id);
    setFormData({
      title: section.title,
      description: section.description,
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
        .eq("id", editing);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Content updated successfully",
      });

      setEditing(null);
      setFormData({});
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
          <div key={section.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">Section ID: {section.section_id}</p>
                {editing === section.id ? (
                  <div className="space-y-4">
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Title"
                      className="mb-2"
                    />
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Description"
                      rows={4}
                    />
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                    <p className="text-gray-600">{section.description}</p>
                  </>
                )}
              </div>
              <div>
                {editing === section.id ? (
                  <div className="space-x-2">
                    <Button onClick={handleSave}>Save</Button>
                    <Button variant="outline" onClick={() => setEditing(null)}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => handleEdit(section)}>Edit</Button>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Last updated: {new Date(section.updated_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;