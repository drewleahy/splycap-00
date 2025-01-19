import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, X, Check, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { FormDescription } from "@/components/ui/form";

export const PastInvestmentsEditor = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newInvestment, setNewInvestment] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    logo_url: "",
    website_url: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    logo_url: "",
    website_url: "",
  });

  const validateUrls = () => {
    const newErrors = {
      name: "",
      logo_url: "",
      website_url: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Company name is required";
    }

    const urlPattern = /^https?:\/\/.+/i;
    
    if (!formData.logo_url.trim()) {
      newErrors.logo_url = "Logo URL is required";
    } else if (!urlPattern.test(formData.logo_url)) {
      newErrors.logo_url = "Logo URL must start with http:// or https://";
    }

    if (formData.website_url.trim() && !urlPattern.test(formData.website_url)) {
      newErrors.website_url = "Website URL must start with http:// or https://";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const { data: investments, isLoading } = useQuery({
    queryKey: ["past-investments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("past_investments")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data;
    },
  });

  const handleEdit = (investment: any) => {
    setEditingId(investment.id);
    setFormData({
      name: investment.name,
      logo_url: investment.logo_url,
      website_url: investment.website_url || "",
    });
    setErrors({ name: "", logo_url: "", website_url: "" });
  };

  const handleAdd = async () => {
    if (!validateUrls()) {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.from("past_investments").insert([formData]);
      
      if (error) throw error;
      
      await queryClient.invalidateQueries({ queryKey: ["past-investments"] });
      setNewInvestment(false);
      setFormData({ name: "", logo_url: "", website_url: "" });
      setErrors({ name: "", logo_url: "", website_url: "" });
      
      toast({
        title: "Success",
        description: "Investment added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add investment. Please check your input and try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdate = async (id: string) => {
    if (!validateUrls()) {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("past_investments")
        .update(formData)
        .eq("id", id);
      
      if (error) throw error;
      
      await queryClient.invalidateQueries({ queryKey: ["past-investments"] });
      setEditingId(null);
      setErrors({ name: "", logo_url: "", website_url: "" });
      
      toast({
        title: "Success",
        description: "Investment updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update investment. Please check your input and try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("past_investments")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      
      await queryClient.invalidateQueries({ queryKey: ["past-investments"] });
      
      toast({
        title: "Success",
        description: "Investment deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete investment",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Past Investments</h2>
        <Button
          onClick={() => {
            setNewInvestment(true);
            setFormData({ name: "", logo_url: "", website_url: "" });
            setErrors({ name: "", logo_url: "", website_url: "" });
          }}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Investment
        </Button>
      </div>

      <div className="space-y-4">
        {newInvestment && (
          <div className="border p-4 rounded-lg space-y-4">
            <div>
              <Input
                placeholder="Company Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              )}
            </div>
            
            <div>
              <Input
                placeholder="Logo URL"
                value={formData.logo_url}
                onChange={(e) =>
                  setFormData({ ...formData, logo_url: e.target.value })
                }
              />
              <FormDescription>
                Enter a valid image URL starting with http:// or https://
              </FormDescription>
              {errors.logo_url && (
                <p className="text-sm text-red-500 mt-1">{errors.logo_url}</p>
              )}
            </div>
            
            <div>
              <Input
                placeholder="Website URL (optional)"
                value={formData.website_url}
                onChange={(e) =>
                  setFormData({ ...formData, website_url: e.target.value })
                }
              />
              <FormDescription>
                If provided, must start with http:// or https://
              </FormDescription>
              {errors.website_url && (
                <p className="text-sm text-red-500 mt-1">{errors.website_url}</p>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleAdd} className="flex items-center gap-2">
                <Check className="w-4 h-4" /> Save
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setNewInvestment(false);
                  setErrors({ name: "", logo_url: "", website_url: "" });
                }}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" /> Cancel
              </Button>
            </div>
          </div>
        )}

        {investments?.map((investment) => (
          <div
            key={investment.id}
            className="border p-4 rounded-lg space-y-4"
          >
            {editingId === investment.id ? (
              <>
                <div>
                  <Input
                    placeholder="Company Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <Input
                    placeholder="Logo URL"
                    value={formData.logo_url}
                    onChange={(e) =>
                      setFormData({ ...formData, logo_url: e.target.value })
                    }
                  />
                  <FormDescription>
                    Enter a valid image URL starting with http:// or https://
                  </FormDescription>
                  {errors.logo_url && (
                    <p className="text-sm text-red-500 mt-1">{errors.logo_url}</p>
                  )}
                </div>
                
                <div>
                  <Input
                    placeholder="Website URL (optional)"
                    value={formData.website_url}
                    onChange={(e) =>
                      setFormData({ ...formData, website_url: e.target.value })
                    }
                  />
                  <FormDescription>
                    If provided, must start with http:// or https://
                  </FormDescription>
                  {errors.website_url && (
                    <p className="text-sm text-red-500 mt-1">{errors.website_url}</p>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleUpdate(investment.id)}
                    className="flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" /> Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditingId(null);
                      setErrors({ name: "", logo_url: "", website_url: "" });
                    }}
                    className="flex items-center gap-2"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={investment.logo_url}
                    alt={investment.name}
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <h3 className="font-medium">{investment.name}</h3>
                    {investment.website_url && (
                      <a
                        href={investment.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:underline flex items-center gap-1"
                      >
                        Visit website <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(investment)}
                    className="flex items-center gap-2"
                  >
                    <Pencil className="w-4 h-4" /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(investment.id)}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};
