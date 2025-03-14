
// Simple proxy to handle file uploads via JavaScript when PHP isn't available
// This helps bypass CORS issues and authentication problems

async function handleRequest(request) {
  try {
    console.log("JS upload proxy received request");
    
    // For OPTIONS requests, return CORS headers
    if (request.method === 'OPTIONS') {
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
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        status: 405
      });
    }
    
    // Try to upload directly to the PHP endpoint first (more reliable in many cases)
    try {
      console.log("Attempting to upload via local PHP endpoint");
      const phpResponse = await fetch("/api/upload-file.php", {
        method: 'POST',
        body: request.body,
        headers: request.headers
      });
      
      if (phpResponse.ok) {
        const phpData = await phpResponse.text();
        console.log("PHP upload succeeded");
        return new Response(phpData, {
          status: phpResponse.status,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          }
        });
      } else {
        console.log("PHP upload failed, trying Supabase fallback");
      }
    } catch (phpError) {
      console.error("PHP upload attempt failed:", phpError.message);
      // Continue to Supabase fallback
    }
    
    // Forward to Supabase Edge Function as fallback
    const supabaseUrl = "https://hjjtsbkxxvygpurfhlub.supabase.co/functions/v1/upload-file";
    console.log("Forwarding to Supabase Edge Function:", supabaseUrl);
    
    const response = await fetch(supabaseUrl, {
      method: 'POST',
      headers: {
        // Strip authentication headers if present
        'Content-Type': request.headers.get('Content-Type'),
      },
      body: await request.arrayBuffer()
    });
    
    // Get response data
    const responseData = await response.text();
    console.log("Supabase response status:", response.status);
    
    // Return the response with CORS headers
    return new Response(responseData, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch (error) {
    console.error("JS upload proxy error:", error);
    
    return new Response(JSON.stringify({
      error: 'Proxy error',
      message: error.message || 'Unknown error'
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
  event.respondWith(handleRequest(event.request));
});
