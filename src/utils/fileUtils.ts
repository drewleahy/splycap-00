
import { supabase } from "@/integrations/supabase/client";

/**
 * Fetches files from the specified bucket
 */
export const fetchFilesFromBucket = async (bucketName: string = 'lovable-uploads') => {
  try {
    console.log(`Fetching files from ${bucketName} bucket`);
    
    const { data, error } = await supabase
      .storage
      .from(bucketName)
      .list('', {
        sortBy: { column: 'name', order: 'asc' }
      });
    
    if (error) {
      console.error('Error fetching files:', error);
      throw error;
    }
    
    // Filter out folders and only return files
    const files = data?.filter(item => !item.id.endsWith('/')) || [];
    console.log(`Found ${files.length} files in ${bucketName} bucket`);
    
    // Add public URLs to each file
    return files.map(file => ({
      ...file,
      publicUrl: supabase.storage.from(bucketName).getPublicUrl(file.name).data.publicUrl
    }));
  } catch (error) {
    console.error('Exception fetching files from bucket:', error);
    throw error;
  }
};

/**
 * Gets file metadata including the public URL
 */
export const getFileMetadata = (bucketName: string, filePath: string) => {
  const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
  return {
    name: filePath.split('/').pop() || filePath,
    path: filePath,
    publicUrl: data.publicUrl
  };
};
