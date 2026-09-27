import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth";
import { AuthButton, AuthHeading, AuthLayout, CheckCircleIcon, MailIcon, Message } from "./AuthLayout";

export default function VerifyEmailPage() {
  const { currentUser, resendVerification, verifyEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const email = useMemo(() => new URLSearchParams(location.search).get("email") || currentUser?.email || "", [currentUser?.email, location.search]);
  const [notice, setNotice] = useState(null);
  const [complete, setComplete] = useState(Boolean(currentUser?.emailVerified));
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (!cooldown) return;
    const timer = window.setInterval(() => setCooldown((seconds) => Math.max(0, seconds - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [cooldown]);

  useEffect(() => {
    let active = true;
    verifyEmail().then((user) => { if (active && user?.emailVerified) { setComplete(true); setNotice({ type: "success", text: "Email verified — your workspace is ready." }); } }).catch(() => {});
    return () => { active = false; };
  }, [verifyEmail]);

  const checkVerification = async () => {
    setLoading(true); setNotice(null);
    try { await verifyEmail(); setComplete(true); setNotice({ type: "success", text: "Email verified — your workspace is ready." }); }
    catch (error) { setNotice({ type: "error", text: error.message || "We couldn't verify that address yet." }); }
    finally { setLoading(false); }
  };

  const handleResend = async () => {
    if (cooldown || !email) return;
    setResendLoading(true); setNotice(null);
    try { await resendVerification(email); setCooldown(30); setNotice({ type: "info", text: "A fresh verification link has been sent." }); }
    catch (error) { setNotice({ type: "error", text: error.message || "We couldn't resend the verification email." }); }
    finally { setResendLoading(false); }
  };

  if (complete) return <AuthLayout><section className="auth-card auth-centered" aria-labelledby="verification-complete-title"><span className="auth-icon-orb auth-icon-orb--success"><CheckCircleIcon /></span><AuthHeading eyebrow="All set" title="Your email is verified">You can now explore the full Aster workspace.</AuthHeading>{notice && <Message type={notice.type} id="verification-complete-notification">{notice.text}</Message>}<div className="auth-form" style={{ marginTop: "1.15rem" }}><AuthButton id="continue-to-dashboard" type="button" className="auth-button--full" onClick={() => navigate("/dashboard")}>Continue to dashboard</AuthButton><Link className="auth-button auth-button--secondary auth-button--full" to="/profile">Review profile</Link></div></section></AuthLayout>;

  return <AuthLayout><section className="auth-card auth-centered" aria-labelledby="verify-email-title"><span className="auth-icon-orb"><MailIcon /></span><AuthHeading eyebrow="One last step" title="Check your inbox">{email ? <>We sent a verification link to <strong>{email}</strong>.</> : "Check your inbox for the verification link."}</AuthHeading>{notice && <Message type={notice.type} id="verify-email-notification">{notice.text}</Message>}<div className="auth-form"><AuthButton id="verify-email-submit" type="button" className="auth-button--full" loading={loading} onClick={checkVerification}>{loading ? "Checking verification…" : "I've verified my email"}</AuthButton></div><p className="auth-resend">Didn't receive it? {resendLoading ? "Sending…" : <button id="resend-verification-button" type="button" disabled={Boolean(cooldown)} onClick={handleResend}>{cooldown ? `Resend available in ${cooldown}s` : "Resend verification link"}</button>}</p><p className="auth-bottom-copy">Wrong email? <Link to="/sign-up">Create a different workspace</Link></p></section></AuthLayout>;
}
