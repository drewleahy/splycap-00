
<?php
// Enhanced PHP file upload handler with comprehensive error logging

// Set headers to allow cross-origin requests and set proper content type
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests for file uploads
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Function to log errors for debugging
function logError($message) {
    $logFile = '../php_upload_errors.log';
    $timestamp = date('Y-m-d H:i:s');
    file_put_contents($logFile, "[$timestamp] $message\n", FILE_APPEND);
}

// Log request information
logError("Request received: " . json_encode([
    'method' => $_SERVER['REQUEST_METHOD'],
    'content_type' => $_SERVER['CONTENT_TYPE'] ?? 'not set',
    'files' => !empty($_FILES) ? count($_FILES) . ' files present' : 'empty',
    'file_keys' => !empty($_FILES) ? implode(', ', array_keys($_FILES)) : 'none'
]));

try {
    // Log full $_FILES array for debugging
    logError("Full FILES array: " . json_encode($_FILES));
    
    // Check if a file was uploaded
    if (empty($_FILES['file'])) {
        logError("No file in request");
        http_response_code(400);
        echo json_encode(['error' => 'No file uploaded']);
        exit;
    }

    // Get the file from the request
    $file = $_FILES['file'];
    logError("File received: " . $file['name'] . " (size: " . $file['size'] . " bytes, type: " . $file['type'] . ", tmp_name: " . $file['tmp_name'] . ")");

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
        logError("Upload error: $error_message");
        http_response_code(400);
        echo json_encode(['error' => $error_message]);
        exit;
    }

    // Generate a random filename to avoid conflicts
    $file_extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $random_filename = uniqid() . '.' . $file_extension;

    // Create upload directory if it doesn't exist
    $upload_dir = '../lovable-uploads/';
    if (!file_exists($upload_dir)) {
        logError("Creating upload directory: $upload_dir");
        if (!mkdir($upload_dir, 0755, true)) {
            logError("Failed to create upload directory");
            http_response_code(500);
            echo json_encode(['error' => 'Failed to create upload directory']);
            exit;
        }
    }

    $local_path = $upload_dir . $random_filename;
    logError("Attempting to move file to: $local_path");

    // Try to upload the file
    if (!move_uploaded_file($file['tmp_name'], $local_path)) {
        logError("Failed to move uploaded file from {$file['tmp_name']} to $local_path - Check permissions");
        
        // Additional debug info about the directory and permissions
        logError("Upload directory permissions: " . substr(sprintf('%o', fileperms($upload_dir)), -4));
        
        http_response_code(500);
        echo json_encode(['error' => 'Failed to move uploaded file']);
        exit;
    }

    logError("File successfully uploaded to $local_path");

    // Return the public URL
    $host = $_SERVER['HTTP_HOST'];
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
    $public_url = $protocol . '://' . $host . '/lovable-uploads/' . $random_filename;
    
    // Set proper file permissions to ensure it's readable by the web server
    chmod($local_path, 0644);
    
    $response = [
        'message' => 'File uploaded successfully',
        'filename' => $random_filename,
        'originalName' => $file['name'],
        'publicUrl' => $public_url,
        'size' => $file['size'],
        'type' => $file['type']
    ];
    
    logError("Sending success response: " . json_encode($response));
    
    // Success response
    echo json_encode($response);
    
} catch (Exception $e) {
    logError("Exception: " . $e->getMessage() . "\nStack trace: " . $e->getTraceAsString());
    http_response_code(500);
    echo json_encode([
        'error' => 'An unexpected error occurred',
        'details' => $e->getMessage()
    ]);
}
?>
