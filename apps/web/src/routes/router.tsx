import {
  createRootRoute,
  createRouter,
  RouterProvider,
  Outlet,
  createRoute,
  Navigate,
} from "@tanstack/react-router";

import ForgotPasswordPage from "../pages/forgot-password";
import ResetPasswordPage from "../pages/reset-password";
import DashboardPage from "../pages/dashboard";
import NoAccessPage from "../pages/no-access";
import { ProtectedRoute } from "./protectedRoute";
import LoginPage from "../pages/login";
import PageNotFoundPage from "../pages/page-not-found";
import { Navbar } from "../components/navbar";
import { MapPage } from "../pages/map-page";
import { useEffect } from "react";
import { showNotification } from "../services/notificationService";
import { generateToken, messaging } from "../utils/firebase";
import { onMessage, type MessagePayload } from "firebase/messaging";

// Root route config
const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-svh flex flex-col">
      <Navbar />
      <main className="flex-1 grid place-items-center p-4">
        <Outlet />
      </main>
    </div>
  ),
  notFoundComponent: PageNotFoundPage,
});

// Child routes
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
export const router = createRouter({
  routeTree,
});

export function RouterApp() {
  useEffect(() => {
    generateToken();
    onMessage(messaging, onMessageReceived);
  }, []);

  const onMessageReceived = (payload: MessagePayload) => {
    console.log("Message received:", payload);
    showNotification(payload);
  };

  return <RouterProvider router={router} />;
}
