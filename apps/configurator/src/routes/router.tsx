import {
  createRootRoute,
  createRouter,
  RouterProvider,
  createRoute,
  Navigate,
  useRouter,
} from "@tanstack/react-router";

import ScoreEnginePage from "@/pages/ScoreEngine";
import PageNotFound from "@/pages/NotFound";
import AuthLayout from "./layouts/auth-layout";
import AppLayout from "./layouts/app-layout";
import AccessControl from "@/pages/AccessControl";
import Onboarding from "@/pages/Onboarding";
import WhiteLabel from "@/pages/WhiteLabel";
import Notifications from "@/pages/Notifications";
import Tenants from "@/pages/Tenant";
import FormBuilder from "@/pages/FormBuilder";
import OnboardingOne from "@/pages/OnboardingOne";

const AUTH_PREFIXES: string[] = [];

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
  component: () => <ScoreEnginePage />,
});

const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/onboarding",
  component: () => <Onboarding />,
});
const onboardingOneRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/onboarding-one",
  component: () => <OnboardingOne />,
});

const accessControlRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/access-control",
  component: () => <AccessControl />,
});

const whiteLabelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/white-label",
  component: () => <WhiteLabel />,
});

const notificationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/notifications",
  component: () => <Notifications />,
});

const tenantsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tenants",
  component: () => <Tenants />,
});

const formBuilderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/form-builder",
  component: () => <FormBuilder />,
});

// Combine routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  scoreEngineRoute,
  onboardingRoute,
  onboardingOneRoute,
  accessControlRoute,
  whiteLabelRoute,
  notificationsRoute,
  tenantsRoute,
  formBuilderRoute,
]);

export const router = createRouter({ routeTree });

export function RouterApp() {
  return <RouterProvider router={router} />;
}
