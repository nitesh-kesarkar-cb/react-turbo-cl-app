import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../contexts/AuthContext";
import LanguageSelector from "./language-selector";

export function Navbar({ ...props }: Readonly<React.HTMLProps<HTMLElement>>) {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    // To avoid navigating back to dashboard until auth context is cleared so kept timeout
    setTimeout(() => {
      navigate({ to: "/login" });
    }, 0);
  };

  return (
    <nav
      style={{
        padding: "10px",
        background: "#f0f0f0",
        display: "flex",
        gap: "15px",
      }}
      {...props}
    >
      {!isLoggedIn && <Link to="/login">Login</Link>}
      {!isLoggedIn && <Link to="/forget-password">Forget Password</Link>}
      {!isLoggedIn && <Link to="/reset-password">Reset Password</Link>}
      {isLoggedIn && <Link to="/dashboard">Dashboard</Link>}
      {isLoggedIn && <Link to="/map">Map</Link>}
      <Link to="/no-access">No Access</Link>
      <Link to={"/page-not-found"}>Page Not Found</Link>
      {isLoggedIn && (
        <Link to="#" onClick={handleLogout}>
          Logout
        </Link>
      )}
      <LanguageSelector />
    </nav>
  );
}
