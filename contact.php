<?php
// Anaiah Enterprise Contact Form Handler
// This script processes contact form submissions and sends emails or redirects to WhatsApp

// Configuration
$recipient_email = 'marcusmutonyi44@gmail.com';
$company_name = 'Anaiah Enterprise';
$whatsapp_number = '260971627899';

// SMTP configuration for XAMPP / local development.
// Replace these values with a real SMTP server and credentials.
// On Windows/XAMPP, PHP's mail() will fail unless a SMTP server is configured.
// Use external SMTP credentials here or install a local mail server/sendmail wrapper.
$smtp_host = 'localhost'; // e.g., 'smtp.gmail.com' for Gmail SMTP
$smtp_port = 587;
$smtp_user = '';
$smtp_pass = '';
$smtp_secure = 'tls'; // use 'tls' or 'ssl'
$from_email = 'noreply@anaiahenterprise.com';
$from_name = 'Anaiah Enterprise';

// Disable warnings from mail() display in the browser while keeping logging.
ini_set('display_errors', 0);
error_reporting(E_ALL & ~E_NOTICE);

// Function to sanitize input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Function to build a mailto fallback URL
function build_mailto_link($recipient, $subject, $body) {
    $params = array(
        'subject' => $subject,
        'body' => $body,
    );
    return 'mailto:' . $recipient . '?' . http_build_query($params);
}

// Function to send email via SMTP
function smtp_send($host, $port, $username, $password, $secure, $from, $to, $subject, $body, $headers) {
    $remote = ($secure === 'ssl' ? "ssl://$host:$port" : "$host:$port");
    $socket = stream_socket_client($remote, $errno, $errstr, 30);
    if (!$socket) {
        error_log("SMTP connect failed: $errstr ($errno)");
        return false;
    }

    $readResponse = function() use ($socket) {
        $response = '';
        while (($line = fgets($socket, 515)) !== false) {
            $response .= $line;
            if (isset($line[3]) && $line[3] === ' ') {
                break;
            }
        }
        return $response;
    };

    $sendCommand = function($command) use ($socket, $readResponse) {
        fputs($socket, $command . "\r\n");
        return $readResponse();
    };

    $response = $readResponse();
    if (strpos($response, '220') !== 0) {
        fclose($socket);
        return false;
    }

    $response = $sendCommand("EHLO localhost");
    if ($secure === 'tls') {
        $response = $sendCommand("STARTTLS");
        if (strpos($response, '220') !== 0) {
            fclose($socket);
            return false;
        }
        if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            fclose($socket);
            return false;
        }
        $response = $sendCommand("EHLO localhost");
    }

    $response = $sendCommand("AUTH LOGIN");
    if (strpos($response, '334') !== 0) {
        fclose($socket);
        return false;
    }

    $response = $sendCommand(base64_encode($username));
    if (strpos($response, '334') !== 0) {
        fclose($socket);
        return false;
    }

    $response = $sendCommand(base64_encode($password));
    if (strpos($response, '235') !== 0) {
        fclose($socket);
        return false;
    }

    $response = $sendCommand("MAIL FROM:<$from>");
    if (strpos($response, '250') !== 0) {
        fclose($socket);
        return false;
    }

    $response = $sendCommand("RCPT TO:<$to>");
    if (strpos($response, '250') !== 0 && strpos($response, '251') !== 0) {
        fclose($socket);
        return false;
    }

    $response = $sendCommand("DATA");
    if (strpos($response, '354') !== 0) {
        fclose($socket);
        return false;
    }

    $body = str_replace("\n.", "\n..", $body);
    $response = $sendCommand($headers . "\r\n\r\n" . $body . "\r\n.");
    if (strpos($response, '250') !== 0) {
        fclose($socket);
        return false;
    }

    $sendCommand("QUIT");
    fclose($socket);
    return true;
}

// Function to send email with better error handling
function send_contact_email($name, $phone, $email, $service, $message, $recipient) {
    $subject = "Project Inquiry from $name - Anaiah Enterprise";

    $email_body = "Hello Anaiah Enterprise!\n\n";
    $email_body .= "You have received a new project inquiry:\n\n";
    $email_body .= "Name: $name\n";
    if (!empty($phone)) $email_body .= "Phone: $phone\n";
    if (!empty($email)) $email_body .= "Email: $email\n";
    if (!empty($service)) $email_body .= "Service: $service\n";
    $email_body .= "\nMessage:\n$message\n\n";
    $email_body .= "Best regards,\nAnaiah Enterprise Contact Form";

    // Try multiple header configurations
    $headers = array();
    $headers[] = "MIME-Version: 1.0";
    $headers[] = "Content-type: text/plain; charset=UTF-8";
    $headers[] = "From: Anaiah Enterprise <noreply@anaiahenterprise.com>";
    $headers[] = "Reply-To: " . (!empty($email) ? $email : $recipient);
    $headers[] = "X-Mailer: PHP/" . phpversion();

    $header_string = implode("\r\n", $headers);

    // Log the attempt for debugging
    error_log("Attempting to send email to: $recipient");

    global $smtp_host, $smtp_port, $smtp_user, $smtp_pass, $smtp_secure, $from_email;

    if (!empty($smtp_host) && !empty($smtp_user) && !empty($smtp_pass)) {
        $result = smtp_send($smtp_host, $smtp_port, $smtp_user, $smtp_pass, $smtp_secure, $from_email, $recipient, $subject, $email_body, $header_string);
        if (!$result) {
            error_log("SMTP send failed for recipient: $recipient");
        }
    } else {
        $result = @mail($recipient, $subject, $email_body, $header_string);
        if (!$result) {
            error_log("Mail function failed for recipient: $recipient");
        }
    }

    return $result;
}

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get and sanitize form data
    $name = isset($_POST['name']) ? sanitize_input($_POST['name']) : '';
    $phone = isset($_POST['phone']) ? sanitize_input($_POST['phone']) : '';
    $email = isset($_POST['email']) ? sanitize_input($_POST['email']) : '';
    $service = isset($_POST['service']) ? sanitize_input($_POST['service']) : '';
    $message = isset($_POST['message']) ? sanitize_input($_POST['message']) : '';
    $contact_method = isset($_POST['contactMethod']) ? sanitize_input($_POST['contactMethod']) : 'email';

    // Validate required fields
    $errors = array();

    if (empty($name)) {
        $errors[] = "Name is required";
    }

    if ($contact_method === 'email' && empty($message)) {
        $errors[] = "Message is required for email contact";
    }

    // If no errors, process the submission
    if (empty($errors)) {
        if ($contact_method === 'email') {
            // Send email
            if (send_contact_email($name, $phone, $email, $service, $message, $recipient_email)) {
                $success_message = "Thank you, $name! Your email has been sent successfully. We will get back to you soon.";
            } else {
                // Fallback to mailto when the local mail server is not configured.
                $mailto_subject = "Project Inquiry from $name - Anaiah Enterprise";
                $mailto_body = "Hello Anaiah Enterprise!\n\n";
                $mailto_body .= "Name: $name\n";
                if (!empty($phone)) $mailto_body .= "Phone: $phone\n";
                if (!empty($email)) $mailto_body .= "Email: $email\n";
                if (!empty($service)) $mailto_body .= "Service: $service\n";
                if (!empty($message)) $mailto_body .= "\nMessage:\n$message";

                $mailto_link = build_mailto_link($recipient_email, $mailto_subject, $mailto_body);
                header("Location: $mailto_link");
                exit();
            }
        } elseif ($contact_method === 'whatsapp') {
            // Redirect to WhatsApp
            $whatsapp_message = "Hello Anaiah Enterprise! 👋\n\n";
            $whatsapp_message .= "*Name:* $name\n";
            if (!empty($phone)) $whatsapp_message .= "*Phone:* $phone\n";
            if (!empty($email)) $whatsapp_message .= "*Email:* $email\n";
            if (!empty($service)) $whatsapp_message .= "*Service:* $service\n";
            if (!empty($message)) $whatsapp_message .= "\n*Message:*\n$message";

            $whatsapp_url = "https://wa.me/$whatsapp_number?text=" . urlencode($whatsapp_message);
            header("Location: $whatsapp_url");
            exit();
        }
    } else {
        $error_message = "Please correct the following errors: " . implode(", ", $errors);
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form - Anaiah Enterprise</title>
    <style>
        body {
            font-family: 'Outfit', sans-serif;
            background: linear-gradient(135deg, #0B1A2E, #1C1C2E);
            color: #FFFFFF;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            text-align: center;
        }
        .logo {
            color: #C9A84C;
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 1rem;
            font-family: 'Cormorant Garamond', serif;
        }
        .message {
            font-size: 1.1rem;
            line-height: 1.6;
            margin: 2rem 0;
        }
        .success {
            color: #10b981;
            border: 2px solid #10b981;
            background: rgba(16, 185, 129, 0.1);
        }
        .error {
            color: #ef4444;
            border: 2px solid #ef4444;
            background: rgba(239, 68, 68, 0.1);
        }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            background: #C9A84C;
            color: #0B1A2E;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            transition: all 0.3s ease;
            margin-top: 1rem;
        }
        .btn:hover {
            background: #B8953A;
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">ANAIAH ENTERPRISE</div>

        <?php if (isset($success_message)): ?>
            <div class="message success">
                <h2>✅ Message Sent Successfully!</h2>
                <p><?php echo $success_message; ?></p>
            </div>
        <?php elseif (isset($error_message)): ?>
            <div class="message error">
                <h2>❌ Error Sending Message</h2>
                <p><?php echo $error_message; ?></p>
            </div>
        <?php else: ?>
            <div class="message">
                <h2>Processing Your Message...</h2>
                <p>Please wait while we process your contact form submission.</p>
            </div>
        <?php endif; ?>

        <a href="index.html" class="btn">← Back to Website</a>
    </div>
</body>
</html>