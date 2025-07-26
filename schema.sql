-- ADUSTECH MSSN Registration System Database Schema

-- Create database
CREATE DATABASE IF NOT EXISTS adustech_mssn;
USE adustech_mssn;

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    registration_number VARCHAR(50) UNIQUE NOT NULL,
    department VARCHAR(100) NOT NULL,
    level VARCHAR(20) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    gender ENUM('Male', 'Female') NOT NULL,
    accommodation_type ENUM('hostel', 'off_campus') NOT NULL,
    hostel VARCHAR(100),
    room_number VARCHAR(20),
    house_address TEXT,
    state VARCHAR(50) NOT NULL,
    lga VARCHAR(100) NOT NULL,
    student_type ENUM('Fresh', 'Returning') NOT NULL,
    class_type ENUM('Qur\'anic Class', 'Hadith Class', 'Ta\'alimat Class', 'Arabic Class', 'Comparative Religion Class') NOT NULL,
    category ENUM('reciters', 'tahfeez') NULL,
    hizb ENUM('five', 'ten', 'twenty', 'thirty', 'graduation') NULL,
    islamic_books TEXT,
    payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_registration_number (registration_number),
    INDEX idx_class_type (class_type),
    INDEX idx_payment_status (payment_status),
    INDEX idx_created_at (created_at)
);

-- Create payment_transactions table
CREATE TABLE IF NOT EXISTS payment_transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    registration_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(100) UNIQUE,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    gateway_response TEXT,
    FOREIGN KEY (registration_id) REFERENCES registrations(id) ON DELETE CASCADE,
    INDEX idx_registration_id (registration_id),
    INDEX idx_transaction_id (transaction_id),
    INDEX idx_transaction_date (transaction_date)
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role ENUM('admin', 'moderator') DEFAULT 'moderator',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    INDEX idx_username (username),
    INDEX idx_email (email)
);

-- Create class_timetables table
CREATE TABLE IF NOT EXISTS class_timetables (
    id INT AUTO_INCREMENT PRIMARY KEY,
    class_type ENUM('Qur\'anic Class', 'Hadith Class', 'Ta\'alimat Class', 'Arabic Class', 'Comparative Religion Class') NOT NULL,
    day_of_week ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    venue VARCHAR(100) NOT NULL,
    instructor VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_class_schedule (class_type, day_of_week, start_time),
    INDEX idx_class_type (class_type),
    INDEX idx_day_of_week (day_of_week)
);

-- Insert default admin user (password: admin123)
INSERT INTO admin_users (username, email, password_hash, full_name, role) VALUES 
('admin', 'admin@adustech.edu.ng', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'System Administrator', 'admin');

-- Insert sample class timetables
INSERT INTO class_timetables (class_type, day_of_week, start_time, end_time, venue, instructor) VALUES
-- Qur'anic Class
('Qur\'anic Class', 'Monday', '16:00:00', '18:00:00', 'MSSN Hall', 'Ustaz Ahmad'),
('Qur\'anic Class', 'Wednesday', '16:00:00', '18:00:00', 'MSSN Hall', 'Ustaz Ahmad'),
('Qur\'anic Class', 'Friday', '15:00:00', '17:00:00', 'MSSN Hall', 'Ustaz Ahmad'),

-- Hadith Class
('Hadith Class', 'Tuesday', '16:00:00', '18:00:00', 'Lecture Room 1', 'Ustaz Ibrahim'),
('Hadith Class', 'Thursday', '16:00:00', '18:00:00', 'Lecture Room 1', 'Ustaz Ibrahim'),

-- Ta'alimat Class
('Ta\'alimat Class', 'Monday', '18:00:00', '20:00:00', 'Lecture Room 2', 'Ustaz Yusuf'),
('Ta\'alimat Class', 'Wednesday', '18:00:00', '20:00:00', 'Lecture Room 2', 'Ustaz Yusuf'),

-- Arabic Class
('Arabic Class', 'Tuesday', '18:00:00', '20:00:00', 'Lecture Room 3', 'Ustaz Ali'),
('Arabic Class', 'Thursday', '18:00:00', '20:00:00', 'Lecture Room 3', 'Ustaz Ali'),

-- Comparative Religion Class
('Comparative Religion Class', 'Friday', '16:00:00', '18:00:00', 'Lecture Room 4', 'Ustaz Hassan');

-- Create views for easier data access
CREATE VIEW registration_summary AS
SELECT 
    r.id,
    r.full_name,
    r.registration_number,
    r.department,
    r.level,
    r.class_type,
    r.payment_status,
    r.created_at,
    pt.amount,
    pt.transaction_date as payment_date
FROM registrations r
LEFT JOIN payment_transactions pt ON r.id = pt.registration_id;

CREATE VIEW class_statistics AS
SELECT 
    class_type,
    COUNT(*) as total_registrations,
    SUM(CASE WHEN payment_status = 'completed' THEN 1 ELSE 0 END) as paid_registrations,
    SUM(CASE WHEN payment_status = 'pending' THEN 1 ELSE 0 END) as pending_registrations
FROM registrations
GROUP BY class_type;

-- Create stored procedures
DELIMITER //

CREATE PROCEDURE GetRegistrationByNumber(IN reg_number VARCHAR(50))
BEGIN
    SELECT * FROM registrations WHERE registration_number = reg_number;
END //

CREATE PROCEDURE GetRegistrationsByClass(IN class_name VARCHAR(100))
BEGIN
    SELECT * FROM registrations WHERE class_type = class_name ORDER BY created_at DESC;
END //

CREATE PROCEDURE GetPaymentStatistics()
BEGIN
    SELECT 
        COUNT(*) as total_registrations,
        SUM(CASE WHEN payment_status = 'completed' THEN 1 ELSE 0 END) as completed_payments,
        SUM(CASE WHEN payment_status = 'pending' THEN 1 ELSE 0 END) as pending_payments,
        SUM(CASE WHEN payment_status = 'failed' THEN 1 ELSE 0 END) as failed_payments
    FROM registrations;
END //

CREATE PROCEDURE UpdatePaymentStatus(IN reg_id INT, IN new_status VARCHAR(20))
BEGIN
    UPDATE registrations SET payment_status = new_status WHERE id = reg_id;
END //

DELIMITER ;

-- Create triggers for audit logging
CREATE TABLE audit_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    table_name VARCHAR(50) NOT NULL,
    action VARCHAR(20) NOT NULL,
    record_id INT,
    old_values JSON,
    new_values JSON,
    user_id INT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_table_name (table_name),
    INDEX idx_action (action),
    INDEX idx_timestamp (timestamp)
);

DELIMITER //

CREATE TRIGGER after_registration_insert
AFTER INSERT ON registrations
FOR EACH ROW
BEGIN
    INSERT INTO audit_log (table_name, action, record_id, new_values)
    VALUES ('registrations', 'INSERT', NEW.id, JSON_OBJECT(
        'full_name', NEW.full_name,
        'registration_number', NEW.registration_number,
        'class_type', NEW.class_type,
        'payment_status', NEW.payment_status
    ));
END //

CREATE TRIGGER after_registration_update
AFTER UPDATE ON registrations
FOR EACH ROW
BEGIN
    INSERT INTO audit_log (table_name, action, record_id, old_values, new_values)
    VALUES ('registrations', 'UPDATE', NEW.id, 
        JSON_OBJECT('payment_status', OLD.payment_status),
        JSON_OBJECT('payment_status', NEW.payment_status)
    );
END //

DELIMITER ;

-- Grant permissions (adjust as needed for your setup)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON adustech_mssn.* TO 'mssn_user'@'localhost';
-- FLUSH PRIVILEGES; 