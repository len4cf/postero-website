import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrivacyPage } from "./components/privacy/PrivacyPage";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrivacyPage />
  </StrictMode>,
);
