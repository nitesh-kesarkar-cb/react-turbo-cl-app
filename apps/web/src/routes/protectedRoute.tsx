import type { JSX } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "@tanstack/react-router";
import IdleTimerContainer from "../components/idle-timer-container";
import { Permission, Role } from "@/contexts/auth.types";

export function ProtectedRoute({
  children,
  roles,
  permissions,
}: Readonly<{
  children: JSX.Element;
  roles?: Role[];
  permissions?: Permission[];
}>) {
  const { user, hasAnyRoles, hasAnyPermission } = useAuth();

  // Not logged in? Redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Role-based check
  if (roles && !hasAnyRoles(roles)) {
    return <Navigate to="/no-access" />;
  }

  // Permission-based check
  if (permissions && !hasAnyPermission(permissions)) {
    return <Navigate to="/no-access" />;
  }

  return (
    <>
      <IdleTimerContainer />
      {children}
    </>
  );
}
