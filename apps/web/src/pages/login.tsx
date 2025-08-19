// apps/web/src/pages/LoginPage.tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "@tanstack/react-router";

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState<{
    username?: boolean;
    password?: boolean;
  }>({});
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const usernameError =
    touched.username && !username ? t("loginPage.usernameRequired") : "";
  const passwordError =
    touched.password && !password ? t("loginPage.passwordRequired") : "";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ username: true, password: true });
    setError(null);

    if (!username || !password) return;

    setSubmitting(true);

    try {
      if (login(username, password)) {
        navigate({ to: "/dashboard" });
      } else {
        setError(t("loginPage.authError"));
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          {t("loginPage.title")}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{t("common.appName")}</p>
      </CardHeader>

      <CardContent>
        <form className="space-y-4" onSubmit={onSubmit} noValidate>
          <div className="grid gap-2">
            <Label htmlFor="username">{t("loginPage.username")}</Label>
            <Input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setTouched((s) => ({ ...s, username: true }))}
              aria-invalid={!!usernameError}
              aria-describedby={usernameError ? "username-error" : undefined}
              placeholder="you@example.com"
            />
            {usernameError ? (
              <p id="username-error" className="text-sm text-destructive">
                {usernameError}
              </p>
            ) : null}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">{t("loginPage.password")}</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((s) => ({ ...s, password: true }))}
              aria-invalid={!!passwordError}
              aria-describedby={passwordError ? "password-error" : undefined}
              placeholder="••••••••"
            />
            {passwordError ? (
              <p id="password-error" className="text-sm text-destructive">
                {passwordError}
              </p>
            ) : null}
          </div>

          {error ? (
            <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          ) : null}

          <div className="flex items-center justify-between">
            <a
              href="/forgot-password"
              className="text-sm text-muted-foreground hover:underline"
            >
              {t("loginPage.forgotPassword")}
            </a>
            <Button type="submit" disabled={submitting}>
              {submitting ? t("loginPage.signIn") + "…" : t("loginPage.signIn")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
