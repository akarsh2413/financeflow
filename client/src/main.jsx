import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
 <>
  <Toaster
    position="top-right"
    reverseOrder={false}
    toastOptions={{
      duration: 3000,
      style: {
        borderRadius: "12px",
        background: "#1e293b",
        color: "#fff",
        fontSize: "15px",
        padding: "14px",
      },
      success: {
        iconTheme: {
          primary: "#22c55e",
          secondary: "#fff",
        },
      },
      error: {
        iconTheme: {
          primary: "#ef4444",
          secondary: "#fff",
        },
      },
    }}
  />

  <App />
</>
  </React.StrictMode>
);