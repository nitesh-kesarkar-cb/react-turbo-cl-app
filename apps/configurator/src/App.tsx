import { createRoot } from "react-dom/client";
import { RouterApp } from "./routes/router";
import { AuthProvider } from "./contexts/auth/AuthContext";
import "./index.css";
import { ThemeProvider } from "./components/theme/theme-provider";
import { setInitialTheme } from "./components/theme/setTheme";

import { Provider } from 'react-redux'
import { store } from "./store";

// Set theme before rendering
setInitialTheme();



const App = () => (
  <Provider store={store}>
    <ThemeProvider>
      <AuthProvider>
        <RouterApp />
      </AuthProvider>
    </ThemeProvider>
  </Provider>
);

export default App;
