
import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Deal } from "@/types/deal";

export const useDeals = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const fetchDeals = useCallback(async (showToast = false) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase.from('deals').select('*');
      
      if (error) {
        console.error('Error loading deals:', error.message);
        throw new Error(error.message);
      }

      setDeals(data ?? []);
      
      if (showToast) {
        toast({
          title: "Success",
          description: "Deals refreshed successfully",
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      console.error("Error in fetchDeals:", errorMessage);
      setError(err instanceof Error ? err : new Error(errorMessage));
      
      if (showToast) {
        toast({
          title: "Error",
          description: "Could not load deals. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  return { 
    deals, 
    isLoading, 
    error,
    refetch: (showToast = true) => fetchDeals(showToast)
  };
};
