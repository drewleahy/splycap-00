
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/ui/search";
import { Filter, RefreshCw, FileText, AlertCircle } from "lucide-react";
import { useDeals } from "@/hooks/use-deals";
import { DealsTable } from "@/components/deals/DealsTable";
import { AddDealDialog } from "@/components/deals/AddDealDialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

export default function Deals() {
  const { user } = useAuth();
  const { deals, isLoading, error, refetch } = useDeals();
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  console.log("Deals page rendered, user:", user?.id);
  console.log("Deals loaded:", deals.length, "Loading status:", isLoading);
  if (error) console.error("Error in Deals component:", error);

  useEffect(() => {
    // Initial page load success message
    if (deals.length > 0 && !isLoading && !error) {
      toast({
        title: "Deals loaded",
        description: `Successfully loaded ${deals.length} deals`,
      });
    }
  }, [deals.length, isLoading, error, toast]);

  // Filter deals based on search term
  const filteredDeals = deals.filter(deal =>
    deal.deal_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRefresh = async () => {
    console.log("Manual refresh triggered");
    setIsRefreshing(true);
    await refetch(true);
    setIsRefreshing(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Deals</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={isLoading || isRefreshing}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${(isLoading || isRefreshing) ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <AddDealDialog onDealAdded={refetch} />
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <Search 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search deals..."
          className="flex-1"
        />
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      {/* Error display */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error loading deals</AlertTitle>
          <AlertDescription>
            There was a problem loading your deals. Please try refreshing again or contact support if the problem persists.
            <div className="mt-2">
              <Button 
                size="sm" 
                onClick={handleRefresh} 
                disabled={isLoading || isRefreshing}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${(isLoading || isRefreshing) ? 'animate-spin' : ''}`} />
                Try Again
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Loading, empty state, or deals table */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <span className="ml-3 text-lg font-medium">Loading deals...</span>
        </div>
      ) : deals.length === 0 && !error ? (
        <div className="flex flex-col items-center justify-center h-64 border rounded-lg">
          <FileText className="h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium">No deals found</h3>
          <p className="text-sm text-gray-500 mb-4">
            You haven't added any deals yet.
          </p>
          <AddDealDialog onDealAdded={refetch} />
        </div>
      ) : (
        <DealsTable deals={filteredDeals} />
      )}
    </div>
  );
}
