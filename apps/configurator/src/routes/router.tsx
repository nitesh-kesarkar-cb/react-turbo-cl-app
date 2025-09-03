import { useEffect } from "react";
import {
  createRootRoute,
  createRouter,
  RouterProvider,
  createRoute,
  Navigate,
  useRouter,
} from "@tanstack/react-router";

import { ProtectedRoute } from "./protectedRoute";
import ScoreEnginePage from "@/pages/ScoreEngine";
import PageNotFound from "@/pages/NotFound";
import AuthLayout from "./layouts/auth-layout";
import AppLayout from "./layouts/app-layout";

const AUTH_PREFIXES = [];

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
  notFoundComponent: PageNotFound,
});

// Child routes (note: no layout markup here)

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Navigate to="/score-engine" />,
});

const scoreEngineRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/score-engine",
  component: () => (
    <ScoreEnginePage />
  ),
});

// Combine routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  scoreEngineRoute,
]);

export const router = createRouter({ routeTree });

export function RouterApp() {
  return <RouterProvider router={router} />;
}
