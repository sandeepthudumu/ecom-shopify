import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";



import { AuthProvider } from "./context/Authcontext";
import { CartProvider } from "./context/Cartcontext";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);