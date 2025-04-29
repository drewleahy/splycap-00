
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingSpinner } from "./partners/LoadingSpinner";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Settings, FileText, Users } from "lucide-react";

export const VenturePartnerManager = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch venture partner users with "status": "approved"
  const { data: venturePartners, isLoading: isLoadingPartners } = useQuery({
    queryKey: ["venture-partners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select(`
          id,
          first_name,
          last_name,
          created_at,
          email:auth_user_id(email),
          status
        `)
        .eq("status", "approved");
      
      if (error) throw error;
      
      return (data || []).map(profile => ({
        ...profile,
        email: Array.isArray(profile.email) && profile.email.length > 0 
          ? profile.email[0]?.email 
          : "No email available"
      }));
    }
  });

  // Fetch recent deals
  const { data: recentDeals, isLoading: isLoadingDeals } = useQuery({
    queryKey: ["recent-deals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("deals")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data || [];
    }
  });

  // Fetch recent commissions
  const { data: recentCommissions, isLoading: isLoadingCommissions } = useQuery({
    queryKey: ["recent-commissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("commissions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data || [];
    },
    // Only run this query if we need it
    enabled: activeTab === "overview"
  });

  if (isLoadingPartners && activeTab === "overview") {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Venture Partner Management</h2>
        <div className="flex space-x-2">
          <Button asChild>
            <Link to="/venturepartners/dashboard">
              Go to VP Dashboard
            </Link>
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Active Partners
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{venturePartners?.length || 0}</p>
                <p className="text-xs text-muted-foreground">
                  Approved venture partners
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Active Deals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{recentDeals?.length || 0}</p>
                <p className="text-xs text-muted-foreground">
                  Recent deal submissions
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Commission Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button size="sm" asChild className="mt-2">
                  <Link to="/venturepartners/commission-settings">
                    Manage Settings
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Venture Partners</CardTitle>
              </CardHeader>
              <CardContent>
                {venturePartners && venturePartners.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Joined</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {venturePartners.map((partner) => (
                        <TableRow key={partner.id}>
                          <TableCell className="font-medium">
                            {partner.first_name} {partner.last_name}
                          </TableCell>
                          <TableCell>{partner.email}</TableCell>
                          <TableCell>{new Date(partner.created_at).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center py-4 text-gray-500">No approved venture partners found</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Deals</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingDeals ? (
                  <div className="flex justify-center py-4">
                    <LoadingSpinner />
                  </div>
                ) : recentDeals && recentDeals.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Deal Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentDeals.map((deal) => (
                        <TableRow key={deal.id}>
                          <TableCell className="font-medium">{deal.name}</TableCell>
                          <TableCell>{deal.status}</TableCell>
                          <TableCell>{new Date(deal.created_at).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center py-4 text-gray-500">No recent deals found</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Venture Partner Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Quick Links</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/venturepartners/commission-settings">
                        <Settings className="w-4 h-4 mr-2" />
                        Commission Settings
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/venturepartners/deals">
                        <FileText className="w-4 h-4 mr-2" />
                        Manage Deals
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/admin">
                        <Users className="w-4 h-4 mr-2" />
                        Back to Admin
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
