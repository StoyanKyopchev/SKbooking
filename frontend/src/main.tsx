import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import { SearchContextProvider } from "./contexts/SearchContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
