
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Editor } from "@/components/ui/editor";
import { supabase } from "@/integrations/supabase/client";
import { fetchLPContent, saveLPContent } from "@/utils/contentUtils";

export const LPContentEditor = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("deck");
  const queryClient = useQueryClient();

  const { data: content, isLoading, refetch } = useQuery({
    queryKey: ["lp-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content_sections")
        .select("*")
        .like("section_id", "lp-%")
        .order('updated_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching content sections:", error);
        throw error;
      }
      
      console.log("Fetched content sections:", data);
      return data || [];
    },
  });

  const handleSave = async (sectionId: string, content: string) => {
    try {
      console.log(`Saving content for ${sectionId}...`);
      await saveLPContent(sectionId, content);

      toast({
        title: "Success",
        description: "Content updated successfully",
      });

      // Invalidate ALL queries
      console.log("Invalidating all queries...");
      await queryClient.invalidateQueries();
      
      // Specifically invalidate any related LP content queries
      await queryClient.invalidateQueries({ queryKey: ["lp-content"] });
      await queryClient.invalidateQueries({ queryKey: ["lp-content", sectionId] });
      
      console.log(`Invalidated queries for section: ${sectionId}`);
      
      // Force refetch current content
      await refetch();
      
      console.log("Content saved and cache invalidated successfully");
    } catch (error) {
      console.error("Error saving content:", error);
      toast({
        title: "Error",
        description: "Failed to update content: " + (error instanceof Error ? error.message : "Unknown error"),
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <Loader2 className="w-8 h-8 animate-spin" />;
  }

  const sections = [
    { id: "deck", title: "Deck" },
    { id: "thesis", title: "Investment Thesis" },
    { id: "schedule", title: "Schedule of Investments" },
    { id: "memos", title: "Company Memos" },
    { id: "criteria", title: "Investment Criteria" },
    { id: "protocol", title: "Valuation Protocol" },
    { id: "screening", title: "Screening Process" },
    { id: "bio", title: "Team Bio" },
    { id: "workflow", title: "Workflow" },
    { id: "ira", title: "IRA Information" },
    { id: "mockup", title: "LP Portal Mockup" },
    { id: "agreements", title: "LP Agreements" },
  ];

  // Get the most recent content for each section
  const getLatestContent = (sectionId: string) => {
    if (!content) return "";
    
    const sectionContent = content
      .filter(c => c.section_id === `lp-${sectionId}`)
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    
    return sectionContent.length > 0 ? sectionContent[0].description : "";
  };

  return (
    <Card className="mb-8">
      <CardHeader className="border-b">
        <CardTitle>LP Data Room Content</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs value={activeSection} onValueChange={setActiveSection}>
          <div className="mb-6">
            <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground w-full flex-wrap gap-1">
              {sections.map((section) => (
                <TabsTrigger 
                  key={section.id} 
                  value={section.id}
                  className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm h-8 rounded-md px-3 text-sm font-medium"
                >
                  {section.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="mt-4">
            {sections.map((section) => (
              <TabsContent 
                key={section.id} 
                value={section.id}
                className="mt-0 border-0"
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {section.title}
                  </h3>
                  <div className="rounded-lg">
                    <Editor
                      initialContent={getLatestContent(section.id)}
                      onSave={(content) => handleSave(section.id, content)}
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};
