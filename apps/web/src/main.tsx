import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterApp } from "./routes/router";
import { AuthProvider } from "./contexts/AuthContext";
import { withSentryBoundary } from "./hoc/with-sentry-boundary";
import "./i18n";
import "./index.css";
import { ThemeProvider } from "./components/theme/theme-provider";
import { setInitialTheme } from "./components/theme/setTheme";

// Set theme before rendering
setInitialTheme();

// For TypeScript support
// declare module "@tanstack/react-router" {
//   interface Register {
//     router: typeof router;
//   }
// }

let MainComponent;
if (import.meta.env.VITE_SENTRY_DSN) {
  MainComponent = withSentryBoundary(RouterApp);
} else {
  MainComponent = RouterApp;
}

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <MainComponent />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
