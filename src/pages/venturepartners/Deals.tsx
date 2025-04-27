
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Search, Plus, Filter, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SimpleFileUpload } from "@/components/SimpleFileUpload";

type Deal = {
  id: string;
  deal_name: string;
  allocation_amount: number;
  valuation: number | null;
  stage: string;
  created_at: string;
  status: string;
  pitch_deck_url?: string;
  pitch_deck_name?: string;
};

export default function Deals() {
  const { user } = useAuth();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [deckFile, setDeckFile] = useState<{ url: string; name: string } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchDeals();
    } else {
      setIsLoading(false); // Set loading to false if no user
    }
  }, [user]);

  const fetchDeals = async () => {
    try {
      if (!user) return;
      
      setIsLoading(true);
      console.log("Fetching deals for user:", user.id);

      const { data, error } = await supabase
        .from("deals")
        .select("*")
        .order("created_at", { ascending: false });
        
      if (error) {
        console.error("Supabase error fetching deals:", error);
        throw error;
      }
      
      console.log("Deals fetched:", data);
      setDeals(data || []);
    } catch (error) {
      console.error("Error fetching deals:", error);
      toast({
        title: "Error",
        description: "Could not load deals. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddDeal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const dealData = {
        deal_name: formData.get("dealName") as string,
        allocation_amount: parseFloat(formData.get("allocationAmount") as string),
        valuation: formData.get("valuation") ? parseFloat(formData.get("valuation") as string) : null,
        stage: formData.get("stage") as string,
        investment_thesis: formData.get("investmentThesis") as string,
        created_by: user?.id,
        pitch_deck_url: deckFile?.url || null,
        pitch_deck_name: deckFile?.name || null,
        status: "active"
      };
      
      console.log("Adding new deal:", dealData);
      
      const { error, data } = await supabase.from("deals").insert(dealData).select();
      
      if (error) {
        console.error("Error inserting deal:", error);
        throw error;
      }
      
      console.log("Deal created successfully:", data);
      
      toast({
        title: "Success",
        description: "Deal created successfully",
      });
      
      fetchDeals();
      setIsAddDialogOpen(false);
      setDeckFile(null);
    } catch (error) {
      console.error("Error adding deal:", error);
      toast({
        title: "Error",
        description: "Failed to create deal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUploadSuccess = (url: string, name: string) => {
    setDeckFile({ url, name });
    toast({
      title: "File uploaded",
      description: "Pitch deck uploaded successfully",
    });
  };

  const handleFileUploadError = (error: string) => {
    toast({
      title: "Upload error",
      description: error,
      variant: "destructive",
    });
  };

  const handleRefresh = () => {
    fetchDeals();
  };

  const filteredDeals = deals.filter(deal =>
    deal.deal_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Deals</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Deal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <form onSubmit={handleAddDeal}>
                <DialogHeader>
                  <DialogTitle>Add New Deal</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new investment deal.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="dealName" className="text-right font-medium">
                      Deal Name
                    </label>
                    <Input
                      id="dealName"
                      name="dealName"
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="allocationAmount" className="text-right font-medium">
                      Allocation Amount ($)
                    </label>
                    <Input
                      id="allocationAmount"
                      name="allocationAmount"
                      type="number"
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="valuation" className="text-right font-medium">
                      Valuation ($)
                    </label>
                    <Input
                      id="valuation"
                      name="valuation"
                      type="number"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="stage" className="text-right font-medium">
                      Stage
                    </label>
                    <Select name="stage" defaultValue="seed" required>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="seed">Seed</SelectItem>
                        <SelectItem value="series_a">Series A</SelectItem>
                        <SelectItem value="series_b">Series B</SelectItem>
                        <SelectItem value="series_c">Series C</SelectItem>
                        <SelectItem value="series_d">Series D</SelectItem>
                        <SelectItem value="growth">Growth</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="investmentThesis" className="text-right font-medium">
                      Investment Thesis
                    </label>
                    <Textarea
                      id="investmentThesis"
                      name="investmentThesis"
                      className="col-span-3"
                      placeholder="Why is this a good investment opportunity?"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <label className="text-right font-medium mt-2">
                      Pitch Deck
                    </label>
                    <div className="col-span-3">
                      {deckFile ? (
                        <div className="flex items-center space-x-2 p-2 border rounded">
                          <FileText className="h-5 w-5 text-blue-500" />
                          <span className="text-sm font-medium truncate">{deckFile.name}</span>
                          <Button 
                            type="button" 
                            size="sm" 
                            variant="outline" 
                            onClick={() => setDeckFile(null)}
                          >
                            Change
                          </Button>
                        </div>
                      ) : (
                        <SimpleFileUpload 
                          onSuccess={handleFileUploadSuccess}
                          onError={handleFileUploadError}
                          allowedFileTypes={[".pdf", ".ppt", ".pptx"]}
                        />
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Upload a PDF or PowerPoint pitch deck (max. 10MB)
                      </p>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create Deal"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : deals.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border rounded-lg">
          <FileText className="h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium">No deals found</h3>
          <p className="text-sm text-gray-500 mb-4">
            You haven't added any deals yet.
          </p>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Your First Deal
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deal Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Valuation</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Pitch Deck</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDeals.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell className="font-medium">{deal.deal_name}</TableCell>
                  <TableCell>${deal.allocation_amount.toLocaleString()}</TableCell>
                  <TableCell>
                    {deal.valuation ? `$${deal.valuation.toLocaleString()}` : "N/A"}
                  </TableCell>
                  <TableCell className="capitalize">
                    {deal.stage.replace("_", " ")}
                  </TableCell>
                  <TableCell>
                    {new Date(deal.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {deal.pitch_deck_url ? (
                      <a 
                        href={deal.pitch_deck_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <FileText className="h-4 w-4 mr-1" /> View
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm">No deck</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      deal.status === "active"
                        ? "bg-green-100 text-green-800"
                        : deal.status === "archived"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
