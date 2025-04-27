
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Deal } from "@/types/deal";

export const useDeals = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { toast } = useToast();

  const fetchDeals = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      
      const { data, error } = await supabase
        .from("deals")
        .select("*")
        .order("created_at", { ascending: false });
        
      if (error) {
        console.error("Supabase error fetching deals:", error);
        throw error;
      }
      
      console.log("Deals fetched successfully:", data?.length || 0, "deals");
      setDeals(data || []);
    } catch (error) {
      console.error("Error fetching deals:", error);
      setIsError(true);
      toast({
        title: "Error",
        description: "Could not load deals. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Fetch deals on mount
  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  return { deals, isLoading, isError, fetchDeals };
};
