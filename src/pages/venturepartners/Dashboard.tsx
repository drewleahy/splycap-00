
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Users, FileText, Activity } from "lucide-react";

type Stats = {
  totalCommissions: number;
  totalDeals: number;
  totalLPs: number;
};

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalCommissions: 0,
    totalDeals: 0,
    totalLPs: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!user) return;
        
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
          
        if (error) throw error;
        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchStats = async () => {
      try {
        if (!user) return;
        
        // Get total deals
        const { count: dealsCount, error: dealsError } = await supabase
          .from("deals")
          .select("*", { count: "exact", head: true })
          .eq("created_by", user.id);
          
        if (dealsError) throw dealsError;

        // Get total LPs
        const { count: lpsCount, error: lpsError } = await supabase
          .from("limited_partners")
          .select("*", { count: "exact", head: true })
          .eq("created_by", user.id);
          
        if (lpsError) throw lpsError;

        // Get total commissions
        const { data: commissionsData, error: commissionsError } = await supabase
          .from("commissions")
          .select("amount")
          .eq("partner_id", user.id);
          
        if (commissionsError) throw commissionsError;
        
        const totalCommissions = commissionsData?.reduce((sum, item) => sum + Number(item.amount), 0) || 0;

        setStats({
          totalDeals: dealsCount || 0,
          totalLPs: lpsCount || 0,
          totalCommissions: totalCommissions,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
    fetchStats();
  }, [user]);

  const statCards = [
    {
      title: "Total Commissions",
      value: `$${stats.totalCommissions.toLocaleString()}`,
      description: "Lifetime earnings",
      icon: DollarSign,
      color: "bg-green-100 text-green-800",
    },
    {
      title: "Active Deals",
      value: stats.totalDeals,
      description: "Total deals created",
      icon: FileText,
      color: "bg-blue-100 text-blue-800",
    },
    {
      title: "Limited Partners",
      value: stats.totalLPs,
      description: "Investors added",
      icon: Users,
      color: "bg-purple-100 text-purple-800",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="space-x-2">
          <Button variant="outline">Export Data</Button>
          <Button>Create New Deal</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {isLoading ? (
          Array(3)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="h-20 bg-gray-200 rounded-t-lg"></CardHeader>
                <CardContent className="h-32 bg-gray-100 rounded-b-lg"></CardContent>
              </Card>
            ))
        ) : (
          statCards.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${stat.color}`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions in the portal</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center border-t">
            <div className="text-center">
              <Activity className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium">No recent activity</h3>
              <p className="mt-1 text-sm text-gray-500">
                Start creating deals or adding LPs to see your activity here.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Commission Calculator</CardTitle>
            <CardDescription>Calculate potential earnings</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center border-t">
            <div className="text-center">
              <DollarSign className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium">Commission Calculator</h3>
              <p className="mt-1 text-sm text-gray-500">
                Coming soon: calculate your potential commissions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
