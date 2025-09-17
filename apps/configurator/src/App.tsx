import { setInitialTheme } from "./components/theme/setTheme";
import { ThemeProvider } from "./components/theme/theme-provider";
import { AuthProvider } from "./contexts/auth/AuthContext";
import "./index.css";
import { RouterApp } from "./routes/router";

import { Provider } from "react-redux";
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
