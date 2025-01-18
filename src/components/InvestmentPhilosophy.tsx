import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export const InvestmentPhilosophy = () => {
  const { data: philosophyContent, isLoading } = useQuery({
    queryKey: ["philosophy-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content_sections")
        .select("*")
        .eq("section_id", "investment-philosophy")
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">{philosophyContent?.title}</h2>
          <p className="text-lg text-gray-600">
            {philosophyContent?.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">A Long-Term Wealth Generation Perspective</h3>
          <div className="space-y-6 text-gray-600">
            <p>
              We are business builders who seek to maximize long-term value and create defensible industry leaders. Our vehicles enables us to hold investments for the long term, and our investor base of business owners, family offices, and foundations serves as a patient source of capital.
            </p>
            <p>
              As a result, our portfolio companies operate without the pressure to accept trade-offs associated with short-term investment horizons and instead seek to optimize outcomes for all stakeholders over the long run.
            </p>
            <p>
              Our philosophy underscores the importance of backing innovation while fostering growth in ventures who are poised to make a substantial difference.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};