
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
    
    const content = data[0]?.description || "";
    console.log(`Content retrieved for ${sectionId}:`, content ? "Content found" : "No content");
    if (content) {
      console.log(`Content sample for ${sectionId}:`, content.substring(0, 100) + "...");
    }
    return content;
  } catch (err) {
    console.error(`Exception fetching content for ${sectionId}:`, err);
    const errorMessage = err instanceof Error 
      ? err.message 
      : "Unknown error occurred";
    return `<p class="text-red-600">Failed to fetch content: ${errorMessage}</p>`;
  }
};

export const saveLPContent = async (sectionId: string, content: string) => {
  console.log(`Saving LP content for section: ${sectionId}`);
  
  try {
    // Ensure content is a string to prevent issues
    const processedContent = typeof content === 'string' ? content.trim() : '';
    
    console.log(`Content to save for ${sectionId}:`, 
      processedContent.length > 100 
        ? processedContent.substring(0, 100) + "..." 
        : processedContent
    );
    
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

// Helper function to safely insert content into the editor
export const insertContentIntoEditor = (editorRef: React.RefObject<HTMLDivElement>, content: string) => {
  if (!editorRef.current) {
    console.error("Editor reference is not available");
    return false;
  }

  try {
    // Focus the editor first
    editorRef.current.focus();
    
    // Ensure content is a string
    const safeContent = typeof content === 'string' ? content : String(content);
    
    // Use execCommand to insert HTML at the current cursor position
    document.execCommand('insertHTML', false, safeContent);
    
    console.log("Content inserted successfully:", 
      safeContent.length > 100 
        ? safeContent.substring(0, 100) + "..." 
        : safeContent
    );
    return true;
  } catch (error) {
    console.error("Error inserting content into editor:", error);
    return false;
  }
};
