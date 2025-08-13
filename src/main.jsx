import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// --- CSS
import "./assets/styles/index.css";

import RouterPages from "./RouterPages.jsx";

// Redux
import { PersistGate } from "redux-persist/integration/react";
import reduxStore, { persistedStore } from "./redux/store.js";
import { Provider as ReduxProvider } from "react-redux";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  // <StrictMode>\
  <ReduxProvider store={reduxStore}>
    <PersistGate loading={null} persistor={persistedStore}>
      {/* <Toaster richColors position="top-center" /> */}
      <Toaster
        richColors
        position="top-center"
        toastOptions={{
          classNames: {
            // Applies to the whole toast
            toast: "text-base", // overall font-size
            title: "text-base ", // title size
            description: "text-base", // description size
            actionButton: "text-base",
            cancelButton: "text-base",
          },
        }}
      />

      <RouterPages />
    </PersistGate>
  </ReduxProvider>,
  // </StrictMode>
);
