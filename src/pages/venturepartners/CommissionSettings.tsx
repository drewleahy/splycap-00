
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommissionForm } from "@/components/commission-settings/CommissionForm";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function CommissionSettings() {
  const queryClient = useQueryClient();

  const { data: profiles, isLoading: loadingProfiles, error: profilesError } = useQuery({
    queryKey: ["venture-partners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "venture_partner");
      
      if (error) throw error;
      return data || [];
    },
  });

  const { data: lps, isLoading: loadingLPs, error: lpsError } = useQuery({
    queryKey: ["limited-partners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("limited_partners")
        .select("*");
      
      if (error) throw error;
      return data || [];
    },
  });

  const { data: commissionSettings, isLoading: loadingCommissions, error: commissionsError } = useQuery({
    queryKey: ["commission-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("commission_settings")
        .select(`
          *,
          partner:profiles!commission_settings_partner_id_fkey (first_name, last_name),
          secondary_partner:profiles!commission_settings_secondary_partner_id_fkey (first_name, last_name)
        `);
      
      if (error) throw error;
      return data || [];
    },
  });

  const { data: lpCommissionSettings, isLoading: loadingLPCommissions, error: lpCommissionsError } = useQuery({
    queryKey: ["lp-commission-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lp_commission_settings")
        .select(`
          *,
          partner:profiles!lp_commission_settings_partner_id_fkey (first_name, last_name),
          secondary_partner:profiles!lp_commission_settings_secondary_partner_id_fkey (first_name, last_name),
          lp:limited_partners!lp_commission_settings_lp_id_fkey (entity_name)
        `);
      
      if (error) throw error;
      return data || [];
    },
  });

  const isLoading = loadingProfiles || loadingLPs || loadingCommissions || loadingLPCommissions;
  const error = profilesError || lpsError || commissionsError || lpCommissionsError;

  const handleFormSuccess = () => {
    // Invalidate queries to refresh data
    queryClient.invalidateQueries({ queryKey: ["commission-settings"] });
    queryClient.invalidateQueries({ queryKey: ["lp-commission-settings"] });
  };

  if (error) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Error loading commission settings: {error.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Commission Settings</h1>
      
      <Tabs defaultValue="partner-level">
        <TabsList>
          <TabsTrigger value="partner-level">Partner Level</TabsTrigger>
          <TabsTrigger value="lp-level">LP Level</TabsTrigger>
        </TabsList>

        <TabsContent value="partner-level" className="mt-6">
          <div className="mb-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add Partner Commission</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Partner Commission</DialogTitle>
                </DialogHeader>
                <CommissionForm 
                  partnerId={profiles?.[0]?.id} 
                  onSuccess={handleFormSuccess} 
                />
              </DialogContent>
            </Dialog>
          </div>

          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Partner</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Percentage</TableHead>
                  <TableHead>Expenses %</TableHead>
                  <TableHead>Secondary Partner</TableHead>
                  <TableHead>Secondary %</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commissionSettings?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No commission settings found. Add a new one to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  commissionSettings?.map((commission) => (
                    <TableRow key={commission.id}>
                      <TableCell>
                        {commission.partner?.first_name} {commission.partner?.last_name}
                      </TableCell>
                      <TableCell>{commission.commission_type}</TableCell>
                      <TableCell>{commission.percentage}%</TableCell>
                      <TableCell>{commission.expenses_percentage}%</TableCell>
                      <TableCell>
                        {commission.secondary_partner?.first_name} {commission.secondary_partner?.last_name}
                      </TableCell>
                      <TableCell>{commission.secondary_percentage}%</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">Edit</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Commission Settings</DialogTitle>
                            </DialogHeader>
                            <CommissionForm
                              partnerId={commission.partner_id}
                              initialData={commission}
                              onSuccess={handleFormSuccess}
                            />
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </TabsContent>

        <TabsContent value="lp-level" className="mt-6">
          <div className="mb-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add LP Commission Override</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add LP Commission Override</DialogTitle>
                </DialogHeader>
                <CommissionForm
                  partnerId={profiles?.[0]?.id}
                  lpId={lps?.[0]?.id}
                  onSuccess={handleFormSuccess}
                />
              </DialogContent>
            </Dialog>
          </div>

          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>LP</TableHead>
                  <TableHead>Partner</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Percentage</TableHead>
                  <TableHead>Expenses %</TableHead>
                  <TableHead>Secondary Partner</TableHead>
                  <TableHead>Secondary %</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lpCommissionSettings?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      No LP commission settings found. Add a new one to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  lpCommissionSettings?.map((commission) => (
                    <TableRow key={commission.id}>
                      <TableCell>{commission.lp?.entity_name}</TableCell>
                      <TableCell>
                        {commission.partner?.first_name} {commission.partner?.last_name}
                      </TableCell>
                      <TableCell>{commission.commission_type}</TableCell>
                      <TableCell>{commission.percentage}%</TableCell>
                      <TableCell>{commission.expenses_percentage}%</TableCell>
                      <TableCell>
                        {commission.secondary_partner?.first_name} {commission.secondary_partner?.last_name}
                      </TableCell>
                      <TableCell>{commission.secondary_percentage}%</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">Edit</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit LP Commission Override</DialogTitle>
                            </DialogHeader>
                            <CommissionForm
                              partnerId={commission.partner_id}
                              lpId={commission.lp_id}
                              initialData={commission}
                              onSuccess={handleFormSuccess}
                            />
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
