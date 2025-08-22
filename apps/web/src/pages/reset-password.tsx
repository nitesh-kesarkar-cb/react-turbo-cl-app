import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { H2 } from "@/components/ui/heading";
import { Text } from "@/components/ui/text"; // ✅ use Text
import { Eye, EyeOff } from "lucide-react";
import { validatePassword, validatePasswordConfirm } from "@/utils/password";
import { MOCK_API_TIMEOUT } from "@/utils/constant";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { t } = useTranslation("auth");

  const email =
    (typeof window !== "undefined" && sessionStorage.getItem("resetEmail")) ||
    "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [touched, setTouched] = useState<{
    password?: boolean;
    confirm?: boolean;
  }>({});
  const [submitting, setSubmitting] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const pwStrengthError = useMemo(() => {
    if (!touched.password) return "";
    const key = validatePassword(password);
    return key ? t(`resetPasswordPage.${key}`) : "";
  }, [password, touched.password, t]);

  const confirmError = useMemo(() => {
    if (!touched.confirm) return "";
    const key = validatePasswordConfirm(password, confirm);
    return key ? t(`resetPasswordPage.${key}`) : "";
  }, [password, confirm, touched.confirm, t]);

  const canSubmit =
    !validatePassword(password) &&
    !validatePasswordConfirm(password, confirm) &&
    !!password &&
    !!confirm;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ password: true, confirm: true });
    if (!canSubmit) return; // client-side guard

    setSubmitting(true);
    try {
      // TODO: replace with your API call
      await new Promise((r) => setTimeout(r, MOCK_API_TIMEOUT));
      sessionStorage.removeItem("resetEmail");
      navigate({ to: "/login" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      <header className="space-y-1 text-center">
        <H2>{t("resetPasswordPage.title")}</H2>
        <Text>
          {t("resetPasswordPage.subtitle")}
          {email ? ` ${email}` : ""}
        </Text>
      </header>

      <Card>
        <form onSubmit={onSubmit} noValidate>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">
              {t("resetPasswordPage.cardTitle")}
            </CardTitle>
            <CardDescription>{t("resetPasswordPage.cardDesc")}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            {/* New password */}
            <div className="grid gap-2">
              <Label htmlFor="new-password">
                {t("resetPasswordPage.labelNewPassword")}
              </Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched((s) => ({ ...s, password: true }))}
                  placeholder={t("resetPasswordPage.placeholderNewPassword")}
                  aria-invalid={!!pwStrengthError}
                  aria-describedby={
                    pwStrengthError ? "new-password-error" : undefined
                  }
                  autoComplete="new-password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:text-foreground"
                  aria-label={
                    showPw
                      ? t("resetPasswordPage.a11yHidePassword")
                      : t("resetPasswordPage.a11yShowPassword")
                  }
                >
                  {showPw ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {pwStrengthError ? (
                <Text id="new-password-error" tone="destructive">
                  {pwStrengthError}
                </Text>
              ) : (
                <Text size="xs">{t("resetPasswordPage.helpPolicy")}</Text>
              )}
            </div>

            {/* Confirm password */}
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">
                {t("resetPasswordPage.labelConfirmPassword")}
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirm ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  onBlur={() => setTouched((s) => ({ ...s, confirm: true }))}
                  placeholder={t(
                    "resetPasswordPage.placeholderConfirmPassword"
                  )}
                  aria-invalid={!!confirmError}
                  aria-describedby={
                    confirmError ? "confirm-password-error" : undefined
                  }
                  autoComplete="new-password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:text-foreground"
                  aria-label={
                    showConfirm
                      ? t("resetPasswordPage.a11yHidePassword")
                      : t("resetPasswordPage.a11yShowPassword")
                  }
                >
                  {showConfirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {confirmError ? (
                <Text id="confirm-password-error" tone="destructive">
                  {confirmError}
                </Text>
              ) : null}
            </div>
          </CardContent>

          <CardFooter className="flex justify-end pt-3">
            <Button type="submit" disabled={!canSubmit || submitting}>
              {t("resetPasswordPage.actionSubmit")}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
