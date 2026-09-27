import { useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";

export function Brand({ mobile = false }) {
  return (
    <Link className={`auth-brand${mobile ? " auth-mobile-brand" : ""}`} to="/" aria-label="Aster home">
      <span className="auth-brand-mark" aria-hidden="true"><i /></span>
      <span>Aster</span>
    </Link>
  );
}

export function AuthLayout({ children, homeLink = true }) {
  return (
    <main className="auth-shell" id="auth-shell">
      <aside className="auth-panel" aria-label="About Aster">
        <Brand />
        <div className="auth-panel-copy">
          <span className="auth-kicker"><span className="auth-kicker-dot" /> Calm momentum, every day</span>
          <h1>Make the next <em>right move</em> obvious.</h1>
          <p>
            Aster turns your team’s plans, work, and signals into one clear operating rhythm.
          </p>
          <div className="auth-mini-stats" aria-label="Aster highlights">
            <div className="auth-mini-stat"><strong>12.4k</strong><span>weekly decisions</span></div>
            <div className="auth-mini-stat"><strong>38%</strong><span>less status-chasing</span></div>
            <div className="auth-mini-stat"><strong>4.9/5</strong><span>team confidence</span></div>
          </div>
        </div>
        <div className="auth-proof">
          <span className="auth-proof-avatar" aria-hidden="true">JM</span>
          <blockquote>
            “Aster gives us a shared view without turning updates into another full-time job.”
            <cite>Jules M., Operations lead at Fairwater</cite>
          </blockquote>
        </div>
      </aside>

      <section className="auth-main">
        <header className="auth-main-header">
          <Brand mobile />
          {homeLink && <Link to="/" id="auth-return-home">← Back to website</Link>}
        </header>
        <div className="auth-main-inner">{children}</div>
        <footer className="auth-footer">
          © {new Date().getFullYear()} Aster HQ · <Link to="/help#privacy">Privacy</Link> · <Link to="/help#terms">Terms</Link>
        </footer>
      </section>
    </main>
  );
}

export function AuthHeading({ eyebrow, title, children, centered = false }) {
  return (
    <div className={`auth-heading${centered ? " auth-centered" : ""}`}>
      {eyebrow && <p className="auth-eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

export function Field({ label, id, error, help, action, children }) {
  return (
    <label className="auth-field" htmlFor={id}>
      <span className="auth-label-row">
        <span className="auth-label">{label}</span>
        {action}
      </span>
      {children}
      {error ? <span className="auth-field-error" role="alert">{error}</span> : help ? <span className="auth-field-help">{help}</span> : null}
    </label>
  );
}

export function Input({ id, error, className = "", ...props }) {
  return <input id={id} className={`auth-input${error ? " auth-input--error" : ""} ${className}`.trim()} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...props} />;
}

export function PasswordInput({ id, error, value, onChange, placeholder = "Enter your password", autoComplete = "current-password" }) {
  const [visible, setVisible] = useState(false);
  return (
    <span className="auth-input-wrap">
      <input
        id={id}
        className={`auth-input auth-input--password${error ? " auth-input--error" : ""}`}
        type={visible ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
      />
      <button
        className="auth-password-toggle"
        type="button"
        id={`${id}-visibility-toggle`}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        onClick={() => setVisible((isVisible) => !isVisible)}
      >
        {visible ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </span>
  );
}

export function AuthButton({ children, loading = false, variant = "primary", className = "", disabled = false, ...props }) {
  return (
    <button className={`auth-button auth-button--${variant} ${className}`.trim()} disabled={loading || disabled} {...props}>
      {loading && <span className="auth-spinner" aria-hidden="true" />}
      {children}
    </button>
  );
}

export function Message({ type = "info", children, id }) {
  const Icon = type === "success" ? CheckCircleIcon : type === "error" ? AlertIcon : InfoIcon;
  return <div className={`auth-message auth-message--${type}`} id={id} role={type === "error" ? "alert" : "status"}><Icon /> <span>{children}</span></div>;
}

export function Divider() {
  return <div className="auth-divider" aria-hidden="true">or continue with</div>;
}

export function SocialButtons({ onUnavailable }) {
  return (
    <div className="auth-socials">
      <AuthButton variant="secondary" type="button" className="auth-social-button" onClick={() => onUnavailable?.("Google")}> <span className="auth-social-mark" aria-hidden="true">G</span> Google </AuthButton>
      <AuthButton variant="secondary" type="button" className="auth-social-button" onClick={() => onUnavailable?.("Microsoft")}> <span className="auth-social-mark" aria-hidden="true">⊞</span> Microsoft </AuthButton>
    </div>
  );
}

export function BackLink({ to, children }) {
  return <Link className="auth-back-link" to={to}><ArrowLeftIcon /> {children}</Link>;
}

export function EyeIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.6" /></svg>;
}
export function EyeOffIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m3 3 18 18" /><path d="M10.6 6.2A10.7 10.7 0 0 1 12 6c6 0 9.5 6 9.5 6a17 17 0 0 1-3.1 3.8M6.4 6.4C3.9 8.1 2.5 12 2.5 12s3.5 6 9.5 6c1.3 0 2.5-.3 3.6-.7" /><path d="M9.7 9.7a3.2 3.2 0 0 0 4.5 4.5" /></svg>;
}
export function CheckCircleIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="m8.3 12.1 2.35 2.35 5-5.1" /></svg>;
}
export function AlertIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true"><path d="M12 3.4 21 20H3L12 3.4Z" /><path d="M12 9v4.4M12 16.7v.1" /></svg>;
}
export function InfoIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="M12 10.5V16M12 7.6v.1" /></svg>;
}
export function MailIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3.3" y="5.3" width="17.4" height="13.4" rx="2" /><path d="m4.7 7.2 7.3 5.5 7.3-5.5" /></svg>;
}
export function LockIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="4.3" y="10" width="15.4" height="10.3" rx="2" /><path d="M8 10V7.6a4 4 0 0 1 8 0V10" /></svg>;
}
export function ArrowLeftIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true"><path d="m14.5 5.5-6.5 6.5 6.5 6.5" /><path d="M8.5 12h11" /></svg>;
}
