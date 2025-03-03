
import { supabase } from "@/integrations/supabase/client";

export const fetchLPContent = async (sectionId: string) => {
  console.log(`Fetching LP content for section: ${sectionId}`);
  
  try {
    const { data, error } = await supabase
      .from("content_sections")
      .select("description")
      .eq("section_id", `lp-${sectionId}`)
      .maybeSingle();
    
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
    const { error } = await supabase
      .from("content_sections")
      .upsert({
        section_id: `lp-${sectionId}`,
        description: content,
        title: sectionId.charAt(0).toUpperCase() + sectionId.slice(1),
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'section_id'
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
