import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterApp } from "./routes/router";
import { AuthProvider } from "./contexts/auth/AuthContext";
import { withSentryBoundary } from "./hoc/with-sentry-boundary";
import "./i18n";
import "./index.css";
import "./assets/styles/rtl.css";
import { ThemeProvider } from "./components/theme/theme-provider";
import { setInitialTheme } from "./components/theme/setTheme";
import I18nDirectionProvider from "./contexts/DirectionProvider";

import { Provider } from "react-redux";
import { store } from "./store";

// Set theme before rendering
setInitialTheme();

let MainComponent;
if (import.meta.env.VITE_SENTRY_DSN) {
  MainComponent = withSentryBoundary(RouterApp);
} else {
  MainComponent = RouterApp;
}

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <I18nDirectionProvider>
      <Provider store={store}>
        <ThemeProvider>
          <AuthProvider>
            <MainComponent />
          </AuthProvider>
        </ThemeProvider>
      </Provider>
    </I18nDirectionProvider>
  </StrictMode>
);
