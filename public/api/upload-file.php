
<?php
// This file acts as a simple pass-through proxy to the Supabase function
// It helps bypass CORS and authentication issues

// Set headers to allow cross-origin requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Check if a file was uploaded
if (empty($_FILES['file'])) {
    http_response_code(400);
    echo json_encode(['error' => 'No file uploaded']);
    exit;
}

// Get the file from the request
$file = $_FILES['file'];

// Initialize cURL session
$ch = curl_init();

// Create a CURLFile object
$cfile = new CURLFile($file['tmp_name'], $file['type'], $file['name']);

// Prepare the form data
$data = ['file' => $cfile];

// Set cURL options
curl_setopt($ch, CURLOPT_URL, 'https://hjjtsbkxxvygpurfhlub.supabase.co/functions/v1/upload-file');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Execute the request
$response = curl_exec($ch);

// Check for errors
if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(['error' => 'cURL error: ' . curl_error($ch)]);
    exit;
}

// Get HTTP response code
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// Close cURL session
curl_close($ch);

// Set the HTTP response code
http_response_code($httpCode);

// Output the response
echo $response;
?>
