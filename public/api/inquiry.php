<?php
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Method not allowed.'
    ]);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid inquiry payload.'
    ]);
    exit;
}

$name = isset($data['name']) ? trim(mb_substr((string)$data['name'], 0, 150)) : '';
$email = isset($data['email']) ? trim(mb_substr((string)$data['email'], 0, 254)) : '';
$phone = isset($data['phone']) ? trim(mb_substr((string)$data['phone'], 0, 60)) : '';
$genre = isset($data['genre']) ? trim(mb_substr((string)$data['genre'], 0, 100)) : 'General';
$wordCount = isset($data['wordCount']) && is_numeric($data['wordCount']) ? max(0, (int)$data['wordCount']) : 0;
$message = isset($data['message']) ? trim(mb_substr((string)$data['message'], 0, 5000)) : '';
$estimatedPrice = isset($data['estimatedPrice']) && is_numeric($data['estimatedPrice']) ? (int)$data['estimatedPrice'] : 499;
$express = !empty($data['expressCallback']) || !empty($data['expressService']);

$servicesRaw = $data['services'] ?? ['publishing'];
if (is_array($servicesRaw)) {
    $services = array_values(array_filter(array_map('strval', $servicesRaw)));
} else {
    $services = [(string)$servicesRaw];
}

if ($name === '') {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Author name is required.'
    ]);
    exit;
}

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'A valid email address is required.'
    ]);
    exit;
}

// Strip CR/LF to prevent email header injection
$cleanHeaderName = str_replace(["\r", "\n"], ' ', $name);
$cleanHeaderEmail = str_replace(["\r", "\n"], '', $email);
$cleanHeaderGenre = str_replace(["\r", "\n"], ' ', $genre);

$leadId = !empty($data['id']) ? preg_replace('/[^a-zA-Z0-9_-]/', '', (string)$data['id']) : ('inq-' . time());
$isPromo = ($estimatedPrice === 499) || in_array('promo-publishing-499', $services, true) || (strpos($message, '499') !== false);

$recipients = getenv('RECIPIENT_EMAIL');
if (!$recipients || trim($recipients) === '') {
    $recipients = 'msalmanmunawar@gmail.com, info@perkinspublisher.com';
}

$subjectPrefix = $express ? '[EXPRESS 15-MIN CALL] ' : '';
$offerPrefix = $isPromo ? '[€499 SPECIAL OFFER CLAIM] ' : '';
$subject = $subjectPrefix . $offerPrefix . 'NEW AUTHOR LEAD: ' . $cleanHeaderName . ' (' . strtoupper($cleanHeaderGenre) . ')';

$safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$safePhone = htmlspecialchars($phone !== '' ? $phone : 'Not specified', ENT_QUOTES, 'UTF-8');
$safeGenre = htmlspecialchars($genre, ENT_QUOTES, 'UTF-8');
$safeServices = htmlspecialchars(implode(', ', $services), ENT_QUOTES, 'UTF-8');
$safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

$htmlBody = '
<div style="font-family: Segoe UI, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 14px; background: #ffffff; color: #1e293b;">
  <div style="background: #0b0f19; padding: 18px; border-radius: 10px; text-align: center; margin-bottom: 20px; border-bottom: 3px solid #f59e0b;">
    <h1 style="color: #ffffff; margin: 0; font-size: 19px; letter-spacing: 2px;">PERKINS PUBLISHER</h1>
    <p style="color: #f59e0b; margin: 4px 0 0 0; font-size: 11px; font-weight: bold;">' . ($isPromo ? '€499 PROMOTIONAL PACKAGE CLAIM' : 'NEW AUTHOR INQUIRY') . '</p>
  </div>
  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 8px; font-weight: bold; color: #64748b;">Author Name</td><td style="padding: 8px; font-weight: bold;">' . $safeName . '</td></tr>
    <tr style="background:#f8fafc;"><td style="padding: 8px; font-weight: bold; color: #64748b;">Email</td><td style="padding: 8px;">' . $safeEmail . '</td></tr>
    <tr><td style="padding: 8px; font-weight: bold; color: #64748b;">Phone / WhatsApp</td><td style="padding: 8px;">' . $safePhone . '</td></tr>
    <tr style="background:#f8fafc;"><td style="padding: 8px; font-weight: bold; color: #64748b;">Genre / Words</td><td style="padding: 8px;">' . $safeGenre . ' • ' . number_format($wordCount) . ' words</td></tr>
    <tr><td style="padding: 8px; font-weight: bold; color: #64748b;">Services</td><td style="padding: 8px;">' . $safeServices . '</td></tr>
    <tr style="background:#f8fafc;"><td style="padding: 8px; font-weight: bold; color: #64748b;">Quoted Price</td><td style="padding: 8px; font-weight: bold;">€' . $estimatedPrice . '</td></tr>
    ' . ($safeMessage !== '' ? '<tr><td style="padding: 8px; font-weight: bold; color: #64748b; vertical-align: top;">Notes</td><td style="padding: 8px;">' . $safeMessage . '</td></tr>' : '') . '
  </table>
</div>';

$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: Perkins Publisher <info@perkinspublisher.com>',
    'Reply-To: ' . $cleanHeaderName . ' <' . $cleanHeaderEmail . '>'
];

$mailSent = @mail($recipients, '=?UTF-8?B?' . base64_encode($subject) . '?=', $htmlBody, implode("\r\n", $headers));

$sheetsSent = false;
$sheetsUrl = getenv('GOOGLE_SHEETS_WEBHOOK_URL');
if ($sheetsUrl && trim($sheetsUrl) !== '' && function_exists('curl_init')) {
    $sheetPayload = json_encode([
        'timestamp' => gmdate('c'),
        'id' => $leadId,
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'genre' => $genre,
        'wordCount' => $wordCount,
        'package' => $isPromo ? '€499 Promo Publishing Package (74% OFF)' : implode(', ', $services),
        'quotedPrice' => $estimatedPrice,
        'isPromoOffer' => $isPromo ? 'YES' : 'NO',
        'priority' => $express ? 'URGENT 15-MIN CALLBACK' : 'Standard',
        'message' => $message,
    ]);
    $ch = curl_init(trim($sheetsUrl));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $sheetPayload);
    curl_setopt($ch, CURLOPT_TIMEOUT, 8);
    $resp = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    $trimmedResp = is_string($resp) ? ltrim($resp) : '';
    $looksLikeHtml = $trimmedResp !== '' && (stripos($trimmedResp, '<!doctype') === 0 || stripos($trimmedResp, '<html') === 0);
    $looksLikeErrorJson = is_string($resp) && (strpos($resp, '"status":"error"') !== false || strpos($resp, '"status": "error"') !== false);
    $sheetsSent = ($code >= 200 && $code < 300 && $resp !== false && !$looksLikeHtml && !$looksLikeErrorJson);
}

if (!$mailSent && !$sheetsSent) {
    http_response_code(502);
    echo json_encode([
        'status' => 'error',
        'message' => 'Mail relay could not deliver the inquiry right now. Please contact us directly on WhatsApp or at info@perkinspublisher.com.',
        'leadId' => $leadId
    ]);
    exit;
}

echo json_encode([
    'status' => 'success',
    'message' => $isPromo
        ? 'Your €499 Publishing Package reservation has been recorded and transmitted to our editorial team!'
        : 'Your manuscript inquiry has been recorded and transmitted to our editorial team!',
    'leadId' => $leadId,
    'storedOnServer' => false,
    'emailDelivery' => [
        'smtpSent' => $mailSent,
        'method' => 'PHP Mail Relay'
    ],
    'googleSheetsDelivery' => [
        'synced' => $sheetsSent
    ]
]);
