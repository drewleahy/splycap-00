
import { supabase } from "@/integrations/supabase/client";

export const fetchLPContent = async (sectionId: string) => {
  console.log(`Fetching LP content for section: ${sectionId}`);
  
  try {
    // First, get all entries for this section to check what we have
    const allEntriesResult = await supabase
      .from("content_sections")
      .select("id, section_id, description, updated_at")
      .eq("section_id", `lp-${sectionId}`)
      .order('updated_at', { ascending: false });
    
    if (allEntriesResult.error) {
      console.error(`Error checking all entries for ${sectionId}:`, allEntriesResult.error);
      throw allEntriesResult.error;
    }
    
    console.log(`Found ${allEntriesResult.data.length} entries for ${sectionId}:`, allEntriesResult.data);
    
    // Get the most recent entry
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
    
    console.log(`Content retrieved for ${sectionId}:`, data?.description ? "Yes" : "No");
    return data?.description || "";
  } catch (err) {
    console.error(`Exception fetching content for ${sectionId}:`, err);
    throw err;
  }
};

export const saveLPContent = async (sectionId: string, content: string) => {
  console.log(`Saving LP content for section: ${sectionId}`, content ? "Content present" : "No content");
  
  try {
    // Create a new entry instead of using upsert since there's an issue with the conflict resolution
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
    console.error(`Error saving content for ${sectionId}:`, error);
    throw error;
  }
};
