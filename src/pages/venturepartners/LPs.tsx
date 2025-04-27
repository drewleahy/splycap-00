
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
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, Filter, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type LP = {
  id: string;
  entity_name: string;
  investment_amount: number | null;
  relationship_notes: string | null;
  created_at: string;
};

export default function LPs() {
  const { user } = useAuth();
  const [lps, setLPs] = useState<LP[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useEffect(() => {
    fetchLPs();
  }, [user]);

  const fetchLPs = async () => {
    try {
      if (!user) return;
      
      const { data, error } = await supabase
        .from("limited_partners")
        .select("*")
        .order("created_at", { ascending: false });
        
      if (error) throw error;
      
      setLPs(data || []);
    } catch (error) {
      console.error("Error fetching LPs:", error);
      toast({
        title: "Error",
        description: "Could not load limited partners. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddLP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const lpData = {
        entity_name: formData.get("entityName") as string,
        investment_amount: formData.get("investmentAmount") ? parseFloat(formData.get("investmentAmount") as string) : null,
        relationship_notes: formData.get("relationshipNotes") as string,
        created_by: user?.id,
      };
      
      const { error } = await supabase.from("limited_partners").insert(lpData);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Limited Partner added successfully",
      });
      
      fetchLPs();
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Error adding LP:", error);
      toast({
        title: "Error",
        description: "Failed to add limited partner. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLPs = lps.filter(lp =>
    lp.entity_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Limited Partners</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add LP
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <form onSubmit={handleAddLP}>
              <DialogHeader>
                <DialogTitle>Add Limited Partner</DialogTitle>
                <DialogDescription>
                  Enter the details of the new limited partner.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="entityName" className="text-right font-medium">
                    Entity Name
                  </label>
                  <Input
                    id="entityName"
                    name="entityName"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="investmentAmount" className="text-right font-medium">
                    Investment Amount ($)
                  </label>
                  <Input
                    id="investmentAmount"
                    name="investmentAmount"
                    type="number"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="relationshipNotes" className="text-right font-medium">
                    Relationship Notes
                  </label>
                  <Textarea
                    id="relationshipNotes"
                    name="relationshipNotes"
                    className="col-span-3"
                    placeholder="Notes about this relationship"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Adding..." : "Add LP"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search limited partners..."
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
      ) : lps.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border rounded-lg">
          <Users className="h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium">No limited partners found</h3>
          <p className="text-sm text-gray-500 mb-4">
            You haven't added any limited partners yet.
          </p>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Your First LP
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Entity Name</TableHead>
                <TableHead>Investment Amount</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLPs.map((lp) => (
                <TableRow key={lp.id}>
                  <TableCell className="font-medium">{lp.entity_name}</TableCell>
                  <TableCell>
                    {lp.investment_amount ? `$${lp.investment_amount.toLocaleString()}` : "N/A"}
                  </TableCell>
                  <TableCell>
                    {new Date(lp.created_at).toLocaleDateString()}
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
