
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Editor } from "@/components/ui/editor";

export const LPContentEditor = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("deck");

  const { data: content, isLoading, refetch } = useQuery({
    queryKey: ["lp-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content_sections")
        .select("*")
        .like("section_id", "lp-%");
      
      if (error) throw error;
      return data || [];
    },
  });

  const handleSave = async (sectionId: string, content: string) => {
    try {
      const { error } = await supabase
        .from("content_sections")
        .upsert({
          section_id: `lp-${sectionId}`,
          description: content,
          title: sectionId.charAt(0).toUpperCase() + sectionId.slice(1),
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Content updated successfully",
      });

      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update content",
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
                      initialContent={
                        content?.find(c => c.section_id === `lp-${section.id}`)?.description || ""
                      }
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
