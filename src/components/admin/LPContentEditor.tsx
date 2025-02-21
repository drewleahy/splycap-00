
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">LP Data Room Content</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 mb-6 bg-muted/60 p-1">
              {sections.map((section) => (
                <TabsTrigger 
                  key={section.id} 
                  value={section.id}
                  className="text-sm whitespace-nowrap data-[state=active]:bg-white"
                >
                  {section.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {sections.map((section) => (
              <TabsContent 
                key={section.id} 
                value={section.id}
                className="border rounded-lg p-4 mt-2 bg-white"
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                  <div className="bg-white rounded-lg">
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
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
