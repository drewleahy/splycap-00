
import { supabase } from "@/integrations/supabase/client";

export const uploadFile = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    // Use the Supabase Edge Function
    const response = await fetch(`${supabase.auth.getSession().then(res => res.data.session?.access_token ? 
      `${supabase.supabaseUrl}/functions/v1/upload-file` : null)}`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
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
