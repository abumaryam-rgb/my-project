<?php
// Registration API endpoint for ADUSTECH MSSN Registration System

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

class Registration {
    private $conn;
    private $table_name = "registrations";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create($data) {
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    full_name = :full_name,
                    registration_number = :registration_number,
                    department = :department,
                    level = :level,
                    phone = :phone,
                    gender = :gender,
                    accommodation_type = :accommodation_type,
                    hostel = :hostel,
                    room_number = :room_number,
                    house_address = :house_address,
                    state = :state,
                    lga = :lga,
                    student_type = :student_type,
                    class_type = :class_type,
                    category = :category,
                    hizb = :hizb,
                    islamic_books = :islamic_books,
                    payment_status = :payment_status,
                    created_at = :created_at";

        $stmt = $this->conn->prepare($query);

        // Sanitize and bind data
        $full_name = htmlspecialchars(strip_tags($data['fullName']));
        $registration_number = htmlspecialchars(strip_tags($data['registrationNumber']));
        $department = htmlspecialchars(strip_tags($data['department']));
        $level = htmlspecialchars(strip_tags($data['level']));
        $phone = htmlspecialchars(strip_tags($data['phone']));
        $gender = htmlspecialchars(strip_tags($data['gender']));
        $accommodation_type = htmlspecialchars(strip_tags($data['accommodation_type']));
        $hostel = htmlspecialchars(strip_tags($data['hostel'] ?? ''));
        $room_number = htmlspecialchars(strip_tags($data['roomNumber'] ?? ''));
        $house_address = htmlspecialchars(strip_tags($data['houseAddress'] ?? ''));
        $state = htmlspecialchars(strip_tags($data['state']));
        $lga = htmlspecialchars(strip_tags($data['lga']));
        $student_type = htmlspecialchars(strip_tags($data['studentType']));
        $class_type = htmlspecialchars(strip_tags($data['classType']));
        $category = htmlspecialchars(strip_tags($data['category'] ?? ''));
        $hizb = htmlspecialchars(strip_tags($data['hizb'] ?? ''));
        $islamic_books = htmlspecialchars(strip_tags($data['islamicBooks'] ?? ''));
        $payment_status = 'pending';
        $created_at = date('Y-m-d H:i:s');

        $stmt->bindParam(":full_name", $full_name);
        $stmt->bindParam(":registration_number", $registration_number);
        $stmt->bindParam(":department", $department);
        $stmt->bindParam(":level", $level);
        $stmt->bindParam(":phone", $phone);
        $stmt->bindParam(":gender", $gender);
        $stmt->bindParam(":accommodation_type", $accommodation_type);
        $stmt->bindParam(":hostel", $hostel);
        $stmt->bindParam(":room_number", $room_number);
        $stmt->bindParam(":house_address", $house_address);
        $stmt->bindParam(":state", $state);
        $stmt->bindParam(":lga", $lga);
        $stmt->bindParam(":student_type", $student_type);
        $stmt->bindParam(":class_type", $class_type);
        $stmt->bindParam(":category", $category);
        $stmt->bindParam(":hizb", $hizb);
        $stmt->bindParam(":islamic_books", $islamic_books);
        $stmt->bindParam(":payment_status", $payment_status);
        $stmt->bindParam(":created_at", $created_at);

        if($stmt->execute()) {
            return $this->conn->lastInsertId();
        }
        return false;
    }

    public function getByRegistrationNumber($registration_number) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE registration_number = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $registration_number);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function updatePaymentStatus($id, $status) {
        $query = "UPDATE " . $this->table_name . " SET payment_status = ? WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $status);
        $stmt->bindParam(2, $id);
        return $stmt->execute();
    }
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $database = new Database();
    $db = $database->getConnection();
    
    $registration = new Registration($db);
    
    // Get posted data
    $data = json_decode(file_get_contents("php://input"), true);
    
    if($data) {
        // Check if registration number already exists
        $existing = $registration->getByRegistrationNumber($data['registrationNumber']);
        if($existing) {
            http_response_code(400);
            echo json_encode(array("message" => "Registration number already exists."));
            exit;
        }
        
        // Create registration
        $registration_id = $registration->create($data);
        
        if($registration_id) {
            http_response_code(201);
            echo json_encode(array(
                "message" => "Registration created successfully.",
                "registration_id" => $registration_id,
                "redirect_url" => "payment.html"
            ));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to create registration."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to create registration. Data is incomplete."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed."));
}
?> 