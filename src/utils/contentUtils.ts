
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
      .limit(1);
    
    if (error) {
      console.error(`Error fetching content for ${sectionId}:`, error);
      return `<p class="text-red-600">Error loading content: ${error.message || "Database error occurred"}</p>`;
    }
    
    if (!data || data.length === 0) {
      console.log(`No content found for ${sectionId}`);
      return "";
    }
    
    console.log(`Content retrieved for ${sectionId}:`, data[0]?.description ? "Content found" : "No content");
    return data[0]?.description || "";
  } catch (err) {
    console.error(`Exception fetching content for ${sectionId}:`, err);
    const errorMessage = err instanceof Error 
      ? err.message 
      : "Unknown error occurred";
    return `<p class="text-red-600">Failed to fetch content: ${errorMessage}</p>`;
  }
};

export const saveLPContent = async (sectionId: string, content: string) => {
  console.log(`Saving LP content for section: ${sectionId}`, content ? "Content present" : "No content");
  
  try {
    // Process content to ensure links are properly formatted
    const processedContent = content.trim();
    
    // Insert a new record instead of using upsert
    const { data, error } = await supabase
      .from("content_sections")
      .insert({
        section_id: `lp-${sectionId}`,
        description: processedContent,
        title: sectionId.charAt(0).toUpperCase() + sectionId.slice(1),
        updated_at: new Date().toISOString(),
      });

    if (error) {
      console.error(`Error saving content for ${sectionId}:`, error);
      throw new Error(error.message || "Database error occurred");
    }
    
    console.log(`Content saved successfully for ${sectionId}`);
    return true;
  } catch (error) {
    console.error(`Exception saving content for ${sectionId}:`, error);
    const errorMessage = error instanceof Error 
      ? error.message 
      : "Unknown error occurred";
    throw new Error(`Failed to save content: ${errorMessage}`);
  }
};
