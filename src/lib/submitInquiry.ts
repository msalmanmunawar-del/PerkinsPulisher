export interface InquirySubmissionPayload {
  id: string;
  name: string;
  email: string;
  phone: string;
  genre: string;
  wordCount: number;
  services: string[];
  status?: string;
  date: string;
  estimatedPrice?: number;
  message?: string;
  expressCallback?: boolean;
  expressService?: boolean;
}

export interface InquirySubmissionResponse {
  status: 'success' | 'error';
  message?: string;
  leadId?: string;
  storedOnServer?: boolean;
  duplicatePrevented?: boolean;
}

const TRANSIENT_STATUSES = new Set([502, 503, 504]);

async function postJsonAttempt(url: string, payload: InquirySubmissionPayload): Promise<{
  kind: 'json-ok' | 'json-err' | 'not-json' | 'not-found';
  status: number;
  data?: any;
}> {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const contentType = (res.headers.get('content-type') || '').toLowerCase();

  if (res.status === 404 || res.status === 405) {
    return { kind: 'not-found', status: res.status };
  }

  if (!contentType.includes('application/json')) {
    return { kind: 'not-json', status: res.status };
  }

  const data = await res.json();
  if (res.ok && data?.status !== 'error') {
    return { kind: 'json-ok', status: res.status, data };
  }

  return { kind: 'json-err', status: res.status, data };
}

export async function submitInquiryWithFallback(
  payload: InquirySubmissionPayload
): Promise<InquirySubmissionResponse> {
  const configuredBase = (((import.meta as any).env?.VITE_API_BASE_URL as string) || '').trim().replace(/\/+$/, '');
  const primaryEndpoints = configuredBase
    ? [`${configuredBase}/api/inquiry`, '/api/inquiry']
    : ['/api/inquiry'];

  let lastErrorMessage = '';
  let backendUnavailable = false;

  for (const endpoint of primaryEndpoints) {
    for (let attempt = 0; attempt < 2; attempt++) {
      let result: Awaited<ReturnType<typeof postJsonAttempt>>;
      try {
        result = await postJsonAttempt(endpoint, payload);
      } catch (err: any) {
        lastErrorMessage = err?.message || 'Network error while reaching inquiry server.';
        if (attempt === 0) {
          await new Promise((r) => setTimeout(r, 750));
          continue;
        }
        backendUnavailable = true;
        break;
      }

      if (result.kind === 'json-ok') {
        return result.data as InquirySubmissionResponse;
      }

      if (result.kind === 'not-found' || result.kind === 'not-json') {
        backendUnavailable = true;
        break;
      }

      // Handle explicit JSON error responses
      const msg = result.data?.message || 'Inquiry submission failed.';
      if (result.status === 400 || result.status === 429) {
        throw new Error(msg);
      }
      if (TRANSIENT_STATUSES.has(result.status) && attempt === 0) {
        lastErrorMessage = msg;
        await new Promise((r) => setTimeout(r, 750));
        continue;
      }
      throw new Error(msg);
    }
  }

  // Fallback for Apache/PHP hosting (e.g., Hostinger shared hosting where Node server.ts is not mounted)
  if (backendUnavailable) {
    try {
      const phpResult = await postJsonAttempt('/api/inquiry.php', payload);
      if (phpResult.kind === 'json-ok') {
        return phpResult.data as InquirySubmissionResponse;
      }
      if (phpResult.kind === 'json-err') {
        throw new Error(phpResult.data?.message || 'Unable to deliver inquiry via mail relay.');
      }
    } catch (phpErr: any) {
      if (phpErr instanceof Error && phpErr.message) {
        lastErrorMessage = phpErr.message;
      }
    }
  }

  throw new Error(
    lastErrorMessage ||
      'Unable to reach the inquiry delivery server right now. Please try again or message us directly on WhatsApp.'
  );
}
