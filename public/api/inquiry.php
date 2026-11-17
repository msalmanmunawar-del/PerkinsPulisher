<?php
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// Load optional Hostinger configuration file placed alongside inquiry.php (never overwritten by Vite build)
$configFile = __DIR__ . '/inquiry-config.php';
$fileConfig = [];
if (is_file($configFile)) {
    $loaded = include $configFile;
    if (is_array($loaded)) {
        $fileConfig = $loaded;
    }
}

$getConfig = function (string $key, string $default = '') use ($fileConfig): string {
    if (isset($fileConfig[$key]) && trim((string)$fileConfig[$key]) !== '') {
        return trim((string)$fileConfig[$key]);
    }
    $envVal = getenv($key);
    if ($envVal !== false && trim($envVal) !== '') {
        return trim($envVal);
    }
    if (isset($_SERVER[$key]) && trim((string)$_SERVER[$key]) !== '') {
        return trim((string)$_SERVER[$key]);
    }
    return $default;
};

$smtpHost = $getConfig('SMTP_HOST', 'smtp.hostinger.com');
$smtpPort = (int)$getConfig('SMTP_PORT', '465');
$smtpUser = $getConfig('SMTP_USER', 'info@perkinspublisher.com');
$smtpPass = $getConfig('SMTP_PASS', '');
$sheetsUrl = $getConfig('GOOGLE_SHEETS_WEBHOOK_URL', '');
$recipients = $getConfig('RECIPIENT_EMAIL', 'msalmanmunawar@gmail.com, info@perkinspublisher.com');
if (stripos($recipients, 'msalmanmunawar@gmail.com') === false) {
    $recipients = 'msalmanmunawar@gmail.com, ' . $recipients;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode([
        'status' => 'ok',
        'relay' => 'php',
        'smtpConfigured' => ($smtpHost !== '' && $smtpUser !== '' && $smtpPass !== ''),
        'sheetsConfigured' => ($sheetsUrl !== '')
    ]);
    exit;
}

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

/**
 * Minimal dependency-free SMTP client supporting SSL (port 465) and STARTTLS (port 587)
 */
function sendAuthenticatedSmtp(
    string $host,
    int $port,
    string $user,
    string $pass,
    array $toList,
    string $replyToName,
    string $replyToEmail,
    string $subject,
    string $htmlBody,
    string &$errorOut = ''
): bool {
    $readResponse = function ($socket): array {
        $full = '';
        $code = 0;
        while (($line = fgets($socket, 515)) !== false) {
            $full .= $line;
            if (strlen($line) >= 3 && is_numeric(substr($line, 0, 3))) {
                $code = (int)substr($line, 0, 3);
            }
            if (strlen($line) < 4 || $line[3] === ' ') {
                break;
            }
        }
        return [$code, trim($full)];
    };

    $expect = function ($socket, array $allowedCodes, string $step) use ($readResponse, &$errorOut): bool {
        [$code, $msg] = $readResponse($socket);
        if (!in_array($code, $allowedCodes, true)) {
            $errorOut = "$step failed ($code): $msg";
            return false;
        }
        return true;
    };

    $cmd = function ($socket, string $line, array $allowedCodes, string $step) use ($expect): bool {
        fwrite($socket, $line . "\r\n");
        return $expect($socket, $allowedCodes, $step);
    };

    $protocol = ($port === 465) ? 'ssl://' : 'tcp://';
    $ctx = stream_context_create([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true,
        ],
    ]);

    $errno = 0;
    $errstr = '';
    $socket = @stream_socket_client($protocol . $host . ':' . $port, $errno, $errstr, 8, STREAM_CLIENT_CONNECT, $ctx);
    if (!$socket) {
        $errorOut = "SMTP connect ($host:$port) failed: $errstr ($errno)";
        return false;
    }
    stream_set_timeout($socket, 10);

    if (!$expect($socket, [220], 'Greeting')) { fclose($socket); return false; }
    $ehloHost = $_SERVER['HTTP_HOST'] ?? 'perkinspublisher.com';
    $ehloHost = preg_replace('/[^a-zA-Z0-9.-]/', '', $ehloHost) ?: 'perkinspublisher.com';
    if (!$cmd($socket, "EHLO $ehloHost", [250], 'EHLO')) { fclose($socket); return false; }

    if ($port !== 465) {
        if (!$cmd($socket, 'STARTTLS', [220], 'STARTTLS')) { fclose($socket); return false; }
        if (!@stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            $errorOut = 'STARTTLS negotiation failed';
            fclose($socket);
            return false;
        }
        if (!$cmd($socket, "EHLO $ehloHost", [250], 'EHLO-TLS')) { fclose($socket); return false; }
    }

    if (!$cmd($socket, 'AUTH LOGIN', [334], 'AUTH LOGIN')) { fclose($socket); return false; }
    if (!$cmd($socket, base64_encode($user), [334], 'SMTP USER')) { fclose($socket); return false; }
    if (!$cmd($socket, base64_encode($pass), [235], 'SMTP PASS')) { fclose($socket); return false; }
    if (!$cmd($socket, "MAIL FROM:<$user>", [250], 'MAIL FROM')) { fclose($socket); return false; }

    foreach ($toList as $rcpt) {
        if (!$cmd($socket, "RCPT TO:<$rcpt>", [250, 251], "RCPT TO $rcpt")) { fclose($socket); return false; }
    }

    if (!$cmd($socket, 'DATA', [354], 'DATA')) { fclose($socket); return false; }

    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $msgId = '<' . bin2hex(random_bytes(8)) . '@' . $ehloHost . '>';
    $dataHeaders = [
        'Date: ' . gmdate('D, d M Y H:i:s') . ' +0000',
        "Message-ID: $msgId",
        "From: Perkins Publisher <$user>",
        'To: ' . implode(', ', $toList),
        "Reply-To: $replyToName <$replyToEmail>",
        "Subject: $encodedSubject",
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
    ];

    $encodedBody = chunk_split(base64_encode($htmlBody));
    $rawData = implode("\r\n", $dataHeaders) . "\r\n\r\n" . $encodedBody;
    // Dot-stuff lines starting with '.'
    $rawData = preg_replace('/^\./m', '..', $rawData);
    fwrite($socket, $rawData . "\r\n.\r\n");

    $ok = $expect($socket, [250], 'DATA END');
    @fwrite($socket, "QUIT\r\n");
    fclose($socket);
    return $ok;
}

$recipientList = array_values(array_filter(array_map('trim', explode(',', $recipients)), function ($r) {
    return filter_var($r, FILTER_VALIDATE_EMAIL) !== false;
}));
if (empty($recipientList)) {
    $recipientList = ['msalmanmunawar@gmail.com', 'info@perkinspublisher.com'];
}

$mailSent = false;
$mailMethod = 'Unconfigured';
$smtpError = '';

if ($smtpHost !== '' && $smtpUser !== '' && $smtpPass !== '') {
    $ports = ($smtpPort === 465) ? [465, 587] : [$smtpPort, 465];
    foreach ($ports as $p) {
        if (sendAuthenticatedSmtp(
            $smtpHost,
            $p,
            $smtpUser,
            $smtpPass,
            $recipientList,
            $cleanHeaderName,
            $cleanHeaderEmail,
            $subject,
            $htmlBody,
            $smtpError
        )) {
            $mailSent = true;
            $mailMethod = "Hostinger SMTP Authenticated (port $p)";
            break;
        }
    }
}

// Fallback to PHP mail() with proper envelope sender (-f) only if SMTP is not configured
if (!$mailSent && $smtpPass === '') {
    $senderAddress = filter_var($smtpUser, FILTER_VALIDATE_EMAIL) ? $smtpUser : 'info@perkinspublisher.com';
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        "From: Perkins Publisher <$senderAddress>",
        "Sender: $senderAddress",
        'Reply-To: ' . $cleanHeaderName . ' <' . $cleanHeaderEmail . '>'
    ];
    $mailSent = @mail(
        implode(', ', $recipientList),
        '=?UTF-8?B?' . base64_encode($subject) . '?=',
        $htmlBody,
        implode("\r\n", $headers),
        '-f ' . $senderAddress
    );
    if ($mailSent) {
        $mailMethod = 'PHP sendmail (-f envelope fallback)';
    }
}

$sheetsSent = false;
$sheetsError = '';
if ($sheetsUrl !== '' && function_exists('curl_init')) {
    $nowIso = gmdate('c');
    $pkgLabel = $isPromo ? '€499 Promo Publishing Package (74% OFF)' : implode(', ', $services);
    $sheetPayload = json_encode([
        'timestamp' => $nowIso,
        'dateFormatted' => gmdate('d/m/Y, H:i:s'),
        'id' => $leadId,
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'genre' => $genre,
        'wordCount' => $wordCount,
        'package' => $pkgLabel,
        'quotedPrice' => $estimatedPrice,
        'isPromoOffer' => $isPromo ? 'YES' : 'NO',
        'priority' => $express ? 'URGENT 15-MIN CALLBACK' : 'Standard',
        'notes' => $message,
        'message' => $message,
        'row' => [
            $nowIso,
            $leadId,
            $name,
            $email,
            $phone,
            $genre,
            $wordCount,
            $isPromo ? '€499 Promo (74% OFF)' : 'Standard',
            '€' . $estimatedPrice,
            $express ? 'URGENT 15-MIN' : 'Standard',
            $message,
        ],
    ]);
    $ch = curl_init($sheetsUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $sheetPayload);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $resp = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlErr = curl_error($ch);
    curl_close($ch);

    $trimmedResp = is_string($resp) ? ltrim($resp) : '';
    $looksLikeHtml = $trimmedResp !== '' && (stripos($trimmedResp, '<!doctype') === 0 || stripos($trimmedResp, '<html') === 0);
    $looksLikeErrorJson = is_string($resp) && (strpos($resp, '"status":"error"') !== false || strpos($resp, '"status": "error"') !== false);
    $sheetsSent = ($code >= 200 && $code < 300 && $resp !== false && !$looksLikeHtml && !$looksLikeErrorJson);
    if (!$sheetsSent) {
        $sheetsError = $curlErr ?: ($looksLikeHtml ? 'Apps Script returned HTML login page' : "HTTP $code");
    }
}

if (!$mailSent && !$sheetsSent) {
    http_response_code(502);
    echo json_encode([
        'status' => 'error',
        'message' => 'Mail relay could not deliver the inquiry right now. Please contact us directly on WhatsApp or at info@perkinspublisher.com.',
        'leadId' => $leadId,
        'smtpConfigured' => ($smtpPass !== ''),
        'sheetsConfigured' => ($sheetsUrl !== '')
    ]);
    exit;
}

$response = [
    'status' => 'success',
    'message' => $isPromo
        ? 'Your €499 Publishing Package reservation has been recorded and transmitted to our editorial team!'
        : 'Your manuscript inquiry has been recorded and transmitted to our editorial team!',
    'leadId' => $leadId,
    'storedOnServer' => false,
    'emailDelivery' => [
        'smtpSent' => $mailSent,
        'smtpAuthenticated' => ($smtpPass !== ''),
        'method' => $mailMethod,
    ],
    'googleSheetsDelivery' => [
        'active' => ($sheetsUrl !== ''),
        'synced' => $sheetsSent,
    ],
];
if ($smtpError !== '' && !$mailSent) {
    $response['emailDelivery']['error'] = $smtpError;
}
if ($sheetsError !== '') {
    $response['googleSheetsDelivery']['error'] = $sheetsError;
}
echo json_encode($response);
