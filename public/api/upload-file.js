
// Simple proxy to handle file uploads via JavaScript when PHP isn't available
// This helps bypass CORS issues and authentication problems

async function handleRequest(request) {
  try {
    console.log("[Upload Worker] Received request", request.method);
    
    // For OPTIONS requests, return CORS headers
    if (request.method === 'OPTIONS') {
      console.log("[Upload Worker] Handling OPTIONS request");
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        },
        status: 200
      });
    }
    
    // Only handle POST requests
    if (request.method !== 'POST') {
      console.log("[Upload Worker] Method not allowed:", request.method);
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        status: 405
      });
    }
    
    // Handle direct upload to Supabase
    try {
      console.log("[Upload Worker] Uploading directly to Supabase");
      
      // Create a copy of the request body for upload
      const formData = await request.formData();
      const file = formData.get('file');
      
      if (!file) {
        console.error("[Upload Worker] No file in request");
        throw new Error("No file found in request");
      }
      
      console.log("[Upload Worker] File received:", file.name, file.size, "bytes");
      
      // Create a new FormData object for the Supabase request
      const supabaseFormData = new FormData();
      supabaseFormData.append('file', file);
      
      // Supabase Edge Function URL
      const supabaseUrl = "https://hjjtsbkxxvygpurfhlub.supabase.co/functions/v1/upload-file";
      console.log("[Upload Worker] Forwarding to:", supabaseUrl);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        console.log("[Upload Worker] Request timeout - aborting");
        controller.abort();
      }, 30000); // 30 second timeout
      
      const response = await fetch(supabaseUrl, {
        method: 'POST',
        headers: {
          // No auth headers in service worker for security
          'Accept': 'application/json',
        },
        body: supabaseFormData,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      console.log("[Upload Worker] Supabase response status:", response.status);
      
      // Get response data
      let responseData;
      let responseText;
      
      try {
        responseText = await response.text();
        console.log("[Upload Worker] Raw response:", responseText);
        responseData = JSON.parse(responseText);
      } catch (parseError) {
        console.error("[Upload Worker] Failed to parse response:", parseError);
        console.log("[Upload Worker] Response text:", responseText);
        throw new Error(`Invalid response from server: ${responseText.substring(0, 100)}...`);
      }
      
      if (!response.ok) {
        console.error("[Upload Worker] Error response:", responseData);
        throw new Error(responseData.error || `Upload failed with status: ${response.status}`);
      }
      
      // Return the response with CORS headers
      return new Response(JSON.stringify(responseData), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    } catch (error) {
      console.error("[Upload Worker] Error:", error);
      
      return new Response(JSON.stringify({
        error: 'Upload error',
        message: error.message || 'Unknown error',
        stack: error.stack
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    }
  } catch (error) {
    console.error("[Upload Worker] Fatal error:", error);
    
    return new Response(JSON.stringify({
      error: 'Proxy error',
      message: error.message || 'Unknown error',
      stack: error.stack
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
}

// Set up event listener
self.addEventListener('fetch', event => {
  if (event.request.url.includes('/api/upload-file')) {
    console.log("[Upload Worker] Intercepting fetch for:", event.request.url);
    event.respondWith(handleRequest(event.request));
  }
});
