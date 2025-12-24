<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (
        !empty($data['roomType']) &&
        !empty($data['checkIn']) &&
        !empty($data['checkOut']) &&
        !empty($data['email'])
    ) {
        // In a real application, you would save this to a database
        // and send a confirmation email.

        http_response_code(201);
        echo json_encode([
            "status" => "success",
            "message" => "Reservation received for " . $data['roomType'],
            "bookingId" => "VIP-" . strtoupper(uniqid())
        ]);
    } else {
        http_response_code(400);
        echo json_encode([
            "status" => "error",
            "message" => "Incomplete booking data."
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode([
        "status" => "error",
        "message" => "Method not allowed."
    ]);
}
