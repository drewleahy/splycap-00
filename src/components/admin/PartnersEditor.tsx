import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export const PartnersEditor = () => {
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    location: "",
  });

  const { data: partners, isLoading, refetch } = useQuery({
    queryKey: ["partners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .order("created_at");
      
      if (error) throw error;
      return data;
    },
  });

  const handleEdit = (partner: any) => {
    setEditingId(partner.id);
    setFormData({
      name: partner.name,
      role: partner.role,
      location: partner.location,
    });
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from("partners")
        .update({
          name: formData.name,
          role: formData.role,
          location: formData.location,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editingId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Partner updated successfully",
      });

      setEditingId(null);
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update partner",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <Loader2 className="w-8 h-8 animate-spin" />;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Partners</h2>
      <div className="space-y-6">
        {partners?.map((partner) => (
          <div key={partner.id} className="border-b pb-4">
            {editingId === partner.id ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <Input
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                <h3 className="font-medium">{partner.name}</h3>
                <p className="text-gray-600">{partner.role}</p>
                <p className="text-gray-600 mb-2">{partner.location}</p>
                <Button onClick={() => handleEdit(partner)}>Edit</Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};