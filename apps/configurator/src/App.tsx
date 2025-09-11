import { RouterApp } from "./routes/router";
import { AuthProvider } from "./contexts/auth/AuthContext";
import "./index.css";
import { ThemeProvider } from "./components/theme/theme-provider";
import { setInitialTheme } from "./components/theme/setTheme";

import { Provider } from 'react-redux'
import { store } from "./store";

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from "./store/query";

// Set theme before rendering
setInitialTheme();



const App = () => (
  <Provider store={store}>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterApp />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </Provider>
);

export default App;
