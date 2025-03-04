
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

// Check for upload errors
if ($file['error'] !== UPLOAD_ERR_OK) {
    $error_message = 'Unknown upload error';
    switch ($file['error']) {
        case UPLOAD_ERR_INI_SIZE:
            $error_message = 'The uploaded file exceeds the upload_max_filesize directive in php.ini';
            break;
        case UPLOAD_ERR_FORM_SIZE:
            $error_message = 'The uploaded file exceeds the MAX_FILE_SIZE directive in the HTML form';
            break;
        case UPLOAD_ERR_PARTIAL:
            $error_message = 'The uploaded file was only partially uploaded';
            break;
        case UPLOAD_ERR_NO_FILE:
            $error_message = 'No file was uploaded';
            break;
        case UPLOAD_ERR_NO_TMP_DIR:
            $error_message = 'Missing a temporary folder';
            break;
        case UPLOAD_ERR_CANT_WRITE:
            $error_message = 'Failed to write file to disk';
            break;
        case UPLOAD_ERR_EXTENSION:
            $error_message = 'A PHP extension stopped the file upload';
            break;
    }
    http_response_code(400);
    echo json_encode(['error' => $error_message]);
    exit;
}

// Generate a random file name to avoid conflicts
$file_extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$random_filename = uniqid() . '.' . $file_extension;

// Local upload as fallback
$upload_dir = '../lovable-uploads/';
if (!file_exists($upload_dir)) {
    mkdir($upload_dir, 0755, true);
}

$local_path = $upload_dir . $random_filename;

// Try to upload locally first
if (move_uploaded_file($file['tmp_name'], $local_path)) {
    // Return the public URL
    $host = $_SERVER['HTTP_HOST'];
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
    $public_url = $protocol . '://' . $host . '/lovable-uploads/' . $random_filename;
    
    echo json_encode([
        'message' => 'File uploaded successfully (local fallback)',
        'filename' => $random_filename,
        'publicUrl' => $public_url
    ]);
    exit;
}

// If local upload fails, try Supabase
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
curl_setopt($ch, CURLOPT_TIMEOUT, 30); // Set a reasonable timeout

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
