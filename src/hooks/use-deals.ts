
import { useState, useEffect, useCallback } from "react";
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
      
      console.log("Fetching deals from Supabase...");
      
      const { data, error: supabaseError } = await supabase
        .from("deals")
        .select("*")
        .order("created_at", { ascending: false });
        
      if (supabaseError) {
        console.error("Error fetching deals:", supabaseError);
        throw new Error(supabaseError.message);
      }
      
      console.log(`Successfully fetched ${data?.length || 0} deals`);
      setDeals(data || []);
      
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
          description: `Could not load deals: ${errorMessage}`,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Fetch deals on component mount
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
