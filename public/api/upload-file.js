// Enhanced service worker for file uploads with comprehensive diagnostics

async function handleRequest(request) {
  try {
    console.log("[Upload Worker] Received request", request.method, request.url);
    
    // For OPTIONS requests, return CORS headers
    if (request.method === 'OPTIONS') {
      console.log("[Upload Worker] Handling OPTIONS request");
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, HEAD, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Origin, Accept',
          'Access-Control-Max-Age': '86400',
        },
        status: 204
      });
    }
    
    // Handle HEAD requests for connection testing
    if (request.method === 'HEAD') {
      console.log("[Upload Worker] Handling HEAD request for connectivity testing");
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        status: 200
      });
    }
    
    // Only handle POST requests for actual uploads
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
      console.log("[Upload Worker] Uploading to Supabase");
      
      // Create a copy of the request body for upload
      let formData;
      try {
        formData = await request.formData();
        console.log("[Upload Worker] Form data parsed successfully");
      } catch (formError) {
        console.error("[Upload Worker] Error parsing form data:", formError);
        throw new Error(`Failed to parse form data: ${formError.message}`);
      }
      
      const file = formData.get('file');
      
      if (!file) {
        console.error("[Upload Worker] No file in request");
        throw new Error("No file found in request");
      }
      
      console.log("[Upload Worker] File received:", file.name, file.size, "bytes", file.type);
      
      // Create a new FormData object for the Supabase request
      const supabaseFormData = new FormData();
      supabaseFormData.append('file', file);
      
      // Supabase Edge Function URL
      const supabaseUrl = "https://hjjtsbkxxvygpurfhlub.supabase.co/functions/v1/upload-file";
      console.log("[Upload Worker] Forwarding to:", supabaseUrl);
      
      // First test connectivity with a HEAD request
      try {
        console.log("[Upload Worker] Testing connectivity with HEAD request");
        const testResponse = await fetch(supabaseUrl, {
          method: 'HEAD',
          mode: 'cors',
        });
        console.log("[Upload Worker] Connectivity test result:", testResponse.status, testResponse.statusText);
      } catch (testError) {
        console.warn("[Upload Worker] Connectivity test failed:", testError);
        // Continue anyway, the main request might still work
      }
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        console.log("[Upload Worker] Request timeout - aborting");
        controller.abort();
      }, 60000); // 60 second timeout for large files
      
      console.log("[Upload Worker] Sending upload request");
      const startTime = Date.now();
      
      const response = await fetch(supabaseUrl, {
        method: 'POST',
        headers: {
          // Explicitly set some important headers
          'Accept': 'application/json',
          'Origin': self.location.origin,
        },
        body: supabaseFormData,
        signal: controller.signal,
        mode: 'cors',
        credentials: 'omit', // Don't send cookies for cross-origin requests
      });
      
      clearTimeout(timeoutId);
      const endTime = Date.now();
      
      console.log("[Upload Worker] Supabase response received in", (endTime - startTime), "ms");
      console.log("[Upload Worker] Status:", response.status, response.statusText);
      
      // Log all response headers for debugging
      const headers = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });
      console.log("[Upload Worker] Response headers:", JSON.stringify(headers));
      
      if (!response.ok) {
        // Get response data as text first for better diagnostics
        const responseText = await response.text();
        console.error("[Upload Worker] Error response text:", responseText);
        
        let errorData;
        try {
          errorData = JSON.parse(responseText);
          console.error("[Upload Worker] Parsed error:", errorData);
        } catch (parseError) {
          console.error("[Upload Worker] Failed to parse error response as JSON");
          throw new Error(`Upload failed with status: ${response.status}. Response: ${responseText.substring(0, 200)}...`);
        }
        
        throw new Error(errorData.error || `Upload failed with status: ${response.status}`);
      }
      
      // Get response data
      let responseData;
      const responseText = await response.text();
      console.log("[Upload Worker] Raw response:", responseText.substring(0, 200), "...");
      
      try {
        responseData = JSON.parse(responseText);
        console.log("[Upload Worker] Parsed response:", JSON.stringify(responseData).substring(0, 200), "...");
      } catch (parseError) {
        console.error("[Upload Worker] Failed to parse response:", parseError);
        throw new Error(`Invalid response from server: ${responseText.substring(0, 200)}...`);
      }
      
      if (!responseData.publicUrl) {
        console.error("[Upload Worker] No publicUrl in response:", responseData);
        throw new Error("No file URL returned from server");
      }
      
      console.log("[Upload Worker] Upload successful, URL:", responseData.publicUrl);
      
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

// Set up event listener with improved error handling
self.addEventListener('fetch', event => {
  if (event.request.url.includes('/api/upload-file')) {
    console.log("[Upload Worker] Intercepting fetch for:", event.request.url);
    try {
      event.respondWith(handleRequest(event.request));
    } catch (error) {
      console.error("[Upload Worker] Error in fetch handler:", error);
      event.respondWith(
        new Response(JSON.stringify({
          error: 'Service worker error',
          message: error.message || 'Unknown error',
          stack: error.stack
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        })
      );
    }
  }
});

// Add an install event to ensure the service worker is properly activated
self.addEventListener('install', event => {
  console.log("[Upload Worker] Service worker installed");
  self.skipWaiting(); // Activate worker immediately
});

self.addEventListener('activate', event => {
  console.log("[Upload Worker] Service worker activated");
  event.waitUntil(self.clients.claim()); // Take control of all clients
});

// Keep the service worker alive
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'PING') {
    console.log("[Upload Worker] Received ping");
    event.ports[0].postMessage({ type: 'PONG' });
  }
});
