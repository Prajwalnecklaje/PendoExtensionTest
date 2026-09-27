export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value) {
  return EMAIL_PATTERN.test(value.trim());
}

export function passwordScore(password = "") {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
}

export function passwordFeedback(score) {
  if (!score) return "Use 8+ characters with a number and symbol.";
  if (score === 1) return "Too easy to guess";
  if (score === 2) return "Getting stronger";
  if (score === 3) return "Strong password";
  return "Excellent password";
}

export function getSafeNext(search) {
  const candidate = new URLSearchParams(search).get("next");
  return candidate && candidate.startsWith("/") && !candidate.startsWith("//") ? candidate : "/dashboard";
}

export function cleanFormErrors(errors) {
  return Object.fromEntries(Object.entries(errors).filter(([, value]) => Boolean(value)));
}

