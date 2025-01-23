import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const PastInvestments = () => {
  const { toast } = useToast();
  const { data: investments, isLoading } = useQuery({
    queryKey: ["past-investments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("past_investments")
        .select("*")
        .order("name");
      
      if (error) {
        toast({
          title: "Error loading investments",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      return data;
    },
  });

  if (isLoading) {
    return null;
  }

  const getImageUrl = (url: string) => {
    try {
      console.log('Processing URL:', url);
      
      // If it's already a relative path starting with /lovable-uploads, use it as is
      if (url.startsWith('/lovable-uploads/')) {
        console.log('Using relative path:', url);
        return url;
      }
      
      // If it's just a filename, assume it's in lovable-uploads
      if (!url.includes('/')) {
        console.log('Using filename directly:', url);
        return `/lovable-uploads/${url}`;
      }
      
      // Default case: return the URL as is
      console.log('Using URL as is:', url);
      return url;
    } catch (error) {
      console.error('Error processing image URL:', url, error);
      return url;
    }
  };

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
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {investments?.map((investment, index) => {
            const logoUrl = getImageUrl(investment.logo_url);
            console.log(`Processing image for ${investment.name}:`, {
              original: investment.logo_url,
              processed: logoUrl
            });
            
            return (
              <motion.div
                key={investment.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <a
                  href={investment.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-32 relative flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <img
                    src={logoUrl}
                    alt={`${investment.name} logo`}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      const target = e.currentTarget;
                      console.error(`Error loading image for ${investment.name}:`, {
                        url: logoUrl,
                        originalUrl: investment.logo_url,
                        error: e
                      });
                      target.onerror = null; // Prevent infinite loop
                      target.src = "/placeholder.svg";
                      toast({
                        title: "Image failed to load",
                        description: `Could not load logo for ${investment.name}. Please check the image URL in the database.`,
                        variant: "destructive",
                      });
                    }}
                  />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};