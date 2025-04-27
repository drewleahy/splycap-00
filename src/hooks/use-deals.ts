
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Deal } from "@/types/deal";

export const useDeals = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchDeals = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("deals")
        .select("*")
        .order("created_at", { ascending: false });
        
      if (error) {
        console.error("Supabase error fetching deals:", error);
        throw error;
      }
      
      console.log("Deals fetched:", data);
      setDeals(data || []);
    } catch (error) {
      console.error("Error fetching deals:", error);
      toast({
        title: "Error",
        description: "Could not load deals. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { deals, isLoading, fetchDeals };
};
