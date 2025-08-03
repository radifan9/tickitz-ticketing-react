import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// --- CSS
import "./assets/styles/index.css";

import RouterPages from "./RouterPages.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <RouterPages />,
  // </StrictMode>
);
