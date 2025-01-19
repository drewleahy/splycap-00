import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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

export type InvestmentFormValues = z.infer<typeof formSchema>;

interface PastInvestmentFormProps {
  defaultValues?: InvestmentFormValues;
  onSubmit: (values: InvestmentFormValues) => Promise<void>;
  onCancel: () => void;
}

export const PastInvestmentForm = ({ defaultValues, onSubmit, onCancel }: PastInvestmentFormProps) => {
  const form = useForm<InvestmentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: "",
      logo_url: "",
      website_url: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            onClick={onCancel}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" /> Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};