export const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5139';

async function parseJsonResponse(res) {
  const text = await res.text();
  let payload = null;

  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    payload = null;
  }

  if (!res.ok) {
    const message = payload?.message || payload?.title || payload?.error || `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return payload;
}

export async function login(credentials) {
  const res = await fetch(`${API}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  return parseJsonResponse(res);
}

export function authFetch(path, token, opts = {}) {
  const headers = { ...(opts.headers || {}), Authorization: `Bearer ${token}` };
  return fetch(`${API}${path}`, { ...opts, headers });
}

export async function createQuote(payload, token) {
  const res = await authFetch('/api/Quote', token, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return parseJsonResponse(res);
}

export async function createInvoice(payload, token) {
  const res = await authFetch('/api/Invoice', token, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return parseJsonResponse(res);
}