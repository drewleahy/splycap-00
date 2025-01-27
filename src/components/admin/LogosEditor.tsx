import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, GripVertical } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

type Investment = {
  id: string;
  name: string;
  logo_url: string;
  website_url: string | null;
  created_at: string;
  updated_at: string;
};

export const LogosEditor = () => {
  const { toast } = useToast();

  const { data: investments, isLoading, refetch } = useQuery({
    queryKey: ["past_investments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("past_investments")
        .select("*")
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      return data as Investment[];
    },
  });

  const handleDragEnd = async (result: any) => {
    if (!result.destination || !investments) return;

    const items = Array.from(investments);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update the positions in the database by updating timestamps
    // This will effectively reorder items when queried
    try {
      for (const item of items) {
        await supabase
          .from("past_investments")
          .update({ updated_at: new Date().toISOString() })
          .eq("id", item.id);
      }

      toast({
        title: "Success",
        description: "Investment order updated successfully",
      });

      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update investment order",
        variant: "destructive",
      });
    }
  };

  const handleUpdateUrl = async (id: string, website_url: string) => {
    try {
      const { error } = await supabase
        .from("past_investments")
        .update({ website_url })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Website URL updated successfully",
      });

      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update website URL",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <Loader2 className="w-8 h-8 animate-spin" />;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Past Investment Order</h2>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="investments">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {investments?.map((investment, index) => (
                <Draggable key={investment.id} draggableId={investment.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div {...provided.dragHandleProps}>
                        <GripVertical className="text-gray-400" />
                      </div>
                      <img
                        src={investment.logo_url}
                        alt={investment.name}
                        className="w-12 h-12 object-contain"
                      />
                      <div className="flex-1 space-y-2">
                        <p className="font-medium">{investment.name}</p>
                        <Input
                          value={investment.website_url || ""}
                          onChange={(e) => handleUpdateUrl(investment.id, e.target.value)}
                          placeholder="Website URL"
                          className="text-sm"
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};