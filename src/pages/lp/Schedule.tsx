
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { fetchLPContent } from "@/utils/contentUtils";

const Schedule = () => {
  const queryClient = useQueryClient();
  
  const { data: content, isLoading, error } = useQuery({
    queryKey: ["lp-content", "schedule"],
    queryFn: () => fetchLPContent("schedule"),
    staleTime: 30000, // Consider data fresh for 30 seconds
  });

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["lp-content", "schedule"] });
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
              <p className="text-red-600">Error loading content. Please try refreshing.</p>
            ) : content ? (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              <p className="text-gray-600">Content coming soon.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Schedule;
