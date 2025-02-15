import { Briefcase, Building2, LineChart, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const iconMap: { [key: string]: any } = {
  Briefcase,
  Building2,
  LineChart,
};

export const InvestmentFocus = () => {
  const { data: focusContent, isLoading: isTitleLoading } = useQuery({
    queryKey: ["focus-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content_sections")
        .select("*")
        .eq("section_id", "investment-focus")
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const { data: investments, isLoading: isItemsLoading } = useQuery({
    queryKey: ["investment-items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("investment_focus_items")
        .select("*")
        .order("created_at");
      
      if (error) throw error;
      return data;
    },
  });

  if (isTitleLoading || isItemsLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
          {focusContent?.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {investments?.map((investment, index) => {
            const Icon = iconMap[investment.icon];
            return (
              <motion.div
                key={investment.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                {Icon && <Icon className="w-12 h-12 text-gray-800 mb-4" />}
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{investment.title}</h3>
                <p className="text-gray-600">{investment.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};