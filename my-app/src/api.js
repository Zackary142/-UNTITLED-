

function resolveApiBaseUrl() {
  const configured = import.meta.env.VITE_API_BASE_URL?.trim();

  if (configured && !/^https?:\/\/localhost(?::\d+)?$/i.test(configured)) {
    return configured.replace(/\/+$/, '');
  }

  return import.meta.env.DEV ? 'http://localhost:5139' : window.location.origin;
}

export const API = resolveApiBaseUrl();

async function parseJsonResponse(res) {
  const text = await res.text()
  let payload = null
  try { payload = text ? JSON.parse(text) : null } catch { payload = null }

  if (!res.ok) {
    const message = payload?.message || payload?.title || payload?.error || `Request failed with status ${res.status}`
    const error = new Error(message)
    error.errors = Array.isArray(payload) ? payload : payload?.errors
    throw error
  }
  return payload
}

async function fetchWithFallback(paths, options) {
  let lastRes = null;

  for (const path of paths) {
    const res = await fetch(`${API}${path}`, options);
    lastRes = res;

    if (res.ok) return res;
    if (res.status !== 404 && res.status !== 405) return res;
  }

  return lastRes;
}

export async function login(credentials) {
  const res = await fetchWithFallback(['/api/auth/login', '/api/Auth/Login', '/api/login'], {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  return parseJsonResponse(res);
}

export async function register(payload) {
  const res = await fetchWithFallback(['/api/auth/register', '/api/Auth/Register', '/api/register'], {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return parseJsonResponse(res);
}

export function authFetch(path, token, opts = {}) {
  const headers = { ...(opts.headers || {}), Authorization: `Bearer ${token}` };
  return fetch(`${API}${path}`, { ...opts, headers });
}

function authFetchWithFallback(paths, token, opts = {}) {
  const headers = { ...(opts.headers || {}), Authorization: `Bearer ${token}` };
  return fetchWithFallback(paths, { ...opts, headers });
}

export async function createQuote(payload, token) {
  const res = await authFetchWithFallback(['/api/Quote', '/api/quote'], token, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return parseJsonResponse(res);
}

export async function createInvoice(payload, token) {
  const res = await authFetchWithFallback(['/api/Invoice', '/api/invoice'], token, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return parseJsonResponse(res);
}

export async function convertQuoteToInvoice(quoteId, token) {
  const res = await authFetchWithFallback([
    `/api/Quote/${quoteId}/convert-to-invoice`,
    `/api/quote/${quoteId}/convert-to-invoice`,
  ], token, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  return parseJsonResponse(res);
}