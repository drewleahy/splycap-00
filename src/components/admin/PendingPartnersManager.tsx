
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "./partners/LoadingSpinner";
import { PendingPartnersTable } from "./partners/PendingPartnersTable";
import { usePendingPartners } from "@/hooks/use-pending-partners";

export const PendingPartnersManager = () => {
  const { toast } = useToast();
  const { data: pendingPartners, isLoading, refetch } = usePendingPartners();

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
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Pending Partner Applications</h2>
      {!pendingPartners?.length ? (
        <p className="text-gray-500">No pending applications</p>
      ) : (
        <PendingPartnersTable 
          partners={pendingPartners} 
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
};
