const API_BASE_URL = 'https://spacer-phase-5-final-project-8.onrender.com';

export const fetchAPI = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('spacer_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const message = body.detail || body.message || `HTTP ${res.status}`;
    throw new Error(message);
  }
  // some endpoints return empty body
  const text = await res.text();
  return text ? JSON.parse(text) : {};
};