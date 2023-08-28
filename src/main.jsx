import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { QueryClient } from "react-query";
import { QueryClientProvider } from "react-query";
import { UserContextProvider } from "./context/UserContext.jsx";
import { ToastContainer } from "react-toastify";
import Spinner from "./screens/loading/Spinner.jsx";

import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <UserContextProvider>
            <ToastContainer />
            <Suspense fallback={<Spinner />}>
              <App />
            </Suspense>
          </UserContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
