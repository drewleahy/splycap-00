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
  const [editingInvestment, setEditingInvestment] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [investmentFormData, setInvestmentFormData] = useState({
    title: "",
    description: "",
    icon: "",
  });

  const { data: contentSections, isLoading: isContentLoading, refetch: refetchContent } = useQuery({
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

  const { data: investments, isLoading: isInvestmentsLoading, refetch: refetchInvestments } = useQuery({
    queryKey: ["investment-items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("investment_focus_items")
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
    setEditingInvestment(null);
  };

  const handleEditInvestment = (investment: any) => {
    setEditingInvestment(investment.id);
    setInvestmentFormData({
      title: investment.title,
      description: investment.description,
      icon: investment.icon,
    });
    setEditingSection(null);
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
      refetchContent();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update content",
        variant: "destructive",
      });
    }
  };

  const handleSaveInvestment = async () => {
    try {
      const { error } = await supabase
        .from("investment_focus_items")
        .update({
          title: investmentFormData.title,
          description: investmentFormData.description,
          icon: investmentFormData.icon,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editingInvestment);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Investment focus item updated successfully",
      });

      setEditingInvestment(null);
      refetchInvestments();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update investment focus item",
        variant: "destructive",
      });
    }
  };

  if (isContentLoading || isInvestmentsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Content Management</h1>
      
      {/* Content Sections */}
      <div className="space-y-8 mb-12">
        <h2 className="text-2xl font-semibold mb-4">Content Sections</h2>
        {contentSections?.map((section) => (
          <div key={section.id} className="p-6 bg-white rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Section: {section.section_id}</h3>
                {editingSection !== section.id ? (
                  <>
                    <h4 className="font-medium">Title:</h4>
                    <p className="mb-2">{section.title}</p>
                    <h4 className="font-medium">Description:</h4>
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

      {/* Investment Focus Items */}
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold mb-4">Investment Focus Items</h2>
        {investments?.map((investment) => (
          <div key={investment.id} className="p-6 bg-white rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                {editingInvestment !== investment.id ? (
                  <>
                    <h3 className="text-lg font-medium mb-2">{investment.title}</h3>
                    <p className="mb-2">{investment.description}</p>
                    <p className="text-sm text-gray-600">Icon: {investment.icon}</p>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <Input
                        value={investmentFormData.title}
                        onChange={(e) => setInvestmentFormData({ ...investmentFormData, title: e.target.value })}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <Textarea
                        value={investmentFormData.description}
                        onChange={(e) => setInvestmentFormData({ ...investmentFormData, description: e.target.value })}
                        className="w-full"
                        rows={4}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Icon</label>
                      <Input
                        value={investmentFormData.icon}
                        onChange={(e) => setInvestmentFormData({ ...investmentFormData, icon: e.target.value })}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div>
                {editingInvestment !== investment.id ? (
                  <Button onClick={() => handleEditInvestment(investment)}>Edit</Button>
                ) : (
                  <div className="space-x-2">
                    <Button onClick={handleSaveInvestment}>Save</Button>
                    <Button variant="outline" onClick={() => setEditingInvestment(null)}>
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