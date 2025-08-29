import type { JSX } from "react";
import { useAuth } from "@/contexts/auth/AuthContext";
import { Navigate } from "@tanstack/react-router";
import IdleTimerContainer from "@/components/idle-timer-container";
import { PERMISSIONS, ROLES } from "@/contexts/auth/auth.types";

export function ProtectedRoute({
  children,
  roles,
  permissions,
}: Readonly<{
  children: JSX.Element;
  roles?: (keyof typeof ROLES)[];
  permissions?: (keyof typeof PERMISSIONS)[];
}>) {
  const { user, hasAnyRole, hasAnyPermission } = useAuth();

  // Not logged in? Redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Role-based check
  if (roles && !hasAnyRole(roles)) {
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
