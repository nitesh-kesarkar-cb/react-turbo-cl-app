import { useEffect, useMemo, useState } from "react";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { H2 } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { validateEmail } from "@/utils/email";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [otp, setOtp] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // resend cooldown
  const [cooldown, setCooldown] = useState(0);
  useEffect(() => {
    if (!cooldown) return;
    const id = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  const emailError = useMemo(() => {
    if (!emailTouched) return "";
    const key = validateEmail(email);
    return key ? t(`forgotPasswordPage.${key}`) : "";
  }, [email, emailTouched, t]);

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    setEmailTouched(true);
    if (emailError) return;

    setSubmitting(true);
    try {
      // TODO: send OTP to {email}
      await new Promise((r) => setTimeout(r, 600));
      setStep("otp");
      setCooldown(30);
    } finally {
      setSubmitting(false);
    }
  }

  async function submitOtp(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length !== 6) return;

    setSubmitting(true);
    try {
      // TODO: verify OTP for {email}
      await new Promise((r) => setTimeout(r, 600));
      sessionStorage.setItem("resetEmail", email.trim());
      navigate({ to: "/reset-password" });
    } finally {
      setSubmitting(false);
    }
  }

  const resendOtp = async () => {
    if (cooldown > 0) return;
    // TODO: call resend endpoint
    await new Promise((r) => setTimeout(r, 400));
    setCooldown(30);
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      <header className="space-y-1 text-center">
        <H2>{t("forgotPasswordPage.title")}</H2>
        {/* was: <p className="text-sm text-muted-foreground"> */}
        <Text>
          {step === "email"
            ? t("forgotPasswordPage.subtitleEmail")
            : t("forgotPasswordPage.subtitleOtp")}
        </Text>
      </header>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">
            {step === "email"
              ? t("forgotPasswordPage.cardTitleEmail")
              : t("forgotPasswordPage.cardTitleOtp")}
          </CardTitle>
          <CardDescription>
            {step === "email"
              ? t("forgotPasswordPage.cardDescEmail")
              : t("forgotPasswordPage.cardDescOtp")}
          </CardDescription>
        </CardHeader>

        {step === "email" ? (
          <form onSubmit={submitEmail}>
            <CardContent className="space-y-3">
              <div className="grid gap-2">
                <Label htmlFor="email">
                  {t("forgotPasswordPage.labelEmail")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  inputMode="email"
                  placeholder={t("forgotPasswordPage.placeholderEmail")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setEmailTouched(true)}
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? "email-error" : undefined}
                  autoComplete="username"
                />
                {emailError ? (
                  // was: <p id="email-error" className="text-sm text-destructive">
                  <Text id="email-error" tone="destructive">
                    {emailError}
                  </Text>
                ) : null}
              </div>
            </CardContent>

            <CardFooter className="flex justify-end pt-3">
              <Button type="submit" disabled={submitting}>
                {t("forgotPasswordPage.actionSendCode")}
              </Button>
            </CardFooter>
          </form>
        ) : (
          <form onSubmit={submitOtp}>
            <CardContent className="space-y-3">
              <div className="grid gap-2">
                <Label htmlFor="otp">{t("forgotPasswordPage.labelOtp")}</Label>

                <InputOTP
                  id="otp"
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                  aria-label={t("forgotPasswordPage.a11yOtp")}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>

                {/* was: <p className="text-xs text-muted-foreground"> */}
                <Text size="xs">{t("forgotPasswordPage.helpOtp")}</Text>
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between gap-2 pt-3">
              <Button
                type="button"
                variant="ghost"
                disabled={cooldown > 0 || submitting}
                onClick={resendOtp}
                title={
                  cooldown > 0
                    ? t("forgotPasswordPage.actionResendIn", { s: cooldown })
                    : t("forgotPasswordPage.actionResend")
                }
              >
                {cooldown > 0
                  ? t("forgotPasswordPage.actionResendIn", { s: cooldown })
                  : t("forgotPasswordPage.actionResend")}
              </Button>

              <Button type="submit" disabled={otp.length !== 6 || submitting}>
                {t("forgotPasswordPage.actionVerify")}
              </Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
}
