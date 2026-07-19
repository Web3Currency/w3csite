import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Prevent external chrome-extension and MetaMask runtime errors from triggering error overlay
if (typeof window !== "undefined") {
  const isMetaMaskError = (msg: string, file: string, stack: string) => {
    const query = ["metamask", "chrome-extension", "inpage.js"];
    const text = `${msg} ${file} ${stack}`.toLowerCase();
    return query.some(q => text.includes(q));
  };

  const originalOnerror = window.onerror;
  window.onerror = function (message, source, lineno, colno, error) {
    const msgStr = String(message || "");
    const srcStr = String(source || "");
    const stackStr = error?.stack ? String(error.stack) : "";

    if (isMetaMaskError(msgStr, srcStr, stackStr)) {
      console.warn("[Muted Extension Error]:", msgStr);
      return true; // Prevents the fire of the default handler
    }

    if (originalOnerror) {
      return originalOnerror.apply(this, [message, source, lineno, colno, error]);
    }
    return false;
  };

  window.addEventListener("error", (event) => {
    const message = event.message || "";
    const filename = event.filename || "";
    const errorStack = event.error?.stack || "";

    if (isMetaMaskError(message, filename, errorStack)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    const message = reason?.message || "";
    const errorStack = reason?.stack || "";

    if (isMetaMaskError(message, "", errorStack)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

