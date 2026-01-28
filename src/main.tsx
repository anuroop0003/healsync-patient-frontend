import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import "./index.css";
import MedicalHistory from "./page/medical-history";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MedicalHistory />
  </StrictMode>,
);
