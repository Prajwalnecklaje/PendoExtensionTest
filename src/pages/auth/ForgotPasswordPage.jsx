import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth";
import {
  AuthButton,
  AuthHeading,
  AuthLayout,
  BackLink,
  Field,
  Input,
  MailIcon,
  Message,
} from "./AuthLayout";
import { isValidEmail } from "./authUtils";

export default function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setError("Enter the email address linked to your workspace.");
      return;
    }
    setError("");
    setLoading(true);
    setNotice(null);
    try {
      const result = await requestPasswordReset(email);
      setNotice({ type: "success", text: "If an account uses that address, a secure reset link is on its way." });
    } catch {
      setNotice({ type: "error", text: "We couldn't prepare a reset link. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <section className="auth-card auth-centered" aria-labelledby="forgot-password-title">
        <span className="auth-icon-orb"><MailIcon /></span>
        <AuthHeading eyebrow="Password recovery" title="Get back into Aster">
          Enter your work email and we’ll help you reset your password.
        </AuthHeading>
        <form className="auth-form" id="forgot-password-form" onSubmit={handleSubmit} noValidate>
          {notice && <Message type={notice.type} id="forgot-password-notification">{notice.text}</Message>}
          <Field label="Work email" id="forgot-password-email" error={error}>
            <Input
              id="forgot-password-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@company.com"
              value={email}
              error={error}
              onChange={(event) => { setEmail(event.target.value); setError(""); }}
            />
          </Field>
          <AuthButton id="forgot-password-submit" type="submit" className="auth-button--full" loading={loading}>
            {loading ? "Preparing reset link…" : "Send reset link"}
          </AuthButton>

        </form>
        <BackLink to="/sign-in">Back to sign in</BackLink>
      </section>
    </AuthLayout>
  );
}

