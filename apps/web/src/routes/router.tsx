import { useEffect } from "react";
import {
  createRootRoute,
  createRouter,
  RouterProvider,
  createRoute,
  Navigate,
  useRouter,
} from "@tanstack/react-router";
import { onMessage, type MessagePayload } from "firebase/messaging";

import { ProtectedRoute } from "./protectedRoute";
import { MapPage } from "@/pages/map-page";
import { showNotification } from "@/services/notificationService";
import { generateToken, messaging } from "@/utils/firebase";
import ForgotPasswordPage from "@/pages/forgot-password";
import ResetPasswordPage from "@/pages/reset-password";
import DashboardPage from "@/pages/dashboard";
import NoAccessPage from "@/pages/no-access";
import LoginPage from "@/pages/login";
import PageNotFoundPage from "@/pages/page-not-found";
import AuthLayout from "./layouts/auth-layout";
import AppLayout from "./layouts/app-layout";

const AUTH_PREFIXES = ["/login", "/forgot-password", "/reset-password"];

function isAuthPath(path: string) {
  // exact match or sub-routes like /login/2fa
  return AUTH_PREFIXES.some((p) => path === p || path.startsWith(p + "/"));
}

function RootLayout() {
  const { state } = useRouter();
  const path = state.location.pathname;

  return isAuthPath(path) ? <AuthLayout /> : <AppLayout />;
}

// Root route config
const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: PageNotFoundPage,
});

// Child routes (note: no layout markup here)

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Navigate to="/login" />,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const noAccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/no-access",
  component: NoAccessPage,
});

const forgotPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/forgot-password",
  component: ForgotPasswordPage,
});

const resetPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reset-password",
  component: ResetPasswordPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  ),
});

const mapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/map",
  component: () => (
    <ProtectedRoute>
      <MapPage />
    </ProtectedRoute>
  ),
});

// Combine routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  forgotPasswordRoute,
  resetPasswordRoute,
  dashboardRoute,
  noAccessRoute,
  mapRoute,
]);

// eslint-disable-next-line react-refresh/only-export-components
export const router = createRouter({ routeTree });

export function RouterApp() {
  useEffect(() => {
    generateToken();
    onMessage(messaging, onMessageReceived);
  }, []);

  const onMessageReceived = (payload: MessagePayload) => {
    showNotification(payload);
  };

  return <RouterProvider router={router} />;
}
