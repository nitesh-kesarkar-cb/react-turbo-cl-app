import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { AuthContextType, Permission, Role, User } from "./auth.types";
import { mockUsers } from "./mockUsers";
import { hashPasswordSync } from "../utils/password";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      const foundUser = mockUsers.find(
        (u: User) => !!u && u.username === storedUsername
      );
      if (foundUser) {
        setUser(foundUser);
      }
    }
  }, []);

  const login = (username: string, password: string) => {
    const passwordHash = hashPasswordSync(password);
    const foundUser = mockUsers.find(
      (u: User) => !!u && u.username === username && u.password === passwordHash
    );

    if (foundUser) {
      setUser(foundUser);
      sessionStorage.setItem("username", username);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("username");
  };

  const hasPermission = (perm: Permission) => {
    if (!user) return false;

    return user.permissions.includes(perm);
  };

  const hasAnyPermission = (perms: Permission[]) => {
    if (!user) return false;

    if (!Array.isArray(user.permissions)) return false;

    return perms.some((p) => user.permissions.includes(p));
  };

  const hasAllPermissions = (perms: Permission[]) => {
    if (!user) return false;
    return perms.every((p) => user.permissions.includes(p));
  };

  const hasFeatureEnabled = (flag: string) => {
    if (!user) return false;

    return !!user.featureFlags?.[flag];
  };

  const hasRole = (role: Role) => {
    if (!user) return false;
    return Array.isArray(user.roles) && user.roles.includes(role);
  };

  const hasAnyRoles = (roles: Role[]) => {
    if (!user) return false;

    if (!Array.isArray(user.roles)) return false;

    return roles.some((r) => user.roles.includes(r));
  };

  const hasAllRoles = (roles: Role[]) => {
    if (!user) return false;
    if (!Array.isArray(user.roles)) return false;
    return roles.every((r) => user.roles.includes(r));
  };

  const value: AuthContextType = {
    user,
    isLoggedIn: !!user,
    login,
    logout,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    hasAnyRoles,
    hasAllRoles,
    hasFeatureEnabled,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFeatureFlags = () => {
  const { user } = useAuth();
  return user?.featureFlags || {};
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePermissions = () => {
  const { user } = useAuth();
  return user?.permissions || [];
};
