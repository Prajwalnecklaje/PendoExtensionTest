import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth";
import {
  AuthButton,
  AuthHeading,
  AuthLayout,
  BackLink,
  Field,
  LockIcon,
  Message,
  PasswordInput,
} from "./AuthLayout";
import { cleanFormErrors, passwordFeedback, passwordScore } from "./authUtils";

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const queryEmail = params.get("email") || "";
  const [values, setValues] = useState({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(false);
  const score = passwordScore(values.password);

  const update = (key, value) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = cleanFormErrors({
      password: values.password.length < 8 ? "Use at least 8 characters." : score < 2 ? "Include more character types for a stronger password." : "",
      confirmPassword: values.confirmPassword !== values.password ? "Passwords don't match yet." : "",
    });
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setNotice({ type: "error", text: nextErrors.email || "Please fix the highlighted fields." });
      return;
    }
    setLoading(true);
    setNotice(null);
    try {
      await resetPassword({ password: values.password });
      navigate("/sign-in", { replace: true, state: { message: "Your password has been reset. Sign in with the new one." } });
    } catch (error) {
      setNotice({ type: "error", text: error.message || "We couldn't reset your password." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <section className="auth-card auth-centered" aria-labelledby="reset-password-title">
        <span className="auth-icon-orb auth-icon-orb--success"><LockIcon /></span>
        <AuthHeading eyebrow="Choose a new password" title="Reset your password">
          Your secure reset link is valid. Choose a new password for your account.
        </AuthHeading>
        <form className="auth-form" id="reset-password-form" onSubmit={handleSubmit} noValidate>
          {notice && <Message type={notice.type} id="reset-password-notification">{notice.text}</Message>}
          <Field label="New password" id="reset-password-new" error={errors.password} help="At least 8 characters, with a number or symbol.">
            <PasswordInput id="reset-password-new" value={values.password} error={errors.password} onChange={(event) => update("password", event.target.value)} autoComplete="new-password" placeholder="Create a new password" />
            <div className="auth-password-meter" data-score={score} aria-label={`Password strength: ${passwordFeedback(score)}`}><span /><span /><span /><span /></div>
          </Field>
          <Field label="Confirm new password" id="reset-password-confirm" error={errors.confirmPassword}>
            <PasswordInput id="reset-password-confirm" value={values.confirmPassword} error={errors.confirmPassword} onChange={(event) => update("confirmPassword", event.target.value)} autoComplete="new-password" placeholder="Confirm your new password" />
          </Field>
          <AuthButton id="reset-password-submit" type="submit" className="auth-button--full" loading={loading}>
            {loading ? "Saving new password…" : "Reset password"}
          </AuthButton>
        </form>
        <BackLink to="/sign-in">Back to sign in</BackLink>
      </section>
    </AuthLayout>
  );
}

