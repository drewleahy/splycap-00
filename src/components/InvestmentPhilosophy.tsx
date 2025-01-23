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
          <h2 className="text-4xl font-bold mb-12 text-sply-dark">{content?.title || "Our Investment Philosophy"}</h2>
          <div className="bg-[#F6F6F7] py-12 px-16 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-gray-200">
            <p className="text-3xl text-gray-800 font-semibold leading-relaxed tracking-wide">
              {content?.description || 'We find "best in class" deals investors don\'t have access to'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};