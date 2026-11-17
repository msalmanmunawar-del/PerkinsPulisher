<?php
if (basename($_SERVER['SCRIPT_FILENAME'] ?? '') === basename(__FILE__)) {
    http_response_code(403);
    exit;
}

/**
 * Optional Hostinger PHP Relay Configuration
 *
 * Upload/save this file as `public_html/api/inquiry-config.php` on Hostinger
 * and fill in your credentials so inquiries deliver via authenticated SMTP
 * and sync directly to your Google Sheet.
 *
 * Keeping this file named `inquiry-config.php` on Hostinger ensures future
 * `dist/` uploads never overwrite your live credentials.
 */
return [
    'RECIPIENT_EMAIL' => 'msalmanmunawar@gmail.com, info@perkinspublisher.com',
    'SMTP_HOST' => 'smtp.hostinger.com',
    'SMTP_PORT' => '465',
    'SMTP_USER' => 'info@perkinspublisher.com',
    'SMTP_PASS' => '',
    'GOOGLE_SHEETS_WEBHOOK_URL' => '',
];
