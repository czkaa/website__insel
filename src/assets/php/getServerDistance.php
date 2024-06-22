<?php
include('cors.php');

// Function to retrieve geographical coordinates and location details from latitude and longitude
function getLocationDetailsFromCoordinates($lat, $lon) {
    $url = "http://ip-api.com/json/{$lat},{$lon}";
    $response = file_get_contents($url);
    return json_decode($response);
}

function getLocationDetails($ip) {
    $url = "http://ip-api.com/json/$ip";
    $response = file_get_contents($url);
    return json_decode($response);
}

function haversineDistance($lat1, $lon1, $lat2, $lon2) {
    $earthRadius = 6371; // Earth's radius in kilometers

    $dLat = deg2rad($lat2 - $lat1);
    $dLon = deg2rad($lon2 - $lon1);

    $a = sin($dLat / 2) * sin($dLat / 2) +
        cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
        sin($dLon / 2) * sin($dLon / 2);

    $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

    $distance = $earthRadius * $c;

    return $distance;
}

// Get the client's geolocation from the query parameters
$clientLatitude = $_GET['lat'] ?? null;
$clientLongitude = $_GET['lon'] ?? null;
$serverDetails = getLocationDetails($_SERVER['SERVER_ADDR']);


if ($clientLatitude !== null && $clientLongitude !== null) {
    // Calculate distance using Haversine formula
    $distance = haversineDistance(
        $serverDetails->lat,
        $serverDetails->lon,
        $clientLatitude,
        $clientLongitude                     
    );
    
    // Return the server and user information, coordinates, and distance as JSON
    $responseData = [
        'server_info' => $serverDetails, // Your server info data
        'distance' => $distance // Include calculated distance in the response
    ];

    header('Content-Type: application/json');
    echo json_encode($responseData);
} else {
    // Handle missing latitude or longitude parameters
    http_response_code(400);
    echo json_encode(['error' => 'Latitude and longitude parameters are required']);
}

?>
