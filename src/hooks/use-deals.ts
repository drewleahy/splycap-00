
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
      console.log("Starting to fetch deals from Supabase...");
      setIsLoading(true);
      setError(null);
      
      // Use a direct, simpler query with no joins to avoid RLS infinite recursion
      const { data, error: supabaseError } = await supabase
        .from("deals")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (supabaseError) {
        console.error("Supabase error when fetching deals:", supabaseError);
        throw new Error(supabaseError.message);
      }
      
      console.log(`Successfully fetched ${data?.length || 0} deals`);
      if (data?.[0]) console.log("Sample deal data:", data[0]);
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

  useEffect(() => {
    console.log("useDeals hook mounted, fetching deals...");
    // Initial fetch
    fetchDeals();
    
    // Set up Supabase realtime subscription
    const channel = supabase
      .channel('deals-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'deals' }, 
        (payload) => {
          console.log('Realtime update received for deals:', payload);
          fetchDeals();
        }
      )
      .subscribe((status) => {
        console.log(`Realtime subscription status: ${status}`);
      });

    return () => {
      console.log("useDeals hook unmounting, cleaning up...");
      supabase.removeChannel(channel);
    };
  }, [fetchDeals]);

  return { 
    deals, 
    isLoading, 
    error,
    refetch: (showToast = true) => fetchDeals(showToast)
  };
};
