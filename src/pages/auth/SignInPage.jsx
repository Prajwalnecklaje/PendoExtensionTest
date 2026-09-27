import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth";
import {
  AuthButton,
  AuthHeading,
  AuthLayout,
  BackLink,
  Field,
  Input,
  Message,
  PasswordInput,
} from "./AuthLayout";
import { cleanFormErrors, getSafeNext, isValidEmail } from "./authUtils";

export default function SignInPage() {
  const { signIn, isAuthenticated, isReady } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [values, setValues] = useState({ email: "", password: "", remember: true });
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState(location.state?.message ? { type: "success", text: location.state.message } : null);
  const [loading, setLoading] = useState(false);

  const next = getSafeNext(location.search);

  useEffect(() => {
    if (isReady && isAuthenticated) navigate(next, { replace: true });
  }, [isAuthenticated, isReady, navigate, next]);

  const update = (key, value) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
    if (notice?.type === "error") setNotice(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = cleanFormErrors({
      email: !values.email ? "Enter your work email." : !isValidEmail(values.email) ? "Enter a valid email address." : "",
      password: !values.password ? "Enter your password." : "",
    });
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setNotice({ type: "error", text: "Check the highlighted fields and try again." });
      return;
    }

    setLoading(true);
    setNotice(null);
    try {
      const result = await signIn(values);
      if (result.needsVerification) {
        navigate(`/verify-email?email=${encodeURIComponent(result.user.email)}`, { replace: true });
        return;
      }
      navigate(next, { replace: true });
    } catch (error) {
      setNotice({ type: "error", text: error.message || "We couldn't sign you in right now." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <section className="auth-card" aria-labelledby="sign-in-title">
        <AuthHeading eyebrow="Welcome back" title="Sign in to Aster" />
        <form className="auth-form" onSubmit={handleSubmit} noValidate id="sign-in-form">
          {notice && <Message type={notice.type} id="sign-in-notification">{notice.text}</Message>}
          <Field label="Work email" id="sign-in-email" error={errors.email}>
            <Input
              id="sign-in-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={values.email}
              error={errors.email}
              onChange={(event) => update("email", event.target.value)}
            />
          </Field>
          <Field
            label="Password"
            id="sign-in-password"
            error={errors.password}
            action={<Link className="auth-label-link" to="/forgot-password" id="forgot-password-link">Forgot password?</Link>}
          >
            <PasswordInput id="sign-in-password" value={values.password} error={errors.password} onChange={(event) => update("password", event.target.value)} />
          </Field>
          <div className="auth-form-row">
            <label className="auth-check" htmlFor="remember-me-checkbox">
              <input id="remember-me-checkbox" type="checkbox" checked={values.remember} onChange={(event) => update("remember", event.target.checked)} />
              <span className="auth-check-mark" aria-hidden="true" />
              Remember me for 30 days
            </label>
          </div>
          <AuthButton id="sign-in-submit" type="submit" className="auth-button--full" loading={loading}>
            {loading ? "Signing you in…" : "Sign in to workspace"}
          </AuthButton>
        </form>
        <p className="auth-bottom-copy">New to Aster? <Link to="/sign-up" id="sign-up-link">Create a free workspace</Link></p>
        <BackLink to="/">Explore the public site</BackLink>
      </section>
    </AuthLayout>
  );
}

