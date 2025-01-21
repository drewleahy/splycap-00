import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const PastInvestments = () => {
  const { data: investments, isLoading } = useQuery({
    queryKey: ["past-investments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("past_investments")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return null;
  }

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Past Investments</h2>
          <p className="text-xl font-semibold text-red-500 mt-4">UNDER CONSTRUCTION</p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {investments?.map((investment, index) => (
            <motion.div
              key={investment.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center"
            >
              <a
                href={investment.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full aspect-[3/2] relative flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <img
                  src={investment.logo_url}
                  alt={`${investment.name} logo`}
                  className="max-w-full max-h-full object-contain"
                />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};