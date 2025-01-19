import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AssetAllocationChart } from "./AssetAllocationChart";

export const InvestmentPhilosophy = () => {
  const { data: content } = useQuery({
    queryKey: ["wealth-perspective"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content_sections")
        .select("*")
        .eq("section_id", "wealth-perspective")
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-6">{content?.title || "Our Investment Philosophy"}</h2>
          <p className="text-xl text-gray-600">
            {content?.description || "We find "best in class" deals investors don't have access to"}
          </p>
        </div>
        
        <AssetAllocationChart />
      </div>
    </section>
  );
};