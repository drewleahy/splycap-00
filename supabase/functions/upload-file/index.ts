
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, accept, origin, x-requested-with',
  'Access-Control-Allow-Methods': 'POST, GET, HEAD, OPTIONS',
  'Access-Control-Max-Age': '86400',
}

serve(async (req) => {
  console.log(`Upload function called with method: ${req.method}, url: ${req.url}`);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log("Handling CORS preflight request");
    return new Response(null, { 
      headers: corsHeaders,
      status: 204
    });
  }
  
  // Handle HEAD requests for connection testing
  if (req.method === 'HEAD') {
    console.log("Handling HEAD request for connectivity testing");
    return new Response(null, { 
      headers: corsHeaders,
      status: 200
    });
  }

  if (req.method !== 'POST') {
    console.log(`Method not allowed: ${req.method}`);
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 405 }
    );
  }

  try {
    console.log("Processing upload request");
    
    // Check for authorization
    const authHeader = req.headers.get('Authorization');
    console.log(`Authorization header present: ${!!authHeader}`);
    
    // Get Supabase credentials from environment
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase credentials");
      return new Response(
        JSON.stringify({ error: 'Server configuration error', details: 'Missing credentials' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }
    
    // Initialize Supabase client with service role key for admin access
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Verify user authentication if auth header is present
    let userId = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '');
      try {
        // Verify the JWT token
        const { data: userData, error: authError } = await supabase.auth.getUser(token);
        
        if (authError) {
          console.error("Auth error:", authError);
          // Continue without user ID, will use service role
        } else if (userData?.user) {
          userId = userData.user.id;
          console.log(`Authenticated user: ${userId}`);
        }
      } catch (authError) {
        console.error("Token verification error:", authError);
        // Continue without user ID, will use service role
      }
    } else {
      console.log("No authentication token provided");
      // Still proceed with upload using service role
    }
    
    let formData;
    try {
      formData = await req.formData();
      console.log("Form data parsed successfully");
    } catch (formError) {
      console.error("Error parsing form data:", formError.message);
      return new Response(
        JSON.stringify({ error: 'Error parsing form data', details: formError.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    const file = formData.get('file');

    if (!file) {
      console.error("No file found in request");
      return new Response(
        JSON.stringify({ error: 'No file uploaded' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Log file information
    console.log(`Processing file: ${file.name}, type: ${file.type}, size: ${file.size} bytes`);

    // Sanitize filename to ensure it only contains safe characters
    const sanitizedFileName = file.name.replace(/[^\x00-\x7F]/g, '');
    const fileExt = sanitizedFileName.split('.').pop();
    const filePath = `${crypto.randomUUID()}.${fileExt}`;

    // Ensure we're storing files in a valid bucket
    const bucketName = 'lovable-uploads';
    console.log(`Uploading file to bucket: ${bucketName}, path: ${filePath}`);

    // Create the bucket if it doesn't exist (this requires admin privileges)
    try {
      const { data: bucketExists, error: bucketError } = await supabase.storage.getBucket(bucketName);
      
      if (bucketError || !bucketExists) {
        console.log(`Bucket ${bucketName} does not exist or error checking, creating it...`);
        const { error: createBucketError } = await supabase.storage.createBucket(bucketName, {
          public: true,
          fileSizeLimit: 10485760, // 10MB
        });
        
        if (createBucketError) {
          console.error(`Failed to create bucket: ${createBucketError.message}`);
          // Continue anyway as bucket might actually exist
        } else {
          console.log(`Bucket ${bucketName} created successfully`);
        }
      }
    } catch (bucketError) {
      console.error(`Error checking/creating bucket: ${bucketError.message || bucketError}`);
      // Continue anyway, as the bucket might actually exist
    }

    // Upload the file as admin to bypass RLS policies
    const { data, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        contentType: file.type,
        upsert: true
      });

    if (uploadError) {
      console.error("Upload error:", JSON.stringify(uploadError));
      return new Response(
        JSON.stringify({ error: 'Failed to upload file', details: uploadError }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    // Get the public URL for the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    console.log(`File uploaded successfully. Public URL: ${publicUrl}`);

    // Record upload in metadata table if user is authenticated
    if (userId) {
      try {
        console.log(`Recording upload metadata for user ${userId}`);
        // This would insert into a hypothetical uploads table
        // You could uncomment this if you create that table
        /*
        const { error: metadataError } = await supabase
          .from('uploads')
          .insert({
            user_id: userId,
            file_path: filePath,
            file_name: sanitizedFileName,
            content_type: file.type,
            size_bytes: file.size,
            public_url: publicUrl
          });
        
        if (metadataError) {
          console.error("Error recording upload metadata:", metadataError);
          // Continue anyway, the upload itself was successful
        }
        */
      } catch (metadataError) {
        console.error("Failed to record upload metadata:", metadataError);
        // Continue anyway, the upload itself was successful
      }
    }

    // Success response with CORS headers
    return new Response(
      JSON.stringify({ 
        message: 'File uploaded successfully', 
        filePath,
        publicUrl 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error:", error.message || error);
    console.error("Stack trace:", error.stack || "No stack trace available");
    
    // Include more detailed error information
    const errorDetails = {
      message: error.message || "Unknown error",
      stack: error.stack || "No stack trace available",
      name: error.name || "Error"
    };
    
    return new Response(
      JSON.stringify({ 
        error: 'An unexpected error occurred', 
        details: errorDetails 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
})
