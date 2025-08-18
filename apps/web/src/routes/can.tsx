import { useAuth } from "../contexts/AuthContext";

type CanProps = {
  perm?: string;
  perms?: string[];
  checkAllPerms?: boolean;
  role?: string;
  roles?: string[];
  children: React.ReactNode;
};

export function Can({
  perm,
  perms,
  role,
  roles,
  checkAllPerms,
  children,
}: CanProps) {
  const {
    hasPermission,
    hasAnyPermission,
    hasRole,
    hasAnyRoles,
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

  if (roles?.length && !hasAnyRoles(roles)) {
    canRender = false;
  }

  return canRender ? <>{children}</> : null;
}
