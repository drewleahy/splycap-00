import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, GripVertical } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

type Logo = {
  id: string;
  src: string;
  alt: string;
  order: number;
};

export const LogosEditor = () => {
  const { toast } = useToast();
  const [newLogo, setNewLogo] = useState({ src: "", alt: "" });

  const { data: logos, isLoading, refetch } = useQuery({
    queryKey: ["logos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("logos")
        .select("*")
        .order("order");
      
      if (error) throw error;
      return data as Logo[];
    },
  });

  const handleDragEnd = async (result: any) => {
    if (!result.destination || !logos) return;

    const items = Array.from(logos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update the order in the database
    const updates = items.map((item, index) => ({
      id: item.id,
      order: index,
    }));

    try {
      for (const update of updates) {
        await supabase
          .from("logos")
          .update({ order: update.order })
          .eq("id", update.id);
      }

      toast({
        title: "Success",
        description: "Logo order updated successfully",
      });

      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update logo order",
        variant: "destructive",
      });
    }
  };

  const handleAddLogo = async () => {
    try {
      const { data: lastLogo } = await supabase
        .from("logos")
        .select("order")
        .order("order", { ascending: false })
        .limit(1);

      const newOrder = lastLogo?.[0]?.order + 1 || 0;

      const { error } = await supabase.from("logos").insert({
        src: newLogo.src,
        alt: newLogo.alt,
        order: newOrder,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Logo added successfully",
      });

      setNewLogo({ src: "", alt: "" });
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add logo",
        variant: "destructive",
      });
    }
  };

  const handleDeleteLogo = async (id: string) => {
    try {
      const { error } = await supabase
        .from("logos")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Logo deleted successfully",
      });

      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete logo",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <Loader2 className="w-8 h-8 animate-spin" />;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Past Investment Logos</h2>
      
      <div className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Logo URL</label>
          <Input
            value={newLogo.src}
            onChange={(e) => setNewLogo({ ...newLogo, src: e.target.value })}
            placeholder="https://example.com/logo.png"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Alt Text</label>
          <Input
            value={newLogo.alt}
            onChange={(e) => setNewLogo({ ...newLogo, alt: e.target.value })}
            placeholder="Company Name Logo"
          />
        </div>
        <Button onClick={handleAddLogo}>Add Logo</Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="logos">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {logos?.map((logo, index) => (
                <Draggable key={logo.id} draggableId={logo.id} index={index}>
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
                        src={logo.src}
                        alt={logo.alt}
                        className="w-12 h-12 object-contain"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{logo.alt}</p>
                        <p className="text-sm text-gray-500">{logo.src}</p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteLogo(logo.id)}
                      >
                        Delete
                      </Button>
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