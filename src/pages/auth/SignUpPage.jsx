import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { cleanFormErrors, isValidEmail, passwordFeedback, passwordScore } from "./authUtils";

export default function SignUpPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    teamSize: "2–10 people",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(false);
  const score = passwordScore(values.password);

  const update = (key, value) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
    if (notice?.type === "error") setNotice(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = cleanFormErrors({
      name: !values.name.trim() ? "Tell us your name." : "",
      email: !values.email ? "Enter your work email." : !isValidEmail(values.email) ? "Enter a valid email address." : "",
      password: values.password.length < 8 ? "Use at least 8 characters." : score < 2 ? "Add a number or symbol to strengthen it." : "",
      confirmPassword: values.confirmPassword !== values.password ? "Passwords don't match yet." : "",
      terms: !values.terms ? "Please agree before creating your workspace." : "",
    });
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setNotice({ type: "error", text: "A few details need your attention." });
      return;
    }
    setLoading(true);
    setNotice(null);
    try {
      const user = await signUp(values);
      navigate(`/verify-email?email=${encodeURIComponent(user.email)}&source=signup`, { replace: true });
    } catch (error) {
      setNotice({ type: "error", text: error.message || "We couldn't create your workspace." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <section className="auth-card" aria-labelledby="sign-up-title">
        <AuthHeading eyebrow="Start for free" title="Create your Aster workspace">
          A focused home for the work your team is moving forward.
        </AuthHeading>
        <form className="auth-form" id="sign-up-form" onSubmit={handleSubmit} noValidate>
          {notice && <Message type={notice.type} id="sign-up-notification">{notice.text}</Message>}
          <Field label="Your name" id="sign-up-name" error={errors.name}>
            <Input id="sign-up-name" autoComplete="name" placeholder="Jordan Lee" value={values.name} error={errors.name} onChange={(event) => update("name", event.target.value)} />
          </Field>
          <Field label="Work email" id="sign-up-email" error={errors.email}>
            <Input id="sign-up-email" type="email" inputMode="email" autoComplete="email" placeholder="jordan@company.com" value={values.email} error={errors.email} onChange={(event) => update("email", event.target.value)} />
          </Field>
          <div className="auth-form-row" style={{ alignItems: "flex-start" }}>
            <Field label="Company (optional)" id="sign-up-company" error={errors.company}>
              <Input id="sign-up-company" autoComplete="organization" placeholder="Acme Inc." value={values.company} error={errors.company} onChange={(event) => update("company", event.target.value)} />
            </Field>
            <Field label="Team size" id="sign-up-team-size">
              <select id="sign-up-team-size" className="auth-select" value={values.teamSize} onChange={(event) => update("teamSize", event.target.value)}>
                <option>Just me</option>
                <option>2–10 people</option>
                <option>11–50 people</option>
                <option>51–200 people</option>
                <option>200+ people</option>
              </select>
            </Field>
          </div>
          <Field label="Create a password" id="sign-up-password" error={errors.password} help="Use 8+ characters. A mix of letters, numbers, and symbols is best.">
            <PasswordInput id="sign-up-password" value={values.password} error={errors.password} onChange={(event) => update("password", event.target.value)} autoComplete="new-password" placeholder="Create a secure password" />
            <div className="auth-password-meter" data-score={score} aria-label={`Password strength: ${passwordFeedback(score)}`}><span /><span /><span /><span /></div>
            <p className="auth-password-strength">{passwordFeedback(score)}</p>
          </Field>
          <Field label="Confirm password" id="sign-up-confirm-password" error={errors.confirmPassword}>
            <PasswordInput id="sign-up-confirm-password" value={values.confirmPassword} error={errors.confirmPassword} onChange={(event) => update("confirmPassword", event.target.value)} autoComplete="new-password" placeholder="Type it once more" />
          </Field>
          <label className="auth-check" htmlFor="terms-checkbox">
            <input id="terms-checkbox" type="checkbox" checked={values.terms} onChange={(event) => update("terms", event.target.checked)} />
            <span className="auth-check-mark" aria-hidden="true" />
            <span className="auth-consent">I agree to Aster’s <Link to="/help#terms">Terms</Link> and <Link to="/help#privacy">Privacy Policy</Link>.</span>
          </label>
          {errors.terms && <p className="auth-field-error" role="alert">{errors.terms}</p>}
          <AuthButton id="sign-up-submit" type="submit" className="auth-button--full" loading={loading}>
            {loading ? "Creating your workspace…" : "Create free workspace"}
          </AuthButton>
        </form>
        <p className="auth-bottom-copy">Already have an account? <Link to="/sign-in" id="sign-in-link">Sign in</Link></p>
        <BackLink to="/">Back to website</BackLink>
      </section>
    </AuthLayout>
  );
}

