/** Error keys you can translate per-page, e.g. "forgotPasswordPage.errorEmailRequired" */
export type EmailErrorKey = "errorEmailRequired" | "errorEmailInvalid";

/** Trim + basic RFC-ish email validation. Returns an error key or null if valid. */
export function validateEmail(email: string): EmailErrorKey | null {
  const value = (email ?? "").trim();
  if (!value) return "errorEmailRequired";

  // Simple, practical pattern (accepts plus, dots, subdomains, etc.)
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  if (!ok) return "errorEmailInvalid";

  return null;
}

/** Convenience boolean */
export function isEmailValid(email: string): boolean {
  return validateEmail(email) === null;
}
