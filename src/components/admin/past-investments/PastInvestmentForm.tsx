import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export interface InvestmentFormValues {
  name: string;
  logo_url: string;
  website_url?: string;
}

interface PastInvestmentFormProps {
  defaultValues?: InvestmentFormValues;
  onSubmit: (values: InvestmentFormValues) => void;
  onCancel: () => void;
}

export const PastInvestmentForm = ({
  defaultValues,
  onSubmit,
  onCancel,
}: PastInvestmentFormProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const { register, handleSubmit, setValue, watch } = useForm<InvestmentFormValues>({
    defaultValues: defaultValues || {
      name: "",
      logo_url: "",
      website_url: "",
    },
  });

  const currentLogoUrl = watch("logo_url");

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/functions/v1/upload-investment-logo", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const { publicUrl } = await response.json();
      setValue("logo_url", `/lovable-uploads/${file.name}`);
      toast({
        title: "Success",
        description: "Logo uploaded successfully",
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Error",
        description: "Failed to upload logo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Company Name</Label>
        <Input id="name" {...register("name", { required: true })} />
      </div>

      <div>
        <Label htmlFor="logo">Logo</Label>
        <div className="flex gap-4 items-center">
          <Input
            id="logo"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
          {currentLogoUrl && (
            <img
              src={currentLogoUrl}
              alt="Logo preview"
              className="w-12 h-12 object-contain"
            />
          )}
        </div>
        <Input
          type="hidden"
          {...register("logo_url", { required: true })}
        />
      </div>

      <div>
        <Label htmlFor="website">Website URL (optional)</Label>
        <Input id="website" {...register("website_url")} />
      </div>

      <div className="flex gap-4 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isUploading}>
          {isUploading ? "Uploading..." : defaultValues ? "Update" : "Add"}
        </Button>
      </div>
    </form>
  );
};