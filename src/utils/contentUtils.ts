
import { supabase } from "@/integrations/supabase/client";

export const fetchLPContent = async (sectionId: string) => {
  console.log(`Fetching LP content for section: ${sectionId}`);
  
  try {
    // Get the most recent entry for this section
    const { data, error } = await supabase
      .from("content_sections")
      .select("description")
      .eq("section_id", `lp-${sectionId}`)
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();
    
    if (error) {
      console.error(`Error fetching content for ${sectionId}:`, error);
      throw error;
    }
    
    console.log(`Content retrieved for ${sectionId}:`, data?.description ? "Content found" : "No content");
    return data?.description || "";
  } catch (err) {
    console.error(`Exception fetching content for ${sectionId}:`, err);
    // Return the error in a structured way that will be easier to debug
    const errorMessage = err instanceof Error 
      ? err.message 
      : JSON.stringify(err);
    throw new Error(`Failed to fetch content: ${errorMessage}`);
  }
};

export const saveLPContent = async (sectionId: string, content: string) => {
  console.log(`Saving LP content for section: ${sectionId}`, content ? "Content present" : "No content");
  
  try {
    // Insert a new record instead of using upsert
    const { data, error } = await supabase
      .from("content_sections")
      .insert({
        section_id: `lp-${sectionId}`,
        description: content,
        title: sectionId.charAt(0).toUpperCase() + sectionId.slice(1),
        updated_at: new Date().toISOString(),
      });

    if (error) {
      console.error(`Error saving content for ${sectionId}:`, error);
      throw error;
    }
    
    console.log(`Content saved successfully for ${sectionId}`);
    return true;
  } catch (error) {
    console.error(`Exception saving content for ${sectionId}:`, error);
    throw error;
  }
};
