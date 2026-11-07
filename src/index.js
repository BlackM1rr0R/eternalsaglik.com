import React from "react";
import ReactDOM from "react-dom/client";
// Order matters: reset first, then tokens, then base styles that build on both.
import "./assets/css/reset.css";
import "./assets/css/variables.css";
import "./index.css";
import "./assets/css/a11y.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// PWA: offline support and "add to home screen". Production builds only.
if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/sw.js`).catch(() => {});
  });
}
