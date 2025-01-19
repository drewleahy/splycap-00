import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PastInvestmentForm, InvestmentFormValues } from "./past-investments/PastInvestmentForm";
import { PastInvestmentList } from "./past-investments/PastInvestmentList";

export const PastInvestmentsEditor = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [newInvestment, setNewInvestment] = useState(false);

  const { data: investments, isLoading } = useQuery({
    queryKey: ["past-investments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("past_investments")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data;
    },
  });

  const handleAdd = async (values: InvestmentFormValues) => {
    try {
      const { error } = await supabase
        .from("past_investments")
        .insert({
          name: values.name,
          logo_url: values.logo_url,
          website_url: values.website_url || null,
        });
      
      if (error) throw error;
      
      await queryClient.invalidateQueries({ queryKey: ["past-investments"] });
      setNewInvestment(false);
      
      toast({
        title: "Success",
        description: "Investment added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add investment. Please check your input and try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdate = async (id: string, values: InvestmentFormValues) => {
    try {
      const { error } = await supabase
        .from("past_investments")
        .update({
          name: values.name,
          logo_url: values.logo_url,
          website_url: values.website_url || null,
        })
        .eq("id", id);
      
      if (error) throw error;
      
      await queryClient.invalidateQueries({ queryKey: ["past-investments"] });
      
      toast({
        title: "Success",
        description: "Investment updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update investment. Please check your input and try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("past_investments")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      
      await queryClient.invalidateQueries({ queryKey: ["past-investments"] });
      
      toast({
        title: "Success",
        description: "Investment deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete investment",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Past Investments</h2>
        <Button
          onClick={() => setNewInvestment(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Investment
        </Button>
      </div>

      <div className="space-y-4">
        {newInvestment && (
          <div className="border p-4 rounded-lg">
            <PastInvestmentForm
              onSubmit={handleAdd}
              onCancel={() => setNewInvestment(false)}
            />
          </div>
        )}

        <PastInvestmentList
          investments={investments || []}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
    </Card>
  );
};