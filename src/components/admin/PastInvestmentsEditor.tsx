import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, X, Check, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(1, "Company name is required"),
  logo_url: z.string()
    .min(1, "Logo URL is required")
    .url("Must be a valid URL")
    .regex(/^https?:\/\/.+/i, "Must start with http:// or https://"),
  website_url: z.string()
    .url("Must be a valid URL")
    .regex(/^https?:\/\/.+/i, "Must start with http:// or https://")
    .optional()
    .or(z.literal(''))
});

type FormValues = z.infer<typeof formSchema>;

export const PastInvestmentsEditor = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newInvestment, setNewInvestment] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      logo_url: "",
      website_url: "",
    },
  });

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

  const handleEdit = (investment: any) => {
    setEditingId(investment.id);
    form.reset({
      name: investment.name,
      logo_url: investment.logo_url,
      website_url: investment.website_url || "",
    });
  };

  const handleAdd = async (values: FormValues) => {
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
      form.reset();
      
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

  const handleUpdate = async (id: string, values: FormValues) => {
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
      setEditingId(null);
      form.reset();
      
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
          onClick={() => {
            setNewInvestment(true);
            form.reset();
          }}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Investment
        </Button>
      </div>

      <div className="space-y-4">
        {newInvestment && (
          <div className="border p-4 rounded-lg space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAdd)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Company Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="logo_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logo URL</FormLabel>
                      <FormControl>
                        <Input placeholder="Logo URL" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter a valid image URL starting with http:// or https://
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="website_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website URL (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Website URL" {...field} />
                      </FormControl>
                      <FormDescription>
                        If provided, must start with http:// or https://
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex gap-2">
                  <Button type="submit" className="flex items-center gap-2">
                    <Check className="w-4 h-4" /> Save
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setNewInvestment(false);
                      form.reset();
                    }}
                    className="flex items-center gap-2"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}

        {investments?.map((investment) => (
          <div
            key={investment.id}
            className="border p-4 rounded-lg space-y-4"
          >
            {editingId === investment.id ? (
              <Form {...form}>
                <form 
                  onSubmit={form.handleSubmit((values) => handleUpdate(investment.id, values))} 
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Company Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="logo_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Logo URL</FormLabel>
                        <FormControl>
                          <Input placeholder="Logo URL" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter a valid image URL starting with http:// or https://
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="website_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website URL (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Website URL" {...field} />
                        </FormControl>
                        <FormDescription>
                          If provided, must start with http:// or https://
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex gap-2">
                    <Button type="submit" className="flex items-center gap-2">
                      <Check className="w-4 h-4" /> Save
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setEditingId(null);
                        form.reset();
                      }}
                      className="flex items-center gap-2"
                    >
                      <X className="w-4 h-4" /> Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={investment.logo_url}
                    alt={investment.name}
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <h3 className="font-medium">{investment.name}</h3>
                    {investment.website_url && (
                      <a
                        href={investment.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:underline flex items-center gap-1"
                      >
                        Visit website <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(investment)}
                    className="flex items-center gap-2"
                  >
                    <Pencil className="w-4 h-4" /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(investment.id)}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};