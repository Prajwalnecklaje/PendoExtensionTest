import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../auth";
import {
  AuthButton,
  AuthHeading,
  AuthLayout,
  CheckCircleIcon,
  Message,
} from "./AuthLayout";

export default function LogoutPage() {
  const { currentUser, isReady, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState(null);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut();
      setNotice({ type: "success", text: "You’ve been signed out securely." });
      window.setTimeout(() => navigate("/sign-in", { replace: true, state: { message: "You’ve signed out of Aster." } }), 450);
    } catch {
      setNotice({ type: "error", text: "We couldn't sign you out. Please try again." });
      setLoading(false);
    }
  };

  if (!isReady) {
    return (
      <AuthLayout>
        <section className="auth-card auth-centered"><AuthHeading title="Checking your session…" /></section>
      </AuthLayout>
    );
  }

  if (!currentUser) {
    return (
      <AuthLayout>
        <section className="auth-card auth-centered" aria-labelledby="logged-out-title">
          <span className="auth-icon-orb auth-icon-orb--success"><CheckCircleIcon /></span>
          <AuthHeading eyebrow="Signed out" title="You’re already signed out">
            Sign in when you’re ready to return to your Aster workspace.
          </AuthHeading>
          <Link className="auth-button auth-button--primary auth-button--full" to="/sign-in" id="return-to-sign-in">Sign in</Link>
        </section>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <section className="auth-card auth-centered" aria-labelledby="logout-title">
        <span className="auth-icon-orb auth-icon-orb--warning"><CheckCircleIcon /></span>
        <AuthHeading eyebrow="End session" title="Sign out of Aster?">
          You’ll need your password to get back into this workspace.
        </AuthHeading>
        <div className="auth-log-out-user" id="logout-user-preview">
          <span className="auth-avatar">{currentUser.avatar || currentUser.name?.slice(0, 2).toUpperCase()}</span>
          <div><strong>{currentUser.name}</strong><span>{currentUser.email}</span></div>
        </div>
        {notice && <div style={{ marginTop: "1rem" }}><Message type={notice.type} id="logout-notification">{notice.text}</Message></div>}
        <div className="auth-form" style={{ marginTop: "1.15rem" }}>
          <AuthButton id="logout-confirm-button" type="button" variant="danger" className="auth-button--full" loading={loading} onClick={handleLogout}>
            {loading ? "Signing out…" : "Yes, sign me out"}
          </AuthButton>
          <AuthButton id="logout-cancel-button" type="button" variant="secondary" className="auth-button--full" disabled={loading} onClick={() => navigate("/dashboard")}>Stay signed in</AuthButton>
        </div>
      </section>
    </AuthLayout>
  );
}

