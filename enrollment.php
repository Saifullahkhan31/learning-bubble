<?php
// Enrollment Form Handler
// NOTE: Update these values with your actual information

// Your admin email address (where enrollment notifications go)
define('ADMIN_EMAIL', 'your-email@learningbubble.com'); // CHANGE THIS

// Your WhatsApp number (format: country code + number, e.g., 923001234567 for Pakistan)
define('ADMIN_WHATSAPP', '923001234567'); // CHANGE THIS to your WhatsApp number

header('Content-Type: application/json');

// Get POST data
$name = sanitize_input($_POST['name'] ?? '');
$email = sanitize_input($_POST['email'] ?? '');
$phone = sanitize_input($_POST['phone'] ?? '');
$age = sanitize_input($_POST['age'] ?? '');
$parentName = sanitize_input($_POST['parentName'] ?? '');
$message = sanitize_input($_POST['message'] ?? '');
$coursesJson = $_POST['courses'] ?? '';
$totalAmount = sanitize_input($_POST['totalAmount'] ?? '');

// Validate required fields
if (empty($name) || empty($email) || empty($phone)) {
    echo json_encode([
        'success' => false,
        'message' => 'Please fill in all required fields.'
    ]);
    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'success' => false,
        'message' => 'Please enter a valid email address.'
    ]);
    exit;
}

// Parse courses data
$courses = json_decode($coursesJson, true);
if (empty($courses)) {
    echo json_encode([
        'success' => false,
        'message' => 'No courses selected.'
    ]);
    exit;
}

// Your admin WhatsApp number (update with your actual number)
$adminWhatsAppNumber = ADMIN_WHATSAPP;
$adminEmail = ADMIN_EMAIL;

// Build enrollment details
$coursesList = '';
$courseNames = [];
foreach ($courses as $course) {
    $coursesList .= "- {$course['name']} (Rs. " . number_format($course['startingFee']) . ")\n";
    $courseNames[] = $course['name'];
}

// Build email content
$subject = 'New Enrollment: ' . implode(', ', $courseNames);

$emailBody = "
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .section { margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 15px; }
        .section h3 { color: #667eea; margin-top: 0; }
        .enrollment-details { background: #f9fafb; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .course-item { padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
        .course-item:last-child { border-bottom: none; }
        .total { font-weight: bold; font-size: 1.1em; color: #667eea; }
        .contact-button {
            display: inline-block;
            background: #25D366;
            color: white;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 10px;
            font-weight: bold;
        }
        .footer { background: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; }
    </style>
</head>
<body>
    <div class=\"header\">
        <h1>New Course Enrollment</h1>
    </div>
    
    <div class=\"content\">
        <div class=\"section\">
            <h3>Student Information</h3>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Phone (WhatsApp):</strong> {$phone}</p>";
            
if (!empty($age)) {
    $emailBody .= "<p><strong>Age Group:</strong> {$age}</p>";
}

if (!empty($parentName)) {
    $emailBody .= "<p><strong>Parent/Guardian:</strong> {$parentName}</p>";
}

$emailBody .= "
        </div>

        <div class=\"section\">
            <h3>Enrolled Courses</h3>
            <div class=\"enrollment-details\">
                " . str_replace("\n", "<div class=\"course-item\">", $coursesList) . "
                <div class=\"course-item total\">
                    Total: {$totalAmount}
                </div>
            </div>
        </div>";

if (!empty($message)) {
    $emailBody .= "
        <div class=\"section\">
            <h3>Student Message</h3>
            <p>" . nl2br($message) . "</p>
        </div>";
}

$emailBody .= "
        <div class=\"section\">
            <h3>Next Steps</h3>
            <p>Contact the student on WhatsApp to share payment details:</p>
            <a href=\"https://wa.me/{$adminWhatsAppNumber}?text=Hi%20{$name}!%20Thank%20you%20for%20enrolling%20in%20" . urlencode(implode(', ', $courseNames)) . ".%20Here%20are%20the%20payment%20details%20for%20Rs.%20" . str_replace('Rs. ', '', $totalAmount) . "\" class=\"contact-button\">
                <i>📱 Contact on WhatsApp</i>
            </a>
        </div>

        <div class=\"section\">
            <h3>Quick Reference</h3>
            <p><strong>Enrollment Details to Share:</strong></p>
            <div class=\"enrollment-details\">
                <strong>Courses:</strong> " . implode(', ', $courseNames) . "<br>
                <strong>Amount:</strong> {$totalAmount}<br>
                <strong>Contact:</strong> {$phone}
            </div>
        </div>
    </div>

    <div class=\"footer\">
        <p>Learning Bubble - Enrollment System</p>
        <p>This is an automated message. Student contact: {$phone}</p>
    </div>
</body>
</html>";

// Email headers
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: noreply@learningbubble.com\r\n";

// Send email to admin
$mailSent = mail(ADMIN_EMAIL, $subject, $emailBody, $headers);

// Also send confirmation to student
$studentEmailBody = "
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .section { margin-bottom: 20px; }
    </style>
</head>
<body>
    <div class=\"header\">
        <h1>Enrollment Confirmation</h1>
    </div>
    
    <div class=\"content\">
        <p>Hi {$name},</p>
        
        <p>Thank you for enrolling with Learning Bubble! We're excited to have you join us.</p>
        
        <div class=\"section\">
            <h3>Your Enrollment Details:</h3>
            <p>" . str_replace("\n", "<br>", $coursesList) . "</p>
            <p><strong>Total Amount: {$totalAmount}</strong></p>
        </div>
        
        <div class=\"section\">
            <h3>What's Next?</h3>
            <p>We'll contact you shortly on WhatsApp at <strong>{$phone}</strong> with payment instructions and further details about your courses.</p>
            
            <p>If you have any questions in the meantime, feel free to reach out to us through:</p>
            <ul>
                <li>Email: contact@learningbubble.com</li>
                <li>WhatsApp: Your account manager</li>
                <li>Phone: Contact us for details</li>
            </ul>
        </div>
        
        <p>Looking forward to supporting your learning journey!</p>
        
        <p>Best regards,<br>
        <strong>Learning Bubble Team</strong></p>
    </div>
</body>
</html>";

$studentHeaders = "MIME-Version: 1.0\r\n";
$studentHeaders .= "Content-type: text/html; charset=UTF-8\r\n";
$studentHeaders .= "From: noreply@learningbubble.com\r\n";

mail($email, 'Enrollment Confirmation - Learning Bubble', $studentEmailBody, $studentHeaders);

// Log enrollment (optional - save to database or file)
logEnrollment($name, $email, $phone, $courseNames, $totalAmount);

// Return success response
echo json_encode([
    'success' => true,
    'message' => 'Enrollment submitted successfully!'
]);

// Sanitize input function
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Log enrollment function (optional)
function logEnrollment($name, $email, $phone, $courses, $amount) {
    // Optional: Save to file or database
    // This is for record keeping
    $logEntry = date('Y-m-d H:i:s') . " | " . $name . " | " . $email . " | " . $phone . " | " . implode(', ', $courses) . " | " . $amount . "\n";
    // file_put_contents('enrollments_log.txt', $logEntry, FILE_APPEND);
}
?>
