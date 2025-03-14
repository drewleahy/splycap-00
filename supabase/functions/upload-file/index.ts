
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log("Handling CORS preflight request")
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log("Upload file function called")
    
    const formData = await req.formData()
    const file = formData.get('file')

    if (!file) {
      console.error("No file uploaded")
      return new Response(
        JSON.stringify({ error: 'No file uploaded' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Get Supabase credentials from environment
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase credentials")
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Log file information
    console.log(`Processing file: ${file.name}, type: ${file.type}, size: ${file.size} bytes`)

    // Sanitize filename to ensure it only contains safe characters
    const sanitizedFileName = file.name.replace(/[^\x00-\x7F]/g, '')
    const fileExt = sanitizedFileName.split('.').pop()
    const filePath = `${crypto.randomUUID()}.${fileExt}`

    // Ensure we're storing files in a valid bucket
    const bucketName = 'lovable-uploads'
    console.log(`Uploading file to bucket: ${bucketName}, path: ${filePath}`)

    // Create the bucket if it doesn't exist (this requires admin privileges)
    try {
      const { data: bucketExists, error: bucketError } = await supabase.storage.getBucket(bucketName)
      
      if (bucketError || !bucketExists) {
        console.log(`Bucket ${bucketName} does not exist or error checking, creating it...`)
        const { error: createBucketError } = await supabase.storage.createBucket(bucketName, {
          public: true,
          fileSizeLimit: 10485760, // 10MB
        })
        
        if (createBucketError) {
          console.error(`Failed to create bucket: ${createBucketError.message}`)
        } else {
          console.log(`Bucket ${bucketName} created successfully`)
        }
      }
    } catch (bucketError) {
      console.error(`Error checking/creating bucket: ${bucketError.message || bucketError}`)
      // Continue anyway, as the bucket might actually exist
    }

    // Upload the file as admin to bypass RLS policies
    const { data, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        contentType: file.type,
        upsert: true
      })

    if (uploadError) {
      console.error("Upload error:", JSON.stringify(uploadError))
      return new Response(
        JSON.stringify({ error: 'Failed to upload file', details: uploadError }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // Get the public URL for the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath)

    console.log(`File uploaded successfully. Public URL: ${publicUrl}`)

    return new Response(
      JSON.stringify({ 
        message: 'File uploaded successfully', 
        filePath,
        publicUrl 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    console.error("Unexpected error:", error.message || error)
    
    // Include more detailed error information
    const errorDetails = {
      message: error.message || "Unknown error",
      stack: error.stack || "No stack trace available",
      name: error.name || "Error"
    }
    
    return new Response(
      JSON.stringify({ 
        error: 'An unexpected error occurred', 
        details: errorDetails 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
