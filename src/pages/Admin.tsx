import { WealthPerspectiveEditor } from "@/components/admin/WealthPerspectiveEditor";
import { PartnersEditor } from "@/components/admin/PartnersEditor";
import { CTAEditor } from "@/components/admin/CTAEditor";
import { FooterEditor } from "@/components/admin/FooterEditor";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleRefreshAll = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["wealth-perspective"] }),
      queryClient.invalidateQueries({ queryKey: ["partners"] }),
      queryClient.invalidateQueries({ queryKey: ["cta-sections"] }),
      queryClient.invalidateQueries({ queryKey: ["footer-content"] }),
      queryClient.invalidateQueries({ queryKey: ["philosophy-content"] }),
    ]);
    
    toast({
      title: "Data refreshed",
      description: "All content has been updated from the database.",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <Button onClick={handleRefreshAll} className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh All
        </Button>
      </div>
      <div className="space-y-8">
        <WealthPerspectiveEditor />
        <PartnersEditor />
        <CTAEditor />
        <FooterEditor />
      </div>
    </div>
  );
};

export default Admin;