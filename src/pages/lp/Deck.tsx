
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const Deck = () => {
  const { data: content, isLoading } = useQuery({
    queryKey: ["lp-content", "deck"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lp_content")
        .select("content")
        .eq("section", "deck")
        .maybeSingle();
      
      if (error) throw error;
      return data?.content || "";
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Link to="/LP-Splash">
            <Button variant="ghost" className="mb-4">
              ← Back to Data Room
            </Button>
          </Link>
          <h1 className="text-3xl font-semibold text-sply-dark mb-6">SPLY Capital Deck</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            {isLoading ? (
              <Loader2 className="w-8 h-8 animate-spin" />
            ) : content ? (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              <p className="text-gray-600">Content coming soon.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Deck;
