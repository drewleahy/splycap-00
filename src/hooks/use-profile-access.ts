
import { useState, useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

export const useProfileAccess = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isChecking, setIsChecking] = useState(false);

  const checkAccess = useCallback(async (profileId: string) => {
    if (!user) {
      toast({
        title: "Access Denied",
        description: "You must be logged in to access profiles",
        variant: "destructive",
      });
      return false;
    }

    try {
      setIsChecking(true);
      const { data, error } = await supabase
        .rpc('can_access_profile', {
          user_id: user.id,
          profile_id: profileId
        });

      if (error) {
        console.error('Error checking profile access:', error);
        toast({
          title: "Error",
          description: "Could not verify access permissions",
          variant: "destructive",
        });
        return false;
      }

      if (!data) {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access this profile",
          variant: "destructive",
        });
      }

      return data;
    } catch (err) {
      console.error('Error in checkAccess:', err);
      return false;
    } finally {
      setIsChecking(false);
    }
  }, [user, toast]);

  return {
    checkAccess,
    isChecking
  };
};
