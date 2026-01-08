import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // Optional, if you have specific global styles, otherwise Tailwind handles it via script in index.html

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
