
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Calendar, Search } from "lucide-react";

type Commission = {
  id: string;
  amount: number;
  percentage: number;
  status: string;
  payout_date: string | null;
  created_at: string;
  deal: {
    deal_name: string;
  } | null;
  lp: {
    entity_name: string;
  } | null;
};

export default function Commissions() {
  const { user } = useAuth();
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalCommissions, setTotalCommissions] = useState(0);
  const [pendingCommissions, setPendingCommissions] = useState(0);

  useEffect(() => {
    fetchCommissions();
  }, [user]);

  const fetchCommissions = async () => {
    try {
      if (!user) return;
      
      const { data, error } = await supabase
        .from("commissions")
        .select(`
          *,
          deal:deal_id (deal_name),
          lp:lp_id (entity_name)
        `)
        .eq("partner_id", user.id)
        .order("created_at", { ascending: false });
        
      if (error) throw error;
      
      setCommissions(data || []);
      
      // Calculate total and pending commissions
      let total = 0;
      let pending = 0;
      
      data?.forEach(commission => {
        total += Number(commission.amount);
        if (commission.status === "pending") {
          pending += Number(commission.amount);
        }
      });
      
      setTotalCommissions(total);
      setPendingCommissions(pending);
    } catch (error) {
      console.error("Error fetching commissions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCommissions = commissions.filter(commission => {
    const dealName = commission.deal?.deal_name || "";
    const lpName = commission.lp?.entity_name || "";
    const searchTermLower = searchTerm.toLowerCase();
    
    return (
      dealName.toLowerCase().includes(searchTermLower) ||
      lpName.toLowerCase().includes(searchTermLower)
    );
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Commissions</h1>
        <p className="text-gray-500 mt-1">Track your earnings and upcoming payouts</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <div className="p-2 rounded-full bg-green-100 text-green-800">
              <DollarSign className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalCommissions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Lifetime earnings</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <div className="p-2 rounded-full bg-yellow-100 text-yellow-800">
              <Calendar className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${pendingCommissions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Not yet paid out</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search commissions by deal or LP name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          Export CSV
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : commissions.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border rounded-lg">
          <DollarSign className="h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium">No commissions yet</h3>
          <p className="text-sm text-gray-500 mb-4">
            Commission data will appear here once deals are completed.
          </p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deal</TableHead>
                <TableHead>Limited Partner</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payout Date</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCommissions.map((commission) => (
                <TableRow key={commission.id}>
                  <TableCell className="font-medium">{commission.deal?.deal_name || "N/A"}</TableCell>
                  <TableCell>{commission.lp?.entity_name || "N/A"}</TableCell>
                  <TableCell>${Number(commission.amount).toLocaleString()}</TableCell>
                  <TableCell>{commission.percentage}%</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      commission.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : commission.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {commission.status.charAt(0).toUpperCase() + commission.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {commission.payout_date ? new Date(commission.payout_date).toLocaleDateString() : "Not scheduled"}
                  </TableCell>
                  <TableCell>
                    {new Date(commission.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Commission Calculator</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <p className="text-sm text-gray-500">
                Calculate potential commissions based on deal size and percentage. Coming soon.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
