const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export async function apiFetch(path, { method = 'GET', body, headers } = {}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers || {}),
    },
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
  });
  const contentType = res.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await res.json() : await res.text();
  if (!res.ok) {
    const message = typeof data === 'string' ? data : (data?.message || 'Erreur serveur');
    throw new Error(message);
  }
  return data;
}

export async function login(email, password) {
  return apiFetch('/auth/login', { method: 'POST', body: { email, password } });
}
