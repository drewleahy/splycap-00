import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const OurAllocations = () => {
  const { data: investments } = useQuery({
    queryKey: ["past-investments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("past_investments")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) {
        console.error("Error fetching past investments:", error);
        throw error;
      }
      return data;
    },
  });

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">Past Investments</h2>
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-600 leading-relaxed">
            Over the past two decades, our partners have allocated to a host of top performing deals. 
            Including personal investments, venture capital funds, SPVs, and other private investments, 
            SPLYCAP has placed tens of millions of private capital
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center">
          {investments?.map((investment, index) => (
            <div 
              key={investment.id} 
              className="w-full h-32 flex items-center justify-center p-4 bg-white rounded-lg transition-transform hover:scale-105"
            >
              <img
                src={investment.logo_url}
                alt={investment.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-xl text-gray-600 italic">And many more...</p>
        </div>
      </div>
    </section>
  );
};