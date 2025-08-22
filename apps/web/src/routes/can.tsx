import React from "react";
import { useAuth } from "../contexts/auth/AuthContext";
import { PERMISSIONS, ROLES } from "@/contexts/auth/auth.types";

type CanProps = {
  perm?: keyof typeof PERMISSIONS;
  role?: keyof typeof ROLES;
  children: React.ReactNode;
};

export function Can({ perm, role, children }: CanProps) {
  const { hasPermission, hasRole } = useAuth();

  let canRender = true;

  // Permission checks
  if (perm && !hasPermission(perm)) {
    canRender = false;
  }

  // Role checks
  if (canRender && role && !hasRole(role)) {
    canRender = false;
  }

  return canRender ? <>{children}</> : null;
}
