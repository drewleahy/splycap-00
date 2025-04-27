
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { PendingPartner } from "@/types/partner";

export const usePendingPartners = () => {
  return useQuery({
    queryKey: ["pending-partners"],
    queryFn: async () => {
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select(`
          id,
          first_name,
          last_name,
          created_at,
          email:auth_user_id(email)
        `)
        .eq("status", "pending");
      
      if (error) throw error;

      return (profiles || []).map(profile => ({
        ...profile,
        // Fix the type error by properly accessing the email from the joined data
        // The join returns an array of objects, so we need to access the first item
        email: Array.isArray(profile.email) && profile.email.length > 0 ? profile.email[0]?.email : "No email available"
      })) as PendingPartner[];
    },
  });
};
