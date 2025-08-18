import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../contexts/AuthContext";
import AppInput from "../components/input";
import AppH2 from "../components/h2";
import AppDiv from "../components/div";
import AppButton from "../components/button";
import AppP from "../components/p";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      navigate({ to: "/dashboard" });
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate({ to: "/dashboard" });
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <AppDiv>
      <AppH2>{t("pages.login")}</AppH2>
      <form onSubmit={handleSubmit}>
        <AppInput
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          placeholder="Username"
        />
        <AppInput
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <AppButton type={"submit"}>Login</AppButton>
      </form>
      {error && <AppP style={{ color: "red" }}>{error}</AppP>}
    </AppDiv>
  );
}
