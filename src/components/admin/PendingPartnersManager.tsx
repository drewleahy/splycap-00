
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Check, X } from "lucide-react";

interface PendingPartner {
  id: string;
  first_name: string | null;
  last_name: string | null;
  created_at: string;
  email: string;
}

export const PendingPartnersManager = () => {
  const { toast } = useToast();
  
  const { data: pendingPartners, isLoading, refetch } = useQuery({
    queryKey: ["pending-partners"],
    queryFn: async () => {
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select(`
          id,
          first_name,
          last_name,
          created_at,
          auth_user:auth.users!auth_fkey(email)
        `)
        .eq("status", "pending");
      
      if (error) throw error;

      // Transform the data to include email from the joined auth.users table
      return profiles.map(profile => ({
        ...profile,
        email: profile.auth_user?.email || "No email available"
      })) as PendingPartner[];
    },
  });

  const handleUpdateStatus = async (userId: string, newStatus: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq("id", userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Partner ${newStatus} successfully`,
      });

      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update partner status",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <Loader2 className="w-8 h-8 animate-spin" />;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Pending Partner Applications</h2>
      {pendingPartners?.length === 0 ? (
        <p className="text-gray-500">No pending applications</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingPartners?.map((partner) => (
              <TableRow key={partner.id}>
                <TableCell>
                  {partner.first_name} {partner.last_name}
                </TableCell>
                <TableCell>{partner.email}</TableCell>
                <TableCell>
                  {new Date(partner.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="space-x-2">
                  <Button
                    size="sm"
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() => handleUpdateStatus(partner.id, 'approved')}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleUpdateStatus(partner.id, 'rejected')}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
