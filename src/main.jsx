import { StrictMode } from "react";
import { createRoot } from "react-dom/client";


// --- CSS
import "./assets/styles/index.css";

import RouterPages from "./RouterPages.jsx";

// Redux
import { PersistGate } from "redux-persist/integration/react";
import reduxStore, { persistedStore } from "./redux/store.js";
import { Provider as ReduxProvider } from "react-redux";

createRoot(document.getElementById("root")).render(
  // <StrictMode>\
  <ReduxProvider store={reduxStore}>
    <PersistGate loading={null} persistor={persistedStore}>
      <RouterPages />
    </PersistGate>
  </ReduxProvider>,
  // </StrictMode>
);
