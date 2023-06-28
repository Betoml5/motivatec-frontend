import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { QueryClient } from "react-query";
import { QueryClientProvider } from "react-query";
import { UserContextProvider } from "./context/UserContext.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <UserContextProvider>
            <App />
          </UserContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
