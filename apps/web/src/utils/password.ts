import { sha256 } from "js-sha256";

export const hashPasswordSync = (password: string): string => sha256(password);

export type PwErrorKey = "errorNewPasswordRequired" | "errorPasswordWeak";

export type ConfirmErrorKey =
  | "errorConfirmPasswordRequired"
  | "errorPasswordsMismatch";

export type PasswordPolicy = {
  minLength?: number;
  requireLetter?: boolean;
  requireNumber?: boolean;
  requireSymbol?: boolean; // optional, off by default
};

const defaultPolicy: Required<PasswordPolicy> = {
  minLength: 8,
  requireLetter: true,
  requireNumber: true,
  requireSymbol: false,
};

/** Validate a single password against policy.
 *  Returns the error key (to be translated) or null when valid.
 */
export function validatePassword(
  password: string,
  policy: PasswordPolicy = defaultPolicy
): PwErrorKey | null {
  const p = { ...defaultPolicy, ...policy };

  if (!password.trim()) return "errorNewPasswordRequired";
  if (password.length < p.minLength) return "errorPasswordWeak";
  if (p.requireLetter && !/[A-Za-z]/.test(password)) return "errorPasswordWeak";
  if (p.requireNumber && !/\d/.test(password)) return "errorPasswordWeak";
  if (p.requireSymbol && !/[^\w\s]/.test(password)) return "errorPasswordWeak";
  return null;
}

/** Validate confirm password against original.
 *  Returns the error key (to be translated) or null when valid.
 */
export function validatePasswordConfirm(
  password: string,
  confirm: string
): ConfirmErrorKey | null {
  if (!confirm.trim()) return "errorConfirmPasswordRequired";
  if (password !== confirm) return "errorPasswordsMismatch";
  return null;
}
