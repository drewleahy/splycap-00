
import { supabase } from "@/integrations/supabase/client";

export const uploadFile = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    // Use the Supabase Edge Function with the correct URL approach
    const session = await supabase.auth.getSession();
    const accessToken = session.data.session?.access_token;
    
    // Check if we have a valid session with token
    if (!accessToken) {
      throw new Error('No authenticated session available');
    }
    
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/upload-file`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Unknown upload error');
    }
    
    const data = await response.json();
    return data.publicUrl;
  } catch (error) {
    console.error('Edge function upload error:', error);
    throw error;
  }
};
