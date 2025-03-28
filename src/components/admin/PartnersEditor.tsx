
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export const PartnersEditor = () => {
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    location: "",
    bio: "",
    linkedin: "",
  });
  const [isAddingPartner, setIsAddingPartner] = useState(false);

  const { data: partners, isLoading, refetch } = useQuery({
    queryKey: ["partners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .not('name', 'eq', 'Omar Marquez') // Exclude Omar Marquez from query results
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
      bio: partner.bio || "",
      linkedin: partner.linkedin || "",
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
          bio: formData.bio,
          linkedin: formData.linkedin,
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

  const handleAddPartner = async () => {
    try {
      // Don't allow adding a partner named Omar Marquez
      if (formData.name.toLowerCase() === 'omar marquez') {
        toast({
          title: "Error",
          description: "This partner name is not allowed",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from("partners")
        .insert({
          name: formData.name,
          role: formData.role,
          location: formData.location,
          bio: formData.bio,
          linkedin: formData.linkedin,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Partner added successfully",
      });

      setIsAddingPartner(false);
      setFormData({
        name: "",
        role: "",
        location: "",
        bio: "",
        linkedin: "",
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add partner",
        variant: "destructive",
      });
    }
  };

  const handleDeletePartner = async (id: string) => {
    try {
      const { error } = await supabase
        .from("partners")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Partner deleted successfully",
      });

      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete partner",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <Loader2 className="w-8 h-8 animate-spin" />;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Partners</h2>
        <Dialog open={isAddingPartner} onOpenChange={setIsAddingPartner}>
          <DialogTrigger asChild>
            <Button>Add Partner</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Partner</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
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
              <div>
                <label className="block text-sm font-medium mb-1">LinkedIn</label>
                <Input
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <Textarea
                  rows={5}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddingPartner(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddPartner}>Save</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
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
                <div>
                  <label className="block text-sm font-medium mb-1">LinkedIn</label>
                  <Input
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <Textarea
                    rows={5}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
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
                <div className="flex space-x-2">
                  <Button onClick={() => handleEdit(partner)}>Edit</Button>
                  <Button 
                    variant="destructive" 
                    size="icon"
                    onClick={() => handleDeletePartner(partner.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
