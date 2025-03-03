
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { fetchLPContent } from "@/utils/contentUtils";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const Schedule = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const { data: content, isLoading, error, refetch } = useQuery({
    queryKey: ["lp-content", "schedule"],
    queryFn: () => fetchLPContent("schedule"),
    staleTime: 5000, // Consider data fresh for just 5 seconds to ensure freshness
    retry: 2,
  });

  useEffect(() => {
    // Initial load - force refresh from server
    queryClient.invalidateQueries({ queryKey: ["lp-content", "schedule"] });
  }, [queryClient]);

  const handleRefresh = async () => {
    toast({
      title: "Refreshing content",
      description: "Fetching the latest content from server...",
    });
    
    // Clear the cache completely for this query
    await queryClient.resetQueries({ queryKey: ["lp-content", "schedule"] });
    
    // Fetch fresh data
    const result = await refetch();
    
    if (result.error) {
      toast({
        title: "Error refreshing content",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Content refreshed",
        description: "The latest content has been loaded.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Link to="/LP-Splash">
            <Button variant="ghost" className="mb-4">
              ← Back to Data Room
            </Button>
          </Link>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-sply-dark mb-6">Schedule of Investments</h1>
            <Button variant="outline" onClick={handleRefresh} size="sm">
              Refresh Content
            </Button>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : error ? (
              <div className="text-red-600 py-4">
                <p>Error loading content. Please try refreshing.</p>
                <pre className="text-xs mt-2 bg-gray-100 p-2 rounded overflow-auto">
                  {error.toString()}
                </pre>
                <Button onClick={() => refetch()} variant="destructive" size="sm" className="mt-2">
                  Try Again
                </Button>
              </div>
            ) : content ? (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              <div className="text-gray-600 py-4">
                <p>No content available. Please add content in the admin panel.</p>
                <Button onClick={() => refetch()} variant="outline" size="sm" className="mt-2">
                  Check Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Schedule;
