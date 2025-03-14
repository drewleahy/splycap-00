
import { supabase } from "@/integrations/supabase/client";

export const uploadFile = async (file: File): Promise<string> => {
  console.log("Starting file upload with uploadFile function:", file.name);
  
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    // Get Supabase session for auth token
    const session = await supabase.auth.getSession();
    const accessToken = session.data.session?.access_token;
    
    // If we have a token, try the edge function with auth
    if (accessToken) {
      console.log("Authenticated upload attempt");
      try {
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL || 'https://hjjtsbkxxvygpurfhlub.supabase.co'}/functions/v1/upload-file`, {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Edge function upload failed:", errorText);
          throw new Error(`Upload failed with status: ${response.status}. ${errorText}`);
        }
        
        const data = await response.json();
        console.log("Upload successful via edge function:", data.publicUrl);
        return data.publicUrl;
      } catch (edgeError) {
        console.error("Edge function upload error:", edgeError);
        // Fall through to try other methods
      }
    }
    
    // Try PHP upload (fallback 1)
    console.log("Trying PHP upload endpoint");
    try {
      const phpResponse = await fetch(`${window.location.origin}/api/upload-file.php`, {
        method: 'POST',
        body: formData
      });
      
      if (phpResponse.ok) {
        const phpData = await phpResponse.json();
        if (phpData.url) {
          console.log("Upload successful via PHP:", phpData.url);
          return phpData.url;
        }
      }
    } catch (phpError) {
      console.error("PHP upload failed:", phpError);
      // Continue to next method
    }
    
    // Try JS proxy (fallback 2)
    console.log("Trying JS proxy endpoint");
    try {
      const jsResponse = await fetch(`${window.location.origin}/api/upload-file`, {
        method: 'POST',
        body: formData
      });
      
      if (jsResponse.ok) {
        const jsData = await jsResponse.json();
        if (jsData.url) {
          console.log("Upload successful via JS proxy:", jsData.url);
          return jsData.url;
        }
      }
    } catch (jsError) {
      console.error("JS proxy upload failed:", jsError);
      // Continue to next method
    }
    
    // If all else fails, try direct storage upload
    console.log("Falling back to direct storage upload");
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const bucketName = 'lovable-uploads';
    
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });
    
    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data?.path || fileName);
    
    console.log("Upload successful via direct storage:", publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('All upload methods failed:', error);
    throw error;
  }
};
