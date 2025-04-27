
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Deal } from "@/types/deal";

export const useDeals = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);
  const { toast } = useToast();

  const fetchDeals = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage(null);
      
      const { data, error } = await supabase
        .from("deals")
        .select("*")
        .order("created_at", { ascending: false });
        
      if (error) {
        console.error("Supabase error fetching deals:", error);
        
        let message = "Could not load deals. Please try again later.";
        if (error.message?.includes("infinite recursion")) {
          message = "Database policy error. Please contact an administrator.";
          console.log("This is an RLS policy error in Supabase that requires administrator attention.");
        }
        
        setErrorMessage(message);
        throw error;
      }
      
      console.log("Deals fetched successfully:", data?.length || 0, "deals");
      setDeals(data || []);
    } catch (error) {
      console.error("Error fetching deals:", error);
      setIsError(true);
      toast({
        title: "Error",
        description: errorMessage || "Could not load deals. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setHasAttemptedFetch(true);
      setIsLoading(false);
    }
  }, [toast, errorMessage]);

  // Fetch deals on mount - but only once, not repeatedly if there's an RLS error
  useEffect(() => {
    if (!hasAttemptedFetch) {
      fetchDeals();
    }
  }, [fetchDeals, hasAttemptedFetch]);

  return { deals, isLoading, isError, errorMessage, fetchDeals, hasAttemptedFetch };
};
