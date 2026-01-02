import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import ReactDOM from "react-dom/client";
import App from "./App";
import { lightTheme } from "./theme";
import { ThemeProvider } from "styled-components";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <div>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={lightTheme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </div>
);
