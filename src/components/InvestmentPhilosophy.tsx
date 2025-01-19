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
        .maybeSingle();
      
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

  if (!philosophyContent) {
    return (
      <div className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          No content available
        </div>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">{philosophyContent.title}</h2>
          <p className="text-lg text-gray-600">
            {philosophyContent.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">A Long-Term Alpha Perspective</h3>
          <div className="space-y-6 text-gray-600">
            <p>
              We are business builders seeking to maximize long-term value while forging defensible industry leaders. Our philosophy underscores the importance of backing innovation while fostering growth in ventures who are poised to make a substantial difference.
            </p>
            <p className="font-bold">
              Our vehicles enable us to hold investments for the long term, while adding continuous value to their core businesses.
            </p>
            <p>
              Our investor base of business owners, family offices, and foundations serve as a patient source of capital. As a result, our portfolio companies operate without the pressure to accept trade-offs associated with short-term investment horizons, optimizing outcomes for all stakeholders in the long run.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};