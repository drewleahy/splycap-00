
// This is a simple proxy to the Supabase edge function
// It helps bypass CORS issues and authentication problems

async function handleRequest(request) {
  try {
    // Forward the request to the Supabase edge function
    const response = await fetch(
      "https://hjjtsbkxxvygpurfhlub.supabase.co/functions/v1/upload-file",
      {
        method: request.method,
        headers: {
          // Don't forward authentication headers, let the edge function handle it
          'Content-Type': request.headers.get('Content-Type'),
        },
        body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.blob() : undefined,
      }
    );

    // Get the response body as text
    const responseText = await response.text();

    // Create headers for the response
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');

    // Return the response with CORS headers
    return new Response(responseText, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  } catch (error) {
    // Return an error response
    return new Response(
      JSON.stringify({ error: 'Proxy error: ' + (error.message || 'Unknown error') }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers', 'Content-Type',
        },
      }
    );
  }
}

// Handle the request
addEventListener('fetch', event => {
  // Handle CORS preflight requests
  if (event.request.method === 'OPTIONS') {
    event.respondWith(
      new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    );
    return;
  }

  event.respondWith(handleRequest(event.request));
});
