
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

type CommissionFormProps = {
  partnerId: string;
  lpId?: string;
  onSuccess?: () => void;
  initialData?: any;
};

export function CommissionForm({ partnerId, lpId, onSuccess, initialData }: CommissionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      commission_type: initialData?.commission_type || "management_fee",
      percentage: initialData?.percentage || "",
      expenses_percentage: initialData?.expenses_percentage || "0",
      secondary_partner_id: initialData?.secondary_partner_id || "",
      secondary_percentage: initialData?.secondary_percentage || "0",
    },
  });

  // Fetch all venture partners for secondary partner selection
  const { data: partners, isLoading: loadingPartners, error: partnersError } = useQuery({
    queryKey: ["venture-partners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, first_name, last_name")
        .eq("role", "venture_partner");
      
      if (error) throw error;
      return data || [];
    },
  });

  const onSubmit = async (values: any) => {
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      const table = lpId ? "lp_commission_settings" : "commission_settings";
      
      // Prepare the payload
      const payload = {
        ...initialData ? { id: initialData.id } : {}, // Include ID for updates
        partner_id: partnerId,
        ...values,
        ...(lpId && { lp_id: lpId }),
      };

      // Perform upsert operation
      const { error } = await supabase
        .from(table)
        .upsert(payload);

      if (error) throw error;

      toast({
        title: "Commission settings updated",
        description: "The commission settings have been successfully saved.",
      });

      if (onSuccess) onSuccess();
      form.reset(values); // Reset form with new values
      
    } catch (error: any) {
      console.error("Error saving commission settings:", error);
      setFormError(error.message);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (partnersError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Error loading partners: {partnersError.message}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {formError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )}
        
        <FormField
          control={form.control}
          name="commission_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commission Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select commission type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="management_fee">Management Fee</SelectItem>
                  <SelectItem value="carry">Carry</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="percentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commission Percentage</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  step="0.01" 
                  {...field} 
                  disabled={isSubmitting} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expenses_percentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expenses Percentage</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  step="0.01" 
                  {...field} 
                  disabled={isSubmitting} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="secondary_partner_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secondary Partner (Optional)</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isSubmitting || loadingPartners}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select secondary partner" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {partners?.map((partner) => (
                    <SelectItem key={partner.id} value={partner.id}>
                      {partner.first_name} {partner.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="secondary_percentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secondary Partner Percentage</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  {...field}
                  disabled={isSubmitting || !form.watch("secondary_partner_id")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Saving..." : initialData ? "Update Commission Settings" : "Save Commission Settings"}
        </Button>
      </form>
    </Form>
  );
}
