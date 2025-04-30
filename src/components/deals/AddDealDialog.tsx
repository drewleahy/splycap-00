
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SimpleFileUpload } from "@/components/SimpleFileUpload";
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

interface AddDealDialogProps {
  onDealAdded: () => void;
}

export const AddDealDialog = ({ onDealAdded }: AddDealDialogProps) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deckFile, setDeckFile] = useState<{ url: string; name: string } | null>(null);
  const { toast } = useToast();

  const handleAddDeal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!user) {
        throw new Error("User not authenticated");
      }
      
      const formData = new FormData(e.currentTarget);
      
      // Log for debugging
      console.log("Creating new deal with user ID:", user.id);
      
      const dealData = {
        deal_name: formData.get("dealName") as string,
        allocation_amount: parseFloat(formData.get("allocationAmount") as string),
        valuation: formData.get("valuation") ? parseFloat(formData.get("valuation") as string) : null,
        stage: formData.get("stage") as string,
        investment_thesis: formData.get("investmentThesis") as string,
        created_by: user.id,
        pitch_deck_url: deckFile?.url || null,
        pitch_deck_name: deckFile?.name || null,
        status: "active"
      };
      
      console.log("Adding new deal with data:", dealData);
      
      const { error } = await supabase.from("deals").insert(dealData);
      
      if (error) {
        console.error("Error from Supabase:", error);
        throw error;
      }
      
      toast({
        title: "Success",
        description: "Deal created successfully",
      });
      
      onDealAdded();
      setIsOpen(false);
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                <SimpleFileUpload 
                  onSuccess={handleFileUploadSuccess}
                  onError={handleFileUploadError}
                  allowedFileTypes={[".pdf", ".ppt", ".pptx"]}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Deal"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
