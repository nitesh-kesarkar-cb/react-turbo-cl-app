import { useEffect, useState } from "react";

import { Button } from "@repo/ui";
import { Input } from "@repo/ui";
import { Label } from "@repo/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui";
import { Navbar } from "@/components/navbar";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState<{
    username?: boolean;
    password?: boolean;
  }>({});
  const [error, setError] = useState<string | null>(null);

  const usernameError =
    touched.username && !username ? "Username is required" : "";
  const passwordError =
    touched.password && !password ? "Password is required" : "";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ username: true, password: true });
    setError(null);

    if (!username || !password) return;

    console.log("Logging in with", { username, password });
  }

  return (
    <div>
      <Navbar />
    
    <Card className="w-full max-w-md">

      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Login
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form className="space-y-4" onSubmit={onSubmit} noValidate>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
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
            <Label htmlFor="password">Password</Label>
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
            
            <Button type="submit">
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
)}
