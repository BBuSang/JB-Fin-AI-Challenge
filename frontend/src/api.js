const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
  return res.json();
}

export const api = {
  dashboardSummary: () => request('/api/dashboard/summary'),
  prepayments: () => request('/api/prepayments'),
  approvePrepayment: (id, limit) =>
    request(`/api/prepayments/${id}/approve`, {
      method: 'POST',
      body: JSON.stringify({ limit }),
    }),
  customer: (id) => request(`/api/customers/${id}`),
  simulate: (payload) =>
    request('/api/scoring/simulate', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  shap: (prepaymentId) => request(`/api/scoring/${prepaymentId}/shap`),
  policyMatches: (customerId) =>
    request(`/api/policies/matches${customerId ? `?customerId=${customerId}` : ''}`),
  risks: (level = 'all') => request(`/api/risks?level=${level}`),
};
