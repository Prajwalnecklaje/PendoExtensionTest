const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const SESSION_KEY = 'p4e-auth-session-v1';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

function assertConfigured() {
  if (!isSupabaseConfigured) {
    throw new Error('Production authentication is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Netlify.');
  }
}

function readSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); } catch { return null; }
}

function saveSession(session) {
  if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  else localStorage.removeItem(SESSION_KEY);
}

async function request(path, { method = 'GET', body, accessToken, headers = {} } = {}) {
  assertConfigured();
  const response = await fetch(`${SUPABASE_URL}${path}`, {
    method,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await response.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = { message: text }; }
  if (!response.ok) {
    const error = new Error(data?.msg || data?.message || data?.error_description || data?.error || 'Request failed.');
    error.status = response.status;
    throw error;
  }
  return data;
}

function sessionFromHash() {
  if (typeof window === 'undefined' || !window.location.hash) return null;
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  const access_token = hash.get('access_token');
  const refresh_token = hash.get('refresh_token');
  const expires_in = Number(hash.get('expires_in') || 3600);
  if (!access_token || !refresh_token) return null;
  return { access_token, refresh_token, expires_in, expires_at: Math.floor(Date.now() / 1000) + expires_in, token_type: 'bearer' };
}

export function consumeAuthRedirect() {
  const session = sessionFromHash();
  if (!session) return null;
  saveSession(session);
  window.history.replaceState({}, document.title, `${window.location.pathname}${window.location.search}`);
  return session;
}

export async function getSession() {
  if (!isSupabaseConfigured) return null;
  const redirected = consumeAuthRedirect();
  if (redirected) return redirected;
  const session = readSession();
  if (!session?.access_token) return null;
  if (session.expires_at && session.expires_at > Math.floor(Date.now() / 1000) + 60) return session;
  if (!session.refresh_token) return null;
  try {
    const refreshed = await request('/auth/v1/token?grant_type=refresh_token', { method: 'POST', body: { refresh_token: session.refresh_token } });
    const next = { ...refreshed, user: session.user, expires_at: Math.floor(Date.now() / 1000) + Number(refreshed.expires_in || 3600) };
    saveSession(next);
    return next;
  } catch {
    saveSession(null);
    return null;
  }
}

export async function getUser(session) {
  if (!session?.access_token) return null;
  return request('/auth/v1/user', { accessToken: session.access_token });
}

export async function signIn(email, password) {
  const session = await request('/auth/v1/token?grant_type=password', { method: 'POST', body: { email, password } });
  const next = { ...session, expires_at: Math.floor(Date.now() / 1000) + Number(session.expires_in || 3600) };
  saveSession(next);
  return { session: next, user: session.user };
}

export async function signUp({ name, email, password, company, teamSize }) {
  const redirectTo = `${window.location.origin}/verify-email`;
  const result = await request('/auth/v1/signup', {
    method: 'POST',
    body: {
      email,
      password,
      data: { name, company: company || 'My workspace', teamSize: teamSize || 'Just me', role: 'Workspace owner' },
      options: { email_redirect_to: redirectTo },
    },
  });
  if (result?.access_token) {
    const session = { ...result, expires_at: Math.floor(Date.now() / 1000) + Number(result.expires_in || 3600) };
    saveSession(session);
  }
  return result;
}

export async function resendSignupEmail(email) {
  return request('/auth/v1/resend', { method: 'POST', body: { type: 'signup', email } });
}

export async function requestPasswordReset(email) {
  return request('/auth/v1/recover', { method: 'POST', body: { email, redirect_to: `${window.location.origin}/reset-password` } });
}

export async function updatePassword(password, session) {
  return request('/auth/v1/user', { method: 'PUT', accessToken: session.access_token, body: { password } });
}

export async function signOut(session) {
  if (session?.access_token) {
    try { await request('/auth/v1/logout', { method: 'POST', accessToken: session.access_token }); } catch { /* local cleanup still matters */ }
  }
  saveSession(null);
}

export async function getWorkspaceValue(session, key) {
  const rows = await request(`/rest/v1/workspace_data?user_id=eq.${encodeURIComponent(session.user.id)}&key=eq.${encodeURIComponent(key)}&select=value`, { accessToken: session.access_token });
  return rows?.[0]?.value ?? null;
}

export async function setWorkspaceValue(session, key, value) {
  await request('/rest/v1/workspace_data?on_conflict=user_id,key', {
    method: 'POST',
    accessToken: session.access_token,
    headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: { user_id: session.user.id, key, value, updated_at: new Date().toISOString() },
  });
}

export async function deleteWorkspaceData(session) {
  await request(`/rest/v1/workspace_data?user_id=eq.${encodeURIComponent(session.user.id)}`, { method: 'DELETE', accessToken: session.access_token });
}
