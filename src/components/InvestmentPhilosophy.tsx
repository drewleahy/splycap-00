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
          <h2 className="text-4xl font-bold mb-4 text-sply-dark">{content?.title || "Our Investment Philosophy"}</h2>
          <div className="bg-[#F6F6F7] py-8 px-10 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
            <p className="text-lg text-gray-700 font-medium leading-relaxed">
              {content?.description || 'We are business builders who seek to maximize long-term value and create defensible industry leaders. Our vehicles enables us to hold investments for the long term, and our investor base of business owners, family offices, and foundations serves as a patient source of capital.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};