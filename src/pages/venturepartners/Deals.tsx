
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, Filter, RefreshCw, FileText, AlertCircle } from "lucide-react";
import { useDeals } from "@/hooks/use-deals";
import { DealsTable } from "@/components/deals/DealsTable";
import { AddDealDialog } from "@/components/deals/AddDealDialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/hooks/use-auth";

export default function Deals() {
  const { user } = useAuth();
  const { deals, isLoading, error, refetch } = useDeals();
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  console.log("Deals page rendered, user:", user?.id);
  console.log("Deals loaded:", deals.length, "Loading status:", isLoading);
  if (error) console.error("Error in Deals component:", error);

  // Filter deals based on search term
  const filteredDeals = deals.filter(deal =>
    deal.deal_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRefresh = async () => {
    console.log("Manual refresh triggered");
    setIsRefreshing(true);
    await refetch();
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
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search deals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      {/* Auth status debugging */}
      {!user && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication issue</AlertTitle>
          <AlertDescription>
            You don't appear to be logged in. This might affect your ability to view deals.
          </AlertDescription>
        </Alert>
      )}

      {/* Error display */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error loading deals</AlertTitle>
          <AlertDescription>
            {error.message}
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
