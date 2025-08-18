import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterApp } from "./routes/router";
import { AuthProvider } from "./contexts/AuthContext";
import { withSentryBoundary } from "./hoc/with-sentry-boundary";
import './i18n';

// For TypeScript support
// declare module "@tanstack/react-router" {
//   interface Register {
//     router: typeof router;
//   }
// }

let MainComponent;  
if (import.meta.env.VITE_SENTRY_DSN) {
  MainComponent = withSentryBoundary(RouterApp);
} else  {
  MainComponent = RouterApp;
}

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <AuthProvider>
      <MainComponent />
    </AuthProvider>
  </StrictMode>
);
