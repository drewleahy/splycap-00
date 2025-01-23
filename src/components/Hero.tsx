import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export const Hero = () => {
  const { data: heroContent, isLoading } = useQuery({
    queryKey: ["hero-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content_sections")
        .select("*")
        .eq("section_id", "hero")
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/lovable-uploads/260ba02d-aa20-485c-9893-c37ccebd406e.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-30" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-8 text-white text-shadow-lg"
          style={{ fontFamily: 'Helvetica Neue, sans-serif' }}
        >
          SPLYCAP
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl md:text-4xl font-bold mb-6 text-white text-shadow-lg"
        >
          {heroContent?.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          {heroContent?.description}
        </motion.p>
      </div>
    </section>
  );
};