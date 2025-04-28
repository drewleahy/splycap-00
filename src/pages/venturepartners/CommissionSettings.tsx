
import { useQuery } from "@tanstack/react-query";
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

export default function CommissionSettings() {
  const { data: profiles } = useQuery({
    queryKey: ["venture-partners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "venture_partner");
      
      if (error) throw error;
      return data;
    },
  });

  const { data: lps } = useQuery({
    queryKey: ["limited-partners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("limited_partners")
        .select("*");
      
      if (error) throw error;
      return data;
    },
  });

  const { data: commissionSettings } = useQuery({
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
      return data;
    },
  });

  const { data: lpCommissionSettings } = useQuery({
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
      return data;
    },
  });

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
                <CommissionForm partnerId={profiles?.[0]?.id} />
              </DialogContent>
            </Dialog>
          </div>

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
              {commissionSettings?.map((commission) => (
                <TableRow key={commission.id}>
                  <TableCell>
                    {commission.partner.first_name} {commission.partner.last_name}
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
                        />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
                />
              </DialogContent>
            </Dialog>
          </div>

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
              {lpCommissionSettings?.map((commission) => (
                <TableRow key={commission.id}>
                  <TableCell>{commission.lp.entity_name}</TableCell>
                  <TableCell>
                    {commission.partner.first_name} {commission.partner.last_name}
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
                        />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}
