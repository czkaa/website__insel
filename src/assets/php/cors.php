<?php
// cors.php

// Set headers to allow cross-origin requests
header("Access-Control-Allow-Origin: *"); // Replace with your Vue app's domain or subdomain
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Check if it's a preflight request (OPTIONS) and respond accordingly
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}
?>