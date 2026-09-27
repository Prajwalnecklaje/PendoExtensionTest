import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  getSession, getUser, isSupabaseConfigured, requestPasswordReset as supabaseRequestPasswordReset, deleteWorkspaceData,
  resendSignupEmail, signIn as supabaseSignIn, signOut as supabaseSignOut, signUp as supabaseSignUp,
  updatePassword as supabaseUpdatePassword, getWorkspaceValue, setWorkspaceValue,
} from './supabaseApi';

const AuthContext = createContext(null);

function profileFromUser(user) {
  if (!user) return null;
  const metadata = user.user_metadata || {};
  const name = metadata.name || user.email?.split('@')[0] || 'User';
  return {
    id: user.id,
    name,
    email: user.email || '',
    role: metadata.role || 'Workspace owner',
    company: metadata.company || 'My workspace',
    teamSize: metadata.teamSize || 'Just me',
    avatar: metadata.avatar || name.split(/\s+/).map((part) => part[0]).slice(0, 2).join('').toUpperCase(),
    emailVerified: Boolean(user.email_confirmed_at),
    createdAt: user.created_at,
  };
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const hydrate = useCallback(async () => {
    if (!isSupabaseConfigured) { setIsReady(true); return; }
    try {
      const nextSession = await getSession();
      if (nextSession) {
        const user = await getUser(nextSession);
        setSession(nextSession);
        setCurrentUser(profileFromUser(user));
      }
    } catch (error) {
      console.error('Authentication bootstrap failed:', error);
      setSession(null); setCurrentUser(null);
    } finally { setIsReady(true); }
  }, []);

  useEffect(() => { hydrate(); }, [hydrate]);

  const signIn = useCallback(async ({ email, password }) => {
    if (!isSupabaseConfigured) throw new Error('Production authentication is not configured. Add the Supabase environment variables in Netlify.');
    const result = await supabaseSignIn(email.trim().toLowerCase(), password);
    setSession(result.session);
    const user = profileFromUser(result.user);
    setCurrentUser(user);
    return { user, needsVerification: !user.emailVerified };
  }, []);

  const signUp = useCallback(async (values) => {
    if (!isSupabaseConfigured) throw new Error('Production authentication is not configured. Add the Supabase environment variables in Netlify.');
    const result = await supabaseSignUp(values);
    if (result?.access_token && result.user) {
      const nextSession = { ...result, expires_at: Math.floor(Date.now() / 1000) + Number(result.expires_in || 3600) };
      setSession(nextSession); setCurrentUser(profileFromUser(result.user));
    }
    return { email: values.email.trim().toLowerCase(), emailVerified: Boolean(result?.user?.email_confirmed_at) };
  }, []);

  const requestPasswordReset = useCallback(async (email) => {
    await supabaseRequestPasswordReset(email.trim().toLowerCase());
    return { email: email.trim().toLowerCase() };
  }, []);

  const resetPassword = useCallback(async ({ password }) => {
    const nextSession = await getSession();
    if (!nextSession) throw new Error('Your password reset link is invalid or has expired. Request a new link.');
    await supabaseUpdatePassword(password, nextSession);
    return true;
  }, []);

  const verifyEmail = useCallback(async () => {
    const nextSession = await getSession();
    if (!nextSession) throw new Error('Open the verification link from your email to complete verification.');
    const user = await getUser(nextSession);
    setSession(nextSession); setCurrentUser(profileFromUser(user));
    if (!user?.email_confirmed_at) throw new Error('Your email is not verified yet. Please use the latest verification email.');
    return profileFromUser(user);
  }, []);

  const resendVerification = useCallback(async (email) => {
    await resendSignupEmail(email.trim().toLowerCase());
    return { ok: true, email };
  }, []);

  const updateCurrentUser = useCallback(async (updates) => {
    if (!session?.access_token) throw new Error('You need to sign in before updating your account.');
    const metadata = {
      name: updates.name ?? currentUser.name,
      company: updates.company ?? currentUser.company,
      teamSize: updates.teamSize ?? currentUser.teamSize,
      role: updates.role ?? currentUser.role,
    };
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL.replace(/\/$/, '')}/auth/v1/user`, {
      method: 'PUT',
      headers: { apikey: import.meta.env.VITE_SUPABASE_ANON_KEY, Authorization: `Bearer ${session.access_token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: metadata }),
    });
    if (!response.ok) throw new Error('We could not update your profile.');
    const user = await response.json();
    const profile = profileFromUser(user);
    setCurrentUser(profile);
    return profile;
  }, [currentUser, session]);

  const signOut = useCallback(async () => {
    await supabaseSignOut(session);
    setSession(null); setCurrentUser(null);
  }, [session]);

  const value = useMemo(() => ({
    currentUser,
    isAuthenticated: Boolean(currentUser && session),
    isReady,
    users: currentUser ? [currentUser] : [],
    session,
    supabaseConfigured: isSupabaseConfigured,
    signIn, signUp, signOut, requestPasswordReset, resetPassword, verifyEmail, resendVerification, updateCurrentUser,
    getWorkspaceValue: (key) => session ? getWorkspaceValue(session, key) : Promise.resolve(null),
    setWorkspaceValue: (key, value) => session ? setWorkspaceValue(session, key, value) : Promise.reject(new Error('Not authenticated')),
    deleteWorkspaceData: () => session ? deleteWorkspaceData(session) : Promise.reject(new Error('Not authenticated')),
  }), [currentUser, isReady, session, signIn, signUp, signOut, requestPasswordReset, resetPassword, verifyEmail, resendVerification, updateCurrentUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider.');
  return context;
}

export const authStorageKeys = { session: 'p4e-auth-session-v1' };
