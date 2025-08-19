import { Permission, Role } from "@/contexts/auth.types";
import { useAuth } from "../contexts/AuthContext";

type CanProps = {
  perm?: Permission;
  perms?: Permission[];
  checkAllPerms?: boolean;
  checkAllRoles?: boolean;
  role?: Role;
  roles?: Role[];
  children: React.ReactNode;
};

export function Can({
  perm,
  perms,
  role,
  roles,
  checkAllPerms,
  checkAllRoles,
  children,
}: CanProps) {
  const {
    hasPermission,
    hasAnyPermission,
    hasRole,
    hasAnyRoles,
    hasAllRoles,
    hasAllPermissions,
  } = useAuth();

  let canRender = true;

  // Permission checks
  if (perm && !hasPermission(perm)) {
    canRender = false;
  }

  if (
    perms?.length &&
    ((checkAllPerms && !hasAllPermissions(perms)) ||
      (!checkAllPerms && !hasAnyPermission(perms)))
  ) {
    canRender = false;
  }

  // Role checks
  if (role && !hasRole(role)) {
    canRender = false;
  }

  if (
    roles?.length &&
    ((checkAllRoles && !hasAllRoles(roles)) ||
      (!checkAllRoles && !hasAnyRoles(roles)))
  ) {
    canRender = false;
  }

  return canRender ? <>{children}</> : null;
}
