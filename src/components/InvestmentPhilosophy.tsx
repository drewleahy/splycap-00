import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
          <h2 className="text-4xl font-bold mb-8 text-sply-dark">{content?.title || "Our Investment Philosophy"}</h2>
          <div className="bg-gray-100 py-8 px-10 rounded-xl shadow-sm">
            <p className="text-2xl text-gray-700 font-medium leading-relaxed">
              {content?.description || 'We find "best in class" deals investors don\'t have access to'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};